"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LanguageSelector } from "@/components/ui/language-selector"
import { AccessibilityToolbar } from "@/components/ui/accessibility-toolbar"
import { useAuth } from "@/components/auth/auth-provider"
import { Home, Users, Building, Shield, Scale, Briefcase, ArrowLeft } from "lucide-react"
import { type Language, getTranslation } from "@/lib/i18n"
import Link from "next/link"

export default function AuthPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")
  const [isLoading, setIsLoading] = useState(false)
  const [adminCredentials, setAdminCredentials] = useState({ email: "", password: "" })
  const { signIn, signInAdmin } = useAuth()
  const router = useRouter()

  const t = (key: string) => getTranslation(key, currentLanguage)

  const handleRoleSignIn = async (role: "buyer" | "seller") => {
    setIsLoading(true)
    try {
      await signIn(role)
      router.push(role === "buyer" ? "/dashboard/buyer" : "/dashboard/seller")
    } catch (error) {
      console.error("Sign in failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdminSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signInAdmin(adminCredentials)
      router.push("/dashboard/admin")
    } catch (error) {
      console.error("Admin sign in failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const roleCards = [
    {
      role: "buyer" as const,
      icon: Users,
      title: "Investor/Buyer",
      description: "Invest in fractional real estate and build your portfolio",
      features: ["Browse properties", "Purchase fractions", "Track investments", "Earn dividends"],
    },
    {
      role: "seller" as const,
      icon: Building,
      title: "Property Owner/Seller",
      description: "List your properties for fractional ownership",
      features: ["List properties", "KYC verification", "Track sales", "Manage listings"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector onLanguageChange={setCurrentLanguage} />
              <AccessibilityToolbar />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Home className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">Suinership</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Welcome to Suinership</h1>
            <p className="text-xl text-muted-foreground">Choose your role to get started with fractional real estate</p>
          </div>

          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="user">User Access</TabsTrigger>
              <TabsTrigger value="admin">Admin Access</TabsTrigger>
            </TabsList>

            <TabsContent value="user" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {roleCards.map((roleCard) => (
                  <Card key={roleCard.role} className="bg-card border-border hover:shadow-lg transition-all">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <roleCard.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{roleCard.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">{roleCard.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <ul className="space-y-2">
                        {roleCard.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" onClick={() => handleRoleSignIn(roleCard.role)} disabled={isLoading}>
                        {isLoading ? "Signing in..." : `Continue as ${roleCard.title}`}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-muted/30 border-border">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Professional Access</h3>
                    <p className="text-muted-foreground">
                      Are you a law firm or custodian partner? Contact our admin team for professional access.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Scale className="h-4 w-4" />
                        <span>Law Firm Verification</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        <span>Custodian Management</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admin">
              <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-destructive" />
                  </div>
                  <CardTitle>Admin Sign In</CardTitle>
                  <CardDescription>Restricted access for super administrators only</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAdminSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@suinership.com"
                        value={adminCredentials.email}
                        onChange={(e) => setAdminCredentials({ ...adminCredentials, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <Input
                        id="admin-password"
                        type="password"
                        placeholder="Enter admin password"
                        value={adminCredentials.password}
                        onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In as Admin"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
