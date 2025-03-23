"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { TrendingUp, TrendingDown, Calendar, BarChart3, LineChartIcon } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const monthlyData = [
  { name: "Jan", actual: 1250000, predicted: 1250000 },
  { name: "Feb", actual: 1380000, predicted: 1380000 },
  { name: "Mar", actual: 1520000, predicted: 1520000 },
  { name: "Apr", actual: 1680000, predicted: 1680000 },
  { name: "May", actual: 1450000, predicted: 1450000 },
  { name: "Jun", actual: 1720000, predicted: 1720000 },
  { name: "Jul", actual: 1850000, predicted: 1850000 },
  { name: "Aug", actual: null, predicted: 2100000 },
  { name: "Sep", actual: null, predicted: 2250000 },
  { name: "Oct", actual: null, predicted: 2400000 },
  { name: "Nov", actual: null, predicted: 2650000 },
  { name: "Dec", actual: null, predicted: 2900000 },
]

const productData = [
  { name: "Electronics", actual: 850000, predicted: 950000, growth: 11.8 },
  { name: "Clothing", actual: 620000, predicted: 680000, growth: 9.7 },
  { name: "Food", actual: 450000, predicted: 520000, growth: 15.6 },
  { name: "Home", actual: 380000, predicted: 410000, growth: 7.9 },
  { name: "Beauty", actual: 290000, predicted: 340000, growth: 17.2 },
]

const insights = [
  {
    title: "Seasonal Peak",
    description: "Sales expected to peak in December with 57% growth from current month",
    trend: "up",
    value: "57%",
  },
  {
    title: "Category Growth",
    description: "Beauty products show highest growth potential in next quarter",
    trend: "up",
    value: "17.2%",
  },
  {
    title: "Revenue Forecast",
    description: "Q4 projected revenue exceeds Q3 by ₹2.1M",
    trend: "up",
    value: "₹2.1M",
  },
  {
    title: "Inventory Alert",
    description: "Electronics stock needs 15% increase to meet projected demand",
    trend: "warning",
    value: "15%",
  },
]

export function AISalesPrediction() {
  const [activeTab, setActiveTab] = useState("monthly")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Sales Prediction</CardTitle>
          <CardDescription>Loading prediction models...</CardDescription>
        </CardHeader>
        <CardContent className="flex h-[400px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>AI Sales Prediction</CardTitle>
          <CardDescription>Advanced sales forecasting powered by machine learning</CardDescription>
        </div>
        <Button size="sm">
          <BarChart3 className="mr-2 h-4 w-4" />
          Update Forecast
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="monthly">Monthly Forecast</TabsTrigger>
            <TabsTrigger value="product">Product Categories</TabsTrigger>
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-4">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `₹${value / 100000}L`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#8884d8"
                    strokeWidth={2}
                    name="Actual Sales"
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Predicted Sales"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between rounded-lg border p-3 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Forecast Period: August - December 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  56.8% Growth Expected
                </Badge>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="product" className="space-y-4">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `₹${value / 100000}L`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar dataKey="actual" name="Current Sales" fill="#8884d8" />
                  <Bar dataKey="predicted" name="Predicted Sales" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
              {productData.map((item) => (
                <Card key={item.name} className="overflow-hidden">
                  <CardContent className="p-3">
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="text-2xl font-bold">{item.growth}%</div>
                      <Badge className="bg-green-100 text-green-800">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        Growth
                      </Badge>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {formatCurrency(item.actual)} → {formatCurrency(item.predicted)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {insights.map((insight, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{insight.title}</h3>
                      <Badge
                        className={
                          insight.trend === "up" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                        }
                      >
                        {insight.trend === "up" ? (
                          <TrendingUp className="mr-1 h-3 w-3" />
                        ) : (
                          <TrendingDown className="mr-1 h-3 w-3" />
                        )}
                        {insight.value}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{insight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">AI Recommendation</h3>
                </div>
                <p className="mt-2 text-sm">
                  Based on current trends and seasonal patterns, consider increasing inventory for Electronics and
                  Beauty categories by 15% and 20% respectively to meet projected Q4 demand. Promotional campaigns for
                  Clothing would be most effective in October to maximize holiday season sales potential.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

