import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getConversations, startConversation } from "../controllers/conversation.controller.js";
const router = express.Router();

router.get('/',authMiddleware,getConversations);
router.post('/start', authMiddleware, startConversation)

export default router;