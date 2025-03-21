"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Zap } from "lucide-react"
import { useAITrading } from "@/contexts/ai-trading-context"
import { toast } from "@/hooks/use-toast"

export function CreateBotDialog() {
  const { createBot } = useAITrading()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    riskLevel: "medium" as "low" | "medium" | "high",
    maxTradeAmount: 500,
    tradeFrequency: "medium" as "low" | "medium" | "high",
    stopLoss: 5,
    takeProfit: 10,
    markets: [] as string[],
  })

  // Add form validation state
  const [formErrors, setFormErrors] = useState({
    name: false,
    description: false,
    markets: false,
    settings: false,
  })

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({
          name: "",
          description: "",
          riskLevel: "medium",
          maxTradeAmount: 500,
          tradeFrequency: "medium",
          stopLoss: 5,
          takeProfit: 10,
          markets: [],
        })
        setFormErrors({
          name: false,
          description: false,
          markets: false,
          settings: false,
        })
      }, 100)
    }
  }, [isOpen])

  const availableMarkets = {
    crypto: ["BTC", "ETH", "SOL", "ADA", "XRP", "DOT", "DOGE", "SHIB"],
    stocks: ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "JPM"],
    indices: ["SPX", "DJI", "IXIC", "RUT", "FTSE", "DAX"],
  }

  const handleCreateBot = () => {
    // Reset errors
    const errors = {
      name: !formData.name,
      description: !formData.description,
      markets: formData.markets.length === 0,
      settings: formData.stopLoss >= formData.takeProfit,
    }

    setFormErrors(errors)

    // Check if there are any errors
    if (Object.values(errors).some(Boolean)) {
      toast({
        title: "Validation Error",
        description: "Please correct the highlighted fields before creating the bot.",
        variant: "destructive",
      })
      return
    }

    // Create the bot with the form data
    createBot({
      name: formData.name,
      description: formData.description,
      status: "inactive",
      profit: 0,
      profitPercent: 0,
      trades: 0,
      successRate: 0,
      markets: formData.markets,
      settings: {
        riskLevel: formData.riskLevel,
        maxTradeAmount: formData.maxTradeAmount,
        tradeFrequency: formData.tradeFrequency,
        stopLoss: formData.stopLoss,
        takeProfit: formData.takeProfit,
        allowedMarkets: formData.markets,
      },
    })

    // Close the dialog
    setIsOpen(false)
  }

  const toggleMarket = (market: string) => {
    if (formData.markets.includes(market)) {
      setFormData({
        ...formData,
        markets: formData.markets.filter((m) => m !== market),
      })
    } else {
      setFormData({
        ...formData,
        markets: [...formData.markets, market],
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center justify-center p-6 border-dashed border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors h-full">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Create New Bot</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">Design a custom AI trading strategy</p>
          <Button>Create Bot</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create AI Trading Bot</DialogTitle>
          <DialogDescription>
            Configure your new automated trading bot. You can customize its strategy and risk parameters.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bot-name">Bot Name</Label>
              <Input
                id="bot-name"
                placeholder="e.g., Crypto Momentum Trader"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={formErrors.name ? "border-red-500" : ""}
              />
              {formErrors.name && <p className="text-xs text-red-500">Bot name is required</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="risk-level">Risk Level</Label>
              <select
                id="risk-level"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.riskLevel}
                onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value as "low" | "medium" | "high" })}
              >
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Brief description of the bot's strategy"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={formErrors.description ? "border-red-500" : ""}
            />
            {formErrors.description && <p className="text-xs text-red-500">Description is required</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max-trade">Max Trade Amount ($)</Label>
              <Input
                id="max-trade"
                type="number"
                value={formData.maxTradeAmount}
                onChange={(e) => setFormData({ ...formData, maxTradeAmount: Number.parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trade-frequency">Trade Frequency</Label>
              <select
                id="trade-frequency"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.tradeFrequency}
                onChange={(e) =>
                  setFormData({ ...formData, tradeFrequency: e.target.value as "low" | "medium" | "high" })
                }
              >
                <option value="low">Low (Few trades per day)</option>
                <option value="medium">Medium (Several trades per day)</option>
                <option value="high">High (Many trades per day)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="stop-loss">Stop Loss (%)</Label>
                <span className="text-sm text-muted-foreground">{formData.stopLoss}%</span>
              </div>
              <Slider
                id="stop-loss"
                min={1}
                max={20}
                step={1}
                value={[formData.stopLoss]}
                onValueChange={(value) => setFormData({ ...formData, stopLoss: value[0] })}
                className={formErrors.settings ? "border-red-500" : ""}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="take-profit">Take Profit (%)</Label>
                <span className="text-sm text-muted-foreground">{formData.takeProfit}%</span>
              </div>
              <Slider
                id="take-profit"
                min={1}
                max={30}
                step={1}
                value={[formData.takeProfit]}
                onValueChange={(value) => setFormData({ ...formData, takeProfit: value[0] })}
                className={formErrors.settings ? "border-red-500" : ""}
              />
            </div>
            {formErrors.settings && (
              <p className="text-xs text-red-500 col-span-2">Stop loss must be lower than take profit</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Markets to Trade</Label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Cryptocurrencies</h4>
                <div className="space-y-2">
                  {availableMarkets.crypto.map((market) => (
                    <div key={market} className="flex items-center space-x-2">
                      <Checkbox
                        id={`market-${market}`}
                        checked={formData.markets.includes(market)}
                        onCheckedChange={() => toggleMarket(market)}
                      />
                      <label
                        htmlFor={`market-${market}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {market}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Stocks</h4>
                <div className="space-y-2">
                  {availableMarkets.stocks.map((market) => (
                    <div key={market} className="flex items-center space-x-2">
                      <Checkbox
                        id={`market-${market}`}
                        checked={formData.markets.includes(market)}
                        onCheckedChange={() => toggleMarket(market)}
                      />
                      <label
                        htmlFor={`market-${market}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {market}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Indices</h4>
                <div className="space-y-2">
                  {availableMarkets.indices.map((market) => (
                    <div key={market} className="flex items-center space-x-2">
                      <Checkbox
                        id={`market-${market}`}
                        checked={formData.markets.includes(market)}
                        onCheckedChange={() => toggleMarket(market)}
                      />
                      <label
                        htmlFor={`market-${market}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {market}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {formErrors.markets && <p className="text-xs text-red-500">Please select at least one market</p>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateBot}>Create Bot</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

