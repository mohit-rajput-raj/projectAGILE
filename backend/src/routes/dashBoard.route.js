import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
  getAllItems,
  getItem,
  deleteItem,
  updateItem,
  createItem,
  setRating,
} from "../controler/itemsControler.js";
import {
  getUnDeployedOrders,
  addHistory,
  deleteHistory,
  getHistory,
  getOrder,
  AddToDo,
  getWaitingOrdersforMaker,
  getDeployedOrdersForMaker,
  getDeployedOrders,
  makeAccept,
  makeReject,
  deleteFromCreation,
  createOrder,
  deleteAsk,
  getconnectionsFordeployOrders,
  deployOrder,
  getWaitingOrders,
  setDelivered
} from "../controler/ordersControlers.js";
import { getSaved, toggleFavroute } from "../controler/favroutes.js";
// import {getHistory,addHistory} from '../controler/history.js';
const router = express.Router();
router.get("/getAllItems", protectRoute, getAllItems);
router.get("/getItem/:id", protectRoute, getItem);
router.delete("/deleteItem/:id", protectRoute, deleteItem);
router.put("/updateItem/:id", protectRoute, updateItem);
router.post("/createItem", protectRoute, createItem);
router.put("/setRating/:id", protectRoute, setRating);

router.get("/getdeployed", protectRoute, getDeployedOrders);
router.get("/getundeployed", protectRoute, getUnDeployedOrders);
router.get("/getconnections", protectRoute, getconnectionsFordeployOrders);
router.post("/createOrder", protectRoute, createOrder);
router.post("/deployOrder2", protectRoute, deployOrder);

router.get("/getwaiting", protectRoute, getWaitingOrders);
router.put("/deleteAsk/:id", protectRoute, deleteAsk);
router.put("/deleteFromCreation/:id", protectRoute, deleteFromCreation);

router.post("/makeAccept", protectRoute, makeAccept);
router.post("/makeReject/:id", protectRoute, makeReject);
/////////////////////////////////////////////////////////////////////////////////////////////////

router.get(
  "/getDeployedOrdersForMaker",
  protectRoute,
  getDeployedOrdersForMaker
);
router.get("/getWaitingOrdersforMaker", protectRoute, getWaitingOrdersforMaker);

router.put("/AddToDo/:id", protectRoute, AddToDo);
router.get("/getOrder/:id", protectRoute, getOrder);
router.get("/getSaved", protectRoute, getSaved);
router.post("/toggleFavroute", protectRoute, toggleFavroute);

router.get("/getHistory", protectRoute, getHistory);
router.post("/addHistory/:id", protectRoute, addHistory);
router.post("/deleteHistory/:id",protectRoute,deleteHistory);

router.post("/setDelivered/:id", protectRoute, setDelivered);
export default router;
