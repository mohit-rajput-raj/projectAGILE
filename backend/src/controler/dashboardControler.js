import { posts } from "../models/postsModel.js";
import { User } from "../models/userModel.js";
export const dashboard = (req, res) => {
    res.json('dashboard');
}
export const updateProfile = async (req, res) => {
    const {pic ,  bio, website} = req.body;
    try{
        
    }catch(error){
        console.log("error in updateProfile",{error});
        
        return res.status(500).json({msg: error.message});
    }
}


export const settings = async (req, res) => {
    const setting = req.body;
    try{
        const names = await User.find().populate("username");
        
        
        return res.status(200).json(names);

        
    }catch(error){
        console.log("error in settings",{error});
        
        return res.status(500).json({msg: error.message});
    }
}


export const logout= async (req,res)=>{
    try {
          res.clearCookie("jwt");
          return res.status(200).json({msg:"User logged out"});
    } catch (error) {
     console.log("error in logout",{error});
     
     return res.status(500).json({msg: error.message});
    }
}

export const getNames = async (req, res) => {
    try {
        const names = await User.find(); 

        return res.status(200).json(names);
    } catch (error) {
        console.error("Error in getNames:", error);

        return res.status(500).json({ success: false,tim:not, msg: error.message });
    }
};



export const Posts=async(req,res)=>{
    try{
        const postData =req.body;
        if(!postData.userId || !postData.text){
            return res.status(401).json({msg:'Fill all data'});
        }
        const newPost = new posts(postData)
        await newPost.save();

        return res.status(201).json(newPost);



    }catch(err){
        console.log("error in posts",{err});
        return res.status(500).json({error:err.message});
        
    }
}
