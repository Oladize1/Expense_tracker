import { useAuthStore } from "@/Store/auth/authStore"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const {authUser} = useAuthStore()
    if (!authUser) {
        <Navigate to={'/login'}/>
    }
  return children
}

export default ProtectedRoute