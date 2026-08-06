import express from 'express'
import { acceptFriendRequest, cancelFriendRequest, getPendingRequests, rejectFriendRequest, sendFriendRequest, getAllFriends } from '../controllers/friend.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/request',authMiddleware ,sendFriendRequest);
router.get('/request',authMiddleware ,getPendingRequests);
router.patch('/accept/:requestId',authMiddleware ,acceptFriendRequest);
router.patch('/reject/:requestId',authMiddleware ,rejectFriendRequest);
router.patch('/cancel/:requestId',authMiddleware ,cancelFriendRequest);
router.get('/allFriends',authMiddleware ,getAllFriends)
export default router