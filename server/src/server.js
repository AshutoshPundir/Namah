import './config/env.js'
import { connectDB } from './config/db.js';
await connectDB();
import http from 'http';
import { Server } from 'socket.io';
import app from "./app.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET","POST"]
    }
})

// websocket logic

const onlineUser = new Map();

io.on("connection",(socket)=>{
    console.log("New Connection: ", socket.id);

    const userId = socket.handshake.query.userId;

    if(userId){
        onlineUser[userId] = socket.id
    };

    console.log(onlineUser);

    socket.on("disconnect", ()=>{
        console.log("User Disconnected: ", socket.id)
    })

    delete onlineUser[userId];

    console.log((onlineUser));

})

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

export {io};

