"use client"

import { useState } from "react"
import { ArrowUp, ArrowDown, Star, MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const watchlistData = [
  {
    symbol: "AAPL",
    name: "Apple Inc",
    price: 182.63,
    change: 1.25,
    volume: "45.2M",
    marketCap: "2.87T",
    favorite: true,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp",
    price: 337.22,
    change: 0.75,
    volume: "23.1M",
    marketCap: "2.51T",
    favorite: true,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc",
    price: 142.56,
    change: -0.32,
    volume: "18.7M",
    marketCap: "1.82T",
    favorite: false,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc",
    price: 178.22,
    change: 2.15,
    volume: "32.5M",
    marketCap: "1.85T",
    favorite: false,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp",
    price: 824.18,
    change: 3.45,
    volume: "51.3M",
    marketCap: "2.03T",
    favorite: true,
  },
  {
    symbol: "META",
    name: "Meta Platforms",
    price: 472.22,
    change: -1.05,
    volume: "15.8M",
    marketCap: "1.21T",
    favorite: false,
  },
]

export function WatchlistTable() {
  const [data, setData] = useState(watchlistData)

  const toggleFavorite = (symbol: string) => {
    setData(data.map((item) => (item.symbol === symbol ? { ...item, favorite: !item.favorite } : item)))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]"></TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Change</TableHead>
            <TableHead className="hidden md:table-cell">Volume</TableHead>
            <TableHead className="hidden md:table-cell">Market Cap</TableHead>
            <TableHead className="w-[40px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.symbol}>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleFavorite(item.symbol)}>
                  <Star
                    className={`h-4 w-4 ${item.favorite ? "fill-primary text-primary" : "text-muted-foreground"}`}
                  />
                  <span className="sr-only">Toggle favorite</span>
                </Button>
              </TableCell>
              <TableCell>
                <div className="font-medium">{item.symbol}</div>
                <div className="text-xs text-muted-foreground">{item.name}</div>
              </TableCell>
              <TableCell className="font-medium">${item.price.toLocaleString()}</TableCell>
              <TableCell>
                <div className={`flex items-center ${item.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                  {item.change >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                  {Math.abs(item.change)}%
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{item.volume}</TableCell>
              <TableCell className="hidden md:table-cell">${item.marketCap}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Buy</DropdownMenuItem>
                    <DropdownMenuItem>Sell</DropdownMenuItem>
                    <DropdownMenuItem>Remove from Watchlist</DropdownMenuItem>
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

