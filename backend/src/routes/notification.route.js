import express from "express";
import { protectRoute } from "../middleware/auth.js";
// import { getNotifications } from "../controler/notificationControler.js";
import {
  getNotifications,
  getUnreadNotificationsCount,
  getJobNotifications,
  getLikeNotifications,
  getFollowNotifications,
  getNewCommentNotifications,
  getNewConnectionNotifications,
  orderNotification,
  makeUnRead,
} from "../controler/notificationControler.js";
const router = express.Router();
router.get("/getNotifications", protectRoute, getNotifications);////////////
router.get(
  "/getUnreadNotificationsCount",/////////
  protectRoute,
  getUnreadNotificationsCount
);
router.put("/unread/:type",protectRoute,makeUnRead);
router.get("/getJobNotifications", protectRoute, getJobNotifications);//////////
router.get("/getLikeNotifications", protectRoute, getLikeNotifications);//////////
router.get("/getFollowNotifications", protectRoute, getFollowNotifications);////////////
router.get(
  "/getCommentNotifications",
  protectRoute,
  getNewCommentNotifications////////////////
);
router.get(
  "/getConnectionNotifications",
  protectRoute,
  getNewConnectionNotifications//////////////
);
router.get(
  "/getOrderNotification",////////
  protectRoute,
  orderNotification
);

export default router;
