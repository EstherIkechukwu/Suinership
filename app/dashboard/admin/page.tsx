"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Plus, Search, Filter, Eye, Edit, Trash2, CheckCircle, XCircle, UserPlus, Mail } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "buyer",
    status: "active",
    joinDate: "2024-11-15",
    kycStatus: "verified",
    totalInvestment: 1500000,
    properties: 3,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "seller",
    status: "active",
    joinDate: "2024-10-20",
    kycStatus: "verified",
    totalEarnings: 45000000,
    properties: 2,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "buyer",
    status: "suspended",
    joinDate: "2024-12-01",
    kycStatus: "pending",
    totalInvestment: 250000,
    properties: 1,
  },
]

// Mock data for law firms
const mockLawFirms = [
  {
    id: 1,
    name: "Lagos Legal Associates",
    email: "contact@lagoslegal.com",
    phone: "+234 801 234 5678",
    address: "Victoria Island, Lagos",
    status: "active",
    verifiedProperties: 15,
    joinDate: "2024-09-10",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Abuja Property Law Firm",
    email: "info@abujalaw.com",
    phone: "+234 802 345 6789",
    address: "Wuse 2, Abuja",
    status: "active",
    verifiedProperties: 8,
    joinDate: "2024-10-05",
    rating: 4.6,
  },
]

// Mock data for custodians
const mockCustodians = [
  {
    id: 1,
    name: "Property Management Pro",
    email: "admin@propmanpro.com",
    phone: "+234 803 456 7890",
    address: "Ikeja, Lagos",
    status: "active",
    managedProperties: 12,
    joinDate: "2024-08-15",
    rating: 4.9,
  },
]

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    title: "Luxury Apartment in Victoria Island",
    seller: "Jane Smith",
    location: "Victoria Island, Lagos",
    price: 50000000,
    status: "verified",
    verificationDate: "2024-12-15",
    lawFirm: "Lagos Legal Associates",
    custodian: "Property Management Pro",
    soldFractions: 3200,
    totalFractions: 5000,
    disputes: 0,
  },
  {
    id: 2,
    title: "Commercial Plaza in Ikeja",
    seller: "Jane Smith",
    location: "Ikeja, Lagos",
    price: 120000000,
    status: "pending",
    submissionDate: "2024-12-28",
    lawFirm: "Pending Assignment",
    custodian: "Not Assigned",
    soldFractions: 0,
    totalFractions: 4800,
    disputes: 0,
  },
]

// Mock data for disputes
const mockDisputes = [
  {
    id: 1,
    title: "Property verification dispute",
    property: "Luxury Apartment in Victoria Island",
    reporter: "John Doe",
    type: "verification",
    status: "open",
    priority: "high",
    createdDate: "2024-12-29",
    description: "Questioning the authenticity of property documents",
  },
  {
    id: 2,
    title: "Dividend payment delay",
    property: "Commercial Plaza in Ikeja",
    reporter: "Mike Johnson",
    type: "payment",
    status: "resolved",
    priority: "medium",
    createdDate: "2024-12-25",
    description: "Monthly dividend payment was delayed by 5 days",
  },
]

