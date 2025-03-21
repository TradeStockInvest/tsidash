import type { ReactNode } from "react"
import { DashboardHeader } from "@/components/dashboard/header"

interface AlternativeDashboardLayoutProps {
  children: ReactNode
  sidebar: ReactNode
}

export function AlternativeDashboardLayout({ children, sidebar }: AlternativeDashboardLayoutProps) {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-sidebar">{sidebar}</div>
      <div className="dashboard-main">
        <DashboardHeader />
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  )
}

