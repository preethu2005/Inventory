"use client"
import {
  Chart,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  ChartTooltipItem,
} from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Electronics", value: 35, color: "#8884d8" },
  { name: "Clothing", value: 25, color: "#82ca9d" },
  { name: "Food & Beverages", value: 20, color: "#ffc658" },
  { name: "Home Goods", value: 15, color: "#ff8042" },
  { name: "Other", value: 5, color: "#0088fe" },
]

export function InventoryOverview() {
  return (
    <div className="h-[300px] w-full">
      <Chart>
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent>
                    {({ payload }) => {
                      if (!payload?.length) return null
                      const data = payload[0].payload
                      return <ChartTooltipItem label={data.name} value={`${data.value}%`} color={data.color} />
                    }}
                  </ChartTooltipContent>
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <ChartLegend>
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.color }} />
              <span className="text-xs font-medium">{item.name}</span>
            </div>
          ))}
        </ChartLegend>
      </Chart>
    </div>
  )
}

