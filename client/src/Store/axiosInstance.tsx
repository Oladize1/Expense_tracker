import axios from "axios"


export const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true
})


axiosInstance.interceptors.request.use(
    (config) => {
      const getUser = localStorage.getItem('authUser')
      const user = getUser ? JSON.parse(getUser) : null
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )