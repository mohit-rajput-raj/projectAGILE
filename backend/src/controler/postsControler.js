import Post from "../models/postsModel.js";
import cloudinary from '../library/cloud.js';
export const createPost = async (req, res) => {
    const post = req.body;
    try {
        const auther = req.user._id;
        if(!post.text && !post.image ){
            return res.status(401).json({msg:'Fill atleat one field'});
        }
        if(post.image){
            const result = await cloudinary.uploader.upload(post.image);
        }

        const newPost = new Post({
            auther,
            text:post.text,
            image:result.secure_url,
        })
        newPost.save();
        return res.status(201).json(newPost);
        
        
    } catch (error) {
        console.log(error);
        
    }
}
 

// export const getAllPosts = async (req, res) => {
//     try {
//         const author = req.user._id; 
//         const posts = await Post.find({ author }).populate("author", "username profile.pic");

//         return res.status(200).json(posts); 
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ msg: error.message });
//     }
// };


export const deletePost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({msg:"Post not found"});
        }
        const res = await cloudinary.uploader.destroy(post.image.split("/").pop().split(".")[0]);
        const result = await Post.findByIdandDelete(postId);

        return res.status(201).json({msg:"Post deleted"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:error.message});
    }
}

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const post = req.body;

    try {

        return res.status(200).json(updatedPost); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: error.message });
    }
};
