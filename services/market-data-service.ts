// Types for market data
export interface MarketAsset {
  symbol: string
  name: string
  price: number
  previousPrice: number
  change: number
  changePercent: number
  volume: string
  marketCap: string
  lastUpdate: Date
}

// Initial market data
const initialStocksData: MarketAsset[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc",
    price: 182.63,
    previousPrice: 182.63,
    change: 0,
    changePercent: 0,
    volume: "45.2M",
    marketCap: "2.87T",
    lastUpdate: new Date(),
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp",
    price: 337.22,
    previousPrice: 337.22,
    change: 0,
    changePercent: 0,
    volume: "23.1M",
    marketCap: "2.51T",
    lastUpdate: new Date(),
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc",
    price: 142.56,
    previousPrice: 142.56,
    change: 0,
    changePercent: 0,
    volume: "18.7M",
    marketCap: "1.82T",
    lastUpdate: new Date(),
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc",
    price: 178.22,
    previousPrice: 178.22,
    change: 0,
    changePercent: 0,
    volume: "32.5M",
    marketCap: "1.85T",
    lastUpdate: new Date(),
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp",
    price: 824.18,
    previousPrice: 824.18,
    change: 0,
    changePercent: 0,
    volume: "51.3M",
    marketCap: "2.03T",
    lastUpdate: new Date(),
  },
  {
    symbol: "META",
    name: "Meta Platforms",
    price: 472.22,
    previousPrice: 472.22,
    change: 0,
    changePercent: 0,
    volume: "15.8M",
    marketCap: "1.21T",
    lastUpdate: new Date(),
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc",
    price: 198.45,
    previousPrice: 198.45,
    change: 0,
    changePercent: 0,
    volume: "28.4M",
    marketCap: "631.2B",
    lastUpdate: new Date(),
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase",
    price: 183.27,
    previousPrice: 183.27,
    change: 0,
    changePercent: 0,
    volume: "8.3M",
    marketCap: "528.5B",
    lastUpdate: new Date(),
  },
]

const initialCryptoData: MarketAsset[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 35420.5,
    previousPrice: 35420.5,
    change: 0,
    changePercent: 0,
    volume: "24.5B",
    marketCap: "692.8B",
    lastUpdate: new Date(),
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 1850.75,
    previousPrice: 1850.75,
    change: 0,
    changePercent: 0,
    volume: "12.3B",
    marketCap: "222.4B",
    lastUpdate: new Date(),
  },
  {
    symbol: "BNB",
    name: "Binance Coin",
    price: 342.18,
    previousPrice: 342.18,
    change: 0,
    changePercent: 0,
    volume: "1.2B",
    marketCap: "52.8B",
    lastUpdate: new Date(),
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 124.56,
    previousPrice: 124.56,
    change: 0,
    changePercent: 0,
    volume: "3.5B",
    marketCap: "53.2B",
    lastUpdate: new Date(),
  },
  {
    symbol: "ADA",
    name: "Cardano",
    price: 0.45,
    previousPrice: 0.45,
    change: 0,
    changePercent: 0,
    volume: "428.3M",
    marketCap: "15.9B",
    lastUpdate: new Date(),
  },
  {
    symbol: "XRP",
    name: "XRP",
    price: 0.52,
    previousPrice: 0.52,
    change: 0,
    changePercent: 0,
    volume: "1.8B",
    marketCap: "28.3B",
    lastUpdate: new Date(),
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.12,
    previousPrice: 0.12,
    change: 0,
    changePercent: 0,
    volume: "2.1B",
    marketCap: "16.2B",
    lastUpdate: new Date(),
  },
  {
    symbol: "DOT",
    name: "Polkadot",
    price: 6.78,
    previousPrice: 6.78,
    change: 0,
    changePercent: 0,
    volume: "342.5M",
    marketCap: "8.5B",
    lastUpdate: new Date(),
  },
]

const initialIndicesData: MarketAsset[] = [
  {
    symbol: "SPX",
    name: "S&P 500",
    price: 5021.84,
    previousPrice: 5021.84,
    change: 0,
    changePercent: 0,
    volume: "2.1B",
    marketCap: "N/A",
    lastUpdate: new Date(),
  },
  {
    symbol: "DJI",
    name: "Dow Jones",
    price: 38996.35,
    previousPrice: 38996.35,
    change: 0,
    changePercent: 0,
    volume: "345.2M",
    marketCap: "N/A",
    lastUpdate: new Date(),
  },
  {
    symbol: "IXIC",
    name: "NASDAQ",
    price: 15982.08,
    previousPrice: 15982.08,
    change: 0,
    changePercent: 0,
    volume: "4.8B",
    marketCap: "N/A",
    lastUpdate: new Date(),
  },
  {
    symbol: "RUT",
    name: "Russell 2000",
    price: 2018.56,
    previousPrice: 2018.56,
    change: 0,
    changePercent: 0,
    volume: "856.3M",
    marketCap: "N/A",
    lastUpdate: new Date(),
  },
  {
    symbol: "FTSE",
    name: "FTSE 100",
    price: 7682.75,
    previousPrice: 7682.75,
    change: 0,
    changePercent: 0,
    volume: "623.5M",
    marketCap: "N/A",
    lastUpdate: new Date(),
  },
  {
    symbol: "DAX",
    name: "DAX",
    price: 17842.35,
    previousPrice: 17842.35,
    change: 0,
    changePercent: 0,
    volume: "78.2M",
    marketCap: "N/A",
    lastUpdate: new Date(),
  },
  {
    symbol: "N225",
    name: "Nikkei 225",
    price: 38262.16,
    previousPrice: 38262.16,
    change: 0,
    changePercent: 0,
    volume: "1.2B",
    marketCap: "N/A",
    lastUpdate: new Date(),
  },
  {
    symbol: "HSI",
    name: "Hang Seng",
    price: 16589.42,
    previousPrice: 16589.42,
    change: 0,
    changePercent: 0,
    volume: "1.8B",
    marketCap: "N/A",
    lastUpdate: new Date(),
  },
]

