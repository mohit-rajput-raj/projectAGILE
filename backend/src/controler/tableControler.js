export const table = async()=>{
    const {profile} = req.user;
    try {
        
        
    } catch (error) {
        console.log("error in table");
        
        console.log(error.msg);
        
        return res.status(500).json({msg:error});
    }
}