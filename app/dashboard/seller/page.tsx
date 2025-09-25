"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AIChatbot } from "@/components/ui/ai-chatbot"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  TrendingUp,
  DollarSign,
  Users,
  ArrowUpRight,
  MapPin,
  Eye,
  Edit,
  Upload,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
} from "lucide-react"

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showListingForm, setShowListingForm] = useState(false)

  // Mock data - in production this would come from API
  const sellerData = {
    totalListings: 12,
    activeListings: 8,
    soldFractions: 156,
    totalRevenue: 45600000,
    monthlyRevenue: 3800000,
    averageROI: 19.2,
  }

  const listings = [
    {
      id: 1,
      title: "Luxury Apartment Complex - Victoria Island",
      location: "Lagos, Nigeria",
      totalValue: 180000000,
      fractionsTotal: 100,
      fractionsSold: 85,
      fractionsListed: 100,
      pricePerFraction: 1800000,
      status: "active" as const,
      listingDate: "2024-08-15",
      expectedROI: 18.5,
      image: "/luxury-apartment-lagos.jpg",
      documents: ["Title Deed", "Survey Plan", "Building Approval"],
      description:
        "Premium residential complex in the heart of Victoria Island with modern amenities and excellent rental yield potential.",
    },
    {
      id: 2,
      title: "Commercial Plaza - Abuja CBD",
      location: "Abuja, Nigeria",
      totalValue: 350000000,
      fractionsTotal: 100,
      fractionsSold: 67,
      fractionsListed: 100,
      pricePerFraction: 3500000,
      status: "active" as const,
      listingDate: "2024-09-22",
      expectedROI: 22.8,
      image: "/commercial-plaza-abuja.jpg",
      documents: ["Certificate of Occupancy", "Building Plan", "Environmental Impact"],
      description:
        "Prime commercial property in Abuja's central business district with high-value tenants and stable income.",
    },
    {
      id: 3,
      title: "Residential Estate - Lekki Phase 1",
      location: "Lagos, Nigeria",
      totalValue: 120000000,
      fractionsTotal: 100,
      fractionsSold: 23,
      fractionsListed: 100,
      pricePerFraction: 1200000,
      status: "pending" as const,
      listingDate: "2024-11-10",
      expectedROI: 16.4,
      image: "/residential-estate-lekki.jpg",
      documents: ["Survey Plan", "Building Approval"],
      description: "Modern residential estate in Lekki with family-friendly amenities and growing property values.",
    },
    {
      id: 4,
      title: "Office Complex - Ikeja GRA",
      location: "Lagos, Nigeria",
      totalValue: 280000000,
      fractionsTotal: 100,
      fractionsSold: 100,
      fractionsListed: 100,
      pricePerFraction: 2800000,
      status: "sold" as const,
      listingDate: "2024-07-05",
      expectedROI: 20.1,
      image: "/office-complex-ikeja.jpg",
      documents: ["Title Deed", "Certificate of Occupancy", "Building Plan"],
      description: "Fully leased office complex in Ikeja Government Reserved Area with premium corporate tenants.",
    },
  ]

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
        return "bg-accent text-accent-foreground"
      case "pending":
        return "bg-warning text-warning-foreground"
      case "sold":
        return "bg-success text-success-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <ProtectedRoute allowedRoles={["seller"]}>
      <DashboardLayout userRole="seller">
        <div className="space-y-8">
          {/* Seller Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(sellerData.totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-accent flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +15.2% from last month
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sellerData.activeListings}</div>
                <p className="text-xs text-muted-foreground">Out of {sellerData.totalListings} total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fractions Sold</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sellerData.soldFractions}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-accent">+23 this month</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sellerData.averageROI}%</div>
                <p className="text-xs text-muted-foreground">Across all properties</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="overview">My Listings</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <Button onClick={() => setShowListingForm(true)} className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                List New Property
              </Button>
            </div>

            {/* My Listings Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Listings</CardTitle>
                  <CardDescription>
                    Manage your fractional real estate listings and track their performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {listings.map((listing) => (
                      <div key={listing.id} className="border border-border rounded-lg p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <img
                              src={listing.image || "/placeholder.svg"}
                              alt={listing.title}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div className="space-y-2">
                              <div className="flex items-center space-x-3">
                                <h3 className="font-semibold text-foreground text-lg">{listing.title}</h3>
                                <Badge className={getStatusColor(listing.status)}>
                                  {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                                </Badge>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 mr-1" />
                                {listing.location}
                              </div>
                              <p className="text-sm text-muted-foreground max-w-2xl">{listing.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Total Value</p>
                            <p className="font-semibold">{formatCurrency(listing.totalValue)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Price per Fraction</p>
                            <p className="font-semibold">{formatCurrency(listing.pricePerFraction)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Fractions Sold</p>
                            <p className="font-semibold">
                              {listing.fractionsSold}/{listing.fractionsTotal}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Expected ROI</p>
                            <p className="font-semibold text-accent">{listing.expectedROI}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Listed Date</p>
                            <p className="font-semibold">{new Date(listing.listingDate).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Sales Progress</span>
                            <span className="font-medium">
                              {Math.round((listing.fractionsSold / listing.fractionsTotal) * 100)}%
                            </span>
                          </div>
                          <Progress value={(listing.fractionsSold / listing.fractionsTotal) * 100} className="h-2" />
                        </div>

                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Documents:</span>
                            <div className="flex space-x-1">
                              {listing.documents.map((doc, index) => (
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

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Performance</CardTitle>
                    <CardDescription>Track your property sales over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">This Month</span>
                        <span className="font-semibold">{formatCurrency(sellerData.monthlyRevenue)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Last Month</span>
                        <span className="font-semibold">{formatCurrency(3300000)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Growth</span>
                        <span className="font-semibold text-accent">+15.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Property Types</CardTitle>
                    <CardDescription>Distribution of your property portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Residential</span>
                        <span className="font-semibold">58%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Commercial</span>
                        <span className="font-semibold">33%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Mixed Use</span>
                        <span className="font-semibold">9%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Properties</CardTitle>
                  <CardDescription>Properties with highest sales velocity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {listings
                      .filter((l) => l.status === "active" || l.status === "sold")
                      .sort((a, b) => b.fractionsSold / b.fractionsTotal - a.fractionsSold / a.fractionsTotal)
                      .slice(0, 3)
                      .map((listing) => (
                        <div
                          key={listing.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              src={listing.image || "/placeholder.svg"}
                              alt={listing.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="font-semibold text-foreground">{listing.title}</h4>
                              <p className="text-sm text-muted-foreground">{listing.location}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              {Math.round((listing.fractionsSold / listing.fractionsTotal) * 100)}% Sold
                            </p>
                            <p className="text-sm text-muted-foreground">{listing.expectedROI}% ROI</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Document Management</CardTitle>
                  <CardDescription>Manage legal documents and compliance for your properties</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {listings.map((listing) => (
                      <div key={listing.id} className="border border-border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-foreground">{listing.title}</h3>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Document
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                          {listing.documents.map((doc, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 border border-border rounded-lg"
                            >
                              <div className="flex items-center space-x-3">
                                <CheckCircle className="h-5 w-5 text-accent" />
                                <span className="text-sm font-medium">{doc}</span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          {listing.documents.length < 5 && (
                            <div className="flex items-center justify-between p-3 border border-dashed border-border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <Clock className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Additional Documents</span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Property Listing Form Modal */}
          {showListingForm && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <CardTitle>List New Property</CardTitle>
                  <CardDescription>Create a new fractional real estate listing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="property-title">Property Title</Label>
                        <Input id="property-title" placeholder="e.g., Luxury Apartment Complex" />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="e.g., Victoria Island, Lagos" />
                      </div>
                      <div>
                        <Label htmlFor="property-type">Property Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="mixed">Mixed Use</SelectItem>
                            <SelectItem value="industrial">Industrial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="total-value">Total Property Value (NGN)</Label>
                        <Input id="total-value" type="number" placeholder="180000000" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="total-fractions">Total Fractions</Label>
                        <Input id="total-fractions" type="number" placeholder="100" />
                      </div>
                      <div>
                        <Label htmlFor="min-investment">Minimum Investment (NGN)</Label>
                        <Input id="min-investment" type="number" placeholder="50000" />
                      </div>
                      <div>
                        <Label htmlFor="expected-roi">Expected ROI (%)</Label>
                        <Input id="expected-roi" type="number" step="0.1" placeholder="18.5" />
                      </div>
                      <div>
                        <Label htmlFor="suggested-use">Suggested Use</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select suggested use" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rental">Rental Income</SelectItem>
                            <SelectItem value="commercial-lease">Commercial Lease</SelectItem>
                            <SelectItem value="appreciation">Capital Appreciation</SelectItem>
                            <SelectItem value="mixed">Mixed Income</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Property Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the property, its features, location benefits, and investment potential..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>Property Images</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">Drag and drop images here, or click to browse</p>
                      <Button variant="outline">Choose Files</Button>
                    </div>
                  </div>
                  <div>
                    <Label>Required Documents</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-warning" />
                          <span className="text-sm">Title Deed (Required)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-warning" />
                          <span className="text-sm">Survey Plan (Required)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-warning" />
                          <span className="text-sm">Building Approval (Required)</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Certificate of Occupancy (Optional)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Environmental Impact (Optional)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Property Valuation (Optional)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="flex items-center justify-end space-x-4 p-6 border-t border-border">
                  <Button variant="outline" onClick={() => setShowListingForm(false)}>
                    Cancel
                  </Button>
                  <Button>Submit for Review</Button>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* AI Chatbot */}
        <AIChatbot userRole="seller" />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
