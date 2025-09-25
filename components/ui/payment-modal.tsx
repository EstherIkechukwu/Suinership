"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, CreditCard, AlertCircle, CheckCircle, Shield, Lock } from "lucide-react"
import { flutterwaveService, type PaymentData } from "@/lib/flutterwave"
import { useAuth } from "@/components/auth/auth-provider"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (usdcAmount: number) => void
  title?: string
  description?: string
}

export function PaymentModal({
  isOpen,
  onClose,
  onSuccess,
  title = "Deposit Funds",
  description = "Convert Naira to USDC",
}: PaymentModalProps) {
  const { user } = useAuth()
  const [step, setStep] = useState<"form" | "flutterwave" | "processing" | "success" | "error">("form")
  const [amount, setAmount] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [transactionRef, setTransactionRef] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card")

  const usdcAmount = amount ? flutterwaveService.convertNairaToUSDC(Number.parseFloat(amount)) : 0
  const fees = amount ? flutterwaveService.calculateFees(Number.parseFloat(amount), "deposit") : 0
  const totalAmount = amount ? Number.parseFloat(amount) + fees : 0

  const handlePayment = async () => {
    if (!amount || !phone || !user) return
    if (paymentMethod === "card" && (!cardNumber || !expiryDate || !cvv)) return
    if (paymentMethod === "bank" && !selectedBank) return

    setIsLoading(true)
    setStep("flutterwave")

    setTimeout(() => {
      setStep("processing")
    }, 1500)

    try {
      const paymentData: PaymentData = {
        amount: totalAmount,
        currency: "NGN",
        email: user.email,
        phone: phone,
        name: user.name,
        description: `Deposit ${amount} NGN to convert to ${usdcAmount.toFixed(2)} USDC`,
      }

      const response = await flutterwaveService.initializePayment(paymentData)

      if (response.status === "successful") {
        setTransactionRef(response.flw_ref)
        setStep("success")

        // Call success callback with USDC amount
        setTimeout(() => {
          onSuccess(usdcAmount)
          handleClose()
        }, 3000)
      } else {
        throw new Error("Payment failed")
      }
    } catch (error) {
      setErrorMessage("Payment failed. Please try again.")
      setStep("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setStep("form")
    setAmount("")
    setSelectedBank("")
    setPhone("")
    setCardNumber("")
    setExpiryDate("")
    setCvv("")
    setErrorMessage("")
    setTransactionRef("")
    onClose()
  }

  const formatCurrency = (amount: number, currency = "NGN") => {
    if (currency === "NGN") {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0,
      }).format(amount)
    }
    return `${amount.toFixed(2)} USDC`
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>{title}</span>
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {step === "form" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount (NGN)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount in Naira"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1000"
                />
                {amount && (
                  <p className="text-sm text-muted-foreground mt-1">
                    ≈ {formatCurrency(usdcAmount, "USDC")} (Rate: ₦1,600/USDC)
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <Label>Payment Method</Label>
                <div className="flex space-x-2 mt-2">
                  <Button
                    type="button"
                    variant={paymentMethod === "card" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("card")}
                    className="flex-1"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Card
                  </Button>
                  <Button
                    type="button"
                    variant={paymentMethod === "bank" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("bank")}
                    className="flex-1"
                  >
                    Bank Transfer
                  </Button>
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                    />
                  </div>
                  <div className="flex space-x-3">
                    <div className="flex-1">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        type="text"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, "")
                          if (value.length >= 2) {
                            value = value.substring(0, 2) + "/" + value.substring(2, 4)
                          }
                          setExpiryDate(value)
                        }}
                        maxLength={5}
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div>
                  <Label htmlFor="bank">Select Bank</Label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gtbank">GTBank</SelectItem>
                      <SelectItem value="access">Access Bank</SelectItem>
                      <SelectItem value="zenith">Zenith Bank</SelectItem>
                      <SelectItem value="uba">UBA</SelectItem>
                      <SelectItem value="firstbank">First Bank</SelectItem>
                      <SelectItem value="fidelity">Fidelity Bank</SelectItem>
                      <SelectItem value="union">Union Bank</SelectItem>
                      <SelectItem value="sterling">Sterling Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {amount && (
                <div className="p-4 bg-muted/30 rounded-lg space-y-2">
                  <h4 className="font-medium text-sm">Payment Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span>{formatCurrency(Number.parseFloat(amount))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Fee:</span>
                      <span>{formatCurrency(fees)}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Total:</span>
                      <span>{formatCurrency(totalAmount)}</span>
                    </div>
                    <div className="flex justify-between text-accent">
                      <span>You'll receive:</span>
                      <span>{formatCurrency(usdcAmount, "USDC")}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button
                onClick={handlePayment}
                disabled={
                  !amount ||
                  !phone ||
                  Number.parseFloat(amount) < 1000 ||
                  (paymentMethod === "card" && (!cardNumber || !expiryDate || !cvv)) ||
                  (paymentMethod === "bank" && !selectedBank)
                }
                className="flex-1"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Pay {formatCurrency(totalAmount)}
              </Button>
            </div>
          </div>
        )}

        {step === "flutterwave" && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-600">Secured by Flutterwave</span>
              </div>
              <p className="text-sm text-muted-foreground">Redirecting to secure payment gateway...</p>
            </div>

            <div className="border rounded-lg p-4 bg-gradient-to-r from-orange-50 to-orange-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">F</span>
                  </div>
                  <span className="font-semibold text-orange-800">Flutterwave</span>
                </div>
                <Lock className="h-4 w-4 text-orange-600" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Merchant:</span>
                  <span className="font-medium">Suinership</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="font-medium capitalize">{paymentMethod}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
                <span className="ml-2 text-sm text-orange-700">Processing...</span>
              </div>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="text-center py-8 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <div>
              <h3 className="font-semibold text-lg">Processing Payment</h3>
              <p className="text-muted-foreground">Please wait while we process your payment...</p>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Secure Payment via Flutterwave
            </Badge>
          </div>
        )}

        {step === "success" && (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
            <div>
              <h3 className="font-semibold text-lg text-green-700">Payment Successful!</h3>
              <p className="text-muted-foreground">Your USDC has been credited to your wallet</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg space-y-2">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Paid:</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">USDC Received:</span>
                  <span className="text-green-700 font-medium">{formatCurrency(usdcAmount, "USDC")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reference:</span>
                  <span className="font-mono text-xs">{transactionRef}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "error" && (
          <div className="text-center py-8 space-y-4">
            <AlertCircle className="h-12 w-12 mx-auto text-red-500" />
            <div>
              <h3 className="font-semibold text-lg text-red-700">Payment Failed</h3>
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
