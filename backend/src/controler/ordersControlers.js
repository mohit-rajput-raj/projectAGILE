import { Orders } from "../models/ordersModel.js";
import { User } from "../models/userModel.js";
import { Item } from "../models/itemsModel.js";
import { Notification } from "../models/notificationModel.js";



export const deleteAsk = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  
  try {
    const order = await Orders.findById(id);
    if (!order) {
      console.log("Order not found");
      return res.status(404).json({ msg: "Order not found" });
    }

    const updatedOrder = await Orders.findByIdAndUpdate(
      id, 
      { 
        orderHoldedBy: null,
        unDeployed: true,
        orderStatus: "newcreated"
      },
      { new: true }
    );

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.log("error in deleteAsk", error);
    res.status(500).json({ msg: error.message });
  }
};
export const makeReject = async (req, res) => {
  const noti = req.body.data;
  // console.log(noti);
  let updatedOrder;
  try {
    const newN = await Notification.findByIdAndUpdate(noti._id, { rejected: true });
    if(noti.type==="Orders"){
      const order = await Orders.findById(noti.relatedPost);
       updatedOrder = await Orders.findByIdAndUpdate(
        order._id, 
        { 
          orderHoldedBy: null,
          unDeployed: true,
          orderStatus: "rejected"
        },
        { new: true }
      );
      return res.status(200).json(updatedOrder);
    }
    


    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.log("error in makeReject", error);
    res.status(500).json({ msg: error.message });
  }
};
export const makeAccept = async (req, res) => {
  const noti = req.body.data;
  let updatedOrder;
  // console.log(noti);
  try {
    const newN = await Notification.findByIdAndUpdate(noti._id, { accepted: true });
    if(noti.type==="Orders"){
      const order = await Orders.findById(noti.relatedPost);
       updatedOrder = await Orders.findByIdAndUpdate(
        order._id, 
        { 
          orderHoldedBy: req.user._id,
          unDeployed: false,
          orderStatus: "accepted"
        },
        { new: true }
      );
      return res.status(200).json(updatedOrder);
    }
    

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.log("error in makeAccept", error);
    res.status(500).json({ msg: error.message });
  }
};
  





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
export const getWaitingOrders = async (req, res) => {/////////////////////////
  const userId = req.user._id;
  try {
    const orders = await Orders.find({
      orderBuilder: userId,
      unDeployed: false,
      orderStatus: "waiting"
    }).populate({
      path: 'orderBuilder',
      select: 'username email' 
    })
    .exec();
  
    return res.status(200).json(orders);
  } catch (error) {
    console.log("error in getAllOrders", { error });
    res.status(500).json({ msg: error.message });
  }
};
export const getWaitingOrdersforMaker = async (req, res) => {
  const userId = req.user._id;
  try {
    const orders = await Orders.find({
      orderHoldedBy: userId,
      unDeployed: false,
      orderStatus: "waiting"
    }).populate({
      path: 'orderBuilder',
      select: 'username email' 
    })
    .exec();
  
    return res.status(200).json(orders);
  } catch (error) {
    console.log("error in getAllOrders", { error });
    res.status(500).json({ msg: error.message });
  }
};

export const getUnDeployedOrders = async (req, res) => {/////////////////////////
  const userId = req.user._id;
  try {
    const orders = await Orders.find({
      orderBuilder: userId,
      unDeployed: true,
      orderStatus: "newcreated"
    }).populate({
      path: 'orderBuilder',
      select: 'username email'
    })
    ;
  
    return res.status(200).json(orders);
  } catch (error) {
    console.log("error in getAllOrders", { error });
    res.status(500).json({ msg: error.message });
  }
};

export const getconnectionsFordeployOrders  = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ msg: "Unauthorized access" });
    }

    // Fetch user and populate connections
    const user = await User.findById(userId)
      .select("profile.connections")
      .populate({
        path: "profile.connections",
        select: "username email profile.pic profile.role",
      });

    if (!user || !user.profile || !user.profile.connections) {
      return res.status(404).json({ msg: "No connections found for this user." });
    }

    // Filter connections to only include those with role "homemaker"
    const homemakerConnections = user.profile.connections.filter(
      (connection) => connection.profile.role === "homemaker"
    );

    if (homemakerConnections.length === 0) {
      return res.status(404).json({ msg: "No homemaker connections found." });
    }

    return res.status(200).json(homemakerConnections);
  } catch (error) {
    console.error("Error in getConnectionsForDeployOrders:", error);
    res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
};


export const getDeployedOrders = async (req, res) => {//////////////////////////
  const userId = req.user._id;
  try {
    const orders = await Orders.find({
      orderBuilder: userId,
      unDeployed: false,
      orderStatus: "accepted"
    }).populate({
      path: 'orderBuilder',
      select: 'username email'
    }).populate({
      path: 'orderHoldedBy',
      select: 'username email'
    });
    // console.log(orders);
    
    res.status(200).json(orders);
  } catch (error) {
    console.log("error in getAllOrders", { error });
    res.status(500).json({ msg: error.message });
  }
};
export const getDeployedOrdersForMaker = async (req, res) => {//////////////////////////
  const userId = req.user._id;
  console.log("enter");
  
  try {
    const orders = await Orders.find({
      orderHoldedBy: userId,
      unDeployed: false,
      orderStatus: "accepted"
    }).populate({
      path: 'orderBuilder',
      select: 'username email'
    }).populate({
      path: 'orderHoldedBy',
      select: 'username email'
    });
    // console.log(orders);
    
    res.status(200).json(orders);
  } catch (error) {
    console.log("error in getAllOrders", { error });
    res.status(500).json({ msg: error.message });
  }
};

export const getOrder = async (req, res) => {///////////
  try {
    const { id } = req.params;
    const order = await Orders.findById(id);
    res.status(200).json(order);
  } catch (error) {
    console.log("error in getOrder", { error });
    res.status(500).json({ msg: error.message });
  }
};
export const deleteFromCreation = async (req,res)=>{
  try {
    const { id } = req.params;
    
    const order = await Orders.findByIdAndDelete(id);
    res.status(200).json(order);
  } catch (error) {
    console.log("error in deleteFromCreation", { error });
    res.status(500).json({ msg: error.message });
  }
}
export const deleteOrder = async (req, res) => {////////////////////
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



export const deployOrder = async (req, res) => {
  try {
    const { personId, orderId } = req.body;

    if (!personId || !orderId) {
      return res.status(400).json({ msg: "Fill all required data" });
    }

    const order = await Orders.findById(orderId);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    
    const userId = req.user._id;

    const person = await User.findById(personId);
    if (!person) {
      return res.status(404).json({ msg: "Person not found" });
    }

    const updatedOrder = await Orders.findByIdAndUpdate(
      orderId,
      {
        orderHoldedBy: personId,
        unDeployed: false,
        orderStatus: "waiting"
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(500).json({ msg: "Failed to update order" });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { undOrders: orderId },
      $push: { orders: orderId },
    });
    await User.findByIdAndUpdate(personId, {
      $push: { undOrders: orderId },
    });
    const notification = new Notification({
      sender: userId,
      recipient: personId,
      description: `You have been assigned to a new order.`,
      type: "Orders",
      relatedPost: orderId,
    });

    await notification.save();

    await User.findByIdAndUpdate(personId, {
      $push: { "profile.notifications": notification._id },
    }, { new: true });
    console.log("all good");
    
    res.status(200).json({ msg: "Order deployed successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error in deployOrder:", error);
    res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
};
