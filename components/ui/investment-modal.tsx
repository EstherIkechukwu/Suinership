"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Loader2, TrendingUp, AlertCircle, CheckCircle, Wallet, DollarSign } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

interface Property {
  id: number
  title: string
  location: string
  price: number
  minInvestment: number
  fractionsAvailable: number
  totalFractions: number
  expectedROI: number
  image: string
}

interface InvestmentModalProps {
  isOpen: boolean
  onClose: () => void
  property: Property | null
  walletBalance: number
  onSuccess: (investmentAmount: number) => void
}

export function InvestmentModal({ isOpen, onClose, property, walletBalance, onSuccess }: InvestmentModalProps) {
  const { user } = useAuth()
  const [step, setStep] = useState<"form" | "processing" | "success" | "error">("form")
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  if (!property) return null

  const amount = Number.parseFloat(investmentAmount) || 0
  const fractionsToBuy = Math.floor(amount / (property.price / property.totalFractions))
  const actualInvestment = fractionsToBuy * (property.price / property.totalFractions)
  const isValidAmount =
    amount >= property.minInvestment && amount <= walletBalance && fractionsToBuy <= property.fractionsAvailable

  const handleInvestment = async () => {
    if (!isValidAmount) return

    setIsLoading(true)
    setStep("processing")

    try {
      // Simulate investment processing
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Check if user has sufficient balance
          if (actualInvestment > walletBalance) {
            reject(new Error("Insufficient wallet balance"))
            return
          }

          // Mock successful investment (95% success rate)
          if (Math.random() > 0.05) {
            resolve(true)
          } else {
            reject(new Error("Investment processing failed"))
          }
        }, 2000)
      })

      setStep("success")

      // Call success callback
      setTimeout(() => {
        onSuccess(actualInvestment)
        handleClose()
      }, 2000)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Investment failed. Please try again.")
      setStep("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setStep("form")
    setInvestmentAmount("")
    setErrorMessage("")
    onClose()
  }

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC`
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Invest in Property</span>
          </DialogTitle>
          <DialogDescription>Purchase fractional ownership in {property.title}</DialogDescription>
        </DialogHeader>

        {step === "form" && (
          <div className="space-y-6">
            {/* Property Summary */}
            <div className="flex space-x-4">
              <img
                src={property.image || "/placeholder.svg?height=80&width=80&query=property investment"}
                alt={property.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{property.title}</h3>
                <p className="text-sm text-muted-foreground">{property.location}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {property.expectedROI}% ROI
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {property.fractionsAvailable}/{property.totalFractions} available
                  </span>
                </div>
              </div>
            </div>

            {/* Availability Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Available Fractions</span>
                <span className="font-medium">
                  {property.fractionsAvailable}/{property.totalFractions}
                </span>
              </div>
              <Progress value={(property.fractionsAvailable / property.totalFractions) * 100} className="h-2" />
            </div>

            {/* Investment Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="investment-amount">Investment Amount (USDC)</Label>
                <Input
                  id="investment-amount"
                  type="number"
                  placeholder={`Minimum ${formatCurrency(property.minInvestment)}`}
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  min={property.minInvestment}
                  max={walletBalance}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Min: {formatCurrency(property.minInvestment)}</span>
                  <span>Available: {formatCurrency(walletBalance)}</span>
                </div>
              </div>

              {amount > 0 && (
                <div className="p-4 bg-muted/30 rounded-lg space-y-3">
                  <h4 className="font-medium text-sm">Investment Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Investment Amount:</span>
                      <span>{formatCurrency(amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fractions to Buy:</span>
                      <span>{fractionsToBuy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Actual Investment:</span>
                      <span className="font-medium">{formatCurrency(actualInvestment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ownership %:</span>
                      <span className="text-accent">
                        {((fractionsToBuy / property.totalFractions) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Remaining Balance:</span>
                      <span>{formatCurrency(walletBalance - actualInvestment)}</span>
                    </div>
                  </div>

                  {!isValidAmount && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>
                        {amount < property.minInvestment && "Amount below minimum investment"}
                        {amount > walletBalance && "Insufficient wallet balance"}
                        {fractionsToBuy > property.fractionsAvailable && "Not enough fractions available"}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Wallet Balance */}
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Wallet Balance</span>
                </div>
                <span className="font-semibold">{formatCurrency(walletBalance)}</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleInvestment} disabled={!isValidAmount || !amount} className="flex-1">
                <DollarSign className="h-4 w-4 mr-2" />
                Confirm Investment
              </Button>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="text-center py-8 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <div>
              <h3 className="font-semibold text-lg">Processing Investment</h3>
              <p className="text-muted-foreground">Please wait while we process your investment...</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Property:</span>
                  <span className="font-medium">{property.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Investment:</span>
                  <span className="font-medium">{formatCurrency(actualInvestment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fractions:</span>
                  <span className="font-medium">{fractionsToBuy}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
            <div>
              <h3 className="font-semibold text-lg text-green-700">Investment Successful!</h3>
              <p className="text-muted-foreground">You now own {fractionsToBuy} fractions of this property</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg space-y-2">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Investment Amount:</span>
                  <span className="font-medium">{formatCurrency(actualInvestment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ownership:</span>
                  <span className="text-green-700 font-medium">
                    {((fractionsToBuy / property.totalFractions) * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected ROI:</span>
                  <span className="text-green-700 font-medium">{property.expectedROI}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "error" && (
          <div className="text-center py-8 space-y-4">
            <AlertCircle className="h-12 w-12 mx-auto text-red-500" />
            <div>
              <h3 className="font-semibold text-lg text-red-700">Investment Failed</h3>
              <p className="text-muted-foreground">{errorMessage}</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                Close
              </Button>
              <Button onClick={() => setStep("form")} className="flex-1">
                Try Again
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
