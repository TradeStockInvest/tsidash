import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MarketCardProps {
  title: string
  description: string
  icon: LucideIcon
  stats: { label: string; value: string }[]
  href: string
  color?: "gold" | "gold-dark" | "gold-light" | "dark" | "dark-light"
}

export function MarketCard({ title, description, icon: Icon, stats, href, color = "gold" }: MarketCardProps) {
  const colorClasses = {
    gold: "bg-gold/10 text-gold border-gold/20",
    "gold-dark": "bg-gold-dark/10 text-gold-dark border-gold-dark/20",
    "gold-light": "bg-gold-light/10 text-gold-light border-gold-light/20",
    dark: "bg-dark/10 text-foreground border-dark/20",
    "dark-light": "bg-dark-light/10 text-foreground border-dark-light/20",
  }

  return (
    <Card className="market-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className={`rounded-full p-2 ${colorClasses[color]}`}>
            <Icon className="h-4 w-4" />
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={href}>Trade Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

// Add default export
export default MarketCard

