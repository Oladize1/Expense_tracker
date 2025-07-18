import { useState } from "react"
import { toast } from "react-toast"
import { Loader2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useExpenseStore } from "@/Store/Expense/expenseStore"

const categories = ['Expense', 'Savings', 'Investment'] as const
type Category = (typeof categories)[number]

const SideBar = () => {
  const [title, setTitle]= useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const [category, setCategory] = useState<Category>('Savings')
  const [loading, setLoading] = useState(false)
  
  const {createExpense, isLoading} = useExpenseStore()
  if (isLoading) {
    return
  }

  const handleAddExpense = (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    if (!title || !category || !amount || amount <= 0 ) {
      toast.error('Invalid data')
      return Promise.resolve()
    }
    try {
      createExpense({title, amount, category})
      console.log(title, amount, category)
      setTitle('')
      setAmount(0)
      setCategory('Savings')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    return Promise.resolve()
  }

  return (
    <div className='md:w-1/4 md:h-3/4'>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              Quick Add
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddExpense}>
              <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="Transaction">Transaction</Label>
                <Input
                  id="Transaction"
                  placeholder="Clothing"
                  value={title}
                  onChange={(e) => setTitle((e.target.value))}
                  required
                />
                </div>
                <div className="w-full gap-2 flex flex-row-reverse">
                <div className="grid gap-3 w-1/2">
                <Label htmlFor="text">Amount</Label>
                <Input
                  id="text"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  min={0}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  required
                />
                </div>
                <div className="grid gap-3 w-1/2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={(value: Category) => setCategory(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Catgeory" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                </div>
                <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                  {loading && <Loader2Icon className="animate-spin" />}
                  Add Expense
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SideBar