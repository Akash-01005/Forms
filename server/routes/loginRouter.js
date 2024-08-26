import express from "express"
import bcrypt from "bcrypt"
import { userModel } from "../models/user.js"
import jwt from "jsonwebtoken"

const routes = express.Router()


routes.post("/login",async(req,res)=>{
    const check = await userModel.findOne({email:req.body.email});
    const compare = await bcrypt.compare(req.body.password,check.password);
    console.log(req.body.password)
    console.log(compare)
    const token = jwt.sign({username:check.username},"qwiueiouriuewiouriouqweiourioueiwuiuioeuioruiouriueiouri",{expiresIn:'1h'})
    res.cookie("token",token,{httpOnly: true,maxAge:360000})
    if(check === null){
        return res.json({message:"User Does Not Exists"});
    }
    else{
        if(compare === false){
            return res.json({message:"user invalid"})
        }
        if(check.email == req.body.email && compare){
            return res.json({message:"Authorized User"})
        }
    }
})

export {routes as LoginRouter}