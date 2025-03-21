"use client"
import { useState, useEffect } from "react"
import { ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useMarketData } from "@/hooks/use-market-data"
import type { MarketAsset } from "@/services/market-data-service"
import { toast } from "@/hooks/use-toast"

interface MarketTableProps {
  type?: "trending" | "stocks" | "crypto" | "indices"
  customData?: MarketAsset[] // Add custom data prop
}

export function MarketTable({ type = "trending", customData }: MarketTableProps) {
  const { data, isLoading } = useMarketData(type)
  const [displayData, setDisplayData] = useState<MarketAsset[]>([])
  const [flashStates, setFlashStates] = useState<Record<string, "up" | "down" | null>>({})

  // Use custom data if provided, otherwise use fetched data
  useEffect(() => {
    if (customData) {
      setDisplayData(customData)
    } else {
      setDisplayData(data)
    }
  }, [data, customData])

  // Handle price flashes for visual feedback
  useEffect(() => {
    if (displayData.length === 0) return

    const newFlashStates: Record<string, "up" | "down" | null> = {}

    displayData.forEach((item) => {
      if (item.price > item.previousPrice) {
        newFlashStates[item.symbol] = "up"
      } else if (item.price < item.previousPrice) {
        newFlashStates[item.symbol] = "down"
      }
    })

    setFlashStates(newFlashStates)

    // Clear flash states after animation
    const timeout = setTimeout(() => {
      setFlashStates({})
    }, 1000)

    return () => clearTimeout(timeout)
  }, [displayData])

  const handleBuy = (asset: MarketAsset) => {
    toast({
      title: "Order Placed",
      description: `Buy order for ${asset.symbol} at $${asset.price.toLocaleString()} has been placed.`,
    })
  }

  const handleAddToWatchlist = (asset: MarketAsset) => {
    toast({
      title: "Added to Watchlist",
      description: `${asset.symbol} has been added to your watchlist.`,
    })
  }

  if (isLoading && !customData) {
    return (
      <div className="rounded-md border">
        <div className="p-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (displayData.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center">
        <p className="text-muted-foreground">No market data available</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Change</TableHead>
            <TableHead className="hidden md:table-cell">Volume</TableHead>
            <TableHead className="hidden md:table-cell">Market Cap</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayData.map((item) => (
            <TableRow key={item.symbol}>
              <TableCell>
                <div className="font-medium">{item.symbol}</div>
                <div className="text-xs text-muted-foreground">{item.name}</div>
              </TableCell>
              <TableCell
                className={`font-medium transition-colors duration-500 ${
                  flashStates[item.symbol] === "up"
                    ? "bg-green-500/10"
                    : flashStates[item.symbol] === "down"
                      ? "bg-red-500/10"
                      : ""
                }`}
              >
                ${item.price.toLocaleString()}
              </TableCell>
              <TableCell>
                <div className={`flex items-center ${item.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                  {item.change >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                  {Math.abs(item.changePercent)}%
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{item.volume}</TableCell>
              <TableCell className="hidden md:table-cell">{item.marketCap}</TableCell>
              <TableCell>
                <div className="flex gap-2 justify-end">
                  <Button size="sm" variant="outline" onClick={() => handleBuy(item)}>
                    Buy
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => (window.location.href = `/markets/${type}/${item.symbol}`)}>
                        View Chart
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAddToWatchlist(item)}>Add to Watchlist</DropdownMenuItem>
                      <DropdownMenuItem>Sell</DropdownMenuItem>
                      <DropdownMenuItem>Set Alert</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// Add default export
export default MarketTable

