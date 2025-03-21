"use client"

import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const transactionsData = [
  {
    id: "TX123456",
    type: "buy",
    symbol: "AAPL",
    quantity: 10,
    price: 182.63,
    total: 1826.3,
    date: "2025-03-18T14:30:00",
    status: "completed",
  },
  {
    id: "TX123457",
    type: "sell",
    symbol: "MSFT",
    quantity: 5,
    price: 337.22,
    total: 1686.1,
    date: "2025-03-17T10:15:00",
    status: "completed",
  },
  {
    id: "TX123458",
    type: "buy",
    symbol: "NVDA",
    quantity: 2,
    price: 824.18,
    total: 1648.36,
    date: "2025-03-16T09:45:00",
    status: "completed",
  },
  {
    id: "TX123459",
    type: "buy",
    symbol: "BTC",
    quantity: 0.05,
    price: 35420.5,
    total: 1771.03,
    date: "2025-03-15T16:20:00",
    status: "completed",
  },
  {
    id: "TX123460",
    type: "sell",
    symbol: "ETH",
    quantity: 1.2,
    price: 1850.75,
    total: 2220.9,
    date: "2025-03-14T11:30:00",
    status: "completed",
  },
]

export function RecentTransactions() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionsData.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className={`rounded-full p-2 ${
                      transaction.type === "buy" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {transaction.type === "buy" ? (
                      <ArrowDownRight className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium capitalize">{transaction.type}</div>
                    <div className="text-xs text-muted-foreground">{transaction.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">{transaction.symbol}</TableCell>
              <TableCell>{transaction.quantity}</TableCell>
              <TableCell>${transaction.price.toLocaleString()}</TableCell>
              <TableCell>${transaction.total.toLocaleString()}</TableCell>
              <TableCell>
                {new Date(transaction.date).toLocaleDateString()}
                <div className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleTimeString()}</div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize bg-green-500/10 text-green-500 border-green-500/20">
                  {transaction.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

