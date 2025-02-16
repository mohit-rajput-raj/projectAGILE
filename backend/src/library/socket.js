import { Server } from "socket.io";
import express from "express";
import http from "http";
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:['https://Localhost:5173']
    }
})
io.on('connection',(socket)=>{
    console.log(socket.id);
    
    socket.emit('message','hello')
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    })
})

export { io, app, server };

