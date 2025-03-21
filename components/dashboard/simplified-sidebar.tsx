"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Home,
  Briefcase,
  Wallet,
  Clock,
  TrendingUp,
  LineChart,
  Globe,
  Bitcoin,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
} from "lucide-react"
import { Logo } from "@/components/logo"
import { useUser } from "@/contexts/user-context"
import { UserAvatar } from "@/components/ui/user-avatar"
import { Badge } from "@/components/ui/badge"

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Portfolio",
    href: "/portfolio",
    icon: Briefcase,
  },
  {
    title: "Wallet",
    href: "/wallet",
    icon: Wallet,
  },
  {
    title: "History",
    href: "/history",
    icon: Clock,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
]

const marketNavItems = [
  {
    title: "Markets Overview",
    href: "/markets",
    icon: TrendingUp,
  },
  {
    title: "Stocks",
    href: "/markets/stocks",
    icon: LineChart,
  },
  {
    title: "Crypto",
    href: "/markets/crypto",
    icon: Bitcoin,
  },
  {
    title: "Indices",
    href: "/markets/indices",
    icon: Globe,
  },
  {
    title: "AI Trading",
    href: "/markets/ai-trading",
    icon: BarChart2,
  },
]

export function SimplifiedSidebar() {
  const pathname = usePathname()
  const { user, logout } = useUser()

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-4 border-b">
        <Logo href="/dashboard" />
      </div>

      {user && (
        <div className="p-4 border-b">
          <Link href="/profile" className="flex items-center gap-3 hover:opacity-80">
            <UserAvatar user={user} size="sm" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-muted-foreground">
                {user.role === "premium" && (
                  <Badge className="bg-primary/20 text-primary text-[10px] px-1">Premium</Badge>
                )}
              </span>
            </div>
          </Link>
        </div>
      )}

      <div className="flex-1 overflow-auto py-2">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">Main</h2>
          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  pathname === item.href
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">Markets</h2>
          <nav className="space-y-1">
            {marketNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t p-3">
        <nav className="space-y-1">
          <Link
            href="/settings"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              pathname === "/settings"
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
          <Link
            href="/help"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              pathname === "/help"
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            <span>Help & Support</span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </div>
  )
}

