import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getConversations } from "../controllers/conversation.controller.js";
const router = express.Router();

router.get('/',authMiddleware,getConversations);

export default router;