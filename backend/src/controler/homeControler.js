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
export const getSuggestedConnections = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("profile.connections");

    const suggestions = await User.find({
      _id: { $ne: req.user._id, $nin: user.profile.connections },
    })
      .select("username profile.pic profile.role")
      .limit(3);

    res.status(200).json(suggestions);
  } catch (error) {
    console.log("error in getSuggestedConnections", { error });
    return res.status(500).json({ msg: error.message });
  }
};
