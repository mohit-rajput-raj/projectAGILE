import posts from "../models/postsModel.js";

export const posts = async (req, res) => {
    const post = req.body;
    try {
        const userId = req.user._id;
        if(!post.text && !post.image && !post.video && !post.file){
            return res.status(401).json({msg:'Fill atleat one field'});
        }
        const newPost = new posts({
            userId,
            text:post.text,
            image:post.image,
            video:post.video,
            file:post.file
        })
        newPost.save();
        return res.status(201).json(newPost);
        
        
    } catch (error) {
        console.log(error);
        
    }
}
 
export const getAllPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const posts = await posts.findById({userId});
        return res.status(201).json(posts);
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:error.message});
    }
}

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await posts.findByIdandDelete(postId);
        if(!post){
            return res.status(404).json({msg:"Post not found"});
        }
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
        const updatedPost = await posts.findByIdAndUpdate(postId, post, {new:true});
        if(!updatedPost){
            return res.status(404).json({msg:"Post not found"});
        }
        return res.status(201).json(updatedPost);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:error.message});
    }
}