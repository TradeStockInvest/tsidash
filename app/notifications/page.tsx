"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, AlertCircle, CheckCircle, Bell, Filter } from "lucide-react"

type NotificationType = "trade" | "deposit" | "withdrawal" | "alert" | "system" | "all"

interface Notification {
  id: string
  type: NotificationType
  title: string
  description: string
  time: string
  date: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "trade",
    title: "Trade Executed",
    description: "Your order to buy 10 shares of AAPL has been executed at $182.63",
    time: "10:45 AM",
    date: "Mar 20, 2025",
    read: false,
  },
  {
    id: "n2",
    type: "deposit",
    title: "Deposit Confirmed",
    description: "Your deposit of $5,000 has been confirmed and added to your account",
    time: "08:30 AM",
    date: "Mar 20, 2025",
    read: false,
  },
  {
    id: "n3",
    type: "alert",
    title: "Price Alert: BTC",
    description: "Bitcoin has dropped below your alert price of $35,000",
    time: "06:15 AM",
    date: "Mar 20, 2025",
    read: true,
  },
  {
    id: "n4",
    type: "system",
    title: "System Maintenance",
    description: "Scheduled maintenance on March 25, 2025 from 2:00 AM to 4:00 AM UTC",
    time: "09:00 AM",
    date: "Mar 19, 2025",
    read: true,
  },
  {
    id: "n5",
    type: "withdrawal",
    title: "Withdrawal Processed",
    description: "Your withdrawal of $2,000 has been processed and sent to your bank account",
    time: "02:30 PM",
    date: "Mar 18, 2025",
    read: true,
  },
  {
    id: "n6",
    type: "trade",
    title: "Trade Executed",
    description: "Your order to sell 5 shares of MSFT has been executed at $337.22",
    time: "11:20 AM",
    date: "Mar 18, 2025",
    read: true,
  },
  {
    id: "n7",
    type: "alert",
    title: "Price Alert: NVDA",
    description: "NVIDIA has reached your target price of $800",
    time: "10:05 AM",
    date: "Mar 17, 2025",
    read: true,
  },
  {
    id: "n8",
    type: "system",
    title: "New Feature Available",
    description: "AI Trading is now available on your account. Try it today!",
    time: "09:00 AM",
    date: "Mar 15, 2025",
    read: true,
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [activeTab, setActiveTab] = useState<NotificationType>("all")

  const filteredNotifications = activeTab === "all" ? notifications : notifications.filter((n) => n.type === activeTab)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "trade":
        return <ArrowUp className="h-5 w-5 text-emerald-500" />
      case "deposit":
        return <ArrowDown className="h-5 w-5 text-emerald-500" />
      case "withdrawal":
        return <ArrowUp className="h-5 w-5 text-red-500" />
      case "alert":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "system":
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your account activity</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            {unreadCount > 0 && <Button onClick={markAllAsRead}>Mark All as Read</Button>}
          </div>
        </div>

        <Tabs
          defaultValue="all"
          className="space-y-4"
          onValueChange={(value) => setActiveTab(value as NotificationType)}
        >
          <TabsList>
            <TabsTrigger value="all">
              All
              {unreadCount > 0 && <Badge className="ml-2 bg-primary text-primary-foreground">{unreadCount}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="trade">Trades</TabsTrigger>
            <TabsTrigger value="deposit">Deposits</TabsTrigger>
            <TabsTrigger value="withdrawal">Withdrawals</TabsTrigger>
            <TabsTrigger value="alert">Alerts</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === "all"
                    ? "All Notifications"
                    : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Notifications`}
                </CardTitle>
                <CardDescription>
                  {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start p-4 rounded-lg border ${!notification.read ? "bg-muted/50" : ""}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <h4 className="text-sm font-medium">{notification.title}</h4>
                              {!notification.read && <Badge className="ml-2 bg-primary">New</Badge>}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {notification.time} · {notification.date}
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{notification.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No notifications</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        You don't have any {activeTab !== "all" ? activeTab : ""} notifications at the moment
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

