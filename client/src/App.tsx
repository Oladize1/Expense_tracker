import {Routes, Route} from 'react-router-dom'
import LoginPage from "./Pages/LoginPage"
import RegisterPage from './Pages/RegisterPage'
function App() {

  return (
    <>
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<RegisterPage/>}/>
    </Routes>
    </>
  )
}

export default App
