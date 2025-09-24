"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Home,
  Search,
  Wallet,
  Vote,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  TrendingUp,
  FileText,
  Users,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: "buyer" | "seller" | "admin" | "law-firm" | "custodian"
}

export function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const getNavItems = () => {
    const baseItems = [{ icon: Home, label: "Dashboard", href: `/dashboard/${userRole}` }]

    switch (userRole) {
      case "buyer":
        return [
          ...baseItems,
          { icon: Search, label: "Browse Properties", href: `/dashboard/${userRole}?tab=properties` },
          { icon: Wallet, label: "My Portfolio", href: `/dashboard/${userRole}?tab=portfolio` },
          { icon: Vote, label: "Governance", href: `/dashboard/${userRole}?tab=governance` },
          { icon: TrendingUp, label: "NFT Marketplace", href: `/dashboard/${userRole}?tab=marketplace` },
        ]
      case "seller":
        return [
          ...baseItems,
          { icon: Building2, label: "My Properties", href: `/dashboard/${userRole}?tab=properties` },
          { icon: FileText, label: "Upload Property", href: `/dashboard/${userRole}?tab=upload` },
          { icon: TrendingUp, label: "Sales Analytics", href: `/dashboard/${userRole}?tab=analytics` },
        ]
      case "admin":
        return [
          ...baseItems,
          { icon: Users, label: "User Management", href: `/dashboard/${userRole}?tab=users` },
          { icon: Building2, label: "Property Oversight", href: `/dashboard/${userRole}?tab=properties` },
          { icon: Shield, label: "Law Firms", href: `/dashboard/${userRole}?tab=law-firms` },
          { icon: FileText, label: "Custodians", href: `/dashboard/${userRole}?tab=custodians` },
        ]
      default:
        return baseItems
    }
  }

  const getRoleColor = () => {
    switch (userRole) {
      case "buyer":
        return "bg-primary/10 text-primary border-primary/20"
      case "seller":
        return "bg-secondary/10 text-secondary border-secondary/20"
      case "admin":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "law-firm":
        return "bg-warning/10 text-warning border-warning/20"
      case "custodian":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const navItems = getNavItems()

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card/50 backdrop-blur-sm border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-heading font-bold">Suinership</span>
            </Link>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* User info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/diverse-user-avatars.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">John Doe</p>
                <Badge className={`text-xs ${getRoleColor()}`}>
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1).replace("-", " ")}
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" className="w-full justify-start text-left hover:bg-muted/50">
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Settings */}
          <div className="p-4 border-t border-border">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={() => router.push("/auth/signin")}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card/50 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-4 ml-auto">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/diverse-user-avatars.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/auth/signin")}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
