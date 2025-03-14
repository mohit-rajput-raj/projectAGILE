import { User } from "../models/userModel.js";

export const searchPerson = async (req, res) => {
  const { query } = req.query; 
  // console.log(query);
  

  try {
    const users = await User.find({
      username: { $regex: query, $options: "i" } 
    }).select('username profile.role profile.pic');

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error in searchPerson:", error);
    return res.status(500).json({ msg: "Failed to fetch users" });
  }
};
