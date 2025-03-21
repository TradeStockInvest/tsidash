"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"
import { toast } from "@/hooks/use-toast"

export interface AITradingBot {
  id: string
  name: string
  description: string
  status: "active" | "inactive" | "paused"
  profit: number
  profitPercent: number
  trades: number
  successRate: number
  markets: string[]
  createdAt: Date
  lastUpdated: Date
  settings: {
    riskLevel: "low" | "medium" | "high"
    maxTradeAmount: number
    tradeFrequency: "low" | "medium" | "high"
    stopLoss: number
    takeProfit: number
    allowedMarkets: string[]
  }
}

interface AITradingContextType {
  bots: AITradingBot[]
  isLoading: boolean
  activeBotCount: number
  totalProfit: number
  successRate: number
  startBot: (id: string) => void
  pauseBot: (id: string) => void
  updateBotSettings: (id: string, settings: Partial<AITradingBot["settings"]>) => void
  createBot: (bot: Omit<AITradingBot, "id" | "createdAt" | "lastUpdated">) => void
  deleteBot: (id: string) => void
}

const AITradingContext = createContext<AITradingContextType | undefined>(undefined)

// Initial bots data
const initialBots: AITradingBot[] = [
  {
    id: "bot1",
    name: "Crypto Momentum",
    description: "Follows momentum indicators for crypto trading",
    status: "active",
    profit: 845.22,
    profitPercent: 12.4,
    trades: 48,
    successRate: 72,
    markets: ["BTC", "ETH", "SOL"],
    createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000), // 18 days ago
    lastUpdated: new Date(),
    settings: {
      riskLevel: "medium",
      maxTradeAmount: 500,
      tradeFrequency: "medium",
      stopLoss: 5,
      takeProfit: 10,
      allowedMarkets: ["BTC", "ETH", "SOL", "ADA", "DOT"],
    },
  },
  {
    id: "bot2",
    name: "Stock Swing Trader",
    description: "Captures short-term price swings in stocks",
    status: "active",
    profit: 325.18,
    profitPercent: 5.8,
    trades: 62,
    successRate: 65,
    markets: ["AAPL", "MSFT", "GOOGL", "AMZN"],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    lastUpdated: new Date(),
    settings: {
      riskLevel: "medium",
      maxTradeAmount: 1000,
      tradeFrequency: "high",
      stopLoss: 3,
      takeProfit: 8,
      allowedMarkets: ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA"],
    },
  },
  {
    id: "bot3",
    name: "Index Trend Follower",
    description: "Follows major index trends with low risk",
    status: "active",
    profit: 74.92,
    profitPercent: 2.1,
    trades: 14,
    successRate: 64,
    markets: ["SPX", "DJI", "IXIC"],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    lastUpdated: new Date(),
    settings: {
      riskLevel: "low",
      maxTradeAmount: 2000,
      tradeFrequency: "low",
      stopLoss: 2,
      takeProfit: 5,
      allowedMarkets: ["SPX", "DJI", "IXIC", "RUT", "FTSE"],
    },
  },
  {
    id: "bot4",
    name: "Meme Coin Hunter",
    description: "Identifies and trades emerging meme coins",
    status: "inactive",
    profit: 0,
    profitPercent: 0,
    trades: 0,
    successRate: 0,
    markets: ["DOGE", "SHIB", "PEPE"],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    lastUpdated: new Date(),
    settings: {
      riskLevel: "high",
      maxTradeAmount: 300,
      tradeFrequency: "high",
      stopLoss: 10,
      takeProfit: 20,
      allowedMarkets: ["DOGE", "SHIB", "PEPE", "FLOKI", "BONK"],
    },
  },
]

