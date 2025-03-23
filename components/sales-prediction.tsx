"use client"

import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, ChartTooltipItem } from "@/components/ui/chart"
import { formatCurrency } from "@/lib/utils"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { day: "1", sales: 120000 },
  { day: "5", sales: 180000 },
  { day: "10", sales: 140000 },
  { day: "15", sales: 220000 },
  { day: "20", sales: 190000 },
  { day: "25", sales: 240000 },
  { day: "30", sales: 280000 },
]

export function SalesPrediction() {
  return (
    <div className="h-[250px] w-full">
      <Chart>
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `Day ${value}`}
              />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <ChartTooltip
                content={
                  <ChartTooltipContent>
                    {({ payload }) => {
                      if (!payload?.length) return null
                      const data = payload[0].payload
                      return (
                        <ChartTooltipItem
                          label={`Day ${data.day}`}
                          value={formatCurrency(data.sales)}
                          color="#8884d8"
                        />
                      )
                    }}
                  </ChartTooltipContent>
                }
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Chart>
    </div>
  )
}

