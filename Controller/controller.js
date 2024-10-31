import expres from 'express';
import UserRepository from '../Repository/UserRepository.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
 export default  class Usercontroller{
    async getdata(req,res){
        console.log("Reached to controller get function")
        console.log("Request body in getdata:", req.body);  
        try {
            var data={
                firstname:req.body.firstname,
                password:req.body.password,
                email:req.body.email,
                address:req.body.address
            }
            const sendata=await UserRepository.storedata(data);
            if(sendata){
                return res.status(200).send("Login is created succesfully");
            }
            else{
                return res.status(404).send("Unsuccessful in creating the Login");
            }
        } catch (error) {
            console.log('Problem in creating Login',error);
        }
    }
    async login(req,res){
        try {
            const data={
                email:req.body.email,
                password:req.body.password
            }
            const Logininfo=await UserRepository.logindata(data)
            if(Logininfo){
                const jwtkey=process.env.JWT_KEY;
                const token=jwt.sign({
                    userID:Logininfo._id,email:data.email
                },jwtkey,{expiresIn:'7d'})
                return res.status(200).send('login successfully',token);
            }
            else{
                return res.status(404).send('not an authentic user');
            }
        } catch (error) {
            
        }
    }
}
