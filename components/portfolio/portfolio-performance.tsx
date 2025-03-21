"use client"

import { useEffect, useState } from "react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const generateData = () => {
  const data = []
  const now = new Date()
  let value = 25000

  for (let i = 90; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Random daily change between -2% and +3%
    const dailyChange = (Math.random() * 5 - 2) / 100
    value = value * (1 + dailyChange)

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: value,
    })
  }

  return data
}

export function PortfolioPerformance() {
  const [mounted, setMounted] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    setMounted(true)
    setData(generateData())
  }, [])

  if (!mounted) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: "hsl(var(--border))" }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: "hsl(var(--border))" }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            domain={["auto", "auto"]}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            formatter={(value) => [`$${value.toLocaleString()}`, "Portfolio Value"]}
          />
          <Line type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