// Market data class
class MarketDataService {
  private stocksData: MarketAsset[] = [...initialStocksData]
  private cryptoData: MarketAsset[] = [...initialCryptoData]
  private indicesData: MarketAsset[] = [...initialIndicesData]
  private subscribers: Map<string, Set<(data: MarketAsset[]) => void>> = new Map()
  private updateIntervals: Map<string, NodeJS.Timeout> = new Map()
  private isRunning = false

  constructor() {
    // Initialize with default data
    this.startUpdates()
  }

  // Start real-time updates
  startUpdates() {
    if (this.isRunning) return
    this.isRunning = true

    // Update stocks every 3 seconds
    const stocksInterval = setInterval(() => {
      this.updatePrices(this.stocksData)
      this.notifySubscribers("stocks")
    }, 3000)
    this.updateIntervals.set("stocks", stocksInterval)

    // Update crypto every 1 second (more volatile)
    const cryptoInterval = setInterval(() => {
      this.updatePrices(this.cryptoData, 0.5) // More volatile
      this.notifySubscribers("crypto")
    }, 1000)
    this.updateIntervals.set("crypto", cryptoInterval)

    // Update indices every 5 seconds
    const indicesInterval = setInterval(() => {
      this.updatePrices(this.indicesData, 0.1) // Less volatile
      this.notifySubscribers("indices")
    }, 5000)
    this.updateIntervals.set("indices", indicesInterval)
  }

  // Stop updates (for cleanup)
  stopUpdates() {
    this.isRunning = false
    this.updateIntervals.forEach((interval) => {
      clearInterval(interval)
    })
    this.updateIntervals.clear()
  }

  // Update prices with random changes
  private updatePrices(assets: MarketAsset[], volatilityFactor = 0.2) {
    assets.forEach((asset) => {
      // Store previous price
      asset.previousPrice = asset.price

      // Random price change between -volatility% and +volatility%
      const changePercent = Math.random() * volatilityFactor * 2 - volatilityFactor
      const newPrice = asset.price * (1 + changePercent)

      // Update asset data
      asset.price = Number.parseFloat(newPrice.toFixed(2))
      asset.change = Number.parseFloat((asset.price - asset.previousPrice).toFixed(2))
      asset.changePercent = Number.parseFloat(((asset.change / asset.previousPrice) * 100).toFixed(2))
      asset.lastUpdate = new Date()

      // Update volume (random increase)
      const volumeUnit = asset.volume.slice(-1)
      const volumeValue = Number.parseFloat(asset.volume.slice(0, -1))
      const newVolume = volumeValue + Math.random() * 0.1
      asset.volume = `${newVolume.toFixed(1)}${volumeUnit}`
    })
  }

  // Subscribe to updates
  subscribe(type: "stocks" | "crypto" | "indices", callback: (data: MarketAsset[]) => void) {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, new Set())
    }

    const subscribers = this.subscribers.get(type)
    if (subscribers) {
      subscribers.add(callback)
    }

    // Immediately send current data
    callback(this.getData(type))

    // Return unsubscribe function
    return () => {
      const currentSubscribers = this.subscribers.get(type)
      if (currentSubscribers) {
        currentSubscribers.delete(callback)
      }
    }
  }

  // Notify subscribers of updates
  private notifySubscribers(type: string) {
    const subscribers = this.subscribers.get(type)
    if (!subscribers) return

    const data = this.getData(type as "stocks" | "crypto" | "indices")
    subscribers.forEach((callback) => {
      callback(data)
    })
  }

  // Get current data
  getData(type: "stocks" | "crypto" | "indices"): MarketAsset[] {
    switch (type) {
      case "stocks":
        return [...this.stocksData]
      case "crypto":
        return [...this.cryptoData]
      case "indices":
        return [...this.indicesData]
      default:
        return []
    }
  }

  // Get trending data (mix of all types)
  getTrendingData(): MarketAsset[] {
    // Get top performers from each category
    const topStocks = [...this.stocksData]
      .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
      .slice(0, 3)
    const topCrypto = [...this.cryptoData]
      .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
      .slice(0, 3)
    const topIndices = [...this.indicesData]
      .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
      .slice(0, 2)

    // Combine and sort by absolute change percentage
    return [...topStocks, ...topCrypto, ...topIndices].sort(
      (a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent),
    )
  }
}

// Create singleton instance
const marketDataService = new MarketDataService()

export default marketDataService

