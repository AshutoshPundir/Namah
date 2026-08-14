import './config/env.js'
import { connectDB } from './config/db.js';
await connectDB();
import app from "./app.js";
import http from 'http';
import { initializeSocket } from './config/socket.js';

const server = http.createServer(app);

initializeSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})



