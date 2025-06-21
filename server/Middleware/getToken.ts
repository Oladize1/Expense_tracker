import { Request, Response, NextFunction } from "express"

declare module 'express-serve-static-core' {
    interface Request {
      token?: string | null;
    }
  }

export const getToken = (req: Request, _res: Response ,next: NextFunction): void => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.replace('Bearer ', '')
    } else{
        req.token = null
    }
    next()
}