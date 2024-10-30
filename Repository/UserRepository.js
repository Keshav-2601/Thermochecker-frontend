import express from 'express'
import { getdb } from '../config/mongodb.js'
import bcrypt from 'bcryptjs';
export default class UserRepository{
    static async  storedata(data){
        try {
            const db=getdb();
            const collection=db.collection("User_Details");
            const Data=await collection.insertOne(data)
            console.log("Data inserted into DB:", Data.insertedID);
            console.log("Data inserted into DB:", Data);
            var string="data is added succesfully";
            return string;
        } catch (error) {
            console.log("some db error happened",error);
        }
       
    }
    static async logindata(data){
        try {
            const db=getdb();
            const collection=db.collection("User_Details");
            const user=await collection.findOne({email:data.email});
            var string ="Succesfullly login";
            if(!user){
                return "No_email_found";
            }
            if(user){
                const haspassword=await bcrypt.compare(data.password,user.password)//here to check the user.password and Data password we enter are same or not ?
                if(haspassword){
                    return string;
                }
                string="password does not match"
            }
            return string;
        } catch (error) {
            console.log("Some DB error",error);
        }
    }
}