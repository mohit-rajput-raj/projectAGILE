import {Messages} from "../models/messagesModel.js";
// import cloudinary from "../library/cloud.js";
import {User} from "../models/userModel.js";
// import { io } from "socket.io-client";
export const createMessage = async (req, res) => {
    const myId = req.user._id;
    const hisId = req.params.id;
    const { text, image, video, file } = req.body;

    try {
        if (!text && !image && !video && !file) {
            return res.status(400).json({ msg: 'Fill at least one field' });
        }

        const myData = await User.findById(myId);
        if (!myData) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const hisIdData = await User.findById(hisId);
        if (!hisIdData) {
            return res.status(404).json({ msg: 'User not found' });
        }

        await User.updateOne(
            { _id: myId },
            { $pull: { messagesBar: hisId } },{new:true}
        );
        await User.updateOne(
            { _id: myId },
            { $push: { messagesBar: hisId } },{new:true}
        );

        await User.updateOne(
            { _id: hisId },
            { $pull: { messagesBar: myId } },{new:true}
        );
        await User.updateOne(
            { _id: hisId },
            { $push: { messagesBar: myId }},{new:true} 
        );

        const newMessage = new Messages({
            senderId: myId,
            receiverId: hisId,
            text,
            image,
            video,
            file
        });

        await newMessage.save();
        return res.status(201).json(newMessage);

    } catch (error) {
        console.error("Error in createMessage:", error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};








export const getMessages = async(req,res)=>{
    const myId = req.user._id;
    const hisId = req.params.id;
    try {
        const messages = await Messages.find({
            $or:[
                {senderId:myId,receiverId:hisId},
                {senderId:hisId,receiverId:myId}
            ]
        }).sort({createdAt:1});
        return res.status(200).json({messages});
        
    } catch (error) {
        console.log("error in getMessages",{error});
        
        return res.status(500).json({msg: error.message});

        
    }
}
export const deleteMessage = async (req, res) => {
    const myId = req.user._id;
    const messageId = req.params.id;

    try {
        const message = await Messages.findById(messageId);

        if (!message) {
            return res.status(404).json({ msg: 'Message not found' });
        }

        if (myId.toString() !== message.senderId.toString()) {
            return res.status(403).json({ msg: 'U can not delete message' });
        }

        await Messages.findByIdAndDelete(messageId);

        return res.status(200).json({ msg: 'Message deleted' });

    } catch (error) {
        console.error("Error in deleteMessage:", error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};
export const getSideBarUsers = async (req, res) => {
    const myId = req.user._id;
    try {
        const myData = await User.findById(myId);
        // const users = await User.find({
        //     _id: { 
        //         $ne: myId,
        //         $in: myData.messagesBar
        //     }
        // }).select('username profile.Pic');
        const users = await User.find({
            $and: [
                { _id: { $in: myData.messagesBar } },
                { _id: { $ne: myId } } 
            ]
        }).select('username profile.Pic profile.role');
        
        return res.status(200).json(users);
        
    } catch (error) {
        console.log("error in getSideBarUsers:",error);
        return res.status(500).json({msg:error.message});
        
    }
}

export const updateMessage = async (req, res) => {
    const myId = req.user._id;
    const messageId = req.params.id;
    const { text} = req.body;

    if (!text) {
        return res.status(400).json({ msg: 'No update data provided' });
    }

    try {
        const message = await Messages.findOneAndUpdate(
            { _id: messageId, senderId: myId },
            { text},
            { new: true }
        );

        if (!message) {
            return res.status(404).json({ msg: 'Message not found or unauthorized' });
        }

        return res.status(200).json(message);

    } catch (error) {
        console.error("Error in updateMessage:", error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};


