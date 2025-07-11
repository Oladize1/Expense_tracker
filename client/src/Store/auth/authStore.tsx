import {create} from 'zustand'
import { toast } from 'react-toast'
import { axiosInstance } from '../axiosInstance'
import type { Trophy } from 'lucide-react'

interface User {
    isLoading: boolean,
    error:string | null,
    authUser: string | null,
    login: ({email, password} : {email: string, password: string}) => void,
    register: ({email, password} : {email: string, password: string}) => void,
    checkAuth: () => void  
}

export const useAuthStore = create<User>((set) => ({
    isLoading: false,
    error: null,
    authUser: localStorage.getItem('authUser') || null,
    login: async ({email, password}) => {
        set({isLoading: true, error: null})
        try {
            const response = await axiosInstance.post('/auth/login', {email, password})
            const userData = JSON.stringify(response.data)
            localStorage.setItem('authUser', userData)      
            set({isLoading: false, error: null, authUser: userData })
            toast.success('log in successfull')
        } catch (error: any) {
            console.log(error.data)
            set({isLoading: false, error: error.response?.data?.message, authUser: null})
            toast.error(error.response?.data?.message)
        }
    },
    register: async({email, password}) => {
        set({isLoading: true, error: null})
        try {
            const user = await axiosInstance.post('/auth/register', {email, password})
            const userData = JSON.stringify(user.data)
            localStorage.setItem('authUSer', userData)
            set({isLoading: false, error: null, authUser: userData})
            toast.success('Register successfull')
        } catch (error: any) {
            console.log(error.data);
            set({isLoading:false, error: error.response?.data?.message, authUser: null})
            toast.error(error.response?.data?.message)
        }
    },
    checkAuth: async() => {
        try {
            
        } catch (error: any) {
            console.log(error.data)
            set({isLoading:false, error: error.response?.data?.message, authUser: null})
            toast.error(error.response?.data?.message)
        }
    }
}))