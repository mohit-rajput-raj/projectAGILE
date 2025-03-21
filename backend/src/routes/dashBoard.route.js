import express from 'express';
import { protectRoute } from "../middleware/auth.js";
import { getAllItems, getItem, deleteItem, updateItem, createItem, setRating } from '../controler/itemsControler.js';
import {getUnDeployedOrders,getDeployedOrdersForMaker,getDeployedOrders,makeAccept,makeReject,deleteFromCreation,createOrder,deleteAsk,getconnectionsFordeployOrders,deployOrder ,getWaitingOrders} from '../controler/ordersControlers.js';
const router = express.Router();
router.get('/getAllItems',protectRoute,getAllItems);
router.get('/getItem/:id',protectRoute,getItem);
router.delete('/deleteItem/:id',protectRoute,deleteItem);
router.put('/updateItem/:id',protectRoute,updateItem);
router.post('/createItem',protectRoute,createItem);
router.put('/setRating/:id',protectRoute,setRating);

router.get('/getdeployed',protectRoute,getDeployedOrders);
router.get('/getundeployed',protectRoute,getUnDeployedOrders);
router.get('/getconnections',protectRoute,getconnectionsFordeployOrders );
router.post('/createOrder',protectRoute,createOrder);
router.post('/deployOrder2',protectRoute,deployOrder);


router.get('/getwaiting',protectRoute,getWaitingOrders);
router.put('/deleteAsk/:id',protectRoute,deleteAsk);
router.put('/deleteFromCreation/:id',protectRoute,deleteFromCreation);

router.post('/makeAccept',protectRoute,makeAccept);
router.post('/makeReject',protectRoute,makeReject);
/////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/getDeployedOrdersForMaker',protectRoute,getDeployedOrdersForMaker);
getDeployedOrdersForMaker
export default router;