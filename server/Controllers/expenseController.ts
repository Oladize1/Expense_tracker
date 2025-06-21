import { Request, Response } from "express"
import { Expense } from "../Models/expense"

declare module 'express-serve-static-core' {
    interface Request {
      decodedToken?: any;
    }
  }

export const getAllExpenses = async(req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req.decodedToken
        if (!userId) {
            return res.status(401).json({message: "Invalid Credentials"})
        }
        
        const getAllUsersExpenses = await Expense.findById(userId)
        if(!getAllUsersExpenses){
            return res.status(404).json({message: "No Expenses record"})
        }
        return res.status(200).json(getAllUsersExpenses)
    } catch (error) {
       console.log(error)
       return res.status(500).json({message: 'Error fetching Expenses'}) 
    }
}

export const createExpense = async(_req: Request, res: Response): Promise<Response> => {
    try {
        return res.send("create expense")
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error creating expense"})
    }
}