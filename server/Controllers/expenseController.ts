import { Request, Response } from "express"
import { Expense } from "../Models/expense"
import { User } from '../Models/auth'

declare module 'express-serve-static-core' {
    interface Request {
      decodedToken?: any;
    }
  }

  interface ExpenseType {
    title: string,
    amount: number,
    category: string
  }

export const getAllExpenses = async(req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req.decodedToken
        if (!userId) {
            return res.status(401).json({message: "Invalid Credentials"})
        }
        
        const getAllUsersExpenses = await Expense.find({user: userId})
        if(!getAllUsersExpenses){
            return res.status(404).json({message: "No Expenses record"})
        }
        console.log(getAllUsersExpenses);
        
        return res.status(200).json(getAllUsersExpenses)
    } catch (error) {
       console.log(error)
       return res.status(500).json({message: 'Error fetching Expenses'}) 
    }
}

export const createExpense = async(req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req.decodedToken
        console.log(userId);
        
        const {title, amount, category}: ExpenseType = req.body
        if (!title || !amount || !category) {
            return res.status(400).json({message: "All fields required"})
        }
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({message: "Invalid Token"})
        }
        const newExpense = new Expense({
            title: title.trim(),
            amount: amount,
            category: category,
            user: user._id
        })
        await newExpense.save().then(console.log).catch(console.error)
        return res.status(201).json(newExpense)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error creating expense"})
    }
}