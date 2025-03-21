import { Bitcoin, Globe, Search, TrendingUp, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { MarketCard } from "@/components/markets/market-card"
import { MarketTable } from "@/components/markets/market-table"

export default function MarketsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Markets</h1>
          <p className="text-muted-foreground">Explore and trade various financial markets</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search markets, symbols..." className="pl-8 bg-muted/50" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MarketCard
            title="Stocks"
            description="Trade company shares"
            icon={TrendingUp}
            stats={[
              { label: "Active Markets", value: "8,500+" },
              { label: "24h Volume", value: "$86.2B" },
            ]}
            href="/markets/stocks"
            color="gold"
          />
          <MarketCard
            title="Cryptocurrencies"
            description="Trade digital assets"
            icon={Bitcoin}
            stats={[
              { label: "Active Markets", value: "250+" },
              { label: "24h Volume", value: "$42.8B" },
            ]}
            href="/markets/crypto"
            color="gold-dark"
          />
          <MarketCard
            title="Indices"
            description="Trade market indices"
            icon={Globe}
            stats={[
              { label: "Active Markets", value: "50+" },
              { label: "24h Volume", value: "$12.5B" },
            ]}
            href="/markets/indices"
            color="gold-light"
          />
          <MarketCard
            title="AI Trading"
            description="Automated trading strategies"
            icon={Zap}
            stats={[
              { label: "Active Bots", value: "15+" },
              { label: "Success Rate", value: "68%" },
            ]}
            href="/markets/ai-trading"
            color="dark-light"
          />
        </div>

        <Tabs defaultValue="trending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="indices">Indices</TabsTrigger>
          </TabsList>
          <TabsContent value="trending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trending Markets</CardTitle>
                <CardDescription>The most active markets in the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketTable />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="stocks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Stock Markets</CardTitle>
                <CardDescription>Trade company shares from around the world</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketTable type="stocks" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="crypto" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cryptocurrency Markets</CardTitle>
                <CardDescription>Trade digital assets and tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketTable type="crypto" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="indices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Indices</CardTitle>
                <CardDescription>Trade global market indices</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketTable type="indices" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

