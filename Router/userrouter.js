import express from 'express'
import { Router } from 'express'
import Usercontroller from '../Controller/controller.js';
import hashPassword from '../middlewares/passwordhash.js';
import checkemail from '../middlewares/checkemail.js'
import { jsonAuthentication_Authorization } from '../middlewares/JwtAuthentication_Authorization.js';
const UserRouter=express.Router();
const Usercontrol=new Usercontroller();
UserRouter.post('/create',checkemail,hashPassword,(req,res)=>{
    //will check the email as well before going to database..
    Usercontrol.get(req,res)//since this is reaching the hashpassword earlier therefore contoller will get the hashpassword.
})

UserRouter.post('/login',(req,res)=>{
    Usercontrol.login(req,res);
})

export default UserRouter
