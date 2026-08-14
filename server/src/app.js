import express from "express";
import cors from 'cors';
import cookieParse from "cookie-parser";

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParse())


console.log("done")

import authRoute from './routes/auth.routes.js'
import userRoute from './routes/user.routes.js'
import friendRequestRoute from './routes/friend.route.js'
import conversationRoute from './routes/conversation.route.js'
import messageRoute from './routes/message.route.js'

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/friends',friendRequestRoute)
app.use('/api/conversations',conversationRoute)
app.use('/api/message',messageRoute)

export default app