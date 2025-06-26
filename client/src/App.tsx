import {Routes, Route} from 'react-router-dom'
import LoginPage from "./Pages/LoginPage"
import RegisterPage from './Pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
function App() {

  return (
    <>
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<RegisterPage/>}/>
      <Route path='' element={<ProtectedRoute/>}>
        <Route path='/' element={<>
        <h1>Hello world</h1>
        </>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
