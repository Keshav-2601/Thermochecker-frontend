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
    console.log("POST request received at /user/create");
    Usercontrol.getdata(req,res)//since this is reaching the hashpassword earlier therefore contoller will get the hashpassword.
})

UserRouter.post('/login',(req,res)=>{
    Usercontrol.login(req,res);
})
UserRouter.get('/test', (req, res) => {
    console.log("GET request received at /user/test");
    return res.send("Test route is working");
});


export default UserRouter
