import { Notification } from "../models/notificationModel.js";
import { User } from "../models/userModel.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error in getNotifications controller:", error);
    res.status(500).json({ msg: "Failed to load notifications." });
  }
};

export const getUnreadNotificationsCount = async (req, res) => {
    try {
      const notifications = await Notification.find(
        { recipient: req.user._id, read: false },
        "type"
      );
  
      const counts = notifications.reduce((acc, { type }) => {
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});
  
      res.status(200).json({
        total: notifications.length||0,
        Like: counts["Like"] || 0,
        Comment: counts["Comment"] || 0,
        Connection: counts["Connection"] || 0,
        Jobs: counts["Jobs"] || 0,
        Orders: counts["Orders"] || 0,
        Follow: counts["Follow"] || 0,
      });
    } catch (error) {
      console.error("Error in getUnreadNotifications controller:", error);
      res.status(500).json({ msg: "Failed to load unread notifications." });
    }
  };
  
export const getJobNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
      type: "Jobs",
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error in getJobNotifications controller:", error);
    res.status(500).json({ msg: "Failed to load job notifications." });
  }
};
export const getLikeNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
      type: "Like",
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error in getLikeNotifications controller:", error);
    res.status(500).json({ msg: "Failed to load like notifications." });
  }
};
export const getFollowNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
      type: "Follow",
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error in getFollowNotifications controller:", error);
    res.status(500).json({ msg: "Failed to load follow notifications." });
  }
};
export const makeUnRead = async (req, res) => {
    const type = req.params.type;
  
    try {
      const updatedNotifications = await Notification.updateMany(
        { recipient: req.user._id, type: type },
        { $set: { read: true } }
      );
  
      res.status(200).json({
        msg: "Notifications marked as unread successfully",
        updatedCount: updatedNotifications.modifiedCount,
      });
    } catch (error) {
      console.error("Error in makeUnRead:", error);
      res.status(500).json({ msg: "Failed to mark notifications as unread." });
    }
  };
  
export const getNewCommentNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
      type: "Comment",
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error in getNewCommentNotifications controller:", error);
    res.status(500).json({ msg: "Failed to load new comment notifications." });
  }
};
export const orderNotification =async(req,res)=>{
    try {
        const notifications = await Notification.find({
          recipient: req.user._id,
          type: "Orders",
        });
        res.status(200).json(notifications);
      } catch (error) {
        console.error("Error in getNewConnectionNotifications controller:", error);
        res
          .status(500)
          .json({ msg: "Failed to load new connection notifications." });
      }
};



export const getNewConnectionNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
      type: "Connection",
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error in getNewConnectionNotifications controller:", error);
    res
      .status(500)
      .json({ msg: "Failed to load new connection notifications." });
  }
};
