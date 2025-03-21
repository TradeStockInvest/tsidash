"use client"

import { useUser } from "@/contexts/user-context"
import { UserAvatar } from "@/components/ui/user-avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User, Settings, CreditCard, HelpCircle, LogOut, Bell, Shield, BadgeCheck, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function UserProfileDropdown() {
  const { user, logout, isLoading } = useUser()

  if (isLoading) {
    return (
      <Button variant="outline" size="icon" className="rounded-full">
        <span className="h-4 w-4 animate-pulse rounded-full bg-muted-foreground/30"></span>
      </Button>
    )
  }

  if (!user) {
    return (
      <Button asChild variant="outline" size="sm">
        <Link href="/login">Sign in</Link>
      </Button>
    )
  }

  const getVerificationBadge = (level: number) => {
    if (level === 3) return <Badge className="ml-2 bg-primary text-primary-foreground">Verified</Badge>
    if (level === 2) return <Badge className="ml-2 bg-amber-500/20 text-amber-500">Level 2</Badge>
    return <Badge className="ml-2 bg-muted text-muted-foreground">Level 1</Badge>
  }

  const getRoleBadge = (role: string) => {
    if (role === "admin") return <Badge className="ml-2 bg-red-500/20 text-red-500">Admin</Badge>
    if (role === "premium") return <Badge className="ml-2 bg-primary/20 text-primary">Premium</Badge>
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <UserAvatar user={user} size="sm" />
          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            <div className="flex items-center pt-1">
              {getRoleBadge(user.role)}
              {getVerificationBadge(user.verificationLevel)}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/wallet" className="cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/notifications" className="cursor-pointer">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </Link>
          </DropdownMenuItem>
          {user.verificationLevel < 3 && (
            <DropdownMenuItem asChild>
              <Link href="/verification" className="cursor-pointer">
                <BadgeCheck className="mr-2 h-4 w-4" />
                <span>Complete Verification</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Link>
            </DropdownMenuItem>
          )}
          {user.role !== "premium" && (
            <DropdownMenuItem asChild>
              <Link href="/upgrade" className="cursor-pointer">
                <Shield className="mr-2 h-4 w-4" />
                <span>Upgrade to Premium</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/help" className="cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

