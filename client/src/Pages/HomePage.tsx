import MainContent from "@/components/MainContent"
import SideBar from "@/components/SideBar"
const HomePage = () => {
  return (
    <>
      <div className="w-full h-[10%] text-3xl text-center font-bold p-4 bg-amber-300">Expense Tracker</div>
    <div className="flex gap-[2%] flex-wrap content-start px-4 py-7 bg-slate-200 h-screen">
      <MainContent/>
      <SideBar/>
    </div>
    </>
  )
}

export default HomePage