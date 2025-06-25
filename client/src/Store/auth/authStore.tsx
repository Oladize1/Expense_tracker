import {create} from 'zustand'
import { axiosInstance } from '../axiosInstance'

interface User {
    isLoading: boolean,
    error:string | null,
    authUser: {email : string, token : string} | null,
    login: ({email, password} : {email: string, password: string}) => void,
    register: ({email, password} : {email: string, password: string}) => void  
}

export const useAuthStore = create<User>((set) => ({
    isLoading: false,
    error: null,
    authUser: null,
    login: async ({email, password}) => {
        set({isLoading: true, error: null})
        try {
            const user = await axiosInstance.post('/auth/login', {email, password})
            console.log(user);        
            set({isLoading: false, error: null, authUser: {email: user.data.email, token: user.data.token}})
        } catch (error: any) {
            console.log(error.data)
            set({isLoading: false, error: error.response?.data?.message, authUser: null})
        }
    },
    register: async({email, password}) => {
        set({isLoading: true, error: null})
        try {
            const user = await axiosInstance.post('/auth/register', {email, password})
            console.log(user);
            set({isLoading: false, error: null, authUser: {email: user.data.email, token: user.data.token}})
        } catch (error: any) {
            console.log(error.data);
            set({isLoading:false, error: error.response?.data?.message, authUser: null})
        }
    }
}))