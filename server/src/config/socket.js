import { Server } from 'socket.io';
import { verifyToken } from '../utils/jwt.js';

export const onlineUser = new Map();
export let io;

export const initializeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET","POST"],
            credentials: true
        }
    })
    
    // authenticate user in socket.IO
    
    io.use((socket, next)=> {
        try{
            const cookieHeader = socket.handshake.headers.cookie;
    
            if(!cookieHeader){
                return next(new Error("Authentication required"))
            }
    
            const token = cookieHeader
                .split("; ")
                .find( cookie => cookie.startsWith("token="))
                ?.split("=")[1]
    
            if(!token){
                return next(new Error("Token not found"))
            }
    
            const decoded = verifyToken(token);
    
            socket.userId = decoded.userId;
    
            console.log("socket userId" + socket.userId)
    
            next();
        }catch(error){
            next(new Error("Authentication failed: " + error))
        }
    })
    
    
    // websocket logic
    
    
    io.on("connection",(socket)=>{
    
        onlineUser.set(socket.userId, socket.id)
    
        console.log("New Connection: ", socket.id);
    
        console.log("online user: ",onlineUser);
    
        socket.on("disconnect", ()=>{
            console.log("User Disconnected: ", socket.id)
            
            onlineUser.delete(socket.userId)
            
            console.log("online User: ", onlineUser );
        })
    
    
    })

    return io
    
}
