"use client"

import * as React from "react"
import { useTheme } from "next-themes"

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: Record<string, any>
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(({ className, config, ...props }, ref) => {
  const { theme } = useTheme()

  // Set CSS variables for colors from config
  React.useEffect(() => {
    if (!config) return

    const root = document.documentElement
    Object.entries(config).forEach(([key, value]) => {
      if (value && value.color) {
        root.style.setProperty(`--color-${key}`, value.color)
        root.style.setProperty(`--label-${key}`, value.label || key)
      }
    })

    return () => {
      // Clean up CSS variables
      if (!config) return
      Object.keys(config).forEach((key) => {
        root.style.removeProperty(`--color-${key}`)
        root.style.removeProperty(`--label-${key}`)
      })
    }
  }, [config])

  return <div className="chart-container" ref={ref} {...props} />
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className="chart-tooltip" ref={ref} {...props} />
  },
)
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className="chart-tooltip-content" ref={ref} {...props} />
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className="chart-legend" ref={ref} {...props} />
  },
)
ChartLegend.displayName = "ChartLegend"

const ChartLegendContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className="chart-legend-content" ref={ref} {...props} />
  },
)
ChartLegendContent.displayName = "ChartLegendContent"

const ChartStyle = React.forwardRef<HTMLStyleElement, React.HTMLAttributes<HTMLStyleElement>>(
  ({ className, ...props }, ref) => {
    return <style ref={ref} {...props} />
  },
)
ChartStyle.displayName = "ChartStyle"

const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} {...props} />
})
Chart.displayName = "Chart"

export { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle }

