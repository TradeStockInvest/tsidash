"use client"

import { useEffect, useState, useRef } from "react"
import { Chart } from "@/components/ui/chart"
import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAITrading } from "@/contexts/ai-trading-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, BarChart4, PieChartIcon, TrendingUp } from "lucide-react"

// Generate performance data based on bot performance
const generatePerformanceData = (bots: any[], days = 30) => {
  const data = []
  const now = new Date()
  let cumulativeProfit = 0

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Calculate daily profit based on bot performance
    // More active bots = more volatile daily changes
    const activeBots = bots.filter((bot) => bot.status === "active").length || 1
    const volatilityFactor = 0.5 + activeBots * 0.2

    // Random daily profit between -volatility% and +volatility%
    const dailyProfitPercent = (Math.random() * volatilityFactor * 2 - volatilityFactor) * (i < 5 ? 1.5 : 1) // More volatility in recent days
    const dailyProfit = dailyProfitPercent * 100
    cumulativeProfit += dailyProfit

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      dailyProfit: Number.parseFloat(dailyProfit.toFixed(2)),
      cumulativeProfit: Number.parseFloat(cumulativeProfit.toFixed(2)),
    })
  }

  return data
}

// Generate trade data based on bot activity
const generateTradeData = (bots: any[]) => {
  const data = []
  const now = new Date()

  // Calculate total trades and success rate
  const totalTrades = bots.reduce((sum, bot) => sum + bot.trades, 0) || 20 // Default if no trades
  const successfulTrades = bots.reduce((sum, bot) => sum + (bot.trades * bot.successRate) / 100, 0) || 12 // Default if no trades

  for (let i = 0; i < 10; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - i * 3)

    // Calculate wins and losses based on bot performance
    const dayTrades = Math.floor(totalTrades / 10) + Math.floor(Math.random() * 3)
    const dayWins = Math.floor(dayTrades * (successfulTrades / totalTrades))
    const dayLosses = dayTrades - dayWins

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      wins: dayWins,
      losses: dayLosses,
    })
  }

  return data.reverse() // Show oldest to newest
}

// Generate asset allocation data
const generateAssetAllocationData = (bots: any[]) => {
  // Get all unique markets from bots
  const allMarkets = new Set<string>()
  bots.forEach((bot) => {
    bot.markets.forEach((market: string) => allMarkets.add(market))
  })

  // Count how many bots trade each market
  const marketCounts: Record<string, number> = {}
  allMarkets.forEach((market) => {
    marketCounts[market] = bots.filter((bot) => bot.markets.includes(market)).length
  })

  // Convert to data array for chart
  return Object.entries(marketCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8) // Top 8 markets
}

// Generate strategy performance data
const generateStrategyPerformanceData = (bots: any[]) => {
  return bots.map((bot) => ({
    name: bot.name,
    profit: bot.profit,
    trades: bot.trades,
    successRate: bot.successRate,
  }))
}

const COLORS = ["#D4AF37", "#A67C00", "#F5E7A3", "#8B6914", "#E6C200", "#B8860B", "#DAA520", "#FFD700"]

