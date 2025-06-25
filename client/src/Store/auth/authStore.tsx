import {create} from 'zustand'
import { axiosInstance } from '../axiosInstance'

interface User {
    isLoading: boolean,
    error:string | null,
    authUser: {username : string, token : string} | null,
    login: ({username, password} : {username: string, password: string}) => void,
    register: ({username, password} : {username: string, password: string}) => void  
}

export const authStore = create<User>((set) => ({
    isLoading: false,
    error: null,
    authUser: null,
    login: async ({username, password}) => {
        set({isLoading: true, error: null})
        try {
            const user = await axiosInstance.post('/auth/login', {username, password})
            set({isLoading: false, error: null, authUser: user.data.username})
        } catch (error: any) {
            console.log(error.data)
            set({isLoading: false, error: error.data, authUser: null})
        }
    },
    register: async({username, password}) => {
        set({isLoading: true, error: null})
        try {
            const user = await axiosInstance.post('/auth/register', {username, password})
            set({isLoading: false, error: null, authUser: {username: user.data.username, token: user.data.token}})
        } catch (error: any) {
            console.log(error.data);
            set({isLoading:false, error: error.data, authUser: null})
        }
    }
}))