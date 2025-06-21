import { Request, Response ,NextFunction } from 'express';
import jwt from 'jsonwebtoken'

declare module 'express-serve-static-core' {
    interface Request {
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

export const decodeToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.token
    if (!token) {
        return res.status(403).json({message: "Token Not provided"})
    }
    const verifyToken = jwt.verify(token, secret)
    if (verifyToken) {
        req.decodedToken = verifyToken
    } else {
        return res.status(403).json({message: "Invalid Token"})
    }
    next()
}