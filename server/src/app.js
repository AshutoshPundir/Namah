import express from "express"
const app = express();

app.use(express.json())
console.log("done")

import authRoute from './routes/auth.routes.js'
import userRoute from './routes/user.routes.js'
import friendRequestRoute from './routes/friend.route.js'
import conversationRoute from './routes/conversation.route.js'
import messageRoute from './routes/message.route.js'

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/friends',friendRequestRoute)
app.use('/api/conversation',conversationRoute)
app.use('/api/message',messageRoute)

export default app