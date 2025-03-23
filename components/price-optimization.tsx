"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, DollarSign, BarChart3, RefreshCw } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface PriceRecommendation {
  id: number
  product: string
  sku: string
  category: string
  currentPrice: number
  recommendedPrice: number
  confidence: number
  reason: string
  potentialRevenue: number
}

export function PriceOptimization() {
  const [recommendations, setRecommendations] = useState<PriceRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchRecommendations = () => {
      const mockRecommendations: PriceRecommendation[] = [
        {
          id: 1,
          product: "Premium Headphones",
          sku: "PH-1001",
          category: "Electronics",
          currentPrice: 12999,
          recommendedPrice: 14999,
          confidence: 85,
          reason: "Competitor price increase and high demand",
          potentialRevenue: 250000,
        },
        {
          id: 2,
          product: "Organic Coffee Beans",
          sku: "OCB-2002",
          category: "Food",
          currentPrice: 1499,
          recommendedPrice: 1299,
          confidence: 78,
          reason: "Increased competition and seasonal trends",
          potentialRevenue: 180000,
        },
        {
          id: 3,
          product: "Wireless Charger",
          sku: "WC-3003",
          category: "Electronics",
          currentPrice: 2499,
          recommendedPrice: 2999,
          confidence: 92,
          reason: "New product release and market gap",
          potentialRevenue: 320000,
        },
        {
          id: 4,
          product: "Designer T-Shirt",
          sku: "DTS-4004",
          category: "Clothing",
          currentPrice: 3999,
          recommendedPrice: 3499,
          confidence: 75,
          reason: "End of season and inventory clearance",
          potentialRevenue: 150000,
        },
        {
          id: 5,
          product: "Smart Watch",
          sku: "SW-5005",
          category: "Electronics",
          currentPrice: 19999,
          recommendedPrice: 21999,
          confidence: 88,
          reason: "High demand and limited competitor stock",
          potentialRevenue: 400000,
        },
      ]

      setRecommendations(mockRecommendations)
      setIsLoading(false)
    }

    setTimeout(fetchRecommendations, 1500)
  }, [])

  const filteredRecommendations = recommendations.filter((rec) => {
    if (activeTab === "all") return true
    if (activeTab === "increase") return rec.recommendedPrice > rec.currentPrice
    if (activeTab === "decrease") return rec.recommendedPrice < rec.currentPrice
    return true
  })

  const getPriceChangeType = (current: number, recommended: number) => {
    if (recommended > current) {
      return {
        label: "Increase",
        icon: <TrendingUp className="mr-1 h-3 w-3" />,
        color: "bg-green-100 text-green-800",
        percentage: (((recommended - current) / current) * 100).toFixed(1),
      }
    } else {
      return {
        label: "Decrease",
        icon: <TrendingDown className="mr-1 h-3 w-3" />,
        color: "bg-amber-100 text-amber-800",
        percentage: (((current - recommended) / current) * 100).toFixed(1),
      }
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return "bg-green-100 text-green-800"
    if (confidence >= 70) return "bg-blue-100 text-blue-800"
    return "bg-amber-100 text-amber-800"
  }

  if (isLoading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <div className="flex flex-col items-center space-y-2">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">AI analyzing market data...</p>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>AI Price Optimization</CardTitle>
          <CardDescription>Smart pricing recommendations based on market analysis</CardDescription>
        </div>
        <Button size="sm">
          <BarChart3 className="mr-2 h-4 w-4" />
          Run New Analysis
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Recommendations</TabsTrigger>
            <TabsTrigger value="increase">Price Increases</TabsTrigger>
            <TabsTrigger value="decrease">Price Decreases</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Current Price</TableHead>
                  <TableHead>Recommended</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Potential Revenue</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecommendations.map((rec) => {
                  const priceChange = getPriceChangeType(rec.currentPrice, rec.recommendedPrice)
                  return (
                    <TableRow key={rec.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{rec.product}</div>
                          <div className="text-xs text-muted-foreground">{rec.sku}</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(rec.currentPrice)}</TableCell>
                      <TableCell>{formatCurrency(rec.recommendedPrice)}</TableCell>
                      <TableCell>
                        <Badge className={priceChange.color}>
                          {priceChange.icon}
                          {priceChange.label} ({priceChange.percentage}%)
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getConfidenceColor(rec.confidence)}>{rec.confidence}% Confidence</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          {formatCurrency(rec.potentialRevenue)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Apply
                          </Button>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

