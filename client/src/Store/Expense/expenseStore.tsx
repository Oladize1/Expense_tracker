import {create} from 'zustand'
import { toast } from 'react-toast'
import { axiosInstance } from '../axiosInstance'

type ExpenseItem = {
    _id: string
    title: string
    amount: number
    category: string
    createdAt: string
    updatedAt: string
  }
  

interface Expense {
    isLoading: boolean,
    error:string | null,
    authUser: string | null,
    selectedExpense: string| null,
    expenses: ExpenseItem[]
    getAllExpenses: () => Promise<void>,
    createExpense: ({title, amount, category}: Omit<ExpenseItem, "_id" | "createdAt"| "updatedAt">) => Promise<void>
}


export const useExpenseStore = create<Expense>((set) => ({
    isLoading: false,
    error: null,
    authUser: localStorage.getItem('authUser') || null,
    selectedExpense: null,
    expenses: [],
    getAllExpenses: async()=>{
        set({isLoading: true, error: null})
        try {
            const allExpense = await axiosInstance.get('/expense')
            console.log(allExpense.data)
            set({isLoading: false, error: null, expenses: allExpense.data})
        } catch (error: any) {
            console.log(error.data)
            set({isLoading: false, error: error.response?.data?.message, authUser: null})
            toast.error(error.response?.data?.message)
        }
    },
    createExpense: async({title, amount, category}) => {
        set({isLoading: true, error: null})
        try {
            const newExpense = await axiosInstance.post('/expense', {title, amount, category})
            set((state) => ({
                isLoading: false,
                error: null,
                expenses: [...state.expenses, newExpense.data]
            }))
        } catch (error: any) {
            console.log(error.data)
            set({isLoading: false, error: error.response?.data?.message, authUser: null})
            toast.error(error.response?.data?.message)
        }
    }
}))