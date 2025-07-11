import { Request, Response} from "express"
import bcryptjs from 'bcryptjs'

import { User } from "../Models/auth"
import { generateToken } from "../Utils/token"

declare module 'express-serve-static-core' {
    interface Request {
      decodedToken?: any;
    }
  }

interface userCheck {email: string, password: string}

export const loginUser = async(req: Request, res: Response): Promise<Response> => {
    try {
        const {email, password}: userCheck = req.body
        if (!email || !password) {
            return res.status(400).json({message: "Invalid Credentials"})
        }
        const checkUser = await User.findOne({email})
        if (!checkUser) {
            return res.status(404).json({message: 'User does not Exist'})
        }
        const checkPassword = bcryptjs.compareSync(password, checkUser.password)
        if (!checkPassword) {
            return res.status(400).json({message: "Invalid Credentials"})
        }
        const token = generateToken(checkUser._id.toString())
        return res.status(200).json({token:token, email:checkUser.email})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Error during login'})
    }
}

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {email, password}: userCheck  = req.body
        if (!email|| !password) {
            return res.status(400).json({message: 'Invalid credentials'})
        }
        const checkUser = await User.findOne({email})
        if (checkUser) {
            return res.status(400).json({message: 'User Already exist '})
        }
        const hashpassword: string = bcryptjs.hashSync(password, 10)
        const user = new User({
            email: email,
            password: hashpassword
        })
        await user.save()
        const token = generateToken(user._id.toString())
        return res.status(201).json({token: token, email: user.email})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error creating user', error})
    }
}

export const checkAuth = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req.decodedToken
        const getUser = await User.findById(userId)
        return res.status(200).json({user: getUser?.email})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'UnAuthorized User'})
    }
}