"use client"

import { useState } from "react"
import { Bell, ArrowUp, ArrowDown, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

type NotificationType = "trade" | "deposit" | "withdrawal" | "alert" | "system"

interface Notification {
  id: string
  type: NotificationType
  title: string
  description: string
  time: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "trade",
    title: "Trade Executed",
    description: "Your order to buy 10 shares of AAPL has been executed at $182.63",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: "n2",
    type: "deposit",
    title: "Deposit Confirmed",
    description: "Your deposit of $5,000 has been confirmed and added to your account",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "n3",
    type: "alert",
    title: "Price Alert: BTC",
    description: "Bitcoin has dropped below your alert price of $35,000",
    time: "5 hours ago",
    read: true,
  },
  {
    id: "n4",
    type: "system",
    title: "System Maintenance",
    description: "Scheduled maintenance on March 25, 2025 from 2:00 AM to 4:00 AM UTC",
    time: "1 day ago",
    read: true,
  },
  {
    id: "n5",
    type: "withdrawal",
    title: "Withdrawal Processed",
    description: "Your withdrawal of $2,000 has been processed and sent to your bank account",
    time: "2 days ago",
    read: true,
  },
]

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

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
        return <ArrowUp className="h-4 w-4 text-emerald-500" />
      case "deposit":
        return <ArrowDown className="h-4 w-4 text-emerald-500" />
      case "withdrawal":
        return <ArrowUp className="h-4 w-4 text-red-500" />
      case "alert":
        return <AlertCircle className="h-4 w-4 text-amber-500" />
      case "system":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto text-xs px-2">
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start p-3 ${notification.read ? "" : "bg-muted/50"}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex w-full">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{notification.title}</p>
                      {!notification.read && <Badge className="ml-2 bg-primary">New</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="py-6 text-center">
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="justify-center">
          <Link href="/notifications" className="w-full text-center cursor-pointer">
            View all notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

