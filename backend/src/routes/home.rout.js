import express from "express";
import {searchPerson } from "../controler/homeControler.js";
import { protectRoute } from "../middleware/auth.js";
const router = express.Router();
router.get("/searchperson", searchPerson);
// router.get("/searchperson", searchPerson);
export default router;