import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Briefcase, PieChart } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PortfolioAllocation } from "@/components/portfolio/portfolio-allocation"
import { PortfolioHoldings } from "@/components/portfolio/portfolio-holdings"
import { PortfolioPerformance } from "@/components/portfolio/portfolio-performance"

export default function PortfolioPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-muted-foreground">Total Value:</div>
            <div className="text-xl font-bold">$124,567.89</div>
            <div className="text-sm text-emerald-500">+5.67%</div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$32,997.33</div>
              <p className="text-xs text-muted-foreground">+15.3% all time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Change</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">+$412.25</div>
              <p className="text-xs text-muted-foreground">+1.3% today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Holdings</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">Across 4 asset classes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Diversification</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72%</div>
              <p className="text-xs text-muted-foreground">Portfolio health score</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                  <CardDescription>Your portfolio value over time</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <PortfolioPerformance />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                  <CardDescription>Breakdown by asset class</CardDescription>
                </CardHeader>
                <CardContent>
                  <PortfolioAllocation />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="holdings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Holdings</CardTitle>
                <CardDescription>All assets in your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <PortfolioHoldings />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
                <CardDescription>Detailed performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2 rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">1 Month Return</div>
                      <div className="text-2xl font-bold text-emerald-500">+3.2%</div>
                    </div>
                    <div className="space-y-2 rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">3 Month Return</div>
                      <div className="text-2xl font-bold text-emerald-500">+8.7%</div>
                    </div>
                    <div className="space-y-2 rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">1 Year Return</div>
                      <div className="text-2xl font-bold text-emerald-500">+15.3%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

