"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, TrendingUp, Newspaper } from "lucide-react"
import { MarketTable } from "@/components/markets/market-table"
import { useMarketData } from "@/hooks/use-market-data"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Mock news data
const newsData = [
  {
    id: "news1",
    title: "Bitcoin Surges Past $40,000 as Institutional Interest Grows",
    category: "Crypto",
    date: "2025-03-20",
    content:
      "Bitcoin has surged past the $40,000 mark for the first time in months as institutional investors continue to show interest in the cryptocurrency. Analysts suggest this could be the beginning of a new bull run.",
    url: "/news/bitcoin-surges",
  },
  {
    id: "news2",
    title: "Apple Reports Record Q1 Earnings, Stock Jumps 5%",
    category: "Stocks",
    date: "2025-03-19",
    content:
      "Apple Inc. reported record first-quarter earnings, beating analyst expectations and causing the stock to jump 5% in after-hours trading. The company cited strong iPhone sales and growing services revenue.",
    url: "/news/apple-earnings",
  },
  {
    id: "news3",
    title: "Fed Signals Potential Rate Cut in June Meeting",
    category: "Economy",
    date: "2025-03-18",
    content:
      "The Federal Reserve has signaled a potential interest rate cut at its upcoming June meeting, citing improving inflation data and concerns about maintaining economic growth.",
    url: "/news/fed-rate-cut",
  },
  {
    id: "news4",
    title: "Tesla Unveils New AI Trading Platform for Retail Investors",
    category: "Technology",
    date: "2025-03-17",
    content:
      "Tesla has unveiled a new AI-powered trading platform aimed at retail investors, leveraging its expertise in artificial intelligence to provide automated trading strategies.",
    url: "/news/tesla-ai-trading",
  },
  {
    id: "news5",
    title: "S&P 500 Reaches New All-Time High Amid Strong Earnings Season",
    category: "Markets",
    date: "2025-03-16",
    content:
      "The S&P 500 index has reached a new all-time high as companies continue to report strong earnings for the quarter, exceeding analyst expectations across multiple sectors.",
    url: "/news/sp500-record",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [activeTab, setActiveTab] = useState("all")

  // Get market data
  const { data: stocksData } = useMarketData("stocks")
  const { data: cryptoData } = useMarketData("crypto")
  const { data: indicesData } = useMarketData("indices")

  // Filter data based on search query
  const filteredStocks = stocksData.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredCrypto = cryptoData.filter(
    (crypto) =>
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredIndices = indicesData.filter(
    (index) =>
      index.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      index.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredNews = newsData.filter(
    (news) =>
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Combined results for "all" tab
  const allResults = {
    markets: [...filteredStocks, ...filteredCrypto, ...filteredIndices].slice(0, 10),
    news: filteredNews,
  }

  // Update search query when URL param changes
  useEffect(() => {
    setSearchQuery(query)
  }, [query])

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL with new search query
    window.history.pushState({}, "", `/search?q=${encodeURIComponent(searchQuery)}`)
  }

  // Determine market type for navigation
  const getMarketType = (symbol: string) => {
    if (stocksData.some((stock) => stock.symbol === symbol)) return "stocks"
    if (cryptoData.some((crypto) => crypto.symbol === symbol)) return "crypto"
    if (indicesData.some((index) => index.symbol === symbol)) return "indices"
    return "stocks" // Default fallback
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Search Results</h1>
            <p className="text-muted-foreground">
              {searchQuery ? (
                <>
                  Showing results for <span className="font-medium">"{searchQuery}"</span>
                </>
              ) : (
                "Enter a search term to find markets, symbols, or news"
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearchSubmit} className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search markets, symbols, news..."
                className="pl-8 bg-muted/50 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Results</TabsTrigger>
            <TabsTrigger value="markets">Markets</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* Markets section */}
            {allResults.markets.length > 0 && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Markets</CardTitle>
                    <CardDescription>Found {allResults.markets.length} markets matching your search</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#" onClick={() => setActiveTab("markets")}>
                      View All
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {allResults.markets.slice(0, 5).map((market) => (
                      <Link
                        key={market.symbol}
                        href={`/markets/${getMarketType(market.symbol)}/${market.symbol}`}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                      >
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-3 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{market.symbol}</div>
                            <div className="text-xs text-muted-foreground">{market.name}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-sm font-medium mr-2">${market.price.toLocaleString()}</div>
                          <Badge variant="outline" className="text-xs">
                            {getMarketType(market.symbol)}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* News section */}
            {allResults.news.length > 0 && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>News</CardTitle>
                    <CardDescription>Found {allResults.news.length} news articles matching your search</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#" onClick={() => setActiveTab("news")}>
                      View All
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {allResults.news.slice(0, 3).map((news) => (
                      <Link key={news.id} href={news.url} className="flex flex-col p-3 rounded-md hover:bg-muted">
                        <div className="flex items-center mb-2">
                          <Newspaper className="h-4 w-4 mr-2 text-muted-foreground" />
                          <Badge variant="secondary" className="text-xs mr-2">
                            {news.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{news.date}</span>
                        </div>
                        <h3 className="font-medium mb-1">{news.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{news.content}</p>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* No results */}
            {allResults.markets.length === 0 && allResults.news.length === 0 && searchQuery && (
              <div className="flex flex-col items-center justify-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-medium mb-2">No results found</h2>
                <p className="text-muted-foreground mb-6">We couldn't find anything matching "{searchQuery}"</p>
                <div className="text-sm text-muted-foreground">
                  <p>Suggestions:</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Check your spelling</li>
                    <li>Try more general keywords</li>
                    <li>Try different keywords</li>
                  </ul>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="markets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Markets</CardTitle>
                <CardDescription>
                  {searchQuery
                    ? `Found ${filteredStocks.length + filteredCrypto.length + filteredIndices.length} markets matching "${searchQuery}"`
                    : "Browse all markets"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all-markets" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="all-markets">All</TabsTrigger>
                    <TabsTrigger value="stocks">Stocks ({filteredStocks.length})</TabsTrigger>
                    <TabsTrigger value="crypto">Crypto ({filteredCrypto.length})</TabsTrigger>
                    <TabsTrigger value="indices">Indices ({filteredIndices.length})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all-markets">
                    <MarketTable
                      type="trending"
                      customData={[...filteredStocks, ...filteredCrypto, ...filteredIndices]}
                    />
                  </TabsContent>

                  <TabsContent value="stocks">
                    <MarketTable type="stocks" customData={filteredStocks} />
                  </TabsContent>

                  <TabsContent value="crypto">
                    <MarketTable type="crypto" customData={filteredCrypto} />
                  </TabsContent>

                  <TabsContent value="indices">
                    <MarketTable type="indices" customData={filteredIndices} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>News</CardTitle>
                <CardDescription>
                  {searchQuery
                    ? `Found ${filteredNews.length} news articles matching "${searchQuery}"`
                    : "Browse all news"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredNews.length > 0 ? (
                  <div className="space-y-6">
                    {filteredNews.map((news) => (
                      <div key={news.id} className="border-b pb-6 last:border-0">
                        <div className="flex items-center mb-2">
                          <Badge variant="secondary" className="text-xs mr-2">
                            {news.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{news.date}</span>
                        </div>
                        <Link href={news.url} className="hover:underline">
                          <h3 className="text-xl font-medium mb-2">{news.title}</h3>
                        </Link>
                        <p className="text-muted-foreground">{news.content}</p>
                        <div className="mt-4">
                          <Button variant="link" asChild className="p-0">
                            <Link href={news.url}>Read more</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Newspaper className="h-12 w-12 text-muted-foreground mb-4" />
                    <h2 className="text-xl font-medium mb-2">No news articles found</h2>
                    <p className="text-muted-foreground">We couldn't find any news articles matching "{searchQuery}"</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