export function AITradingProvider({ children }: { children: ReactNode }) {
  const [bots, setBots] = useState<AITradingBot[]>(initialBots)
  const [isLoading, setIsLoading] = useState(true)
  const isMounted = useRef(true)
  const simulationInterval = useRef<NodeJS.Timeout | null>(null)
  const loadingTimeout = useRef<NodeJS.Timeout | null>(null)

  // Calculate derived stats
  const activeBotCount = bots.filter((bot) => bot.status === "active").length
  const totalProfit = bots.reduce((sum, bot) => sum + bot.profit, 0)
  const totalTrades = bots.reduce((sum, bot) => sum + bot.trades, 0)
  const successfulTrades = bots.reduce((sum, bot) => sum + (bot.trades * bot.successRate) / 100, 0)
  const successRate = totalTrades > 0 ? Math.round((successfulTrades / totalTrades) * 100) : 0

  // Simulate bot activity
  useEffect(() => {
    setIsLoading(true)
    isMounted.current = true

    // Simulate loading
    loadingTimeout.current = setTimeout(() => {
      if (isMounted.current) {
        setIsLoading(false)
      }
    }, 1000)

    // Start simulation for active bots
    simulationInterval.current = setInterval(() => {
      if (isMounted.current) {
        setBots((prevBots) => {
          return prevBots.map((bot) => {
            if (bot.status !== "active") return bot

            // Simulate trading activity
            const newTrade = Math.random() > 0.7 // 30% chance of new trade
            if (!newTrade) return bot

            // Determine if trade was successful
            const successful = Math.random() < bot.successRate / 100

            // Calculate profit/loss
            const tradeAmount = Math.random() * bot.settings.maxTradeAmount
            const profitLoss = successful
              ? tradeAmount * (bot.settings.takeProfit / 100)
              : -tradeAmount * (bot.settings.stopLoss / 100)

            // Update bot stats
            const newTrades = bot.trades + 1
            const newProfit = bot.profit + profitLoss
            const newSuccessRate = (((bot.successRate / 100) * bot.trades + (successful ? 1 : 0)) / newTrades) * 100
            const newProfitPercent = (newProfit / (bot.profit > 0 ? bot.profit : 100)) * 100

            return {
              ...bot,
              trades: newTrades,
              profit: Number.parseFloat(newProfit.toFixed(2)),
              profitPercent: Number.parseFloat(newProfitPercent.toFixed(1)),
              successRate: Number.parseFloat(newSuccessRate.toFixed(0)),
              lastUpdated: new Date(),
            }
          })
        })
      }
    }, 5000) // Update every 5 seconds

    return () => {
      isMounted.current = false

      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current)
        loadingTimeout.current = null
      }

      if (simulationInterval.current) {
        clearInterval(simulationInterval.current)
        simulationInterval.current = null
      }
    }
  }, [])

  // Enhance the startBot function to initialize new bots with realistic data
  const startBot = (id: string) => {
    if (!isMounted.current) return

    setBots((prevBots) => {
      const updatedBots = prevBots.map((bot) => {
        if (bot.id === id) {
          // If this is a new bot with no trades, initialize with some data
          if (bot.trades === 0) {
            // Generate initial success rate based on risk level
            const initialSuccessRate = {
              low: 70 + Math.floor(Math.random() * 10),
              medium: 60 + Math.floor(Math.random() * 15),
              high: 50 + Math.floor(Math.random() * 20),
            }[bot.settings.riskLevel]

            // Generate initial trades based on frequency
            const initialTrades = {
              low: 1 + Math.floor(Math.random() * 3),
              medium: 3 + Math.floor(Math.random() * 5),
              high: 5 + Math.floor(Math.random() * 8),
            }[bot.settings.tradeFrequency]

            return {
              ...bot,
              status: "active",
              lastUpdated: new Date(),
              // Add initial trades and success rate
              trades: initialTrades,
              successRate: initialSuccessRate,
            }
          }

          return { ...bot, status: "active", lastUpdated: new Date() }
        }
        return bot
      })

      // Find the bot that was updated to show in toast later
      const updatedBot = updatedBots.find((bot) => bot.id === id)

      // Schedule toast notification after state update
      if (updatedBot) {
        setTimeout(() => {
          if (isMounted.current) {
            toast({
              title: "Bot Started",
              description: `${updatedBot.name} has been activated and is now trading.`,
            })
          }
        }, 0)
      }

      return updatedBots
    })
  }

  // Pause a bot
  const pauseBot = (id: string) => {
    if (!isMounted.current) return

    setBots((prevBots) => {
      const updatedBots = prevBots.map((bot) => {
        if (bot.id === id) {
          return { ...bot, status: "paused", lastUpdated: new Date() }
        }
        return bot
      })

      // Find the bot that was updated to show in toast later
      const updatedBot = updatedBots.find((bot) => bot.id === id)

      // Schedule toast notification after state update
      if (updatedBot) {
        setTimeout(() => {
          if (isMounted.current) {
            toast({
              title: "Bot Paused",
              description: `${updatedBot.name} has been paused and is no longer trading.`,
            })
          }
        }, 0)
      }

      return updatedBots
    })
  }

  // Update bot settings
  const updateBotSettings = (id: string, settings: Partial<AITradingBot["settings"]>) => {
    if (!isMounted.current) return

    setBots((prevBots) => {
      const updatedBots = prevBots.map((bot) => {
        if (bot.id === id) {
          // Create a merged settings object
          const updatedSettings = { ...bot.settings, ...settings }

          // Apply the settings and update the bot
          return {
            ...bot,
            settings: updatedSettings,
            lastUpdated: new Date(),
          }
        }
        return bot
      })

      // Find the bot that was updated
      const updatedBot = updatedBots.find((bot) => bot.id === id)

      // Show feedback to the user
      if (updatedBot) {
        setTimeout(() => {
          if (isMounted.current) {
            toast({
              title: "Settings Updated",
              description: `Settings for ${updatedBot.name} have been updated and will be applied to future trades.`,
            })
          }
        }, 0)
      }

      return updatedBots
    })
  }

  // Create a new bot
  const createBot = (newBot: Omit<AITradingBot, "id" | "createdAt" | "lastUpdated">) => {
    if (!isMounted.current) return ""

    // Generate a unique ID with timestamp
    const timestamp = new Date().getTime()
    const botId = `bot-${timestamp}`

    // Create the bot with realistic initial data
    const botWithId: AITradingBot = {
      ...newBot,
      id: botId,
      createdAt: new Date(),
      lastUpdated: new Date(),
      // Initialize with zero values - will be updated when started
      profit: 0,
      profitPercent: 0,
      trades: 0,
      successRate: 0,
    }

    setBots((prevBots) => [...prevBots, botWithId])

    // Show feedback to the user
    setTimeout(() => {
      if (isMounted.current) {
        toast({
          title: "Bot Created",
          description: `${newBot.name} has been created successfully. You can now activate it to start trading.`,
        })
      }
    }, 0)

    return botId
  }

  // Delete a bot
  const deleteBot = (id: string) => {
    if (!isMounted.current) return

    setBots((prevBots) => {
      const botToDelete = prevBots.find((bot) => bot.id === id)
      const updatedBots = prevBots.filter((bot) => bot.id !== id)

      // Schedule toast notification after state update
      if (botToDelete) {
        setTimeout(() => {
          if (isMounted.current) {
            toast({
              title: "Bot Deleted",
              description: `${botToDelete.name} has been deleted.`,
            })
          }
        }, 0)
      }

      return updatedBots
    })
  }

  return (
    <AITradingContext.Provider
      value={{
        bots,
        isLoading,
        activeBotCount,
        totalProfit,
        successRate,
        startBot,
        pauseBot,
        updateBotSettings,
        createBot,
        deleteBot,
      }}
    >
      {children}
    </AITradingContext.Provider>
  )
}

export function useAITrading() {
  const context = useContext(AITradingContext)
  if (context === undefined) {
    throw new Error("useAITrading must be used within an AITradingProvider")
  }
  return context
}

