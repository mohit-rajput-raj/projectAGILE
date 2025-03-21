import { Server } from "socket.io";
import express from "express";
import http from "http";
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:['http://localhost:5173'],
        // credentials:true,
    }
})
export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
  }
  const userSocketMap = {};
// io.on('connection',(socket)=>{
//     console.log(socket.id);
//     const userId = socket.handshake.query.userId;
//     if(userId) userSocketIds[userId] = socket.id;
//     io.emit('onlineUsers',Object.keys(userSocketIds));
//     socket.emit('message','hello')
//     socket.on('disconnect',()=>{
//         console.log('user disconnected');
//         delete userSocketIds[userId];
//         io.emit('onlineUsers',Object.keys(userSocketIds));
//     })
// })
io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
  
    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;
  
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  
    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

export { io, app, server };

