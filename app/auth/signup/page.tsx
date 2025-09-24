"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Building2, Shield, User, FileCheck, Loader2, Wallet, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedRole = searchParams.get("role")

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    role: preselectedRole || "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    idNumber: "",
    idType: "",
    agreeTerms: false,
    agreeKYC: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const handleGoogleZkLogin = async () => {
    if (!formData.agreeTerms) {
      return
    }

    setIsLoading(true)

    // Simulate OAuth popup opening
    setTimeout(() => {
      // Simulate user authenticating with Google
      console.log("[v0] OAuth popup opened, user authenticating...")

      // Simulate receiving Google id_token and backend verification
      setTimeout(() => {
        // Generate random wallet address for demo
        const mockWalletAddress = `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`
        setWalletAddress(mockWalletAddress)

        console.log("[v0] Google id_token received and verified")
        console.log("[v0] zkLogin Sui wallet generated:", mockWalletAddress)

        setStep(2) // Move to wallet display step
        setIsLoading(false)
      }, 2000)
    }, 1000)
  }

  const handleRoleSelection = (role: string) => {
    setFormData({ ...formData, role })
    setStep(3) // Move to KYC step
  }

  const handleKYCSubmit = async () => {
    setIsLoading(true)
    // Simulate KYC submission
    setTimeout(() => {
      setIsLoading(false)
      setStep(4) // Move to success step
    }, 2000)
  }

  const handleCompleteRegistration = () => {
    // Navigate to appropriate dashboard based on role
    const dashboardPath = formData.role === "buyer" ? "/dashboard/buyer" : "/dashboard/seller"
    router.push(dashboardPath)
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
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Join the future of real estate investment</p>
        </div>

        {/* Step 1: Google zkLogin Authentication */}
        {step === 1 && (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Shield className="h-5 w-5 text-primary" />
                Secure Sign Up
              </CardTitle>
              <CardDescription className="text-sm">
                One-click registration with automatic wallet creation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* zkLogin Benefits */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-primary text-sm">What happens when you sign up:</h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>Google OAuth popup opens for secure authentication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>Backend verifies your Google id_token</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>Sui wallet automatically generated with zkLogin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>Zero-knowledge proofs keep your data private</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-xs sm:text-sm leading-relaxed">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button onClick={handleGoogleZkLogin} disabled={!formData.agreeTerms || isLoading} className="w-full">
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
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-primary hover:underline">
                  Sign In
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Wallet Display */}
        {step === 2 && (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Wallet className="h-5 w-5 text-secondary" />
                Welcome! Your zkLogin Wallet
              </CardTitle>
              <CardDescription className="text-sm">Your Sui wallet has been automatically created</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Wallet className="h-10 w-10 text-secondary" />
              </div>

              <div className="space-y-4">
                <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
                  <h3 className="font-semibold text-secondary mb-3">Your zkLogin Wallet:</h3>
                  <Badge className="bg-secondary/10 text-secondary border-secondary/20 font-mono text-xs">
                    {walletAddress}
                  </Badge>
                  <div className="mt-3 space-y-2 text-xs text-muted-foreground text-left">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-secondary flex-shrink-0" />
                      <span>Only wallet address is exposed publicly</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-secondary flex-shrink-0" />
                      <span>Private proofs stay hidden (zero-knowledge)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-secondary flex-shrink-0" />
                      <span>Smart contracts interact with this address</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={() => setStep(2.5)} className="w-full">
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2.5: Role Selection */}
        {step === 2.5 && (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <User className="h-5 w-5 text-primary" />
                Select Your Role
              </CardTitle>
              <CardDescription className="text-sm">Choose how you want to participate in Suinership</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Button
                  variant="outline"
                  className="h-auto p-4 text-left justify-start bg-transparent hover:bg-primary/5 hover:border-primary"
                  onClick={() => handleRoleSelection("buyer")}
                >
                  <div>
                    <div className="font-semibold text-primary text-sm sm:text-base">Buyer</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      Invest in fractional property ownership
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 text-left justify-start bg-transparent hover:bg-secondary/5 hover:border-secondary"
                  onClick={() => handleRoleSelection("seller")}
                >
                  <div>
                    <div className="font-semibold text-secondary text-sm sm:text-base">Seller</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">List properties for fractional sale</div>
                  </div>
                </Button>
              </div>

              <div className="text-center text-xs sm:text-sm text-muted-foreground">
                You can change your role later in account settings
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: KYC Information */}
        {step === 3 && (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <FileCheck className="h-5 w-5 text-warning" />
                KYC Verification Required
              </CardTitle>
              <CardDescription className="text-sm">Complete identity verification to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-warning/5 border border-warning/20 rounded-lg p-3 text-xs text-muted-foreground">
                <p>
                  As required by regulations, please provide your identification details. This information is securely
                  stored and only used for verification purposes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm">
                    Full Name *
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John Doe"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 xxx xxx xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-input border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="idType" className="text-sm">
                    ID Type *
                  </Label>
                  <Select
                    value={formData.idType}
                    onValueChange={(value) => setFormData({ ...formData, idType: value })}
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nin">National ID (NIN)</SelectItem>
                      <SelectItem value="passport">International Passport</SelectItem>
                      <SelectItem value="drivers">Driver's License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNumber" className="text-sm">
                    ID Number *
                  </Label>
                  <Input
                    id="idNumber"
                    placeholder="Enter ID number"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                    className="bg-input border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">ID Upload *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <FileCheck className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="kycTerms"
                  checked={formData.agreeKYC}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeKYC: checked as boolean })}
                  className="mt-1"
                />
                <Label htmlFor="kycTerms" className="text-xs sm:text-sm leading-relaxed">
                  I consent to identity verification and data processing for KYC compliance
                </Label>
              </div>

              <Button
                onClick={handleKYCSubmit}
                disabled={
                  !formData.firstName ||
                  !formData.phone ||
                  !formData.idType ||
                  !formData.idNumber ||
                  !formData.agreeKYC ||
                  isLoading
                }
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting KYC...
                  </>
                ) : (
                  "Submit KYC Information"
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary text-lg sm:text-xl">
                <CheckCircle className="h-5 w-5" />
                Welcome to Suinership!
              </CardTitle>
              <CardDescription className="text-sm">Your account setup is complete</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>

              <div className="space-y-3">
                <p className="text-muted-foreground text-sm">Your zkLogin authentication and Sui wallet are ready!</p>

                <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Wallet Address:</span>
                    <Badge variant="outline" className="text-xs font-mono">
                      {walletAddress}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">KYC Status:</span>
                    <Badge className="bg-warning/10 text-warning border-warning/20 text-xs">Under Review</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Role:</span>
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-xs capitalize">
                      {formData.role}
                    </Badge>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  You'll receive an email notification once your KYC verification is complete.
                </p>
              </div>

              <Button onClick={handleCompleteRegistration} className="w-full">
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Demo Navigation - Only show in development */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 space-y-2">
            <div className="flex gap-2">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1 text-xs">
                  [Demo] Previous Step
                </Button>
              )}
              {step < 4 && (
                <Button variant="outline" onClick={() => setStep(step + 1)} className="flex-1 text-xs">
                  [Demo] Next Step
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
