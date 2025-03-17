import express from 'express';
import { protectRoute } from "../middleware/auth.js";
import { getAllItems, getItem, deleteItem, updateItem, createItem, setRating } from '../controler/itemsControler.js';
import {getUnDeployedOrders,getDeployedOrders,createOrder,getconnections} from '../controler/ordersControlers.js';
const router = express.Router();
router.get('/getAllItems',protectRoute,getAllItems);
router.get('/getItem/:id',protectRoute,getItem);
router.delete('/deleteItem/:id',protectRoute,deleteItem);
router.put('/updateItem/:id',protectRoute,updateItem);
router.post('/createItem',protectRoute,createItem);
router.put('/setRating/:id',protectRoute,setRating);

router.get('/getdeployed',protectRoute,getDeployedOrders);
router.get('/getundeployed',protectRoute,getUnDeployedOrders);
router.get('/getconnections',protectRoute,getconnections);
router.post('/createOrder',protectRoute,createOrder);
export default router;