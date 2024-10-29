import express from 'express';
import UserRouter from './Router/userrouter.js';
import mongodbconnection from './config/mongodb.js';

const server=express();

server.use('/user',UserRouter)
server.listen(3200,()=>{
    console.log("server is running")
    mongodbconnection();
});