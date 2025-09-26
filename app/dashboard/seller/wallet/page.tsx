"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wallet, ArrowUpRight, ArrowDownLeft, History, CreditCard, DollarSign, Copy, ExternalLink } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

export default function SellerWalletPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [selectedBank, setSelectedBank] = useState("")


  const walletData = {
    usdcBalance: 45250,
    walletAddress: user?.walletAddress || "0x1234...5678",
    totalDeposited: 25000,
    totalWithdrawn: 30000,
    totalEarned: 50250,
  }

  const transactions = [
    {
      id: 1,
      type: "sale" as const,
      amount: 15000,
      currency: "USDC",
      status: "completed" as const,
      date: "2024-12-15T10:30:00Z",
      description: "Property fraction sale - Luxury Villa Banana Island",
      reference: "SALE_001234567890",
    },
    {
      id: 2,
      type: "withdrawal" as const,
      amount: 10000,
      currency: "USDC",
      status: "completed" as const,
      date: "2024-12-14T15:45:00Z",
      description: "USDC to Naira withdrawal",
      reference: "WTH_001234567890",
    },
    {
      id: 3,
      type: "deposit" as const,
      amount: 5000,
      currency: "USDC",
      status: "completed" as const,
      date: "2024-12-13T09:15:00Z",
      description: "Naira to USDC conversion via Flutterwave",
      reference: "FLW_TXN_001234567890",
    },
  ]

  const formatCurrency = (amount: number, currency = "USDC") => {
    if (currency === "USDC") {
      return `${amount.toLocaleString("en-US", { minimumFractionDigits: 0})} USDC`
    }
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />
      case "sale":
        return <DollarSign className="h-4 w-4 text-green-500" />
      default:
        return <History className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <ProtectedRoute allowedRoles={["seller"]}>
      <DashboardLayout userRole="seller">
        <div className="space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">USDC Balance</CardTitle>
                <Wallet className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-1.8xl font-bold">{formatCurrency(walletData.usdcBalance)}</div>
                <p className="text-xs text-muted-foreground">Available for withdrawal</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-1.8xl font-bold">{formatCurrency(walletData.totalEarned)}</div>
                <p className="text-xs text-muted-foreground">From property sales</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Deposited</CardTitle>
                <ArrowDownLeft className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-1.8xl font-bold">{formatCurrency(walletData.totalDeposited)}</div>
                <p className="text-xs text-muted-foreground">Lifetime deposits</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Withdrawn</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-1.8xl font-bold">{formatCurrency(walletData.totalWithdrawn)}</div>
                <p className="text-xs text-muted-foreground">Lifetime withdrawals</p>
              </CardContent>
            </Card>
          </div>


          <Card>
            <CardHeader>
              <CardTitle>Wallet Address</CardTitle>
              <CardDescription>Your Sui wallet address for receiving USDC payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Input value={walletData.walletAddress} readOnly className="font-mono" />
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(walletData.walletAddress)}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>


          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Transactions</TabsTrigger>
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            </TabsList>


            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Your recent wallet activity and property sales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          {getTransactionIcon(transaction.type)}
                          <div>
                            <h3 className="font-semibold text-foreground">{transaction.description}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(transaction.date).toLocaleDateString()} • {transaction.reference}
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="font-semibold">
                            {transaction.type === "withdrawal" ? "-" : "+"}
                            {formatCurrency(transaction.amount, transaction.currency)}
                          </p>
                          {getStatusBadge(transaction.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>


            <TabsContent value="deposit" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Deposit Funds</CardTitle>
                  <CardDescription>Convert Naira to USDC using Flutterwave payment gateway</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="deposit-amount">Amount (NGN)</Label>
                      <Input
                        id="deposit-amount"
                        type="number"
                        placeholder="Enter amount in Naira"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                      />
                      {depositAmount && (
                        <p className="text-sm text-muted-foreground mt-1">
                          ≈ {(Number.parseFloat(depositAmount) / 1600).toFixed(2)} USDC (Rate: ₦1,600/USDC)
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="bank-select">Select Bank</Label>
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
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full" disabled={!depositAmount || !selectedBank}>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Proceed to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>


            <TabsContent value="withdraw" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Withdraw Funds</CardTitle>
                  <CardDescription>Convert USDC back to Naira and withdraw to your bank account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="withdraw-amount">Amount (USDC)</Label>
                      <Input
                        id="withdraw-amount"
                        type="number"
                        placeholder="Enter amount in USDC"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        max={walletData.usdcBalance}
                      />
                      {withdrawAmount && (
                        <p className="text-sm text-muted-foreground mt-1">
                          ≈ ₦{(Number.parseFloat(withdrawAmount) * 1580).toLocaleString()} (Rate: ₦1,580/USDC)
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Available: {formatCurrency(walletData.usdcBalance)}
                      </p>
                    </div>

                    <Button
                      className="w-full"
                      disabled={!withdrawAmount || Number.parseFloat(withdrawAmount) > walletData.usdcBalance}
                    >
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      Request Withdrawal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
