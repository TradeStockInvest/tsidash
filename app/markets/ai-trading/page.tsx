"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, BarChart4, TrendingUp, Clock, Download } from "lucide-react"
import { AITradingBotCard } from "@/components/markets/ai-trading-bot-card"
import { AITradingPerformance } from "@/components/markets/ai-trading-performance"
import { AITradingProvider, useAITrading } from "@/contexts/ai-trading-context"
import { CreateBotDialog } from "@/components/markets/create-bot-dialog"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

function AITradingContent() {
  const { bots, isLoading, activeBotCount, totalProfit, successRate } = useAITrading()
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "paused" | "inactive">("all")

  const filteredBots = bots.filter((bot) => {
    if (filterStatus === "all") return true
    return bot.status === filterStatus
  })

  const handleExport = () => {
    // Create CSV data
    const headers = ["Name", "Status", "Profit", "Success Rate", "Trades", "Markets"]
    const rows = bots.map((bot) => [
      bot.name,
      bot.status,
      `$${bot.profit.toFixed(2)}`,
      `${bot.successRate}%`,
      bot.trades,
      bot.markets.join(", "),
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `ai-trading-bots-${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Use setTimeout to delay the toast until after render
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your AI trading bot data has been exported to CSV.",
      })
    }, 0)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Trading</h1>
          <p className="text-muted-foreground">Automated trading strategies powered by artificial intelligence</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <select
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
          >
            <option value="all">All Bots</option>
            <option value="active">Active Bots</option>
            <option value="paused">Paused Bots</option>
            <option value="inactive">Inactive Bots</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bots</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeBotCount}</div>
            <p className="text-xs text-muted-foreground">Out of {bots.length} available bots</p>
          </CardContent>
        </Card>
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
              {totalProfit > 0 ? "+" : ""}
              {(totalProfit / 100).toFixed(1)}% overall return
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <BarChart4 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate}%</div>
            <p className="text-xs text-muted-foreground">
              Based on {bots.reduce((sum, bot) => sum + bot.trades, 0)} trades
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bots.length > 0 ? "18" : "0"} days</div>
            <p className="text-xs text-muted-foreground">Since first activation</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bots" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bots">My Bots</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="import">Import Data</TabsTrigger>
        </TabsList>
        <TabsContent value="bots" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBots.map((bot) => (
              <AITradingBotCard key={bot.id} bot={bot} />
            ))}
            <CreateBotDialog />
          </div>

          {filteredBots.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                No bots found. Create your first AI trading bot to get started!
              </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trading Performance</CardTitle>
              <CardDescription>Overall performance of your AI trading bots</CardDescription>
            </CardHeader>
            <CardContent>
              <AITradingPerformance />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="import" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Import Historical Data</CardTitle>
              <CardDescription>Import historical market data for AI analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="data-source">Data Source</Label>
                  <select
                    id="data-source"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select data source</option>
                    <option value="yahoo">Yahoo Finance</option>
                    <option value="alpha">Alpha Vantage</option>
                    <option value="binance">Binance</option>
                    <option value="coinbase">Coinbase</option>
                    <option value="custom">Custom CSV</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input id="symbol" placeholder="e.g., AAPL, BTC-USD" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => {
                  // Use setTimeout to delay the toast until after render
                  setTimeout(() => {
                    toast({
                      title: "Data Import Started",
                      description: "Your historical data is being imported and processed.",
                    })
                  }, 0)
                }}
              >
                Import Data
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function AITradingPage() {
  return (
    <DashboardLayout>
      <AITradingProvider>
        <AITradingContent />
      </AITradingProvider>
    </DashboardLayout>
  )
}

