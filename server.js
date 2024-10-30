import express from 'express';
import UserRouter from './Router/userrouter.js';
import mongodbconnection from './config/mongodb.js';
import dotenv from 'dotenv';
dotenv.config();
const server=express();
server.use(express.json());  
server.use('/user',UserRouter)
server.listen(3202,()=>{
    console.log("server is running")
    mongodbconnection();
});