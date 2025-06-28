import MainContent from "@/components/MainContent"
import SideBar from "@/components/SideBar"
const HomePage = () => {
  return (
    <div className="flex gap-[2%] flex-wrap content-start">
      <div className="w-full h-[10%] text-3xl text-center font-bold mb-1 p-4 bg-amber-300">Expense Tracker</div>
      <MainContent/>
      <SideBar/>
    </div>
  )
}

export default HomePage