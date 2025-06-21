import { Request, Response ,NextFunction } from 'express';
import jwt from 'jsonwebtoken'
declare module 'express-serve-static-core' {
    interface Request {
      token?: string| null ,
      decodedToken?: any;
    }
  }


const secret = process.env.SECRET 
if (!secret) {
    throw new Error("JWT SECRET is not defined in environment variables");
}

export const generateToken = (userId: string | number) => {
    return jwt.sign({id: userId}, secret ,{expiresIn: '30d'})
}

export const decodeToken = (req: Request, res: Response, next: NextFunction):void => {
    const token = req.token
    if (!token) {
        res.status(403).json({message: "Token Not provided"})
        return
    }
    const verifyToken = jwt.verify(token, secret)
    try {
        req.decodedToken = (verifyToken as  {id: string}).id
        next()
    } catch (error) {
        console.log(error)
        res.status(403).json({message: "Invalid Token"})
    }
}