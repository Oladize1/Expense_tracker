import express  from "express";
import { loginRouter, registerRouter } from "../Controllers/authController";

export const authRouter = express.Router()

authRouter.post('/login', loginRouter)
authRouter.post('/register', registerRouter)