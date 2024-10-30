import expres from 'express';
import UserRepository from '../Repository/UserRepository.js';
import dotenv from 'dotenv';
dotenv.config();
 export default  class Usercontroller{
    async get(req,res){
        try {
            var data={
                firstname:req.body.firstname,
                password:req.body.password,
                email:req.body.name,
                address:req.body.address
            }
            const sendata=await UserRepository.storedata(data);
            if(sendata){
                return res.status(200).sendata("Login is created succesfully");
            }
            else{
                return res.status(404).sendata("Unsuccessful in creating the Login");
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
