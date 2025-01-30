import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
// import { Socket } from 'socket.io';
// import http from 'http';
import {authRoute, messageRoute} from '../routes/authRout.js';
dotenv.config();
const port = 3000;
const Port = process.env.PORT || 3000;
const app = express();

app.use(cors(
    {
        origin: 'http://localhost:5173/',
        credentials: true,
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);

app.use("/api/messages", messageRoute);





app.listen(Port, () => {
    console.log('Server is running on port 3000');
});




