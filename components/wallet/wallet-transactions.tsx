"use client"

import { ArrowUpRight, ArrowDownRight, CheckCircle2, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const transactionsData = [
  {
    id: "TX789012",
    type: "deposit",
    method: "Bank Transfer",
    amount: 5000.0,
    date: "2025-03-15T10:30:00",
    status: "completed",
  },
  {
    id: "TX789013",
    type: "withdrawal",
    method: "Bank Transfer",
    amount: 2000.0,
    date: "2025-03-10T14:45:00",
    status: "completed",
  },
  {
    id: "TX789014",
    type: "deposit",
    method: "Credit Card",
    amount: 1000.0,
    date: "2025-03-05T09:15:00",
    status: "completed",
  },
  {
    id: "TX789015",
    type: "deposit",
    method: "Crypto",
    amount: 3500.0,
    date: "2025-02-28T16:20:00",
    status: "completed",
  },
  {
    id: "TX789016",
    type: "withdrawal",
    method: "Bank Transfer",
    amount: 1500.0,
    date: "2025-02-20T11:30:00",
    status: "completed",
  },
]

export function WalletTransactions() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
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
                      transaction.type === "deposit"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {transaction.type === "deposit" ? (
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
              <TableCell>{transaction.method}</TableCell>
              <TableCell className="font-medium">${transaction.amount.toLocaleString()}</TableCell>
              <TableCell>
                {new Date(transaction.date).toLocaleDateString()}
                <div className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleTimeString()}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {transaction.status === "completed" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-amber-500" />
                  )}
                  <Badge variant="outline" className="capitalize bg-green-500/10 text-green-500 border-green-500/20">
                    {transaction.status}
                  </Badge>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

