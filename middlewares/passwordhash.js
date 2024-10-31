
import bcrypt from 'bcryptjs';
export  default async function hashPassword(req,res,next) {
    try {
        const password=req.body.password;
        const gensalt= await bcrypt.genSalt(10);
        const secpassword=await bcrypt.hash(password,gensalt);//will create a hashpassword 
        req.body.password = secpassword;
        next();//pass to next
    } catch (error) {
        console.log('some errror in hashing',error);
        
    }
        
} 

