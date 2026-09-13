import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js';
import { allUsers, getProfile } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/profile',authMiddleware,getProfile)

router.get('/',authMiddleware,allUsers)

export default router