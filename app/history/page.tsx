import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { SimplifiedSidebar } from "@/components/dashboard/simplified-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Download, Search, Filter } from "lucide-react"
import { TradeHistory } from "@/components/history/trade-history"
import { DepositWithdrawalHistory } from "@/components/history/deposit-withdrawal-history"

export default function HistoryPage() {
  return (
    <DashboardLayout sidebar={<SimplifiedSidebar />}>
      <div className="flex flex-col gap-4 md:gap-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">History</h1>
            <p className="text-muted-foreground">View your trading and transaction history</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search by symbol, type..." className="pl-8 bg-muted/50" />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="date" className="pl-8 w-[150px]" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="trades" className="space-y-4 w-full">
          <TabsList>
            <TabsTrigger value="trades">Trades</TabsTrigger>
            <TabsTrigger value="deposits-withdrawals">Deposits & Withdrawals</TabsTrigger>
          </TabsList>
          <TabsContent value="trades" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trade History</CardTitle>
                <CardDescription>Your recent trading activity across all markets</CardDescription>
              </CardHeader>
              <CardContent>
                <TradeHistory />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="deposits-withdrawals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Deposits & Withdrawals</CardTitle>
                <CardDescription>Your recent deposit and withdrawal transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <DepositWithdrawalHistory />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

