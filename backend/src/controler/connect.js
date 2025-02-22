import { User } from "../models/userModel.js";

export const follow = async (req, res) => {
    const { followerId } = req.body;
    const userId = req.params.id;
    console.log(followerId, " ", userId);

    try {
        if (!followerId || !userId) {
            return res.status(400).json({ msg: "Missing required fields" });
        }

        if (followerId === userId) {
            return res.status(400).json({ msg: "You cannot follow yourself" });
        }

        const userToFollow = await User.findById(userId);
        const follower = await User.findById(followerId);

        if (!userToFollow || !follower) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (userToFollow.profile.followers.includes(followerId)) {
            return res.status(400).json({ msg: "You are already following this user" });
        }

        userToFollow.profile.followers.push(followerId);
        follower.profile.following.push(userId);

        await userToFollow.save();
        await follower.save();

        return res.status(200).json({ msg: "Successfully followed user", userToFollow });
    } catch (error) {
        console.error("Error in follow:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};
