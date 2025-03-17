import { User } from "../models/userModel.js";
import {ConnectionRequest} from '../models/connectionRequestModel.js';
import {Notification} from '../models/notificationModel.js';
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

		if (request.recipient._id.toString() !== userId.toString()) {
			return res.status(403).json({ message: "Not authorized to accept this request" });
		}

		if (request.status !== "pending") {
			return res.status(400).json({ message: "This request has already been processed" });
		}

		request.status = "accepted";
		await request.save();

		await User.findByIdAndUpdate(request.sender._id, { $addToSet: { connections: userId } });
		await User.findByIdAndUpdate(userId, { $addToSet: { connections: request.sender._id } });

		const notification = new Notification({
			recipient: request.sender._id,
			type: "connectionAccepted",
			relatedUser: userId,
		});

		await notification.save();

		res.json({ message: "Connection accepted successfully" });

		
	} catch (error) {
		console.error("Error in acceptConnectionRequest controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

///////////////////////////////////////////////////////////////////////////////////
export const sendConnectionRequest = async (req, res) => {
	try {
    console.log("oo");
    
		const { userId } = req.params;
    
    
		const senderId = req.user._id;

		if (senderId.toString() === userId) {
			return res.status(400).json({ message: "You can't send a request to yourself" });
		}
    console.log("ff");

		if (req.user.profile.connections.includes(userId)) {
			return res.status(400).json({ message: "You are already connected" });
		}
		const existingRequest = await ConnectionRequest.findOne({
			sender: senderId,
			recipient: userId,
			status: "pending",
		});
    
		if (existingRequest) {
			return res.status(400).json({ message: "A connection request already exists" });
		}

		const newRequest = new ConnectionRequest({
			sender: senderId,
			recipient: userId,
		});

		await newRequest.save();

		res.status(201).json({ message: "Connection request sent successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server error dd" });
	}
};

export const hi = async (req, res) => {
  try {
    
    return res.status(200).json({ msg: 'hi' });
  } catch (error) {
    console.error('Error in getuserProfile', { error });

    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}
export const getuserProfile = async (req, res) => {
  try {
    // console.log(req.params.username);
    
    if (!req.params.username) {
      return res.status(400).json({ msg: 'Username is required' });
    }
    const user = await User.findOne({ username: req.params.username }).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    // console.log(user);
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error in getuserProfile', { error });

    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

// export const getPeopleMightknow =async(req,res)=>{
//     try {
//         const user = await User.findById(req.user._id).select("profile.connections");

//     const suggestions = await User.find({
//       _id: { $ne: req.user._id, $nin: user.profile.connections },
//     })
//       .select("name username profile.pic profile.role")
//       .limit(3);

//     res.status(200).json(suggestions);
//     } catch (error) {
//         console.log("error in getPeopleMightknow", { error });
//     return res.status(500).json({ msg: error.message });
//     }

// }