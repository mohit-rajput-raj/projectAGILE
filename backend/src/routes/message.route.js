import express from 'express';
import { protectRoute } from '../middleware/auth.js';
// import { getMessages, createMessage, deleteMessage } from '../controllers/messagesControlers.js';
const router = express.Router();

// router.get('/', protectRoute, getMessages);
// router.delete('/:id', protectRoute, deleteMessage);
// router.post('/send/:id', protectRoute, createMessage);
export default router;
