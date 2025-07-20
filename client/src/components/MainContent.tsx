import { BsFillPieChartFill } from "react-icons/bs";
import { PiBankFill } from "react-icons/pi";
import { FaChartLine } from "react-icons/fa";
import { useExpenseStore } from "@/Store/Expense/expenseStore";
import { ChartBarLabel } from "./Chart";

type Result = {
  Investment: number,
  Savings: number,
  Expense: number
}

const MainContent = () => {
  const { expenses } = useExpenseStore();

  const result: Result = { Savings: 0, Investment: 0, Expense: 0 };

  expenses.forEach(expense => {
    const category = expense.category as keyof Result;
    if (category in result) {
      result[category] += Number(expense.amount);
    }
  });
  console.log(expenses)
  const cards = [
    { label: "Total Expense", value: result.Expense, icon: <BsFillPieChartFill size={40} />, bg: "from-emerald-400 to-cyan-400" },
    { label: "Investment", value: result.Investment, icon: <FaChartLine size={40} />, bg: "from-emerald-400 to-cyan-400" },
    { label: "Savings", value: result.Savings, icon: <PiBankFill size={40} />, bg: "from-violet-500 to-purple-500" },
  ];

  return (
    <div className="grow md:h-3/4">
      {/* Horizontal Scroll on Small Screens */}
      <div className="flex gap-3 w-full px-2 py-2 overflow-x-auto scrollbar-hide">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`rounded-2xl flex-shrink-0 flex items-center bg-gradient-to-r ${card.bg} min-w-[250px] md:flex-1 justify-between px-4 py-4`}
          >
            <div className="flex flex-col">
              <h2 className="text-gray-100">{card.label}</h2>
              <p className="text-3xl font-bold text-white">$ {card.value}</p>
            </div>
            {card.icon}
          </div>
        ))}
      </div>
      <div className="w-full">
      <ChartBarLabel />
      </div>
      <div className="p-4 my-4">
        <h2 className="text-center">History</h2>
        <div className="flex items-center justify-between w-64 gap-2">
        {expenses.map((expense => (
          <div key={expense._id} className="rounded-2xl p-1">
            <div className="flex justify-between items-center">
              <h3>{expense.category}</h3>
              <p>btn</p>
            </div>
        </div>
        )))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
