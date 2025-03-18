import { login, about,register,updatePfp, logout, sendPasswordResetOTP, verifyOTPAndResetPassword } from "../controler/authControlers.js";
import express from 'express';
import { protectRoute } from "../middleware/auth.js";
import { checkAuth } from "../controler/authControlers.js";
const router = express.Router();
router.get('/',about);
router.post('/login', login);
router.post('/register', register);
router.get('/authCheck',protectRoute,checkAuth);
router.get('/logout',logout);


router.post('/sendotp', sendPasswordResetOTP);
router.post('/verifotp', verifyOTPAndResetPassword);
router.post('/updateprofile',protectRoute, updatePfp);

export default router;