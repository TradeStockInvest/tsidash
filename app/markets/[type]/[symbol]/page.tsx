"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowUp, ArrowDown, Clock, TrendingUp, BarChart4, LineChart, CandlestickChart, Download } from "lucide-react"
import { Chart } from "@/components/ui/chart"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

// Generate random historical data
const generateHistoricalData = (days: number, startPrice: number) => {
  const data = []
  const now = new Date()
  let price = startPrice

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Random price movement between -3% and +3%
    const change = (Math.random() * 6 - 3) / 100
    price = price * (1 + change)

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      price: price,
      volume: Math.floor(Math.random() * 10000000) + 1000000,
    })
  }

  return data
}

export default function MarketDetailPage() {
  const params = useParams()
  const { type, symbol } = params

  const [mounted, setMounted] = useState(false)
  const [historicalData, setHistoricalData] = useState([])
  const [marketData, setMarketData] = useState({
    name: "",
    price: 0,
    change: 0,
    changePercent: 0,
    open: 0,
    high: 0,
    low: 0,
    volume: "",
    marketCap: "",
  })

  useEffect(() => {
    setMounted(true)

    // Simulate fetching market data
    let price = 0
    let name = ""

    if (type === "stocks") {
      if (symbol === "AAPL") {
        name = "Apple Inc"
        price = 182.63
      } else if (symbol === "MSFT") {
        name = "Microsoft Corp"
        price = 337.22
      } else {
        name = `${symbol} Stock`
        price = Math.random() * 500 + 50
      }
    } else if (type === "crypto") {
      if (symbol === "BTC") {
        name = "Bitcoin"
        price = 35420.5
      } else if (symbol === "ETH") {
        name = "Ethereum"
        price = 1850.75
      } else {
        name = `${symbol} Crypto`
        price = Math.random() * 1000 + 10
      }
    } else {
      name = `${symbol} Index`
      price = Math.random() * 5000 + 1000
    }

    const change = Math.random() * 10 - 5
    const changePercent = (change / price) * 100

    setMarketData({
      name,
      price,
      change,
      changePercent,
      open: price * (1 - Math.random() * 0.02),
      high: price * (1 + Math.random() * 0.03),
      low: price * (1 - Math.random() * 0.03),
      volume: `${Math.floor(Math.random() * 100) + 10}M`,
      marketCap: type === "indices" ? "N/A" : `$${Math.floor(Math.random() * 1000) + 10}B`,
    })

    setHistoricalData(generateHistoricalData(30, price))
  }, [type, symbol])

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-6">
            <div className="flex flex-col gap-4 md:gap-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">{symbol}</h1>
                    <span className="text-muted-foreground">{marketData.name}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-bold">${marketData.price.toLocaleString()}</span>
                    <span
                      className={`flex items-center ${marketData.change >= 0 ? "text-emerald-500" : "text-red-500"}`}
                    >
                      {marketData.change >= 0 ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      )}
                      ${Math.abs(marketData.change).toFixed(2)} ({Math.abs(marketData.changePercent).toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button>Buy</Button>
                  <Button variant="outline">Sell</Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Open</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${marketData.open.toFixed(2)}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">High</CardTitle>
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${marketData.high.toFixed(2)}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Low</CardTitle>
                    <ArrowDown className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${marketData.low.toFixed(2)}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Volume</CardTitle>
                    <BarChart4 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{marketData.volume}</div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="chart" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="chart">Chart</TabsTrigger>
                  <TabsTrigger value="trade">Trade</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="news">News</TabsTrigger>
                </TabsList>
                <TabsContent value="chart" className="space-y-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Price Chart</CardTitle>
                        <CardDescription>Historical price data for {symbol}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          1D
                        </Button>
                        <Button variant="outline" size="sm">
                          1W
                        </Button>
                        <Button variant="outline" size="sm">
                          1M
                        </Button>
                        <Button variant="outline" size="sm">
                          1Y
                        </Button>
                        <Button variant="outline" size="icon" className="ml-2">
                          <LineChart className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <CandlestickChart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px]">
                        <Chart>
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsLineChart data={historicalData}>
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
                                formatter={(value) => [`$${value.toLocaleString()}`, "Price"]}
                              />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#D4AF37"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 6 }}
                              />
                            </RechartsLineChart>
                          </ResponsiveContainer>
                        </Chart>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="trade" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Buy {symbol}</CardTitle>
                        <CardDescription>Place a buy order for {symbol}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="buy-amount">Amount</Label>
                            <div className="flex gap-2">
                              <Input id="buy-amount" type="number" placeholder="0.00" />
                              <Button variant="outline" className="w-20">
                                Max
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="buy-price">Price</Label>
                            <Input id="buy-price" type="number" value={marketData.price.toFixed(2)} readOnly />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="buy-total">Total</Label>
                            <div className="flex items-center gap-2">
                              <Input id="buy-total" type="number" placeholder="0.00" readOnly />
                              <span className="text-muted-foreground">USD</span>
                            </div>
                          </div>
                          <Button className="w-full">Buy {symbol}</Button>
                        </form>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Sell {symbol}</CardTitle>
                        <CardDescription>Place a sell order for {symbol}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="sell-amount">Amount</Label>
                            <div className="flex gap-2">
                              <Input id="sell-amount" type="number" placeholder="0.00" />
                              <Button variant="outline" className="w-20">
                                Max
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="sell-price">Price</Label>
                            <Input id="sell-price" type="number" value={marketData.price.toFixed(2)} readOnly />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="sell-total">Total</Label>
                            <div className="flex items-center gap-2">
                              <Input id="sell-total" type="number" placeholder="0.00" readOnly />
                              <span className="text-muted-foreground">USD</span>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full">
                            Sell {symbol}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="details" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Market Details</CardTitle>
                      <CardDescription>Detailed information about {symbol}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Symbol</span>
                            <span className="font-medium">{symbol}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Name</span>
                            <span className="font-medium">{marketData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Current Price</span>
                            <span className="font-medium">${marketData.price.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Market Cap</span>
                            <span className="font-medium">{marketData.marketCap}</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">24h High</span>
                            <span className="font-medium">${marketData.high.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">24h Low</span>
                            <span className="font-medium">${marketData.low.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">24h Volume</span>
                            <span className="font-medium">{marketData.volume}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">24h Change</span>
                            <span
                              className={`font-medium ${marketData.change >= 0 ? "text-emerald-500" : "text-red-500"}`}
                            >
                              {marketData.change >= 0 ? "+" : ""}
                              {marketData.change.toFixed(2)} ({marketData.changePercent.toFixed(2)}%)
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="news" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Latest News</CardTitle>
                      <CardDescription>Recent news and updates about {symbol}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="flex gap-4 pb-4 border-b last:border-0">
                            <div className="w-16 h-16 bg-muted rounded-md flex-shrink-0"></div>
                            <div className="space-y-1">
                              <h3 className="font-medium">Latest updates on {symbol} performance</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>Financial Times</span>
                                <span>•</span>
                                <span>2 hours ago</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

