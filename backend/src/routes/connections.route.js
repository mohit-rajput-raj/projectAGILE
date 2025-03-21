import express from "express";
const router = express.Router();
import { protectRoute } from "../middleware/auth.js";
import {
  acceptConnectionRequest,
  toggleConnectionRequest,
  checkIfFollowing,
  
  toggleFollow,
  rejectConnectionRequest,
  getConnectionRequests,
  getUserConnections,
  getConnectionStatus,
  removeConnection,
 isRequestPending,
 isInConnections

} from "../controler/connect.js";
router.post("/toggleConnectionRequest/:userId", protectRoute, toggleConnectionRequest);
router.get("/getConnectionRequests", protectRoute, getConnectionRequests);
router.get("/getUserConnections", protectRoute, getUserConnections);
router.get("/getConnectionStatus/:userId", protectRoute, getConnectionStatus);
router.delete("/removeConnection/:userId", protectRoute, removeConnection);
router.post("/accept/:requestId", protectRoute, acceptConnectionRequest);
router.post("/reject/:requestId", protectRoute, rejectConnectionRequest);
router.post("/toggleFollow/:userId", protectRoute, toggleFollow);
router.get("/amIFollowing/:userId", protectRoute,checkIfFollowing);
router.get("/isRequestPending/:userId", protectRoute,isRequestPending);
router.get("/isInConnections/:userId", protectRoute,isInConnections);
// isInConnections

export default router;