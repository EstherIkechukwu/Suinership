"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building2, Shield, UserCog, Loader2, CheckCircle, Wallet } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const [adminEmail, setAdminEmail] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [authStep, setAuthStep] = useState(1) // 1: initial, 2: wallet connecting, 3: success
  const [walletAddress, setWalletAddress] = useState("")
  const [userRole, setUserRole] = useState("")
  const router = useRouter()

  const handleGoogleZkLogin = async () => {
    setIsLoading(true)
    setAuthStep(1)

    // Simulate OAuth popup opening
    setTimeout(() => {
      console.log("[v0] OAuth popup opened, user authenticating...")
      setAuthStep(2)

      // Simulate backend verification and existing user check
      setTimeout(() => {
        // Simulate fetching saved wallet for existing user
        const mockWalletAddress = `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`
        const mockUserRole = Math.random() > 0.5 ? "buyer" : "seller"

        setWalletAddress(mockWalletAddress)
        setUserRole(mockUserRole)

        console.log("[v0] Existing user found, fetching saved wallet:", mockWalletAddress)
        console.log("[v0] User role:", mockUserRole)

        setAuthStep(3)
        setIsLoading(false)

        // Auto-redirect after showing success
        setTimeout(() => {
          const dashboardPath = mockUserRole === "seller" ? "/dashboard/seller" : "/dashboard/buyer"
          router.push(dashboardPath)
        }, 2000)
      }, 2000)
    }, 1000)
  }

  const handleAdminLogin = async () => {
    setIsLoading(true)
    // Simulate admin authentication
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard/admin")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-heading font-bold">Suinership</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Sign in to your account</p>
        </div>

        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger
              value="user"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm"
            >
              User Login
            </TabsTrigger>
            <TabsTrigger
              value="admin"
              className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground text-xs sm:text-sm"
            >
              Admin Login
            </TabsTrigger>
          </TabsList>

          {/* User Login */}
          <TabsContent value="user">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Shield className="h-5 w-5 text-primary" />
                  {authStep === 1 && "Sign In with zkLogin"}
                  {authStep === 2 && "Verifying Authentication"}
                  {authStep === 3 && "Welcome Back!"}
                </CardTitle>
                <CardDescription className="text-sm">
                  {authStep === 1 && "Secure authentication via Google OAuth"}
                  {authStep === 2 && "Connecting to your existing wallet"}
                  {authStep === 3 && "Successfully authenticated"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {authStep === 1 && (
                  <>
                    {/* zkLogin Benefits */}
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-3">
                      <h3 className="font-semibold text-primary text-sm">Secure Sign In Process:</h3>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                          <span>Google OAuth popup for authentication</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                          <span>Backend verifies your Google id_token</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                          <span>Automatic connection to your saved wallet</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                          <span>Zero-knowledge proof security</span>
                        </li>
                      </ul>
                    </div>

                    <Button onClick={handleGoogleZkLogin} disabled={isLoading} className="w-full">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Opening Google OAuth...
                        </>
                      ) : (
                        <>
                          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="currentColor"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          Sign in with Google (zkLogin secured)
                        </>
                      )}
                    </Button>

                    <div className="text-center text-xs sm:text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <Link href="/auth/signup" className="text-primary hover:underline">
                        Sign Up
                      </Link>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Optional</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent" disabled>
                      <Wallet className="mr-2 h-4 w-4" />
                      Wallet Connect (Advanced Users)
                    </Button>
                  </>
                )}

                {authStep === 2 && (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Verifying with Google...</p>
                      <p className="text-xs text-muted-foreground">Backend processing your id_token</p>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="h-3 w-3 text-primary" />
                        <span>OAuth authentication successful</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span>Fetching your saved wallet...</span>
                      </div>
                    </div>
                  </div>
                )}

                {authStep === 3 && (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-8 w-8 text-secondary" />
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-medium">Welcome back! Your zkLogin wallet:</p>

                      <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4 space-y-3">
                        <Badge className="bg-secondary/10 text-secondary border-secondary/20 font-mono text-xs">
                          {walletAddress}
                        </Badge>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Role:</span>
                            <Badge variant="outline" className="text-xs capitalize">
                              {userRole}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Status:</span>
                            <Badge className="bg-secondary/10 text-secondary border-secondary/20 text-xs">Active</Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground">Redirecting to your dashboard...</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Login */}
          <TabsContent value="admin">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <UserCog className="h-5 w-5 text-destructive" />
                  Admin Access
                </CardTitle>
                <CardDescription className="text-sm">Administrative dashboard login</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminEmail" className="text-sm">
                    Admin Email
                  </Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    placeholder="admin@suinership.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="bg-input border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminPassword" className="text-sm">
                    Password
                  </Label>
                  <Input
                    id="adminPassword"
                    type="password"
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="bg-input border-border"
                  />
                </div>

                <Button
                  onClick={handleAdminLogin}
                  disabled={!adminEmail || !adminPassword || isLoading}
                  className="w-full bg-destructive hover:bg-destructive/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Admin Sign In"
                  )}
                </Button>

                <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-destructive" />
                  <span>Restricted Access</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Demo Navigation - Only show in development */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 space-y-2">
            <Button variant="outline" onClick={() => router.push("/dashboard/buyer")} className="w-full text-xs">
              [Demo] Go to Buyer Dashboard
            </Button>
            <Button variant="outline" onClick={() => router.push("/dashboard/seller")} className="w-full text-xs">
              [Demo] Go to Seller Dashboard
            </Button>
            <Button variant="outline" onClick={() => router.push("/dashboard/admin")} className="w-full text-xs">
              [Demo] Go to Admin Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
