import Messages from "../models/messagesModel.js";
import cloudinary from "../library/cloud.js";
export const createMessage=async(req,res)=>{
    const myId = req.user._id;
    const hisId = req.params.id;
    const {text,image,video,file} = req.body;
    try {
        if(!text && !image && !video && !file){
            return res.status(401).json({msg:'Fill atleat one field'});
        }
        const newMessage = new Messages({
            senderId:myId,
            receiverId:hisId,
            text,
            image,
            video,
            file
        })
        await newMessage.save();

        
    } catch (error) {
        console.log("error in createMessage",{error});
        
        return res.status(500).json({msg: error.message});
    }
}

