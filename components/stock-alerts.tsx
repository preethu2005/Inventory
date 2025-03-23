"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowRight } from "lucide-react"

interface StockAlert {
  id: number
  product: string
  issue: string
  severity: "low" | "medium" | "high"
  action: string
}

const stockAlerts: StockAlert[] = [
  {
    id: 1,
    product: "Premium Headphones",
    issue: "Low stock (2 remaining)",
    severity: "high",
    action: "Reorder",
  },
  {
    id: 2,
    product: "Organic Coffee Beans",
    issue: "Expiring in 3 days",
    severity: "medium",
    action: "Discount",
  },
  {
    id: 3,
    product: "Wireless Charger",
    issue: "Out of stock",
    severity: "high",
    action: "Reorder",
  },
  {
    id: 4,
    product: "Designer T-Shirt",
    issue: "Low stock (5 remaining)",
    severity: "low",
    action: "Monitor",
  },
]

export function StockAlerts() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-amber-100 text-amber-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {stockAlerts.map((alert) => (
        <div key={alert.id} className="flex items-center justify-between rounded-lg border p-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <h4 className="font-medium">{alert.product}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{alert.issue}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getSeverityColor(alert.severity)}>
              {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
            </Badge>
            <Button variant="ghost" size="sm">
              {alert.action}
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

