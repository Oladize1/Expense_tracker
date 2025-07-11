import express  from "express";
import { loginUser, registerUser, checkAuth } from "../Controllers/authController";
import { asyncHandler } from "../Utils/helper";
export const authRouter = express.Router()


//Next time, you can use express-async-handler

authRouter.post('/login', asyncHandler(loginUser))
authRouter.post('/register', asyncHandler(registerUser))
authRouter.get('/checkAuth', asyncHandler(checkAuth))