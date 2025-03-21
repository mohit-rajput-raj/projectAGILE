// import { sendConnectionAcceptedEmail } from "../emails/emailHandlers.js";
import {ConnectionRequest} from "../models/connectionRequestModel.js";
import { User } from "../models/userModel.js";
import { Notification } from "../models/notificationModel.js";

export const toggleFollow = async (req, res) => {
    try {
		console.log("toggleFollow controller");
		
        const { userId } = req.params;
        const myId = req.user?._id; 

        if (!myId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (myId.toString() === userId) {
            return res.status(400).json({ message: "You can't follow yourself" });
        }

        const userToFollow = await User.findById(userId);
        if (!userToFollow) {
            return res.status(404).json({ message: "User not found" });
        }

        const isFollowing = userToFollow.profile.followers.includes(myId);

        if (isFollowing) {
            await User.updateOne(
                { _id: myId },
                { $pull: { "profile.following": userId } }
            );

            await User.updateOne(
                { _id: userId },
                { $pull: { "profile.followers": myId } }
            );

            return res.status(200).json({ message: "Unfollowed successfully",isFollowing: false });
        } else {
            await User.updateOne(
                { _id: myId },
                { $addToSet: { "profile.following": userId } }
            );

            await User.updateOne(
                { _id: userId },
                { $addToSet: { "profile.followers": myId } }
            );
			const notif = new Notification({
				recipient: userId,
				type: "Follow",
				sender: myId
			});
			await notif.save();

            return res.status(200).json({ message: "Followed successfully", isFollowing: true });
        }
    } catch (error) {
        console.error("Error in toggleFollow controller:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};






export const toggleConnectionRequest = async (req, res) => {
	try {
		const { userId } = req.params;
		const senderId = req.user._id;

		if (senderId.toString() === userId) {
			return res.status(400).json({ message: "You can't connect with yourself" });
		}

		// Find users
		const sender = await User.findById(senderId);
		const recipient = await User.findById(userId);

		if (!sender || !recipient) {
			return res.status(404).json({ message: "User not found" });
		}

		const isConnected = sender.profile.connections.includes(userId);

		// If connected, disconnect & remove notifications
		if (isConnected) {
			await User.updateOne(
				{ _id: senderId },
				{ $pull: { "profile.connections": userId } }
			);
			await User.updateOne(
				{ _id: userId },
				{ $pull: { "profile.connections": senderId } }
			);
			await sender.save();
			await recipient.save();

			const disconnectNotification = new Notification({
				sender: senderId,
				recipient: userId,
				type: "Connection",
				description: `${sender.username} has disconnected from you.`,
			  });
			  await disconnectNotification.save();

			return res.status(200).json({ message: "Disconnected successfully" });
		}

		

		

		const newNotification = new Notification({
			sender: senderId,
			recipient: userId,
			type: "Connection",
			description: `${sender.username} has connected with you.`,
		});
		sender.profile.connections.push(userId);
		await sender.save();
		recipient.profile.connections.push(senderId);
		await recipient.save();
		await newNotification.save();

		return res.status(201).json({ message: "Connection request sent successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};


export const acceptConnectionRequest = async (req, res) => {
	try {
		const { requestId } = req.params;
		const userId = req.user._id;

		const request = await ConnectionRequest.findById(requestId)
			.populate("sender", "name email username")
			.populate("recipient", "name username");

		if (!request) {
			return res.status(404).json({ message: "Connection request not found" });
		}

		// check if the req is for the current user
		if (request.recipient._id.toString() !== userId.toString()) {
			return res.status(403).json({ message: "Not authorized to accept this request" });
		}

		if (request.status !== "pending") {
			return res.status(400).json({ message: "This request has already been processed" });
		}

		request.status = "accepted";
		await request.save();

		// if im your friend then ur also my friend ;)
		await User.findByIdAndUpdate(request.sender._id, { $addToSet: { connections: userId } });
		await User.findByIdAndUpdate(userId, { $addToSet: { connections: request.sender._id } });

		const notification = new Notification({
			recipient: request.sender._id,
			type: "connectionAccepted",
			relatedUser: userId,
		});

		await notification.save();

		res.json({ message: "Connection accepted successfully" });

		// const senderEmail = request.sender.email;
		// const senderName = request.sender.name;
		// const recipientName = request.recipient.name;
		// const profileUrl = process.env.CLIENT_URL + "/profile/" + request.recipient.username;

		// try {
		// 	await sendConnectionAcceptedEmail(senderEmail, senderName, recipientName, profileUrl);
		// } catch (error) {
		// 	console.error("Error in sendConnectionAcceptedEmail:", error);
		// }
	} catch (error) {
		console.error("Error in acceptConnectionRequest controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const rejectConnectionRequest = async (req, res) => {
	try {
		const { requestId } = req.params;
		const userId = req.user._id;

		const request = await ConnectionRequest.findById(requestId);

		if (request.recipient.toString() !== userId.toString()) {
			return res.status(403).json({ message: "Not authorized to reject this request" });
		}

		if (request.status !== "pending") {
			return res.status(400).json({ message: "This request has already been processed" });
		}

		request.status = "rejected";
		await request.save();

		res.json({ message: "Connection request rejected" });
	} catch (error) {
		console.error("Error in rejectConnectionRequest controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getConnectionRequests = async (req, res) => {
	try {
		const userId = req.user._id;

		const requests = await ConnectionRequest.find({ recipient: userId, status: "pending" }).populate(
			"sender",
			"name username profilePicture headline connections"
		);

		res.json(requests);
	} catch (error) {
		console.error("Error in getConnectionRequests controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};
export const isRequestPending = async (req, res) => {
	try {
		const userId = req.user._id;
		console.log("Extracted userId:", req.params.userId);

		// const requests = await ConnectionRequest.findById({ sender: userId,recipient:req.params.userId, status: "pending" });
		// console.log(requests);
		
		return res.json();
	} catch (error) {
		console.error("Error in getConnectionRequests controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getUserConnections = async (req, res) => {
	try {
		const userId = req.user._id;

		const user = await User.findById(userId).populate(
			"connections",
			"name username profilePicture headline connections"
		);

		res.json(user.connections);
	} catch (error) {
		console.error("Error in getUserConnections controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const removeConnection = async (req, res) => {
	try {
		const myId = req.user._id;
		const { userId } = req.params;

		await User.findByIdAndUpdate(myId, { $pull: { connections: userId } });
		await User.findByIdAndUpdate(userId, { $pull: { connections: myId } });

		res.json({ message: "Connection removed successfully" });
	} catch (error) {
		console.error("Error in removeConnection controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getConnectionStatus = async (req, res) => {
	try {
		const targetUserId = req.params.userId;
		const currentUserId = req.user._id;

		const currentUser = req.user;
		if (currentUser.profile.connections.includes(targetUserId)) {
			return res.json({ status: "connected" });
		}

		const pendingRequest = await ConnectionRequest.findOne({
			$or: [
				{ sender: currentUserId, recipient: targetUserId },
				{ sender: targetUserId, recipient: currentUserId },
			],
			status: "pending",
		});

		if (pendingRequest) {
			if (pendingRequest.sender.toString() === currentUserId.toString()) {
				return res.json({ status: "pending" });
			} else {
				return res.json({ status: "received", requestId: pendingRequest._id });
			}
		}

		res.json({ status: "not_connected" });
	} catch (error) {
		console.error("Error in getConnectionStatus controller:", error);
		res.status(500).json({ message: "Server error" });
	}


};
export const checkIfFollowing = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.user._id;

        const user = await User.findById(currentUserId).select("profile.following");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isFollowing = user.profile?.following?.includes(userId) || false;

        res.status(200).json({ isFollowing });
    } catch (error) {
        console.error("Error in checkIfFollowing:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const isInConnections = async (req, res) => {
	try {	
		const userId = req.params.userId;
		const currentUserId = req.user._id;
		const user = await User.findById(currentUserId).select("profile.connections");
		const isInConnections = user.profile.connections.includes(userId);
		return res.json(isInConnections );
	} catch (error) {
		console.error("Error in isInConnections controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};
export const getconnections = async (req, res) => {
	const userId = req.user._id;
  
	try {
	  const user = await User.findById(userId)
		.select('profile.connections')
		.populate({
		  path: 'profile.connections',
		  select: 'username email'
		});
  
	  if (!user || !user.profile.connections) {
		return res.status(404).json({ msg: "No connections found for this user." });
	  }
  
	  return res.status(200).json(user.profile);
	} catch (error) {
	  console.error("Error in getconnections:", error);
	  res.status(500).json({ msg: "Internal Server Error" });
	}
  };
