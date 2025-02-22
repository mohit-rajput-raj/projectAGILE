import express from 'express';
// import { dashboard, logout, updateProfile } from '../controler/dashboardControler.js';
// import { protectRoute } from '../middleware/auth.js';
// import { messages } from '../controler/messagesControlers.js';
// import { checkAuth } from '../controler/authControlers.js';
import { Posts,getNames } from '../controler/dashboardControler.js';
import { follow } from '../controler/connect.js';
import { protectRoute } from "../middleware/auth.js";
const router = express.Router();

router.post('/createPost',protectRoute,Posts);
router.post('/follow/:id',protectRoute,follow);
// router.put('/profile', protectRoute, updateProfile);
// router.get('/messages', protectRoute, messages);
// router.get('/auth', protectRoute, checkAuth);
// router.get('/logout', logout);
router.get('/getNames',getNames);

export default router;
