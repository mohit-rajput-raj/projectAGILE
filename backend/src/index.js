import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
// const app = express();
import {app,io,server} from "./library/socket.js";
import authRoute from "./routes/auth.rout.js";
import dashRoute from "./routes/dashBoard.route.js";
import messageRoute from "./routes/message.route.js";

dotenv.config();
const Port = process.env.PORT || 3000;
import {connectDB} from "./library/db.js";

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    
}));

connectDB();    

app.get('/',(req,res)=>{
    res.send('Hello World bhai saab');
})

app.use("/api/auth", authRoute);
// app.use("/api/dashboard", dashRoute);
app.use("/api/messages", messageRoute);

server.listen(Port, () => {
    console.log('Server is running on port 3000');
});
