"use client"

import { useEffect, useState, useRef } from "react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { ArrowUp, ArrowDown } from "lucide-react"
import { useMarketData } from "@/hooks/use-market-data"
import type { MarketAsset } from "@/services/market-data-service"
import { useTheme } from "next-themes"

export function MarketOverview() {
  const [mounted, setMounted] = useState(false)
  const [chartData, setChartData] = useState<any[]>([])
  const { data: stocksData } = useMarketData("stocks")
  const { data: cryptoData } = useMarketData("crypto")
  const { data: indicesData } = useMarketData("indices")
  const { theme } = useTheme()

  // Selected market assets to display
  const [marketData, setMarketData] = useState<MarketAsset[]>([])
  const [flashStates, setFlashStates] = useState<Record<string, "up" | "down" | null>>({})

  // Use refs to track mounted state for async operations
  const isMounted = useRef(false)
  const flashTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setMounted(true)
    isMounted.current = true

    // Initialize chart data
    const initialData = []
    const now = new Date()

    for (let i = 30; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)

      initialData.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        SPY: 0,
        BTC: 0,
        TSLA: 0,
      })
    }

    setChartData(initialData)

    return () => {
      isMounted.current = false
      if (flashTimeoutRef.current) {
        clearTimeout(flashTimeoutRef.current)
      }
    }
  }, [])

  // Update market data when stock/crypto/indices data changes
  useEffect(() => {
    if (!isMounted.current) return

    if (stocksData.length > 0 && cryptoData.length > 0 && indicesData.length > 0) {
      // Find specific assets we want to display
      const spy =
        stocksData.find((asset) => asset.symbol === "SPY") || indicesData.find((asset) => asset.symbol === "SPX")
      const btc = cryptoData.find((asset) => asset.symbol === "BTC")
      const tsla = stocksData.find((asset) => asset.symbol === "TSLA")

      const newMarketData = [spy, btc, tsla].filter(Boolean) as MarketAsset[]

      // Update flash states for price changes
      const newFlashStates: Record<string, "up" | "down" | null> = {}

      newMarketData.forEach((item) => {
        if (item.price > item.previousPrice) {
          newFlashStates[item.symbol] = "up"
        } else if (item.price < item.previousPrice) {
          newFlashStates[item.symbol] = "down"
        }
      })

      setMarketData(newMarketData)
      setFlashStates(newFlashStates)

      // Clear flash states after animation
      if (flashTimeoutRef.current) {
        clearTimeout(flashTimeoutRef.current)
      }

      flashTimeoutRef.current = setTimeout(() => {
        if (isMounted.current) {
          setFlashStates({})
        }
      }, 1000)
    }
  }, [stocksData, cryptoData, indicesData])

  // Update chart data with new prices
  useEffect(() => {
    if (!isMounted.current || marketData.length === 0 || chartData.length === 0) return

    // Update the last data point with new values
    setChartData((prev) => {
      if (!prev || prev.length === 0) return prev

      const newData = [...prev]
      const lastPoint = { ...newData[newData.length - 1] }

      marketData.forEach((asset) => {
        if (asset.symbol === "SPY" || asset.symbol === "SPX") {
          lastPoint.SPY = asset.price
        } else if (asset.symbol === "BTC") {
          lastPoint.BTC = asset.price
        } else if (asset.symbol === "TSLA") {
          lastPoint.TSLA = asset.price
        }
      })

      newData[newData.length - 1] = lastPoint
      return newData
    })
  }, [marketData])

  if (!mounted) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
  }

  // Get theme-appropriate colors for the chart
  const getChartColors = () => {
    return {
      SPY: "#D4AF37",
      BTC: "#A67C00",
      TSLA: "#F5E7A3",
      grid: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
      tooltip: {
        bg: theme === "dark" ? "hsl(var(--card))" : "hsl(var(--card))",
        border: theme === "dark" ? "hsl(var(--border))" : "hsl(var(--border))",
      },
    }
  }

  const colors = getChartColors()

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-2">
        {marketData.map((item) => (
          <div key={item.symbol} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
            <div className="flex flex-col">
              <div className="font-medium">{item.symbol}</div>
              <div className="text-xs text-muted-foreground">{item.name}</div>
            </div>
            <div className="flex flex-col items-end">
              <div
                className={`font-medium transition-colors duration-500 ${
                  flashStates[item.symbol] === "up"
                    ? "text-emerald-500"
                    : flashStates[item.symbol] === "down"
                      ? "text-red-500"
                      : ""
                }`}
              >
                ${item.price.toLocaleString()}
              </div>
              <div className={`text-xs flex items-center ${item.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                {item.change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {Math.abs(item.changePercent)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: "hsl(var(--border))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: "hsl(var(--border))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              domain={["auto", "auto"]}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: colors.tooltip.bg,
                borderColor: colors.tooltip.border,
                borderRadius: "var(--radius)",
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, ""]}
            />
            {marketData.map((item) => {
              let dataKey = ""
              let color = ""

              if (item.symbol === "SPY" || item.symbol === "SPX") {
                dataKey = "SPY"
                color = colors.SPY
              } else if (item.symbol === "BTC") {
                dataKey = "BTC"
                color = colors.BTC
              } else if (item.symbol === "TSLA") {
                dataKey = "TSLA"
                color = colors.TSLA
              }

              return dataKey ? (
                <Line
                  key={item.symbol}
                  type="monotone"
                  dataKey={dataKey}
                  stroke={color}
                  strokeWidth={2}
                  dot={false}
                  name={item.symbol}
                  isAnimationActive={false} // Disable animations to prevent issues
                />
              ) : null
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

