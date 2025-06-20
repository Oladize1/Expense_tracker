import { Request, Response } from "express"

export const loginRouter = (_req: Request, res: Response) => {
    res.send('login route')
}

export const registerRouter = (_req: Request, res: Response) => {
    res.send('register route')
}