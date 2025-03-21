"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Settings, Play, Pause, TrendingUp, BarChart4, AlertTriangle } from "lucide-react"
import { type AITradingBot, useAITrading } from "@/contexts/ai-trading-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/hooks/use-toast"

interface AITradingBotCardProps {
  bot: AITradingBot
}

export function AITradingBotCard({ bot }: AITradingBotCardProps) {
  const { startBot, pauseBot, updateBotSettings } = useAITrading()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [settings, setSettings] = useState({ ...bot.settings })

  // Reset settings when the dialog opens or bot changes
  useEffect(() => {
    setSettings({ ...bot.settings })
  }, [bot.settings, isSettingsOpen])

  const handleStartPause = () => {
    if (bot.status === "active") {
      pauseBot(bot.id)
    } else {
      startBot(bot.id)
    }
  }

  const handleSettingsSave = () => {
    // Validate settings before saving
    if (settings.stopLoss >= settings.takeProfit) {
      toast({
        title: "Invalid Settings",
        description: "Stop loss must be lower than take profit.",
        variant: "destructive",
      })
      return
    }

    // Apply the settings update
    updateBotSettings(bot.id, settings)
    setIsSettingsOpen(false)

    // Show feedback to the user about which settings were changed
    const changedSettings = []
    if (settings.riskLevel !== bot.settings.riskLevel) changedSettings.push("Risk Level")
    if (settings.maxTradeAmount !== bot.settings.maxTradeAmount) changedSettings.push("Max Trade Amount")
    if (settings.tradeFrequency !== bot.settings.tradeFrequency) changedSettings.push("Trade Frequency")
    if (settings.stopLoss !== bot.settings.stopLoss) changedSettings.push("Stop Loss")
    if (settings.takeProfit !== bot.settings.takeProfit) changedSettings.push("Take Profit")

    if (changedSettings.length > 0) {
      setTimeout(() => {
        toast({
          title: "Settings Updated",
          description: `Updated: ${changedSettings.join(", ")}`,
        })
      }, 100)
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-1.5">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <CardTitle>{bot.name}</CardTitle>
          </div>
          <Badge
            variant="outline"
            className={`capitalize ${
              bot.status === "active"
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                : bot.status === "paused"
                  ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {bot.status}
          </Badge>
        </div>
        <CardDescription>{bot.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>Profit</span>
            </div>
            <p
              className={`text-lg font-bold ${bot.profit > 0 ? "text-emerald-500" : bot.profit < 0 ? "text-red-500" : ""}`}
            >
              {bot.profit > 0 ? "+" : ""}${bot.profit.toFixed(2)} ({bot.profitPercent > 0 ? "+" : ""}
              {bot.profitPercent}%)
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <BarChart4 className="h-3 w-3" />
              <span>Success Rate</span>
            </div>
            <p className="text-lg font-bold">
              {bot.successRate}% <span className="text-xs text-muted-foreground">({bot.trades} trades)</span>
            </p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Markets</p>
          <div className="flex flex-wrap gap-1">
            {bot.markets.map((market) => (
              <Badge key={market} variant="secondary" className="text-xs">
                {market}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Bot Settings</DialogTitle>
              <DialogDescription>Configure the trading parameters for {bot.name}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="risk-level">Risk Level</Label>
                <select
                  id="risk-level"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={settings.riskLevel}
                  onChange={(e) => setSettings({ ...settings, riskLevel: e.target.value as "low" | "medium" | "high" })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-trade">Max Trade Amount ($)</Label>
                <Input
                  id="max-trade"
                  type="number"
                  value={settings.maxTradeAmount}
                  onChange={(e) => setSettings({ ...settings, maxTradeAmount: Number.parseFloat(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trade-frequency">Trade Frequency</Label>
                <select
                  id="trade-frequency"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={settings.tradeFrequency}
                  onChange={(e) =>
                    setSettings({ ...settings, tradeFrequency: e.target.value as "low" | "medium" | "high" })
                  }
                >
                  <option value="low">Low (Few trades per day)</option>
                  <option value="medium">Medium (Several trades per day)</option>
                  <option value="high">High (Many trades per day)</option>
                </select>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="stop-loss">Stop Loss (%)</Label>
                  <span className="text-sm text-muted-foreground">{settings.stopLoss}%</span>
                </div>
                <Slider
                  id="stop-loss"
                  min={1}
                  max={20}
                  step={1}
                  value={[settings.stopLoss]}
                  onValueChange={(value) => setSettings({ ...settings, stopLoss: value[0] })}
                />
                {settings.riskLevel === "high" && settings.stopLoss < 5 && (
                  <div className="flex items-center text-amber-500 text-xs mt-1">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    <span>Low stop loss with high risk level is not recommended</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="take-profit">Take Profit (%)</Label>
                  <span className="text-sm text-muted-foreground">{settings.takeProfit}%</span>
                </div>
                <Slider
                  id="take-profit"
                  min={1}
                  max={30}
                  step={1}
                  value={[settings.takeProfit]}
                  onValueChange={(value) => setSettings({ ...settings, takeProfit: value[0] })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSettingsSave}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {bot.status === "active" ? (
          <Button variant="outline" size="sm" onClick={handleStartPause}>
            <Pause className="h-4 w-4 mr-1" />
            Pause
          </Button>
        ) : (
          <Button size="sm" onClick={handleStartPause}>
            <Play className="h-4 w-4 mr-1" />
            Start
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

