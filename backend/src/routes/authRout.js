import { login, about } from "../controler/authControlers.js";
import express from 'express';

const router = express.Router();
router.get('/',about);
router.post('/login', login);

export default router;