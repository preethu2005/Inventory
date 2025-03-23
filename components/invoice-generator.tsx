"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, Printer, Mail, Plus, Trash } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface InvoiceItem {
  id: string
  product: string
  description: string
  quantity: number
  price: number
  serialNumber?: string
}

export function InvoiceGenerator() {
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2023-001")
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerGST, setCustomerGST] = useState("")
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      product: "Premium Headphones",
      description: "Wireless noise-cancelling headphones",
      quantity: 1,
      price: 149.99,
      serialNumber: "SN-12345-ABCDE",
    },
  ])

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      product: "",
      description: "",
      quantity: 1,
      price: 0,
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value }
        }
        return item
      }),
    )
  }

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const gstRate = 0.18 // 18% GST
  const gstAmount = subtotal * gstRate
  const total = subtotal + gstAmount

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Generate Invoice</CardTitle>
        <CardDescription>Create detailed invoices with product information and GST</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="space-y-2 sm:w-1/3">
            <Label htmlFor="invoice-number">Invoice Number</Label>
            <Input id="invoice-number" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
          </div>
          <div className="space-y-2 sm:w-1/3">
            <Label htmlFor="invoice-date">Invoice Date</Label>
            <Input id="invoice-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
          </div>
          <div className="space-y-2 sm:w-1/3">
            <Label htmlFor="payment-terms">Payment Terms</Label>
            <Select defaultValue="15">
              <SelectTrigger id="payment-terms">
                <SelectValue placeholder="Select terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Due on Receipt</SelectItem>
                <SelectItem value="15">Net 15 Days</SelectItem>
                <SelectItem value="30">Net 30 Days</SelectItem>
                <SelectItem value="60">Net 60 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Customer Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customer-name">Customer Name</Label>
              <Input id="customer-name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-email">Customer Email</Label>
              <Input
                id="customer-email"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-gst">Customer GST Number</Label>
              <Input id="customer-gst" value={customerGST} onChange={(e) => setCustomerGST(e.target.value)} />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Invoice Items</h3>
            <Button onClick={addItem} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Serial Number</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Input
                        value={item.product}
                        onChange={(e) => updateItem(item.id, "product", e.target.value)}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.serialNumber || ""}
                        onChange={(e) => updateItem(item.id, "serialNumber", e.target.value)}
                        className="w-full"
                        placeholder="Optional"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", Number.parseInt(e.target.value))}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => updateItem(item.id, "price", Number.parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{formatCurrency(item.quantity * item.price)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col space-y-2 rounded-md border p-4 sm:ml-auto sm:w-1/2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%):</span>
              <span className="font-medium">{formatCurrency(gstAmount)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-end gap-2">
        <Button variant="outline">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button variant="outline">
          <Mail className="mr-2 h-4 w-4" />
          Email
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Save Invoice
        </Button>
      </CardFooter>
    </Card>
  )
}

