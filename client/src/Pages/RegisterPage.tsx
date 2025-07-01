import { useEffect } from 'react'
import { AuthForm } from '@/components/Auth-form'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/Store/auth/authStore'
export default function Page() {
  const {authUser} = useAuthStore()
  const navigate = useNavigate()
  useEffect(() => {
    if (authUser) {
      navigate('/')
      return 
    }
  },[authUser, navigate])
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <AuthForm type="signup" />
        </div>
      </div>
    )
  }