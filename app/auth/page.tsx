"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { LanguageSelector } from "@/components/ui/language-selector"
import { AccessibilityToolbar } from "@/components/ui/accessibility-toolbar"
import { useAuth } from "@/components/auth/auth-provider"
import { Home, Users, Building, Shield, ArrowLeft, Copy, Check, Chrome, Wallet } from "lucide-react"
import { type Language, getTranslation } from "@/lib/i18n"
import Link from "next/link"
import Image from 'next/image'

type AuthStep = "role-selection" | "sign-up" | "sign-in" | "wallet-display"
type UserRole = "buyer" | "seller"

export default function AuthPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")
  const [currentStep, setCurrentStep] = useState<AuthStep>("role-selection")
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [email, setEmail] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [copied, setCopied] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const { signInWithZkLogin } = useAuth()
  const router = useRouter()

  const t = (key: string) => getTranslation(key, currentLanguage)

  const handleRoleSelection = (role: UserRole) => {
    setSelectedRole(role)
    setCurrentStep("sign-up")
  }

  const handleZkLoginSignUp = async () => {
    if (!email || !agreeToTerms || !selectedRole) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate wallet address
      const generatedWallet = `0x${Math.random().toString(16).substr(2, 40)}`
      setWalletAddress(generatedWallet)

      setCurrentStep("wallet-display")
    } catch (error) {
      console.error("Sign up failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleZkLoginSignIn = async () => {
    if (!email) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate role detection from existing account
      const detectedRole = Math.random() > 0.5 ? "buyer" : "seller"
      await signInWithZkLogin(email, detectedRole)

      router.push(`/dashboard/${detectedRole}`)
    } catch (error) {
      console.error("Sign in failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleProceedToDashboard = async () => {
    if (!selectedRole || !email) return

    setIsLoading(true)
    try {
      await signInWithZkLogin(email, selectedRole)
      router.push(`/dashboard/${selectedRole}`)
    } catch (error) {
      console.error("Dashboard navigation failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyWalletAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const formatWalletAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const switchToSignIn = () => {
    setIsSignUp(false)
    setCurrentStep("sign-in")
    setEmail("")
    setAgreeToTerms(false)
  }

  const switchToSignUp = () => {
    setIsSignUp(true)
    setCurrentStep("role-selection")
    setSelectedRole(null)
    setEmail("")
    setAgreeToTerms(false)
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
               <Image
                src="/Suinership_logo_white.png"
                alt="Suinership"
                width={100}
                height={100}
                className="rounded-lg"
              />

            </div>

            <h1 className="text-3xl lg:text-2xl font-bold text-foreground mb-3">
              {currentStep === "role-selection"
                ? "Choose Your Role"
                : currentStep === "sign-up"
                  ? "Create Your Account"
                  : currentStep === "sign-in"
                    ? "Welcome Back"
                    : "Your Wallet is Ready"}
            </h1>
            <p className="text-base text-muted-foreground mb-0.5">
              {currentStep === "role-selection"
                ? "Select how you want to use Suinership"
                : currentStep === "sign-up"
                  ? "Sign up to start your real estate investment journey"
                  : currentStep === "sign-in"
                    ? "Sign in to access your dashboard"
                    : "Your Sui wallet has been created successfully"}
            </p>
          </div>

          {/* Role Selection Step */}
          {currentStep === "role-selection" && (
            <div className="space-y-6">
              <div className="grid gap-6">
                {roleCards.map((roleCard) => (
                  <Card
                    key={roleCard.role}
                    className="bg-card border-border hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => handleRoleSelection(roleCard.role)}
                  >
                    <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <roleCard.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{roleCard.title}</CardTitle>
                        <CardDescription>{roleCard.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid grid-cols-2 gap-2">
                        {roleCard.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Already have an account?</p>
                <Button variant="outline" onClick={switchToSignIn}>
                  Sign In Instead
                </Button>
              </div>
            </div>
          )}

          {/* Sign Up Step */}
          {currentStep === "sign-up" && selectedRole && (
            <Card className="bg-card border-border">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {selectedRole === "buyer" ? (
                    <Users className="h-8 w-8 text-primary" />
                  ) : (
                    <Building className="h-8 w-8 text-primary" />
                  )}
                </div>
                <CardTitle>
                  Sign Up as {selectedRole === "buyer" ? "Investor/Buyer" : "Property Owner/Seller"}
                </CardTitle>
                <CardDescription>Enter your details to create your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button
                  className="w-full"
                  onClick={handleZkLoginSignUp}
                  disabled={!email || !agreeToTerms || isLoading}
                >
                  <Chrome className="h-4 w-4 mr-2" />
                  {isLoading ? "Creating Account..." : "Sign Up with Google (zkLogin)"}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Already have an account?</p>
                  <Button variant="ghost" onClick={switchToSignIn}>
                    Sign In Instead
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sign In Step */}
          {currentStep === "sign-in" && (
            <Card className="bg-card border-border">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Sign In to Your Account</CardTitle>
                <CardDescription>Enter your email to access your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email Address</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button className="w-full" onClick={handleZkLoginSignIn} disabled={!email || isLoading}>
                  <Chrome className="h-4 w-4 mr-2" />
                  {isLoading ? "Signing In..." : "Sign In with Google (zkLogin)"}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Don't have an account?</p>
                  <Button variant="ghost" onClick={switchToSignUp}>
                    Sign Up Instead
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Wallet Display Step */}
          {currentStep === "wallet-display" && (
            <Card className="bg-card border-border">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle>Wallet Created Successfully!</CardTitle>
                <CardDescription>Your Sui wallet has been generated and is ready to use</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <Label className="text-sm font-medium">Your Wallet Address</Label>
                  <div className="flex items-center justify-between bg-background rounded-md p-3 border">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Wallet className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-mono text-sm">{formatWalletAddress(walletAddress)}</p>
                        <p className="text-xs text-muted-foreground">Sui Network</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyWalletAddress}
                      className="flex items-center space-x-1 bg-transparent"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      <span>{copied ? "Copied!" : "Copy"}</span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Keep this address safe. You'll use it to receive USDC and manage your investments.
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">What's Next?</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Your wallet is automatically connected to your account</li>
                    <li>• Deposit Naira to get USDC for property investments</li>
                    <li>• Start exploring available properties on your dashboard</li>
                  </ul>
                </div>

                <Button className="w-full" onClick={handleProceedToDashboard} disabled={isLoading}>
                  {isLoading ? "Loading Dashboard..." : "Proceed to Dashboard"}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
