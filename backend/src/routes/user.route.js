import express from 'express';
const router = express.Router();
import { getuserProfile,hi,sendConnectionRequest ,acceptConnectionRequest} from '../controler/usersControlers.js';
import { protectRoute } from '../middleware/auth.js';

router.get('/getUserProfile/:username',protectRoute,getuserProfile);
router.post('/connect/:userId',protectRoute,sendConnectionRequest);
router.put('/accept/:userId',protectRoute,acceptConnectionRequest);
router.get('/hi',protectRoute,hi);
export default router;