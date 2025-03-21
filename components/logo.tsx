import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  className?: string
  href?: string
}

export function Logo({ className, href }: LogoProps) {
  const logoContent = (
    <>
      <div className="relative h-10 w-10">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-03-18%2014.35.40%20-%20A%20modern%20and%20professional%20logo%20for%20TradeStockInvest%20%28TSI%29.%20The%20design%20features%20a%20black%20background%20with%20a%20sleek%20gold%20stock%20chart%2C%20symbolizing%20market%20.jpg-wTqzEY5PpEDUr5GEIpeO8rmLXee672.jpeg"
          alt="TSI Logo"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-tight gold-text">TSI</span>
        <span className="text-xs text-muted-foreground">TRADE STOCK INVEST</span>
      </div>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={`flex items-center gap-2 ${className}`}>
        {logoContent}
      </Link>
    )
  }

  return <div className={`flex items-center gap-2 ${className}`}>{logoContent}</div>
}

