"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  Upload,
  FileText,
  TrendingUp,
  MapPin,
  Camera,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  Users,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

// Mock data for seller's properties
const mockSellerProperties = [
  {
    id: 1,
    title: "Luxury Apartment in Victoria Island",
    location: "Victoria Island, Lagos",
    price: 50000000,
    pricePerFraction: 10000,
    totalFractions: 5000,
    soldFractions: 3200,
    status: "verified",
    verificationDate: "2024-12-15",
    listingDate: "2024-12-20",
    images: ["/modern-apartment-building.png"],
    type: "Residential",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    monthlyRevenue: 450000,
    totalEarnings: 32000000,
  },
  {
    id: 2,
    title: "Commercial Plaza in Ikeja",
    location: "Ikeja, Lagos",
    price: 120000000,
    pricePerFraction: 25000,
    totalFractions: 4800,
    soldFractions: 1800,
    status: "pending",
    submissionDate: "2024-12-28",
    images: ["/commercial-plaza-building.jpg"],
    type: "Commercial",
    floors: 4,
    units: 12,
    sqft: 8000,
    monthlyRevenue: 0,
    totalEarnings: 45000000,
  },
  {
    id: 3,
    title: "Residential Estate in Lekki",
    location: "Lekki Phase 1, Lagos",
    price: 80000000,
    pricePerFraction: 15000,
    totalFractions: 5333,
    soldFractions: 5333,
    status: "sold-out",
    verificationDate: "2024-11-10",
    listingDate: "2024-11-15",
    soldOutDate: "2024-12-25",
    images: ["/residential-estate-houses.jpg"],
    type: "Residential",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 1800,
    monthlyRevenue: 680000,
    totalEarnings: 80000000,
  },
]

export default function SellerDashboard() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [uploadStep, setUploadStep] = useState(1)
  const [propertyForm, setPropertyForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    price: "",
    fractions: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    images: [] as File[],
    documents: [] as File[],
  })

  const activeTab = searchParams.get("tab") || "properties"

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-secondary/10 text-secondary border-secondary/20"
      case "pending":
        return "bg-warning/10 text-warning border-warning/20"
      case "rejected":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "sold-out":
        return "bg-primary/10 text-primary border-primary/20"
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "sold-out":
        return <DollarSign className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const calculateProgress = (sold: number, total: number) => {
    return (sold / total) * 100
  }

  const totalEarnings = mockSellerProperties.reduce((sum, property) => sum + property.totalEarnings, 0)
  const totalMonthlyRevenue = mockSellerProperties.reduce((sum, property) => sum + property.monthlyRevenue, 0)
  const activeProperties = mockSellerProperties.filter((p) => p.status === "verified").length
  const pendingProperties = mockSellerProperties.filter((p) => p.status === "pending").length

  const handleViewProperty = (propertyId: number) => {
    router.push(`/property/${propertyId}`)
  }

  const handleEditProperty = (propertyId: number) => {
    // In real app, this would navigate to edit page or open modal
    console.log("Edit property:", propertyId)
  }

  const handleDeleteProperty = (propertyId: number) => {
    // In real app, this would show confirmation dialog and delete
    console.log("Delete property:", propertyId)
  }

  return (
    <DashboardLayout userRole="seller">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Seller Dashboard</h1>
            <p className="text-muted-foreground">Manage your property listings and track sales</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-secondary/10 text-secondary border-secondary/20">
              <Building2 className="h-3 w-3 mr-1" />
              Total Earnings: {formatCurrency(totalEarnings)}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{formatCurrency(totalEarnings)}</div>
              <p className="text-xs text-secondary">+8.2% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{activeProperties}</div>
              <p className="text-xs text-muted-foreground">{pendingProperties} pending verification</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{formatCurrency(totalMonthlyRevenue)}</div>
              <p className="text-xs text-secondary">From active listings</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">67%</div>
              <p className="text-xs text-muted-foreground">Average sales completion</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="properties">My Properties</TabsTrigger>
            <TabsTrigger value="upload">Upload Property</TabsTrigger>
            <TabsTrigger value="analytics">Sales Analytics</TabsTrigger>
          </TabsList>

          {/* My Properties */}
          <TabsContent value="properties" className="space-y-4">
            <div className="grid gap-6">
              {mockSellerProperties.map((property) => (
                <Card key={property.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-heading">{property.title}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(property.status)}>
                          {getStatusIcon(property.status)}
                          <span className="ml-1 capitalize">{property.status.replace("-", " ")}</span>
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => handleViewProperty(property.id)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={property.images[0] || "/placeholder.svg"}
                        alt={property.title}
                        className="w-24 h-24 rounded-lg object-cover border border-border"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Total Value</span>
                            <div className="font-semibold">{formatCurrency(property.price)}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Per Fraction</span>
                            <div className="font-semibold">{formatCurrency(property.pricePerFraction)}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Monthly Revenue</span>
                            <div className="font-semibold text-secondary">
                              {formatCurrency(property.monthlyRevenue)}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total Earned</span>
                            <div className="font-semibold text-primary">{formatCurrency(property.totalEarnings)}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {property.status !== "sold-out" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sales Progress</span>
                          <span className="font-medium">
                            {property.soldFractions.toLocaleString()} / {property.totalFractions.toLocaleString()} (
                            {calculateProgress(property.soldFractions, property.totalFractions).toFixed(1)}%)
                          </span>
                        </div>
                        <Progress value={calculateProgress(property.soldFractions, property.totalFractions)} />
                      </div>
                    )}

                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        {property.verificationDate && (
                          <span>Verified: {new Date(property.verificationDate).toLocaleDateString()}</span>
                        )}
                        {property.listingDate && (
                          <span>Listed: {new Date(property.listingDate).toLocaleDateString()}</span>
                        )}
                        {property.soldOutDate && (
                          <span>Sold Out: {new Date(property.soldOutDate).toLocaleDateString()}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditProperty(property.id)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        {property.status === "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive bg-transparent"
                            onClick={() => handleDeleteProperty(property.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Upload Property */}
          <TabsContent value="upload" className="space-y-4">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload New Property
                </CardTitle>
                <CardDescription>
                  Add a new property for fractional ownership. All properties require law firm verification.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-6">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          uploadStep >= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step}
                      </div>
                      {step < 3 && <div className={`w-16 h-1 mx-2 ${uploadStep > step ? "bg-primary" : "bg-muted"}`} />}
                    </div>
                  ))}
                </div>

                {/* Step 1: Basic Information */}
                {uploadStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-heading font-semibold">Basic Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Property Title</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Luxury Apartment in Victoria Island"
                          value={propertyForm.title}
                          onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                          className="bg-input border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="e.g., Victoria Island, Lagos"
                          value={propertyForm.location}
                          onChange={(e) => setPropertyForm({ ...propertyForm, location: e.target.value })}
                          className="bg-input border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Detailed description of the property..."
                        value={propertyForm.description}
                        onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
                        className="bg-input border-border min-h-[100px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Property Type</Label>
                        <Select
                          value={propertyForm.type}
                          onValueChange={(value) => setPropertyForm({ ...propertyForm, type: value })}
                        >
                          <SelectTrigger className="bg-input border-border">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="mixed">Mixed Use</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bedrooms">Bedrooms</Label>
                        <Input
                          id="bedrooms"
                          type="number"
                          placeholder="3"
                          value={propertyForm.bedrooms}
                          onChange={(e) => setPropertyForm({ ...propertyForm, bedrooms: e.target.value })}
                          className="bg-input border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bathrooms">Bathrooms</Label>
                        <Input
                          id="bathrooms"
                          type="number"
                          placeholder="2"
                          value={propertyForm.bathrooms}
                          onChange={(e) => setPropertyForm({ ...propertyForm, bathrooms: e.target.value })}
                          className="bg-input border-border"
                        />
                      </div>
                    </div>

                    <Button onClick={() => setUploadStep(2)} className="w-full">
                      Continue to Pricing
                    </Button>
                  </div>
                )}

                {/* Step 2: Pricing & Fractionalization */}
                {uploadStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-heading font-semibold">Pricing & Fractionalization</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Total Property Value (₦)</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="50000000"
                          value={propertyForm.price}
                          onChange={(e) => setPropertyForm({ ...propertyForm, price: e.target.value })}
                          className="bg-input border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fractions">Number of Fractions</Label>
                        <Input
                          id="fractions"
                          type="number"
                          placeholder="5000"
                          value={propertyForm.fractions}
                          onChange={(e) => setPropertyForm({ ...propertyForm, fractions: e.target.value })}
                          className="bg-input border-border"
                        />
                      </div>
                    </div>

                    {propertyForm.price && propertyForm.fractions && (
                      <Card className="bg-muted/20 border-border/50">
                        <CardContent className="pt-4">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Price per fraction</p>
                            <p className="text-2xl font-bold text-primary">
                              {formatCurrency(Number(propertyForm.price) / Number(propertyForm.fractions))}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setUploadStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button onClick={() => setUploadStep(3)} className="flex-1">
                        Continue to Documents
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Documents & Images */}
                {uploadStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-heading font-semibold">Documents & Images</h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Property Images</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Upload high-quality images of your property
                          </p>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Choose Images
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Legal Documents</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Upload property documents (Title deed, Survey plan, etc.)
                          </p>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Choose Documents
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-warning mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-warning">Verification Process</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            After submission, your property will be reviewed by our partner law firms. This process
                            typically takes 3-5 business days.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setUploadStep(2)} className="flex-1">
                        Back
                      </Button>
                      <Button className="flex-1">
                        <Upload className="h-4 w-4 mr-2" />
                        Submit Property
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Analytics */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                    Revenue Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-foreground">{formatCurrency(totalMonthlyRevenue)}</p>
                      <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>This Month</span>
                        <span className="text-secondary">+12.5%</span>
                      </div>
                      <Progress value={75} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Investor Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-foreground">1,247</p>
                        <p className="text-sm text-muted-foreground">Total Investors</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">89%</p>
                        <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Property Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSellerProperties.map((property) => (
                    <div
                      key={property.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div>
                        <h4 className="font-semibold">{property.title}</h4>
                        <p className="text-sm text-muted-foreground">{property.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(property.totalEarnings)}</p>
                        <p className="text-sm text-muted-foreground">
                          {calculateProgress(property.soldFractions, property.totalFractions).toFixed(1)}% sold
                        </p>
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
