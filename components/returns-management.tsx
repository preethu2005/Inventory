"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Package, RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface ReturnRequest {
  id: string
  customer: string
  product: string
  orderDate: Date
  returnDate: Date
  reason: string
  status: "pending" | "approved" | "rejected" | "processed"
  amount: number
}

const returnRequests: ReturnRequest[] = [
  {
    id: "RET-1001",
    customer: "John Smith",
    product: "Premium Headphones",
    orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    returnDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    reason: "Defective product",
    status: "pending",
    amount: 149.99,
  },
  {
    id: "RET-1002",
    customer: "Sarah Johnson",
    product: "Wireless Charger",
    orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
    returnDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    reason: "Wrong item received",
    status: "approved",
    amount: 29.99,
  },
  {
    id: "RET-1003",
    customer: "Michael Brown",
    product: "Smart Watch",
    orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20), // 20 days ago
    returnDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8), // 8 days ago
    reason: "Changed mind",
    status: "rejected",
    amount: 219.99,
  },
  {
    id: "RET-1004",
    customer: "Emily Davis",
    product: "Designer T-Shirt",
    orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12), // 12 days ago
    returnDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    reason: "Size doesn't fit",
    status: "processed",
    amount: 34.99,
  },
]

export function ReturnsManagement() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredReturns = returnRequests.filter((request) => {
    if (activeTab === "all") return true
    return request.status === activeTab
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-800">
            <RefreshCw className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="mr-1 h-3 w-3" />
            Rejected
          </Badge>
        )
      case "processed":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Package className="mr-1 h-3 w-3" />
            Processed
          </Badge>
        )
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Returns Management</CardTitle>
          <CardDescription>Process and track customer return requests</CardDescription>
        </div>
        <Button size="sm">
          <AlertCircle className="mr-2 h-4 w-4" />
          Generate Returns Report
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Returns</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="processed">Processed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Return ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReturns.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.customer}</TableCell>
                    <TableCell>{request.product}</TableCell>
                    <TableCell>{formatDate(request.returnDate)}</TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell>{formatCurrency(request.amount)}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                        {request.status === "pending" && (
                          <>
                            <Button variant="outline" size="sm" className="text-green-600">
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

