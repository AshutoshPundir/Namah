import express from 'express'
const router = express.Router();

import { login, register } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

router.post('/register',register);

router.post('/login',login)

export default router