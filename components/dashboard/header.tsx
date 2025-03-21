"use client"
import { MobileNav } from "./sidebar"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { ThemeToggle } from "@/components/theme-toggle"
import { GlobalSearch } from "@/components/search"

export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 w-full">
      <MobileNav />
      <div className="w-full flex-1">
        <div className="hidden lg:block">
          <GlobalSearch />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <NotificationsDropdown />
        <UserProfileDropdown />
      </div>
    </header>
  )
}

// Export as both named and default
export const DashboardHeader = Header
export default Header

