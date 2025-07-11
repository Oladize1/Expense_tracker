import MainContent from "@/components/MainContent"
import SideBar from "@/components/SideBar"
// import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useExpenseStore } from "@/Store/Expense/expenseStore"

const HomePage = () => {
  // const navigate = useNavigate()
  const {getAllExpenses, expenses, authUser} = useExpenseStore()
  useEffect(()=>{
    if (authUser) {
      getAllExpenses()
    }
  }, [getAllExpenses, authUser])
  console.log(expenses)
  const handleLogout = () => {
    localStorage.removeItem('authUser')
    
  }
  return (
    <>
      <div className="w-full h-[10%] text-3xl font-bold p-4 flex justify-between items-center bg-amber-300">Expense Tracker <Button className="cursor-pointer" variant="destructive" onClick={handleLogout}>Logout</Button>
      </div>
    <div className="flex gap-[2%] flex-wrap content-start px-4 py-7 bg-slate-200 h-screen">
      <MainContent/>
      <SideBar/>
    </div>
    </>
  )
}

export default HomePage