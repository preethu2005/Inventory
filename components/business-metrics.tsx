"use client"

import { Card, CardContent } from "@/components/ui/card"
import { getBusinessMetrics } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import { TrendingUp, TrendingDown, DollarSign, Package, AlertTriangle, BarChart3 } from "lucide-react"

export function BusinessMetrics() {
  const metrics = getBusinessMetrics()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Total Inventory Value</p>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{formatCurrency(metrics.totalInventoryValue)}</p>
              <p className="text-xs text-muted-foreground">Cost: {formatCurrency(metrics.totalInventoryCost)}</p>
            </div>
            <div className="flex items-center rounded-md bg-green-100 p-1 text-green-700">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">{Math.round(metrics.grossMargin * 100)}% margin</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Total Sales (MTD)</p>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{formatCurrency(metrics.totalSales)}</p>
              <p className="text-xs text-muted-foreground">Avg. Daily: {formatCurrency(metrics.averageDailyRevenue)}</p>
            </div>
            <div className="flex items-center rounded-md bg-green-100 p-1 text-green-700">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">+12.5%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Inventory Status</p>
            <Package className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{metrics.totalItems}</p>
              <p className="text-xs text-muted-foreground">Total Products</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center rounded-md bg-amber-100 p-1 text-amber-700">
                <AlertTriangle className="h-3 w-3 mr-1" />
                <span className="text-xs font-medium">{metrics.lowStockItems} Low Stock</span>
              </div>
              <div className="flex items-center rounded-md bg-red-100 p-1 text-red-700">
                <AlertTriangle className="h-3 w-3 mr-1" />
                <span className="text-xs font-medium">{metrics.outOfStockItems} Out of Stock</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Expiring Products</p>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{metrics.expiringItems}</p>
              <p className="text-xs text-muted-foreground">Products expiring within 7 days</p>
            </div>
            <div className="flex items-center rounded-md bg-amber-100 p-1 text-amber-700">
              <TrendingDown className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">-2 from last week</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

