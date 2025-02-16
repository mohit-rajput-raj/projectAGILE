import { login, about,register, logout, sendPasswordResetOTP, verifyOTPAndResetPassword } from "../controler/authControlers.js";
import express from 'express';
import { protectRoute } from "../middleware/auth.js";
import { checkAuth } from "../controler/authControlers.js";
// import { protectRoute } from "../middleware/auth.js";
const router = express.Router();
router.get('/',about);
router.post('/login', login);
router.post('/register', register);
router.get('/authCheck',protectRoute,checkAuth);
router.get('/logout',logout);
// router.put('/settings', protectRoute, settings);


router.post('/forgot-password', sendPasswordResetOTP);
router.post('/reset-password', verifyOTPAndResetPassword);

export default router;