"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Tooltip,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { useExpenseStore } from "@/Store/Expense/expenseStore";

// Chart config
const chartConfig = {
  amount: {
    label: "Amount",
    color: "#22c55e", // Tailwind's green-500
  },
} satisfies ChartConfig;

export function ChartBarLabel() {
  const { expenses } = useExpenseStore();

  // Aggregate totals by category
  const result = { Expense: 0, Savings: 0, Investment: 0 };
  expenses.forEach((expense) => {
    const category = expense.category as keyof typeof result;
    if (category in result) {
      result[category] += Number(expense.amount);
    }
  });

  // Prepare chart data
  const chartData = [
    { category: "Expense", amount: result.Expense },
    { category: "Savings", amount: result.Savings },
    { category: "Investment", amount: result.Investment },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription>Total Amounts</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
            <Bar dataKey="amount" fill={chartConfig.amount.color} radius={8}>
              <LabelList
                dataKey="amount"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Tracking your expenses by category <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Total values for Expense, Savings, and Investment
        </div>
      </CardFooter>
    </Card>
  );
}
