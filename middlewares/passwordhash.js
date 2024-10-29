
const bcrypt = require('bcryptjs');
export  default async function hashPassword(req,res,next) {
    try {
        const password=req.body.password;
        const gensalt= bcrypt.genSalt;
        const secpassword=bcrypt.hash(password,gensalt);//will create a hashpassword 
        next();//pass to next
    } catch (error) {
        console.log('some errror in hashing',error);
    }
        
} 

