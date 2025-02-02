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


export const Posts=async()=>{
    try{


    }catch(err){
        console.log("error in posts",{err});
        return res.status(500).json({error:err.message});
        
    }
}