import { Server } from "socket.io";
import express from "express";
import http from "http";
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:['http://localhost:5173'],
        credentials:true,
    }
})
const userSocketIds = {};
io.on('connection',(socket)=>{
    console.log(socket.id);
    const userId = socket.handshake.query.userId;
    if(userId) userSocketIds[userId] = socket.id;
    io.emit('onlineUsers',Object.keys(userSocketIds));
    socket.emit('message','hello')
    socket.on('disconnect',()=>{
        console.log('user disconnected');
        delete userSocketIds[userId];
        io.emit('onlineUsers',Object.keys(userSocketIds));
    })
})

export { io, app, server };

