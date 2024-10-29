import express from 'express'
import { Router } from 'express'
import Usercontroller from '../Controller/controller.js';
import hashPassword from '../middlewares/passwordhash.js';
import checkemail from '../middlewares/checkemail.js'
const UserRouter=express.Router();
const Usercontrol=new Usercontroller();
UserRouter.post('/create',checkemail,hashPassword,(res,req)=>{
    //will check the email as well before going to database..
    Usercontrol.get(res,req)//since this is reaching the hashpassword earlier therefore contoller will get the hashpassword.
})

UserRouter.post('/login',(res,req)=>{
    Usercontrol.login(res,req);
})

export default UserRouter
