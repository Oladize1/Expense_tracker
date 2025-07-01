import { useState } from "react"
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
import { Textarea } from "@/components/ui/textarea"

const SideBar = () => {
  const [amount, setAmount] = useState<number>(0)
  const [transaction, setTransaction] = useState<string>('')
  return (
    <div className='w-1/4 h-3/4'>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              Quick Add
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
              <div className="grid gap-3 w-1/2">
                <Label htmlFor="Transaction">Transaction</Label>
                <Input
                  id="Transaction"
                  placeholder="Clothing"
                  value={transaction}
                  min={0}
                  onChange={(e) => setTransaction((e.target.value))}
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
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Catgeory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Savings">Savings</SelectItem>
                      <SelectItem value="Expense">Expense</SelectItem>
                      <SelectItem value="Investment">Investment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="Description">Description</Label>
                  <Textarea placeholder="Enter description..." id="Description"/>
                </div>
                <Button type="submit" className="w-full cursor-pointer">Add Expense</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SideBar