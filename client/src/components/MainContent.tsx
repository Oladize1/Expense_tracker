import { BsFillPieChartFill } from "react-icons/bs";
import { PiBankFill } from "react-icons/pi";
import { FaChartLine } from "react-icons/fa";
import { useExpenseStore } from "@/Store/Expense/expenseStore";
import { ChartBarLabel } from "./Chart";

type Result = {
  Investment: string,
  Savings: string,
  Expense: string
}

const MainContent = () => {
  const { expenses } = useExpenseStore();
  console.log("expense", expenses);
  const result: Result = {}

  expenses.forEach(expense=>{
    const category = expense.category
    if (!result[category]) {
      result[category] = {}
    }
    result[category] = expense.amount
  })
console.log(result);

  return (
    <div className="grow md:h-3/4">
      {/* Scrollable Container on Small Screens */}
      <div className="flex items-stretch gap-3 overflow-x-auto md:overflow-hidden px-2 py-2 snap-x snap-mandatory">
        {/* Total Expense Card */}
        <div className="rounded-2xl flex items-center bg-gradient-to-r from-emerald-400 to-cyan-400 flex-shrink-0 w-[250px] md:w-1/3 justify-between px-4 py-4 snap-center">
          <div className="flex flex-col">
            <h2 className="text-gray-100">Total Expense</h2>
            <p className="text-3xl font-bold text-white">{`$ ${result.Expense}`}</p>
          </div>
          <BsFillPieChartFill className="text-gray-200" size={40} />
        </div>

        {/* Investment Card */}
        <div className="rounded-2xl flex items-center bg-gradient-to-r from-emerald-400 to-cyan-400 flex-shrink-0 w-[250px] md:w-1/3 justify-between px-4 py-4 snap-center">
          <div className="flex flex-col">
            <h2 className="text-gray-200">Investment</h2>
            <p className="text-3xl font-bold text-white">{`$ ${result.Investment}`}</p>
          </div>
          <FaChartLine className="text-white" size={40} />
        </div>

        {/* Savings Card */}
        <div className="rounded-2xl flex items-center bg-gradient-to-r from-violet-500 to-purple-500 flex-shrink-0 w-[250px] md:w-1/3 justify-between px-4 py-4 snap-center">
          <div className="flex flex-col">
            <h2 className="text-gray-200">Savings</h2>
            <p className="text-3xl font-bold text-white">$ {result.Savings}</p>
          </div>
          <PiBankFill className="text-gray-200" size={40} />
        </div>
      </div>
      <ChartBarLabel/>
    </div>
  );
};

export default MainContent;