export function AITradingPerformance() {
  const { bots, totalProfit, successRate } = useAITrading()
  const [mounted, setMounted] = useState(false)
  const [performanceData, setPerformanceData] = useState<any[]>([])
  const [tradeData, setTradeData] = useState<any[]>([])
  const [assetAllocationData, setAssetAllocationData] = useState<any[]>([])
  const [strategyPerformanceData, setStrategyPerformanceData] = useState<any[]>([])

  // Use ref to track mounted state
  const isMounted = useRef(false)
  const updateInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setMounted(true)
    isMounted.current = true

    // Generate initial data
    setPerformanceData(generatePerformanceData(bots))
    setTradeData(generateTradeData(bots))
    setAssetAllocationData(generateAssetAllocationData(bots))
    setStrategyPerformanceData(generateStrategyPerformanceData(bots))

    // Update data when bots change
    updateInterval.current = setInterval(() => {
      if (isMounted.current) {
        setPerformanceData(generatePerformanceData(bots))
        setTradeData(generateTradeData(bots))
        setAssetAllocationData(generateAssetAllocationData(bots))
        setStrategyPerformanceData(generateStrategyPerformanceData(bots))
      }
    }, 10000) // Update every 10 seconds

    return () => {
      isMounted.current = false
      if (updateInterval.current) {
        clearInterval(updateInterval.current)
        updateInterval.current = null
      }
    }
  }, [bots])

  if (!mounted) {
    return <div className="h-[400px] flex items-center justify-center">Loading charts...</div>
  }

  // Calculate metrics
  const winLossRatio =
    tradeData.reduce((sum, day) => sum + day.wins, 0) /
    Math.max(
      1,
      tradeData.reduce((sum, day) => sum + day.losses, 0),
    )

  const avgTradeDuration =
    bots.length > 0
      ? bots.reduce((sum, bot) => {
          // Calculate based on trade frequency
          const hoursByFrequency = {
            low: 12,
            medium: 6,
            high: 2,
          }
          return sum + hoursByFrequency[bot.settings.tradeFrequency]
        }, 0) / bots.length
      : 6 // Default if no bots

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profit" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profit">Profit</TabsTrigger>
          <TabsTrigger value="trades">Trades</TabsTrigger>
          <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
          <TabsTrigger value="strategies">Strategy Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="profit" className="space-y-4">
          <div className="h-[400px]">
            <Chart>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
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
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="cumulativeProfit"
                    name="Cumulative Profit"
                    stroke="#D4AF37"
                    fill="#D4AF37"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    isAnimationActive={false} // Disable animations
                  />
                  <Line
                    type="monotone"
                    dataKey="dailyProfit"
                    name="Daily Profit"
                    stroke="#A67C00"
                    strokeWidth={1}
                    dot={false}
                    isAnimationActive={false} // Disable animations
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Chart>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${totalProfit > 0 ? "text-emerald-500" : totalProfit < 0 ? "text-red-500" : ""}`}
                >
                  {totalProfit > 0 ? "+" : ""}${totalProfit.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {performanceData.length > 0 &&
                    `${performanceData[performanceData.length - 1].cumulativeProfit > 0 ? "+" : ""}$${performanceData[performanceData.length - 1].cumulativeProfit.toFixed(2)} overall`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Win/Loss Ratio</CardTitle>
                <BarChart4 className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{winLossRatio.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Higher is better</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Trade Duration</CardTitle>
                <PieChartIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgTradeDuration.toFixed(1)} hours</div>
                <p className="text-xs text-muted-foreground">Based on bot settings</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trades" className="space-y-4">
          <div className="h-[400px]">
            <Chart>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tradeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
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
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="wins" name="Winning Trades" fill="#4ade80" isAnimationActive={false} />
                  <Bar dataKey="losses" name="Losing Trades" fill="#f87171" isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </Chart>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <ArrowUp className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{successRate}%</div>
                <p className="text-xs text-muted-foreground">Of all trades</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
                <BarChart4 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bots.reduce((sum, bot) => sum + bot.trades, 0)}</div>
                <p className="text-xs text-muted-foreground">Across all bots</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Profit per Trade</CardTitle>
                <ArrowUp className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  $
                  {(
                    totalProfit /
                    Math.max(
                      1,
                      bots.reduce((sum, bot) => sum + bot.trades, 0),
                    )
                  ).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">Per completed trade</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[400px]">
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetAllocationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      isAnimationActive={false} // Disable animations
                    >
                      {assetAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} bots`, "Trading this asset"]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Chart>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                  <CardDescription>Distribution of trading assets across bots</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assetAllocationData.map((asset, index) => (
                      <div key={asset.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span>{asset.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">{asset.value} bots</span>
                          <div className="w-16 h-2 bg-muted ml-2 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${(asset.value / Math.max(...assetAllocationData.map((a) => a.value))) * 100}%`,
                                backgroundColor: COLORS[index % COLORS.length],
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Diversification Score</CardTitle>
                  <CardDescription>How well your portfolio is diversified</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <div className="text-4xl font-bold text-primary">
                      {Math.min(100, Math.round(assetAllocationData.length * 12.5))}%
                    </div>
                  </div>
                  <div className="w-full h-2 bg-muted mt-4 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${Math.min(100, Math.round(assetAllocationData.length * 12.5))}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    {assetAllocationData.length} different assets traded
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-4">
          <div className="h-[400px]">
            <Chart>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={strategyPerformanceData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: "hsl(var(--border))" }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: "hsl(var(--border))" }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                    formatter={(value, name) => {
                      if (name === "profit") return [`$${value.toFixed(2)}`, "Profit"]
                      if (name === "successRate") return [`${value}%`, "Success Rate"]
                      return [value, name]
                    }}
                  />
                  <Legend />
                  <Bar dataKey="profit" name="Profit ($)" fill="#D4AF37" isAnimationActive={false} />
                  <Bar dataKey="successRate" name="Success Rate (%)" fill="#A67C00" isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </Chart>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Strategy</CardTitle>
                <CardDescription>Based on total profit</CardDescription>
              </CardHeader>
              <CardContent>
                {strategyPerformanceData.length > 0 ? (
                  <div className="space-y-2">
                    <div className="text-xl font-bold">
                      {strategyPerformanceData.sort((a, b) => b.profit - a.profit)[0]?.name || "No data"}
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-muted-foreground mr-2">Profit:</span>
                      <span className="font-medium text-emerald-500">
                        ${strategyPerformanceData.sort((a, b) => b.profit - a.profit)[0]?.profit.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-muted-foreground mr-2">Success Rate:</span>
                      <span className="font-medium">
                        {strategyPerformanceData.sort((a, b) => b.profit - a.profit)[0]?.successRate || "0"}%
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-muted-foreground mr-2">Trades:</span>
                      <span className="font-medium">
                        {strategyPerformanceData.sort((a, b) => b.profit - a.profit)[0]?.trades || "0"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">No strategies available</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Reliable Strategy</CardTitle>
                <CardDescription>Based on success rate</CardDescription>
              </CardHeader>
              <CardContent>
                {strategyPerformanceData.length > 0 ? (
                  <div className="space-y-2">
                    <div className="text-xl font-bold">
                      {strategyPerformanceData.sort((a, b) => b.successRate - a.successRate)[0]?.name || "No data"}
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-muted-foreground mr-2">Success Rate:</span>
                      <span className="font-medium text-emerald-500">
                        {strategyPerformanceData.sort((a, b) => b.successRate - a.successRate)[0]?.successRate || "0"}%
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-muted-foreground mr-2">Profit:</span>
                      <span className="font-medium">
                        $
                        {strategyPerformanceData.sort((a, b) => b.successRate - a.successRate)[0]?.profit.toFixed(2) ||
                          "0.00"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-muted-foreground mr-2">Trades:</span>
                      <span className="font-medium">
                        {strategyPerformanceData.sort((a, b) => b.successRate - a.successRate)[0]?.trades || "0"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">No strategies available</div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

