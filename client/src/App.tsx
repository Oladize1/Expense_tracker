import { useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toast'
import LoginPage from "./Pages/LoginPage"
import RegisterPage from './Pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './Pages/HomePage'
import { useAuthStore } from './Store/auth/authStore'
import { Spinner } from './components/ui/spinner'

function App() {
const {checkAuth, isLoading} = useAuthStore()
useEffect(()=>{
  checkAuth()
},[checkAuth])
if (isLoading) {
  return <Spinner/>
}
  return (
    <>
    <ToastContainer position='top-center' delay={3000}/>
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<RegisterPage/>}/>
      <Route path='/' element={
        <ProtectedRoute>
          <HomePage/>
        </ProtectedRoute>
      }>
      </Route>
    </Routes>
    </>
  )
}

export default App
