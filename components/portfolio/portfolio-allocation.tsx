"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const COLORS = ["#D4AF37", "#A67C00", "#F5E7A3", "#8B6914", "#E6C200"]

export function PortfolioAllocation() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const data = [
    { name: "Stocks", value: 18500 },
    { name: "Crypto", value: 8200 },
    { name: "ETFs", value: 4500 },
    { name: "Indices", value: 1797.33 },
  ]

  if (!mounted) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`$${value.toLocaleString()}`, "Value"]}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

