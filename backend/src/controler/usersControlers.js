// import { log } from "three/tsl";
import { User } from "../models/userModel.js";


export const hi = async (req, res) => {
  try {
    
    return res.status(200).json({ msg: 'hi' });
  } catch (error) {
    console.error('Error in getuserProfile', { error });

    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}
export const getuserProfile = async (req, res) => {
  try {
    // console.log(req.params.username);
    
    if (!req.params.username) {
      return res.status(400).json({ msg: 'Username is required' });
    }
    const user = await User.findOne({ username: req.params.username }).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    // console.log(user);
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error in getuserProfile', { error });

    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

// export const getPeopleMightknow =async(req,res)=>{
//     try {
//         const user = await User.findById(req.user._id).select("profile.connections");

//     const suggestions = await User.find({
//       _id: { $ne: req.user._id, $nin: user.profile.connections },
//     })
//       .select("name username profile.pic profile.role")
//       .limit(3);

//     res.status(200).json(suggestions);
//     } catch (error) {
//         console.log("error in getPeopleMightknow", { error });
//     return res.status(500).json({ msg: error.message });
//     }

// }