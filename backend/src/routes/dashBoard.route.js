import express from 'express';
// import { dashboard, logout, updateProfile } from '../controler/dashboardControler.js';
// import { protectRoute } from '../middleware/auth.js';
// import { messages } from '../controler/messagesControlers.js';
// import { checkAuth } from '../controler/authControlers.js';
import { Posts } from '../controler/dashboardControler.js';
const router = express.Router();

router.post('/createPost',Posts);
// router.put('/profile', protectRoute, updateProfile);
// router.get('/messages', protectRoute, messages);
// router.get('/auth', protectRoute, checkAuth);
// router.get('/logout', logout);

export default router;
