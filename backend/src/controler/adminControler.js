import { User } from "../models/userModel.js";
import { Notification } from "../models/notificationModel.js";
export const getAllUses = async(req,res)=>{
    try {
        const users = await User.find();
        return res.json(users);
        
    } catch (error) {
        console.error("Error in getAllUsers controller:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
export const banUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isBanned = user.profile?.isBanned || false;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { "profile.isBanned": !isBanned } },
            { new: true }
        );

        const statusMessage = updatedUser.profile.isBanned 
            ? "User banned successfully" 
            : "User unbanned successfully";

        return res.json({ message: statusMessage, user: updatedUser });

    } catch (error) {
        console.error("Error in banUser controller:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getBanned =async (req,res)=>{
    try {
        const banned = await User.find({profile:{isBanned:true}});


        return res.json({ banned});

    } catch (error) {
        console.error("Error in getBanned controller:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getReports = async (req, res) => {
    try {
        console.log("fimding");
        const reports = await User.find({
            acountType:"user",
            reports: { $exists: true, $ne: [] }
        }).select("username reports profile.isBanned").select("-password");
        res.status(200).json( reports );
    } catch (error) {
        console.error("Error in getReports controller:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};
