"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { BusinessMetrics } from "@/components/business-metrics"
import { InventoryOverview } from "@/components/inventory-overview"
import { StockAlerts } from "@/components/stock-alerts"
import { RecentTransactions } from "@/components/recent-transactions"
import { SalesPrediction } from "@/components/sales-prediction"
import { ProductExpiryManager } from "@/components/product-expiry-manager"
import { PriceOptimization } from "@/components/price-optimization"
import { InvoiceGenerator } from "@/components/invoice-generator"
import { ReturnsManagement } from "@/components/returns-management"
import { AISalesPrediction } from "@/components/ai-sales-prediction"

export default function HomePage() {
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("shelfsync_user")
    if (!isAuthenticated) {
      window.location.href = "/login"
    }
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your inventory and sales.</p>
          </div>
        </div>

        <BusinessMetrics />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ai-prediction">AI Prediction</TabsTrigger>
            <TabsTrigger value="expiry">Expiry Management</TabsTrigger>
            <TabsTrigger value="pricing">Price Optimization</TabsTrigger>
            <TabsTrigger value="invoicing">Invoicing</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Inventory Overview</CardTitle>
                  <CardDescription>Stock levels by category</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <InventoryOverview />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Stock Alerts</CardTitle>
                  <CardDescription>Products that need attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <StockAlerts />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest sales and purchases</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentTransactions />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Sales Prediction</CardTitle>
                  <CardDescription>Projected sales for the next 30 days</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <SalesPrediction />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-prediction" className="space-y-4">
            <AISalesPrediction />
          </TabsContent>

          <TabsContent value="expiry" className="space-y-4">
            <ProductExpiryManager />
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <PriceOptimization />
          </TabsContent>

          <TabsContent value="invoicing" className="space-y-4">
            <InvoiceGenerator />
          </TabsContent>

          <TabsContent value="returns" className="space-y-4">
            <ReturnsManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