export default function AdminDashboard() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isAddLawFirmOpen, setIsAddLawFirmOpen] = useState(false)
  const [isAddCustodianOpen, setIsAddCustodianOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const activeTab = searchParams.get("tab") || "users"

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "verified":
      case "resolved":
        return "bg-secondary/10 text-secondary border-secondary/20"
      case "pending":
      case "open":
        return "bg-warning/10 text-warning border-warning/20"
      case "suspended":
      case "rejected":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "medium":
        return "bg-warning/10 text-warning border-warning/20"
      case "low":
        return "bg-secondary/10 text-secondary border-secondary/20"
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const totalUsers = mockUsers.length
  const activeUsers = mockUsers.filter((u) => u.status === "active").length
  const pendingKYC = mockUsers.filter((u) => u.kycStatus === "pending").length
  const totalProperties = mockProperties.length
  const verifiedProperties = mockProperties.filter((p) => p.status === "verified").length
  const openDisputes = mockDisputes.filter((d) => d.status === "open").length

  const handleViewUser = (userId: number) => {
    // In real app, this would open user details modal or page
    const user = mockUsers.find((u) => u.id === userId)
    setSelectedUser(user)
    console.log("View user:", userId)
  }

  const handleEditUser = (userId: number) => {
    // In real app, this would open edit user modal or page
    console.log("Edit user:", userId)
  }

  const handleViewProperty = (propertyId: number) => {
    router.push(`/property/${propertyId}`)
  }

  const handleApproveProperty = (propertyId: number) => {
    // In real app, this would approve the property
    console.log("Approve property:", propertyId)
  }

  const handleRejectProperty = (propertyId: number) => {
    // In real app, this would reject the property
    console.log("Reject property:", propertyId)
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users, properties, and platform operations</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-destructive/10 text-destructive border-destructive/20">
              <Shield className="h-3 w-3 mr-1" />
              Administrator Access
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalUsers}</div>
              <p className="text-xs text-secondary">{activeUsers} active users</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalProperties}</div>
              <p className="text-xs text-secondary">{verifiedProperties} verified</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending KYC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{pendingKYC}</div>
              <p className="text-xs text-warning">Requires review</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Open Disputes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{openDisputes}</div>
              <p className="text-xs text-destructive">Needs attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="properties">Property Oversight</TabsTrigger>
            <TabsTrigger value="law-firms">Law Firms</TabsTrigger>
            <TabsTrigger value="custodians">Custodians</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
          </TabsList>

          {/* User Management */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-input border-border"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>KYC</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.kycStatus)}>{user.kycStatus}</Badge>
                      </TableCell>
                      <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {user.role === "buyer" ? (
                            <>
                              <div>{formatCurrency(user.totalInvestment || 0)}</div>
                              <div className="text-muted-foreground">{user.properties} properties</div>
                            </>
                          ) : (
                            <>
                              <div>{formatCurrency(user.totalEarnings || 0)}</div>
                              <div className="text-muted-foreground">{user.properties} listings</div>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewUser(user.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditUser(user.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          {user.status === "active" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive bg-transparent"
                              onClick={() => {
                                // In real app, this would suspend the user
                                console.log("Suspend user:", user.id)
                              }}
                            >
                              Suspend
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-secondary bg-transparent"
                              onClick={() => {
                                // In real app, this would activate the user
                                console.log("Activate user:", user.id)
                              }}
                            >
                              Activate
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Property Oversight */}
          <TabsContent value="properties" className="space-y-4">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Property Listings</CardTitle>
                <CardDescription>Monitor all property listings and their verification status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProperties.map((property) => (
                    <div key={property.id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{property.title}</h4>
                          <p className="text-sm text-muted-foreground">by {property.seller}</p>
                          <p className="text-sm text-muted-foreground">{property.location}</p>
                        </div>
                        <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">Value</span>
                          <div className="font-semibold">{formatCurrency(property.price)}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Progress</span>
                          <div className="font-semibold">
                            {property.soldFractions} / {property.totalFractions}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Law Firm</span>
                          <div className="font-semibold">{property.lawFirm}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Custodian</span>
                          <div className="font-semibold">{property.custodian}</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          {property.verificationDate
                            ? `Verified: ${new Date(property.verificationDate).toLocaleDateString()}`
                            : `Submitted: ${new Date(property.submissionDate!).toLocaleDateString()}`}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewProperty(property.id)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {property.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-secondary hover:bg-secondary/90"
                                onClick={() => handleApproveProperty(property.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleRejectProperty(property.id)}>
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Law Firms */}
          <TabsContent value="law-firms" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-heading font-semibold">Partner Law Firms</h3>
              <Dialog open={isAddLawFirmOpen} onOpenChange={setIsAddLawFirmOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Law Firm
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Law Firm</DialogTitle>
                    <DialogDescription>Register a new law firm to verify properties</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="firmName">Firm Name</Label>
                      <Input id="firmName" placeholder="Lagos Legal Associates" className="bg-input border-border" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="firmEmail">Email</Label>
                      <Input
                        id="firmEmail"
                        type="email"
                        placeholder="contact@lagoslegal.com"
                        className="bg-input border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="firmPhone">Phone</Label>
                      <Input
                        id="firmPhone"
                        type="tel"
                        placeholder="+234 801 234 5678"
                        className="bg-input border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="firmAddress">Address</Label>
                      <Input id="firmAddress" placeholder="Victoria Island, Lagos" className="bg-input border-border" />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => setIsAddLawFirmOpen(false)} className="flex-1">
                        Add Law Firm
                      </Button>
                      <Button variant="outline" onClick={() => setIsAddLawFirmOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {mockLawFirms.map((firm) => (
                <Card key={firm.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{firm.name}</CardTitle>
                        <CardDescription>{firm.address}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(firm.status)}>{firm.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-muted-foreground">Email</span>
                        <div className="font-semibold">{firm.email}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phone</span>
                        <div className="font-semibold">{firm.phone}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Verified Properties</span>
                        <div className="font-semibold">{firm.verifiedProperties}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rating</span>
                        <div className="font-semibold">{firm.rating}/5.0</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Joined: {new Date(firm.joinDate).toLocaleDateString()}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Custodians */}
          <TabsContent value="custodians" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-heading font-semibold">Property Custodians</h3>
              <Dialog open={isAddCustodianOpen} onOpenChange={setIsAddCustodianOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custodian
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Custodian</DialogTitle>
                    <DialogDescription>Register a new custodian to manage properties</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="custodianName">Company Name</Label>
                      <Input
                        id="custodianName"
                        placeholder="Property Management Pro"
                        className="bg-input border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="custodianEmail">Email</Label>
                      <Input
                        id="custodianEmail"
                        type="email"
                        placeholder="admin@propmanpro.com"
                        className="bg-input border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="custodianPhone">Phone</Label>
                      <Input
                        id="custodianPhone"
                        type="tel"
                        placeholder="+234 803 456 7890"
                        className="bg-input border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="custodianAddress">Address</Label>
                      <Input id="custodianAddress" placeholder="Ikeja, Lagos" className="bg-input border-border" />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => setIsAddCustodianOpen(false)} className="flex-1">
                        Add Custodian
                      </Button>
                      <Button variant="outline" onClick={() => setIsAddCustodianOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {mockCustodians.map((custodian) => (
                <Card key={custodian.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{custodian.name}</CardTitle>
                        <CardDescription>{custodian.address}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(custodian.status)}>{custodian.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-muted-foreground">Email</span>
                        <div className="font-semibold">{custodian.email}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phone</span>
                        <div className="font-semibold">{custodian.phone}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Managed Properties</span>
                        <div className="font-semibold">{custodian.managedProperties}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rating</span>
                        <div className="font-semibold">{custodian.rating}/5.0</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Joined: {new Date(custodian.joinDate).toLocaleDateString()}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Disputes */}
          <TabsContent value="disputes" className="space-y-4">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Dispute Management</CardTitle>
                <CardDescription>Review and resolve platform disputes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDisputes.map((dispute) => (
                    <div key={dispute.id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{dispute.title}</h4>
                          <p className="text-sm text-muted-foreground">Property: {dispute.property}</p>
                          <p className="text-sm text-muted-foreground">Reported by: {dispute.reporter}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(dispute.status)}>{dispute.status}</Badge>
                          <Badge className={getPriorityColor(dispute.priority)}>{dispute.priority}</Badge>
                        </div>
                      </div>

                      <p className="text-sm mb-4">{dispute.description}</p>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Created: {new Date(dispute.createdDate).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          {dispute.status === "open" && (
                            <>
                              <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Resolve
                              </Button>
                              <Button size="sm" variant="outline">
                                <UserPlus className="h-4 w-4 mr-1" />
                                Assign
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
