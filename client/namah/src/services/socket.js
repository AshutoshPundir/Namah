import { io } from 'socket.io-client';

let socket = null

export const connectSocket = () => {

    if(socket !== null){
        console.log("Socket already available in the browser");
        return socket;
    }

    socket = io("http://localhost:3000",
    {
        withCredentials: true
    }
    )

    socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
    console.log("Socket disconnected");
    });
    
console.log("socket created again")
return socket
}

export const disconnectSocket = () => {

    if(socket === null){
        return
    }
    socket.disconnect();

    return socket = null;
}

export const getSocket = () => {
    return socket;
}


