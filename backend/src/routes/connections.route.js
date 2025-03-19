import express from "express";
const router = express.Router();
import { protectRoute } from "../middleware/auth.js";
import {
  acceptConnectionRequest,
  sendConnectionRequest,
amIFollowing,
  
  toggleFollow,
  rejectConnectionRequest,
  getConnectionRequests,
  getUserConnections,
  getConnectionStatus,
  removeConnection,
} from "../controler/connect.js";
router.post("/sendConnectionRequest/:userId", protectRoute, sendConnectionRequest);
router.get("/getConnectionRequests", protectRoute, getConnectionRequests);
router.get("/getUserConnections", protectRoute, getUserConnections);
router.get("/getConnectionStatus/:userId", protectRoute, getConnectionStatus);
router.delete("/removeConnection/:userId", protectRoute, removeConnection);
router.post("/accept/:requestId", protectRoute, acceptConnectionRequest);
router.post("/reject/:requestId", protectRoute, rejectConnectionRequest);
router.post("/toggleFollow/:userId", protectRoute, toggleFollow);
router.get("/amIFollowing/:userId", protectRoute, amIFollowing);
export default router;