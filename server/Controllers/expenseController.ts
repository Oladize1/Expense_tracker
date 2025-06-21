import { Request, Response } from "express"
import { Expense } from "../Models/expense"

export const getAllExpenses = async(_req: Request, res: Response): Promise<Response> => {
    try {
        return res.send('get all expenses')
    } catch (error) {
       console.log(error)
       return res.status(500).json({message: 'Error fetching Expenses'}) 
    }
}

export const createExpense = async(_req: Request, res: Response): Promise<Response> => {
    return res.send('create expense')
}