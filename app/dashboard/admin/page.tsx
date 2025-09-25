"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import { AIChatbot } from "@/components/ui/ai-chatbot"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Building2,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Shield,
  FileText,
  UserCheck,
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - in production this would come from API
  const adminData = {
    totalUsers: 2847,
    activeListings: 156,
    pendingVerifications: 23,
    totalTransactionValue: 1250000000,
    monthlyGrowth: 18.5,
    platformRevenue: 45600000,
  }

  const pendingVerifications = [
    {
      id: 1,
      type: "property",
      title: "Luxury Apartment Complex - Victoria Island",
      submittedBy: "John Adebayo",
      submissionDate: "2024-11-15",
      status: "pending" as const,
      priority: "high" as const,
      documents: ["Title Deed", "Survey Plan", "Building Approval"],
      value: 180000000,
    },
    {
      id: 2,
      type: "user",
      title: "KYC Verification - Sarah Johnson",
      submittedBy: "Sarah Johnson",
      submissionDate: "2024-11-14",
      status: "pending" as const,
      priority: "medium" as const,
      documents: ["National ID", "Proof of Address", "Bank Statement"],
      value: null,
    },
    {
      id: 3,
      type: "property",
      title: "Commercial Plaza - Abuja CBD",
      submittedBy: "Michael Okafor",
      submissionDate: "2024-11-13",
      status: "under_review" as const,
      priority: "high" as const,
      documents: ["Certificate of Occupancy", "Building Plan", "Environmental Impact"],
      value: 350000000,
    },
  ]

  const recentTransactions = [
    {
      id: 1,
      type: "purchase",
      property: "Luxury Apartment - Victoria Island",
      buyer: "Adebayo Ogundimu",
      seller: "John Adebayo",
      amount: 1800000,
      fractions: 1,
      date: "2024-11-15",
      status: "completed" as const,
    },
    {
      id: 2,
      type: "purchase",
      property: "Commercial Plaza - Abuja CBD",
      buyer: "Sarah Johnson",
      seller: "Michael Okafor",
      amount: 7000000,
      fractions: 2,
      date: "2024-11-14",
      status: "completed" as const,
    },
    {
      id: 3,
      type: "resale",
      property: "Residential Estate - Lekki",
      buyer: "David Okoro",
      seller: "Fatima Hassan",
      amount: 1200000,
      fractions: 1,
      date: "2024-11-13",
      status: "pending" as const,
    },
  ]

  const platformUsers = [
    {
      id: 1,
      name: "John Adebayo",
      email: "john.adebayo@email.com",
      role: "seller",
      joinDate: "2024-08-15",
      status: "verified" as const,
      totalListings: 3,
      totalSales: 45600000,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      role: "buyer",
      joinDate: "2024-09-22",
      status: "verified" as const,
      totalInvestments: 2450000,
      propertiesOwned: 8,
    },
    {
      id: 3,
      name: "Michael Okafor",
      email: "michael.okafor@email.com",
      role: "seller",
      joinDate: "2024-07-10",
      status: "pending" as const,
      totalListings: 1,
      totalSales: 0,
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-warning text-warning-foreground"
      case "low":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout userRole="admin">
        <div className="space-y-8">
          {/* Admin Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(adminData.platformRevenue)}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-accent flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />+{adminData.monthlyGrowth}% this month
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminData.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+127 new this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminData.activeListings}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-accent">+12 this week</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <Clock className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminData.pendingVerifications}</div>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Verifications</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Verifications Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Verifications</CardTitle>
                  <CardDescription>Review and approve property listings and user verifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingVerifications.map((item) => (
                      <div key={item.id} className="border border-border rounded-lg p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold text-foreground">{item.title}</h3>
                              <Badge className={getPriorityColor(item.priority)}>
                                {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                              </Badge>
                              <StatusBadge status={item.status} />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Submitted by {item.submittedBy} on {new Date(item.submissionDate).toLocaleDateString()}
                            </p>
                            {item.value && (
                              <p className="text-sm font-medium">Property Value: {formatCurrency(item.value)}</p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Review
                            </Button>
                            <Button variant="outline" size="sm" className="text-accent border-accent bg-transparent">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive border-destructive bg-transparent"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Documents:</span>
                            <div className="flex space-x-1">
                              {item.documents.map((doc, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Platform Users</CardTitle>
                      <CardDescription>Manage user accounts and verification status</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platformUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <UserCheck className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                              <span>Role: {user.role}</span>
                              <span>Joined: {new Date(user.joinDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right text-sm">
                            {user.role === "seller" ? (
                              <>
                                <p className="font-medium">{user.totalListings} Listings</p>
                                <p className="text-muted-foreground">{formatCurrency(user.totalSales)} Sales</p>
                              </>
                            ) : (
                              <>
                                <p className="font-medium">{user.propertiesOwned} Properties</p>
                                <p className="text-muted-foreground">
                                  {formatCurrency(user.totalInvestments)} Invested
                                </p>
                              </>
                            )}
                          </div>
                          <StatusBadge status={user.status} />
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Transactions</CardTitle>
                      <CardDescription>Monitor all platform transactions and transfers</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <Badge variant={transaction.type === "purchase" ? "default" : "secondary"}>
                              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                            </Badge>
                            <h3 className="font-semibold text-foreground">{transaction.property}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {transaction.buyer} ← {transaction.seller}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(transaction.amount)}</p>
                          <p className="text-sm text-muted-foreground">{transaction.fractions} fraction(s)</p>
                          <StatusBadge status={transaction.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Growth</CardTitle>
                    <CardDescription>User acquisition and engagement metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Monthly Active Users</span>
                        <span className="font-semibold">2,847</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">New Registrations</span>
                        <span className="font-semibold">127</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">User Retention Rate</span>
                        <span className="font-semibold text-accent">89.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Transaction Volume</CardTitle>
                    <CardDescription>Platform transaction metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total Volume</span>
                        <span className="font-semibold">{formatCurrency(adminData.totalTransactionValue)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Average Transaction</span>
                        <span className="font-semibold">{formatCurrency(2850000)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Platform Fee Revenue</span>
                        <span className="font-semibold text-accent">{formatCurrency(adminData.platformRevenue)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Platform performance and security metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mx-auto mb-2">
                        <Shield className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="font-semibold">Security Score</h3>
                      <p className="text-2xl font-bold text-accent">98.5%</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-2">
                        <TrendingUp className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold">Uptime</h3>
                      <p className="text-2xl font-bold text-primary">99.9%</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-16 h-16 bg-warning/10 rounded-full mx-auto mb-2">
                        <AlertTriangle className="h-8 w-8 text-warning" />
                      </div>
                      <h3 className="font-semibold">Active Alerts</h3>
                      <p className="text-2xl font-bold text-warning">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure platform parameters and policies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="platform-fee">Platform Fee (%)</Label>
                        <Input id="platform-fee" type="number" step="0.1" defaultValue="2.5" />
                      </div>
                      <div>
                        <Label htmlFor="min-investment">Minimum Investment (NGN)</Label>
                        <Input id="min-investment" type="number" defaultValue="50000" />
                      </div>
                      <div>
                        <Label htmlFor="verification-period">Verification Period (days)</Label>
                        <Input id="verification-period" type="number" defaultValue="7" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="max-fractions">Maximum Fractions per Property</Label>
                        <Input id="max-fractions" type="number" defaultValue="1000" />
                      </div>
                      <div>
                        <Label htmlFor="kyc-threshold">KYC Threshold (NGN)</Label>
                        <Input id="kyc-threshold" type="number" defaultValue="1000000" />
                      </div>
                      <div>
                        <Label htmlFor="withdrawal-limit">Daily Withdrawal Limit (NGN)</Label>
                        <Input id="withdrawal-limit" type="number" defaultValue="10000000" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="terms-update">Terms of Service Update</Label>
                    <Textarea id="terms-update" placeholder="Enter updates to terms of service..." rows={4} />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button variant="outline">Reset to Defaults</Button>
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Chatbot */}
        <AIChatbot userRole="admin" />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
