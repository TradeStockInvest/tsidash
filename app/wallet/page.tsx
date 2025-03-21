import {
  ArrowDown,
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  BanknoteIcon as Bank,
  CreditCard,
  DollarSign,
  History,
  Plus,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PaymentMethods } from "@/components/wallet/payment-methods"
import { WalletTransactions } from "@/components/wallet/wallet-transactions"

export default function WalletPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Wallet</h1>
            <p className="text-muted-foreground">Manage your funds and payment methods</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <ArrowDownRight className="mr-2 h-4 w-4" />
              Deposit
            </Button>
            <Button variant="outline">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Withdraw
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,234.56</div>
              <p className="text-xs text-muted-foreground">Ready to invest</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Deposits</CardTitle>
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0.00</div>
              <p className="text-xs text-muted-foreground">No pending deposits</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Withdrawals</CardTitle>
              <ArrowUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0.00</div>
              <p className="text-xs text-muted-foreground">No pending withdrawals</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Activity</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$5,432.10</div>
              <p className="text-xs text-muted-foreground">Total transactions this month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="deposit" className="space-y-4">
          <TabsList>
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          </TabsList>
          <TabsContent value="deposit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Deposit Funds</CardTitle>
                <CardDescription>Add money to your trading account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                      <Input id="amount" placeholder="0.00" className="pl-7" />
                    </div>
                    <p className="text-xs text-muted-foreground">Minimum deposit: $10.00</p>
                  </div>

                  <div className="grid gap-2">
                    <Label>Payment Method</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted">
                        <Bank className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <div className="font-medium">Bank Transfer</div>
                          <div className="text-xs text-muted-foreground">1-3 business days</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <div className="font-medium">Credit Card</div>
                          <div className="text-xs text-muted-foreground">Instant</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted">
                        <Wallet className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <div className="font-medium">Crypto</div>
                          <div className="text-xs text-muted-foreground">10-30 minutes</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Continue to Deposit</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="withdraw" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Withdraw Funds</CardTitle>
                <CardDescription>Withdraw money from your trading account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="withdraw-amount">Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                      <Input id="withdraw-amount" placeholder="0.00" className="pl-7" />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Minimum withdrawal: $10.00</span>
                      <span className="text-primary cursor-pointer">Max</span>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Withdrawal Method</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted">
                        <Bank className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <div className="font-medium">Bank Account (ACH)</div>
                          <div className="text-xs text-muted-foreground">1-3 business days</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted">
                        <Wallet className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <div className="font-medium">Crypto Wallet</div>
                          <div className="text-xs text-muted-foreground">10-30 minutes</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Continue to Withdraw</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Your recent deposits and withdrawals</CardDescription>
              </CardHeader>
              <CardContent>
                <WalletTransactions />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="payment-methods" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment methods</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Method
                </Button>
              </CardHeader>
              <CardContent>
                <PaymentMethods />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

