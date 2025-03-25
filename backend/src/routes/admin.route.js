import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import { getReports,banUser,getBanned,getAllUses } from '../controler/adminControler.js';
const router = express.Router();
router.get('/getReports', protectRoute, getReports);
router.post('/banUser/:userId', protectRoute,banUser);
router.get('/getBanned', protectRoute, getBanned);
router.get('/getAllUses',protectRoute,getAllUses);
// router.put('/bannImediate/:id',protectRoute,bannImediate);
// router.put('/doReport/:userId', protectRoute,doReport);

export default router;