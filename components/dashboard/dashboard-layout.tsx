"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/ui/language-selector"
import { EnhancedAccessibility } from "@/components/ui/enhanced-accessibility"
import { AIChatbot } from "@/components/ui/ai-chatbot"
import { UserMenu } from "@/components/ui/user-menu"
import { useAuth } from "@/components/auth/auth-provider"
import {
  Home,
  PieChart,
  ShoppingCart,
  Building,
  Users,
  Settings,
  Shield,
  Scale,
  Briefcase,
  Menu,
  X,
  Wallet,
  ImageIcon,
    LogOut
} from "lucide-react"
import Link from "next/link"
import {usePathname, useRouter} from "next/navigation"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/lib/auth"
import Image from 'next/image'

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: UserRole
}

export function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, signOut } = useAuth()
  const pathname = usePathname()
    const router = useRouter()

  const navigationItems = {
    buyer: [
      { name: "Dashboard", href: "/dashboard/buyer", icon: Home },
      // { name: "Marketplace", href: "/dashboard/buyer/marketplace", icon: ShoppingCart },
      { name: "Wallet", href: "/dashboard/buyer/wallet", icon: Wallet },
      { name: "NFT Collection", href: "/dashboard/buyer/nft-collection", icon: ImageIcon },
      { name: "Settings", href: "/dashboard/buyer/settings", icon: Settings },
        {name: "LogOut", href: "/logout", icon: LogOut},
    ],
    seller: [
      { name: "Dashboard", href: "/dashboard/seller", icon: Home },
      { name: "My Properties", href: "/dashboard/seller/properties", icon: Building },
      { name: "List Property", href: "/dashboard/seller/list", icon: ShoppingCart },
      { name: "Analytics", href: "/dashboard/seller/analytics", icon: PieChart },
      { name: "Wallet", href: "/dashboard/seller/wallet", icon: Wallet },
      { name: "NFT Collection", href: "/dashboard/seller/nft-collection", icon: ImageIcon },
      { name: "Settings", href: "/dashboard/seller/settings", icon: Settings },
        {name: "LogOut", href: "/logout", icon: LogOut},
    ],
    admin: [
      { name: "Dashboard", href: "/dashboard/admin", icon: Home },
      { name: "Law Firms", href: "/dashboard/admin/law-firms", icon: Scale },
      { name: "Custodians", href: "/dashboard/admin/custodians", icon: Briefcase },
      { name: "Oversight", href: "/dashboard/admin/oversight", icon: Shield },
      { name: "Wallet", href: "/dashboard/admin/wallet", icon: Wallet },
      { name: "NFT Collection", href: "/dashboard/admin/nft-collection", icon: ImageIcon },
      { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
        {name: "LogOut", href: "/logout", icon: LogOut},
    ],
    "law-firm": [
      { name: "Dashboard", href: "/dashboard/law-firm", icon: Home },
      { name: "Verification Queue", href: "/dashboard/law-firm/queue", icon: Scale },
      { name: "Certificates", href: "/dashboard/law-firm/certificates", icon: Shield },
      { name: "Wallet", href: "/dashboard/law-firm/wallet", icon: Wallet },
      { name: "NFT Collection", href: "/dashboard/law-firm/nft-collection", icon: ImageIcon },
      { name: "Settings", href: "/dashboard/law-firm/settings", icon: Settings },
        {name: "LogOut", href: "/logout", icon: LogOut},
    ],
    custodian: [
      { name: "Dashboard", href: "/dashboard/custodian", icon: Home },
      { name: "Properties", href: "/dashboard/custodian/properties", icon: Building },
      { name: "Analytics", href: "/dashboard/custodian/analytics", icon: PieChart },
      { name: "Reports", href: "/dashboard/custodian/reports", icon: Shield },
      { name: "Wallet", href: "/dashboard/custodian/wallet", icon: Wallet },
      { name: "NFT Collection", href: "/dashboard/custodian/nft-collection", icon: ImageIcon },
      { name: "Settings", href: "/dashboard/custodian/settings", icon: Settings },
        {name: "LogOut", href: "/signOut", icon: LogOut},
    ],
  }

  const navigation = navigationItems[userRole] || navigationItems.buyer

  const getRoleDisplayName = (role: UserRole) => {
    const roleNames = {
      buyer: "Investor Dashboard",
      seller: "Seller Dashboard",
      admin: "Admin Dashboard",
      "law-firm": "Law Firm Dashboard",
      custodian: "Custodian Dashboard",
    }
    return roleNames[role] || "Dashboard"
  }



  const getChatbotRole = (role: UserRole) => {
    if (role === "law-firm") return "law-firm"
    return role
  }

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">

          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <div>
                  <Image
                src="/Suinership_logo_white.png"
                alt="Suinership"
                width={100}
                height={100}
                className="rounded-lg"
              />
              </div>

            </div>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>


          <div className="p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">{user?.name?.charAt(0) || "U"}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground truncate">{getRoleDisplayName(userRole)}</p>
              </div>
            </div>
          </div>

        <nav className="flex-1 p-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                  onClick={async (e) => {
                    setSidebarOpen(false)
                    if (item.name === "LogOut") {
                      e.preventDefault()
                      try {
                        await signOut()
                      } finally {
                        router.push("/")
                      }
                    }
                  }}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

        </div>
      </div>


      <div className="lg:pl-64">

        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-foreground">{getRoleDisplayName(userRole)}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <EnhancedAccessibility />
              <UserMenu />
            </div>
          </div>
        </header>


        <main className="p-6">{children}</main>
      </div>

      <AIChatbot userRole={getChatbotRole(userRole)} />
    </div>
  )
}
