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
        const getAllUsersExpenses = await Expense.find({user: userId})
        if(!getAllUsersExpenses){
            return res.status(404).json({message: "No Expenses record"})
        }
        console.log("this user expeses",getAllUsersExpenses);
        
        return res.status(200).json(getAllUsersExpenses)
    } catch (error) {
       console.log(error)
       return res.status(500).json({message: 'Error fetching Expenses'}) 
    }
}

export const createExpense = async(req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req.decodedToken
        
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
        user.expenses.push(newExpense._id)
        await user.save()
        return res.status(201).json(newExpense)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error creating expense"})
    }
}

export const editExpense = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { Id } = req.params as {Id: string}
        const { title, amount, category }: ExpenseType = req.body
        const userId = req.decodedToken
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({message: 'User Not Found'})
        }
        const checkExpense = await Expense.findById(Id)
        if (!checkExpense) {
            return res.status(404).json({message: 'Expense Not Found'})
        }
        if (checkExpense.user.toString() !== userId) {
            return res.status(401).json({message: "Unauthorized"})
        }
        const newExpense: Partial<ExpenseType> = {}
        if (title) newExpense.title = title
        if (amount) newExpense.amount = amount
        if (category) newExpense.category = category
        const updatedExpense = await Expense.findByIdAndUpdate(Id, newExpense, {new: true})
       return res.status(200).json(updatedExpense) 
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error Editing Expenses"})
    }
}

export const deleteExpense = async(_req: Request, res: Response): Promise<Response> => {
    try {
       return res.send('Delete expense') 
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error Deleting Expenses"})
    }
}