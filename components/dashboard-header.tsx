"use client"

import Link from "next/link"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Bell, Menu, Search, Settings, User, LogOut, ShoppingCart, Package, BarChart2, Home } from "lucide-react"

export function DashboardHeader() {
  const [searchOpen, setSearchOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("shelfsync_user")
    window.location.href = "/login"
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="top">
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="h-9 flex-1" autoFocus />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="flex items-center gap-2 md:gap-3">
        <Package className="h-6 w-6" />
        <span className="font-bold">ShelfSync</span>
      </Link>
      <div className="relative hidden md:flex md:flex-1 md:gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="shrink-0">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <Package className="h-6 w-6" />
                <span className="font-bold">ShelfSync</span>
              </Link>
              <Link href="/" className="flex items-center gap-2 text-muted-foreground">
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link href="/inventory" className="flex items-center gap-2 text-muted-foreground">
                <Package className="h-4 w-4" />
                Inventory
              </Link>
              <Link href="/sales" className="flex items-center gap-2 text-muted-foreground">
                <ShoppingCart className="h-4 w-4" />
                Sales
              </Link>
              <Link href="/reports" className="flex items-center gap-2 text-muted-foreground">
                <BarChart2 className="h-4 w-4" />
                Reports
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

