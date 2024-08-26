import express from "express";
import bcrypt from "bcrypt"
import { userModel } from "../models/user.js";

const routes = express.Router()

routes.post("/signup",async(req,res)=>{
    const {username,email,password} = req.body;
    const check = await userModel.findOne({email:req.body.email})
    console.log(check)
    if(check  === null){
        const hashpassword = await bcrypt.hash(password,10);
        const newUser = new userModel({username,email,password:hashpassword})
        await newUser.save()
        return res.json({meassage:"Record Submited Sucessfully"})
    }
    else{
        return res.json({message:"User already exists"})
    }
})



export {routes as userRouter}