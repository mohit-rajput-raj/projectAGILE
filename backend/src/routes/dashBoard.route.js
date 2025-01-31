import express from 'express';
import { dashboard, logout, updateProfile } from '../controler/dashboardControler.js';
import { protectRoute } from '../middleware/auth.js';
const router = express.Router();

import { messages } from '../controler/messagesControlers.js';
import { checkAuth } from '../controler/authControlers.js';
router.get('/', dashboard);
router.get('/logout', logout);
router.put('/updateProfile', protectRoute, updateProfile);
router.get('/messages',messages);
router.get('/auth',protectRoute,checkAuth);
export default router;
