"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, Calendar } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface Product {
  id: number
  name: string
  sku: string
  expiryDate: Date
  stock: number
  category: string
}

export function ProductExpiryManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: "Organic Milk",
          sku: "OM-1001",
          expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          stock: 15,
          category: "Dairy",
        },
        {
          id: 2,
          name: "Fresh Bread",
          sku: "FB-2002",
          expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          stock: 8,
          category: "Bakery",
        },
        {
          id: 3,
          name: "Yogurt Pack",
          sku: "YP-3003",
          expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          stock: 20,
          category: "Dairy",
        },
        {
          id: 4,
          name: "Fresh Chicken",
          sku: "FC-4004",
          expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          stock: 5,
          category: "Meat",
        },
        {
          id: 5,
          name: "Salad Mix",
          sku: "SM-5005",
          expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
          stock: 12,
          category: "Produce",
        },
      ]

      setProducts(mockProducts)
      setIsLoading(false)
    }

    setTimeout(fetchProducts, 1000)
  }, [])

  const getExpiryStatus = (expiryDate: Date) => {
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

    if (daysUntilExpiry <= 0) {
      return { label: "Expired", color: "bg-red-100 text-red-800" }
    } else if (daysUntilExpiry <= 3) {
      return { label: "Expiring Soon", color: "bg-amber-100 text-amber-800" }
    } else if (daysUntilExpiry <= 7) {
      return { label: "Approaching Expiry", color: "bg-blue-100 text-blue-800" }
    } else {
      return { label: "Good", color: "bg-green-100 text-green-800" }
    }
  }

  const getDaysUntilExpiry = (expiryDate: Date) => {
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    if (daysUntilExpiry <= 0) return "Expired"
    return `${daysUntilExpiry} day${daysUntilExpiry === 1 ? "" : "s"}`
  }

  if (isLoading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Product Expiry Management</CardTitle>
          <CardDescription>Monitor and manage products approaching expiration</CardDescription>
        </div>
        <Button size="sm">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Generate Expiry Report
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const status = getExpiryStatus(product.expiryDate)
              return (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.stock} units</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {formatDate(product.expiryDate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={status.color}>
                      <Clock className="mr-1 h-3 w-3" />
                      {status.label} ({getDaysUntilExpiry(product.expiryDate)})
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Discount
                      </Button>
                      <Button variant="outline" size="sm">
                        Move
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

