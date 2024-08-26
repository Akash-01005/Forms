import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRouter.js";
import { LoginRouter } from "./routes/loginRouter.js";
import { ResetRouter } from "./routes/forgotPasswortRouter.js";


const app = express()

app.use(cors({
    origin: ["http://localhost:5173"],   //secure cookie access
    credentials: true
}))
app.use(cookieParser()) // to call cookies
app.use(express.json())


mongoose.connect("mongodb://localhost:27017/register")
.then(()=>console.log("DB Connected"))
.catch((err)=>console.log(err))

app.use("/auth",userRouter)
app.use("/auth",LoginRouter)
app.use("/auth",ResetRouter)
app.listen(3001,()=>{
    console.log("server is running")
})
