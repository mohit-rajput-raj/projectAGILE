import { Orders } from "../models/ordersModel.js";
import { User } from "../models/userModel.js";
import { Item } from "../models/itemsModel.js";
export const createOrder = async (req, res) => {
  const { orderId, orderKey, caption, description, address, budget, deadLine, date } = req.body;
  try {
    if (!orderId || !orderKey || !caption || !description || !address || !budget || !deadLine || !date) {
      return res.status(400).json({ msg: "Fill all data" });
    }
    const newOrder = new Orders({
      orderId,
      orderKey,
      caption,
      description,
      address,
      budget,
      deadLine,
      orderBuildDate: date,
      orderBuilder: req.user._id,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error in createOrder:", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const undeployedOrders = async(req,res)=>{
  try {
    const orders = await Orders.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log("error in getAllOrders", { error });
    res.status(500).json({ msg: error.message });
  }
}
export const getUnDeployedOrders = async (req, res) => {
  const userId = req.user._id;
  try {
    const orders = await Orders.find({
      orderBuilder: userId,
      unDeployed: true
    }).populate({
      path: 'orderBuilder',
      select: 'username email' // Specify the fields you want to include
    })
    .exec();
  
    return res.status(200).json(orders);
  } catch (error) {
    console.log("error in getAllOrders", { error });
    res.status(500).json({ msg: error.message });
  }
};

export const getconnections = async (req, res) => {
  const userId = req.user._id;

  try {
    // Find the user by ID and select the 'profile.connections' field
    const user = await User.findById(userId)
      .select('profile.connections')
      .populate({
        path: 'profile.connections',
        select: 'username email' // Specify the fields to include
      });

    // Check if the user exists and has connections
    if (!user || !user.profile.connections) {
      return res.status(404).json({ msg: "No connections found for this user." });
    }

    // Return the populated connections with username and email
    return res.status(200).json(user.profile.connections);
  } catch (error) {
    console.error("Error in getconnections:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getDeployedOrders = async (req, res) => {
  const userId = req.user._id;
  try {
    const orders = await Orders.find({
      orderBuilder: userId,
      unDeployed: false
    });
    
    res.status(200).json(orders);
  } catch (error) {
    console.log("error in getAllOrders", { error });
    res.status(500).json({ msg: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Orders.findById(id);
    res.status(200).json(order);
  } catch (error) {
    console.log("error in getOrder", { error });
    res.status(500).json({ msg: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Orders.findByIdAndDelete(id);
    res.status(200).json(order);
  } catch (error) {
    console.log("error in deleteOrder", { error });
    res.status(500).json({ msg: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const order = await Orders.findByIdAndUpdate(id, data, { new: true });

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    console.log("error in updateOrder", { error });
    res.status(500).json({ msg: error.message });
  }
};
