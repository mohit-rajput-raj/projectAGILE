import express from 'express';
const router = express.Router();
import { getuserProfile,hi } from '../controler/usersControlers.js';
import { protectRoute } from '../middleware/auth.js';

router.get('/getUserProfile/:username',protectRoute,getuserProfile);
router.get('/hi',protectRoute,hi);
export default router;