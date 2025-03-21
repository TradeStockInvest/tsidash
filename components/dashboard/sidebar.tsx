"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Menu,
  X,
  Settings,
  HelpCircle,
  LogOut,
  Home,
  BarChart2,
  Briefcase,
  Wallet,
  Clock,
  TrendingUp,
  LineChart,
  Globe,
  Bitcoin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/logo"

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

export function MobileNav() {
  return null
}

// Rename the function to SidebarComponent
function SidebarComponent() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <SidebarProvider>
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-background flex items-center justify-between p-4 border-b">
        <Logo href="/dashboard" />
        <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      <div className={`${mobileOpen ? "block" : "hidden"} md:block h-screen w-64 fixed left-0 top-0 z-20`}>
        <Sidebar className="border-r border-border h-full w-64">
          <SidebarHeader className="p-4">
            <Logo href="/dashboard" />
          </SidebarHeader>
          <SidebarContent>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">Main</h2>
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">Markets</h2>
              <SidebarMenu>
                {marketNavItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/settings"}>
                  <Link href="/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/help"}>
                  <Link href="/help">
                    <HelpCircle className="h-4 w-4" />
                    <span>Help & Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/login">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      </div>
    </SidebarProvider>
  )
}

// Export as both named and default
export const DashboardSidebar = SidebarComponent
export default SidebarComponent

