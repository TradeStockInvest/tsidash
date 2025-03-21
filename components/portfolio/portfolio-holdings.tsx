"use client"

import { useState } from "react"
import { ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const holdingsData = [
  {
    symbol: "AAPL",
    name: "Apple Inc",
    type: "Stock",
    quantity: 15,
    avgPrice: 165.32,
    currentPrice: 182.63,
    value: 2739.45,
    change: 17.31,
    changePercent: 10.47,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp",
    type: "Stock",
    quantity: 10,
    avgPrice: 310.45,
    currentPrice: 337.22,
    value: 3372.2,
    change: 26.77,
    changePercent: 8.62,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc",
    type: "Stock",
    quantity: 8,
    avgPrice: 135.78,
    currentPrice: 142.56,
    value: 1140.48,
    change: 6.78,
    changePercent: 4.99,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc",
    type: "Stock",
    quantity: 12,
    avgPrice: 155.67,
    currentPrice: 178.22,
    value: 2138.64,
    change: 22.55,
    changePercent: 14.49,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp",
    type: "Stock",
    quantity: 5,
    avgPrice: 580.25,
    currentPrice: 824.18,
    value: 4120.9,
    change: 243.93,
    changePercent: 42.04,
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    type: "Crypto",
    quantity: 0.15,
    avgPrice: 32450.75,
    currentPrice: 35420.5,
    value: 5313.08,
    change: 2969.75,
    changePercent: 9.15,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    type: "Crypto",
    quantity: 1.5,
    avgPrice: 1750.32,
    currentPrice: 1850.75,
    value: 2776.13,
    change: 100.43,
    changePercent: 5.74,
  },
  {
    symbol: "SPY",
    name: "S&P 500 ETF",
    type: "ETF",
    quantity: 10,
    avgPrice: 435.67,
    currentPrice: 452.78,
    value: 4527.8,
    change: 17.11,
    changePercent: 3.93,
  },
]

export function PortfolioHoldings() {
  const [sortColumn, setSortColumn] = useState("value")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const sortedData = [...holdingsData].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortColumn] - b[sortColumn]
    } else {
      return b[sortColumn] - a[sortColumn]
    }
  })

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Avg. Price</TableHead>
            <TableHead>Current Price</TableHead>
            <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("value")}>
              Value {sortColumn === "value" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("changePercent")}>
              Change {sortColumn === "changePercent" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item) => (
            <TableRow key={item.symbol}>
              <TableCell>
                <div className="font-medium">{item.symbol}</div>
                <div className="text-xs text-muted-foreground">{item.name}</div>
              </TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>${item.avgPrice.toLocaleString()}</TableCell>
              <TableCell>${item.currentPrice.toLocaleString()}</TableCell>
              <TableCell className="font-medium">${item.value.toLocaleString()}</TableCell>
              <TableCell>
                <div className={`flex items-center ${item.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                  {item.change >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                  {item.changePercent.toFixed(2)}%
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Buy More</DropdownMenuItem>
                    <DropdownMenuItem>Sell</DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Set Alert</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

