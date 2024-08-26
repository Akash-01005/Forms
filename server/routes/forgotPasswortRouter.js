import express from "express";
import { userModel } from "../models/user.js";
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const routes = express.Router();

routes.post("/forgot-password",async(req,res)=>{

    try {
        const user = await userModel.findOne({email:req.body.email});
        console.log(user.username)
        const token = jwt.sign({username:user.username},"qwiueiouriuewiouriouqweiourioueiwuiuioeuioruiouriueiouri",{expiresIn:'1h'})
        if(user === null){
            return res.json({message:"user not registered"})
        }
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'webdevepak@gmail.com',
              pass: 'rbsa fdka yulv whnk'
            }
          });
          
          var mailOptions = {
            from: 'webdevepak@gmail.com',
            to: req.body.email,
            subject: 'Reset Password:',
            text: `http://localhost:5173/resetPassword/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              return res.json({message:"error sending email"})
            } else {
              return res.json({message:"mail sent"})
            }
          });
    } catch (error) {
        console.log(error)
    }
})

routes.post("/reset-password/:token", async (req, res) => {
    const token = req.params.token;
    const password = req.body.password;

    try {
        const decoded = jwt.verify(token, "qwiueiouriuewiouriouqweiourioueiwuiuioeuioruiouriueiouri");
        const id = decoded.id;

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.findByIdAndUpdate(id, { password: hashedPassword });

        return res.json({ status: true, message: "Password updated successfully" });
    } catch (err) {
        return res.json({ status: false, message: "Invalid token or error updating password" });
    }
});

export {routes as ResetRouter}