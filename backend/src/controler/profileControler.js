import { User } from "../models/userModel.js";
export const profile=async(req,res)=>{
    try {
        const userId = req.params.id;
        const user = await User.find(userId);
        if(!user){
            return res.status(401).json({msg:'not found'});

        }
        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"error in get profile"})
        
        
    }
}
export const doReport =async(req,res)=>{
    try {
        const {userId} = req.params;
        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({msg:'not found'});
        }
        const report = await User.findByIdAndUpdate(userId,{
            $push:{reports:req.user._id}
        })
        await report.save();
        return res.status(201).json({msg:'report added successfully'});
        
    } catch (error) {
        console.log("error in do report ",error);
        return res.status(500).json({msg:"error in get profile"})
    }
}

export const updateProfile = async (req, res) => {
    const data = req.body;
    let toUpdateData = {};

    
    for (let d in data) {
        toUpdateData[d] = data[d];
    }

    try {
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },  
            toUpdateData,
            { new: true }            
        );
        return res.status(201).json(user);

    } catch (error) {
        console.log("Error in updateProfile: " + error);
        return res.status(500).json({ msg: "Error in updating profile" });
    }
}
