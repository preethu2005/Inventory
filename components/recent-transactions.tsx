"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "@/lib/utils"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"

interface Transaction {
  id: string
  type: "sale" | "purchase"
  amount: number
  date: Date
  customer: {
    name: string
    avatar?: string
    initials: string
  }
  items: number
  status: "completed" | "pending" | "failed"
}

const recentTransactions: Transaction[] = [
  {
    id: "T-1001",
    type: "sale",
    amount: 34999,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    customer: {
      name: "John Smith",
      initials: "JS",
    },
    items: 3,
    status: "completed",
  },
  {
    id: "T-1002",
    type: "purchase",
    amount: 125000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 5),
    customer: {
      name: "Acme Suppliers",
      initials: "AS",
    },
    items: 15,
    status: "completed",
  },
  {
    id: "T-1003",
    type: "sale",
    amount: 12999,
    date: new Date(Date.now() - 1000 * 60 * 60 * 8),
    customer: {
      name: "Sarah Johnson",
      initials: "SJ",
    },
    items: 1,
    status: "completed",
  },
  {
    id: "T-1004",
    type: "sale",
    amount: 7999,
    date: new Date(Date.now() - 1000 * 60 * 60 * 12),
    customer: {
      name: "Michael Brown",
      initials: "MB",
    },
    items: 2,
    status: "pending",
  },
]

export function RecentTransactions() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {recentTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={transaction.customer.avatar} alt={transaction.customer.name} />
              <AvatarFallback>{transaction.customer.initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{transaction.customer.name}</h4>
                {transaction.type === "sale" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDownLeft className="h-3 w-3 text-blue-600" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {transaction.id} • {formatDate(transaction.date)}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-medium">
              {transaction.type === "sale" ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{transaction.items} items</span>
              <Badge className={getStatusColor(transaction.status)}>
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

