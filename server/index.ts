import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
const app = express()
dotenv.config()
const PORT = 4000

import { authRouter } from './Routes/auth'

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)

app.get(("/test"), (_req: Request, res: Response) => {
    res.send("<h1>hello world tested</h1>")
})

app.listen(PORT, () => {
    console.log(`Server listen on PORT ${PORT}`);
})