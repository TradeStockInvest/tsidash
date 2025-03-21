"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { SearchIcon, X, TrendingUp, Newspaper, BarChart2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useMarketData } from "@/hooks/use-market-data"
import { Badge } from "@/components/ui/badge"

// Mock news data
const newsData = [
  {
    id: "news1",
    title: "Bitcoin Surges Past $40,000 as Institutional Interest Grows",
    category: "Crypto",
    date: "2025-03-20",
    url: "/news/bitcoin-surges",
  },
  {
    id: "news2",
    title: "Apple Reports Record Q1 Earnings, Stock Jumps 5%",
    category: "Stocks",
    date: "2025-03-19",
    url: "/news/apple-earnings",
  },
  {
    id: "news3",
    title: "Fed Signals Potential Rate Cut in June Meeting",
    category: "Economy",
    date: "2025-03-18",
    url: "/news/fed-rate-cut",
  },
  {
    id: "news4",
    title: "Tesla Unveils New AI Trading Platform for Retail Investors",
    category: "Technology",
    date: "2025-03-17",
    url: "/news/tesla-ai-trading",
  },
  {
    id: "news5",
    title: "S&P 500 Reaches New All-Time High Amid Strong Earnings Season",
    category: "Markets",
    date: "2025-03-16",
    url: "/news/sp500-record",
  },
]

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<{
    markets: any[]
    news: any[]
  }>({
    markets: [],
    news: [],
  })
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Get market data for search
  const { data: stocksData } = useMarketData("stocks")
  const { data: cryptoData } = useMarketData("crypto")
  const { data: indicesData } = useMarketData("indices")

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
        setTimeout(() => {
          inputRef.current?.focus()
        }, 100)
      }

      // Escape to close search
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // Perform search when query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({
        markets: [],
        news: [],
      })
      return
    }

    const query = searchQuery.toLowerCase().trim()

    // Search markets (stocks, crypto, indices)
    const allMarkets = [...stocksData, ...cryptoData, ...indicesData]
    const marketResults = allMarkets
      .filter((market) => market.symbol.toLowerCase().includes(query) || market.name.toLowerCase().includes(query))
      .slice(0, 5) // Limit to 5 results

    // Search news
    const newsResults = newsData
      .filter((news) => news.title.toLowerCase().includes(query) || news.category.toLowerCase().includes(query))
      .slice(0, 3) // Limit to 3 results

    setSearchResults({
      markets: marketResults,
      news: newsResults,
    })
  }, [searchQuery, stocksData, cryptoData, indicesData])

  // Determine market type for navigation
  const getMarketType = (symbol: string) => {
    if (stocksData.some((stock) => stock.symbol === symbol)) return "stocks"
    if (cryptoData.some((crypto) => crypto.symbol === symbol)) return "crypto"
    if (indicesData.some((index) => index.symbol === symbol)) return "indices"
    return "stocks" // Default fallback
  }

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) return

    // If we have market results, navigate to the first one
    if (searchResults.markets.length > 0) {
      const firstResult = searchResults.markets[0]
      const marketType = getMarketType(firstResult.symbol)
      router.push(`/markets/${marketType}/${firstResult.symbol}`)
      setIsOpen(false)
      setSearchQuery("")
    }
    // Otherwise, navigate to search results page
    else {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search markets, symbols, news... (Ctrl+K)"
          className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-[300px]"
          onClick={() => setIsOpen(true)}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-[350px] rounded-md border bg-card shadow-lg z-50">
          <div className="p-2">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  type="search"
                  placeholder="Search markets, symbols, news..."
                  className="w-full pl-8 pr-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Clear search</span>
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className="max-h-[400px] overflow-y-auto p-2">
            {/* Markets results */}
            {searchResults.markets.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center px-2 py-1.5">
                  <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Markets</h3>
                </div>
                <div className="mt-1">
                  {searchResults.markets.map((market) => (
                    <Link
                      key={market.symbol}
                      href={`/markets/${getMarketType(market.symbol)}/${market.symbol}`}
                      onClick={() => {
                        setIsOpen(false)
                        setSearchQuery("")
                      }}
                      className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-muted"
                    >
                      <div className="flex items-center">
                        <div className="font-medium">{market.symbol}</div>
                        <div className="text-xs text-muted-foreground ml-2">{market.name}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {getMarketType(market.symbol)}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* News results */}
            {searchResults.news.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center px-2 py-1.5">
                  <Newspaper className="h-4 w-4 mr-2 text-muted-foreground" />
                  <h3 className="text-sm font-medium">News</h3>
                </div>
                <div className="mt-1">
                  {searchResults.news.map((news) => (
                    <Link
                      key={news.id}
                      href={news.url}
                      onClick={() => {
                        setIsOpen(false)
                        setSearchQuery("")
                      }}
                      className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-muted"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm line-clamp-1">{news.title}</div>
                        <div className="flex items-center mt-1">
                          <Badge variant="secondary" className="text-[10px] h-4">
                            {news.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground ml-2">{news.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {searchQuery && searchResults.markets.length === 0 && searchResults.news.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8">
                <BarChart2 className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No results found for "{searchQuery}"</p>
                <p className="text-xs text-muted-foreground mt-1">Try a different search term</p>
              </div>
            )}

            {/* Empty state */}
            {!searchQuery && (
              <div className="flex flex-col items-center justify-center py-8">
                <SearchIcon className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Type to search markets, symbols, or news</p>
                <div className="flex items-center gap-2 mt-2">
                  <kbd className="px-2 py-1 text-xs rounded bg-muted">↑</kbd>
                  <kbd className="px-2 py-1 text-xs rounded bg-muted">↓</kbd>
                  <span className="text-xs text-muted-foreground">to navigate</span>
                  <kbd className="px-2 py-1 text-xs rounded bg-muted">Enter</kbd>
                  <span className="text-xs text-muted-foreground">to select</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer with keyboard shortcuts */}
          <div className="border-t p-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <kbd className="px-1.5 py-0.5 rounded bg-muted mr-1">Esc</kbd>
                <span>to close</span>
              </div>
              <div className="flex items-center">
                <kbd className="px-1.5 py-0.5 rounded bg-muted mr-1">Ctrl</kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 rounded bg-muted mx-1">K</kbd>
                <span>to search</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

