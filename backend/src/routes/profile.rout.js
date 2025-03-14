import express from 'express';
import {profile} from '../controler/profileControler.js';
const router = express.Router();

router.get('/',profile);
export default router;