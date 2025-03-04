import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import { createMessage, deleteMessage,updateMessage,getMessages,getSideBarUsers } from '../controler/messagesControlers.js';
const router = express.Router();
router.post('/createMessage/:id',protectRoute,createMessage);
router.get('/getMessages/:id',protectRoute,getMessages);
router.delete('/deleteMessage/:id',protectRoute,deleteMessage);
router.put('/updateMessage/:id',protectRoute,updateMessage);
router.get('/getSideBarUsers',protectRoute,getSideBarUsers);
export default router;
