import express from 'express'
const router = express.Router();

import { getCurrentUser, login, logout, register } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

router.post('/register',upload.single("avatar") ,register);

router.post('/login',login)

router.get('/me',authMiddleware, getCurrentUser)

router.post('/logout',logout)

export default router