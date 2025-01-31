import { login, about,register } from "../controler/authControlers.js";
import express from 'express';
// import { protectRoute } from "../middleware/auth.js";
const router = express.Router();
router.get('/',about);
router.post('/login', login);
router.post('/register', register);

// router.put('/settings', protectRoute, settings);



export default router;