import { Orders } from "../models/ordersModel.js";
import { User } from "../models/userModel.js";
import { Item } from "../models/itemsModel.js";
import { Notification } from "../models/notificationModel.js";
import { populate } from "dotenv";
import {Hist} from '../models/historycardModel.js'

export const setDelivered= async (req, res) => {
  try {
    console.log("setDelivered");
    
    const id = req.params.id;
    const order = await Orders.findByIdAndUpdate(id, { orderStatus: "delivered" }, { new: true });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const history = new Hist({
      caption: order.caption,
      description: "order delivered on its destination",
      orderId: order.orderId,
      orderStatus: order.orderStatus,
      orderPaid: order.orderPaid
    });
    await history.save();
    const user= await User.findByIdAndUpdate(
      req.user._id,
      { $push: { "profile.history": history._id } },
      { new: true } 
    ); 

    // await order.save();
    return res.status(200).json({ message: "Order marked as delivered" });
  } catch (error) {
    console.error("Error in setDelivered:", error);
    res.status(500).json({ message: "Server error, please try again later." });
    
  }
  
}

export const getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("profile.history")
      .populate({
        path: 'profile.history',
        model: 'Order' 
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.profile || !user.profile.history) {
      return res.status(200).json({ history: [] });
    }

    res.status(200).json(user.profile.history);
  } catch (error) {
    console.error("Error in getHistory:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};




export const addHistory = async (req, res) => {
  try {
    const order = await Orders.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { "profile.history": order._id } },
      { new: true } 
    ); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "History added successfully"});

  } catch (error) {
    console.error("Error in addHistory:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
export const deleteHistory = async (req, res) => {
  try {
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { "profile.history": req.params.id } }, 
      { new: true }
    );
    const hist= await Hist.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "History deleted successfully", history: user.profile?.history || [] });

  } catch (error) {
    console.error("Error in deleteHistory:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};



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
    // const history = await Hist

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.log("error in deleteAsk", error);
    res.status(500).json({ msg: error.message });
  }
};
export const makeReject = async (req, res) => {
  const notiId = req.params.id;
  let updatedOrder;

  try {
    // Find and update the notification
    const notification = await Notification.findById(notiId);
    if (!notification) {
      return res.status(404).json({ msg: "Notification not found" });
    }

    notification.rejected = true;
    await notification.save();

    if (notification.type === "Orders") {
      const order = await Orders.findById(notification.relatedPost);
      if (!order) {
        return res.status(404).json({ msg: "Order not found" });
      }

      updatedOrder = await Orders.findByIdAndUpdate(
        order._id,
        {
          orderHoldedBy: null,
          unDeployed: true,
          orderStatus: "newcreated"
        },
        { new: true }
      );
      const history = new Hist({
        caption: order.caption,
        description: "order rejected by builder",
        orderId: order.orderId,
        orderStatus: order.orderStatus,
        orderPaid: order.orderPaid
      });
      await history.save();
      const user= await User.findByIdAndUpdate(
        req.user._id,
        { $push: { "profile.history": history._id } },
        { new: true } 
      ); 


      return res.status(200).json(updatedOrder);
    }

    return res.status(200).json({ msg: "Notification rejected successfully" });
  } catch (error) {
    console.log("Error in makeReject", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const makeAccept = async (req, res) => {
  const noti = req.body.data;
  let updatedOrder;
  try {
    const newN = await Notification.findByIdAndUpdate(noti._id, { accepted: true });
    if(noti.type==="Orders"){
      const order = await Orders.findById(noti.relatedPost);
       updatedOrder = await Orders.findByIdAndUpdate(
        order._id, 
        { 
          orderHoldedBy: req.user._id,
          unDeployed: false,
          orderStatus: "pending"///////////////////////done
        },
        { new: true }
      );
      const history = await Hist.create({
        caption: order.caption,
        description: "order accepted by builder",
        orderId: order.orderId,
        orderStatus: order.orderStatus,
        orderPaid: order.orderPaid
      });
      await history.save();
      const user= await User.findByIdAndUpdate(
        req.user._id,
        { $push: { "profile.history": history._id } },
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

    const items = await Item.find({ parentId: orderId });
    if (!items || items.length === 0) {
      return res.status(400).json({ msg: "No items found for this order" });
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
      orderItems: items.map(item => item._id),
    });
    await newOrder.save();
    const history  = await Hist.create({
      caption: newOrder.caption,
      description: "new order created",
      orderId: newOrder.orderId,
      orderStatus: newOrder.orderStatus,
      orderPaid: newOrder.orderPaid
    });
    await history.save();
    const user= await User.findByIdAndUpdate(
      req.user._id,
      { $push: { "profile.history": history._id } },
      { new: true } 
    ); 
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
function sdf(){
  console.log("antimatter");
  
}
export const getWaitingOrdersforMaker = async (req, res) => {
  const userId = req.user._id;
  sdf();
  try {
    const orders = await Orders.find({
      orderHoldedBy: userId,
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

    const user = await User.findById(userId)
      .select("profile.connections")
      .populate({
        path: "profile.connections",
        select: "username email profile.pic profile.role",
      });

    if (!user || !user.profile || !user.profile.connections) {
      return res.status(404).json({ msg: "No connections found for this user." });
    }

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
  sdf();
  try {
    const orders = await Orders.find({
      orderBuilder: userId,
      unDeployed: false,
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
export const AddToDo = async (req, res) => {//////////////////////////
  
  console.log("enter totdo");
  
  try {
    const order = await Orders.findByIdAndUpdate(req.params.id,{
      orderStatus: "running"
    });
    
    await order.save();
    await User.findByIdAndUpdate(
      order.orderBuilder,
      { $push: { "profile.history": order._id } },
      { new: true } 
    ); 
    res.status(200).json(order);
  } catch (error) {
    console.log("error in AddToDo", { error });
    res.status(500).json({ msg: error.message });
  }
};

export const getDeployedOrdersForMaker = async (req, res) => {//////////////////////////
  const userId = req.user._id;
  console.log(userId);
  
  console.log(Date.now());
  
  try {
    const orders = await Orders.find({
      orderHoldedBy: userId.toString(),
      unDeployed: false,
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

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ msg: "Order ID is required" });
    }

    console.log(`Fetching order with ID: ${id}`);

    const order = await Orders.findOne({ orderId: id })
      .populate('orderBuilder', 'username email')
      .populate('orderHoldedBy', 'username email')
      .populate({
        path: 'orderItems',
        model: 'Item',
        select: 'name description price quantity type image id'
      });

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error in getOrder:", error);
    res.status(500).json({ msg: "Internal Server Error", error: error.message });
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
    const history = await Hist.create({
      caption: order.caption,
      description: "order deleted",
      orderId: order.orderId,
      orderStatus: order.orderStatus,
      orderPaid: order.orderPaid
    });
    await history.save();
    const user= await User.findByIdAndUpdate(
      req.user._id,
      { $push: { "profile.history": history._id } },
      { new: true } 
    ); 
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
    await User.findByIdAndUpdate(
      order.orderBuilder,
      { $push: { "profile.history": order._id } },
      { new: true } 
    ); 
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
    const myId = await User.findById(userId);
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
    console.log(userId);
    
    const notification = await Notification.create({
      sender: userId,
      recipient: personId,
      description: `${myId.username} has been assigned you to a new order.`,
      type: "Orders",
      relatedPost: orderId,
    });

    await User.findByIdAndUpdate(personId, {
      $push: { "profile.notifications": notification._id },
    }, { new: true });
    console.log("all good");
    const history = new HistoryCard({

    })
    await User.findByIdAndUpdate(
      order.orderBuilder,
      { $push: { "profile.history": order._id } },
      { new: true } 
    ); 
    
    res.status(200).json({ msg: "Order deployed successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error in deployOrder:", error);
    res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
};
