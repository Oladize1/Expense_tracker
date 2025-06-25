import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
const app = express()
dotenv.config()
const PORT = 4000

import { connectDB } from './Utils/connectDB'
import { authRouter } from './Routes/auth.route'
import { expenseRouter } from './Routes/expense.route'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/api/auth', authRouter)
app.use('/api/expense', expenseRouter)

app.get(("/test"), (_req: Request, res: Response) => {
    res.send("<h1>hello world tested</h1>")
})

const connectDataBase = async (uri:string) => {
    try {
        await connectDB(uri)
        app.listen(PORT, () => {
            console.log(`Server listen on PORT ${PORT}`);
        })
    } catch (error) {
        console.log(error);
        throw new Error("error starting app");
    }
}


const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is not defined");
}
connectDataBase(mongoUri)