"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Square,
  TrendingUp,
  Users,
  Calendar,
  Shield,
  Heart,
  Share2,
  ShoppingCart,
  FileText,
  Vote,
} from "lucide-react"

// Mock property data - in real app this would come from API
const mockProperty = {
  id: 1,
  title: "Luxury Apartment in Victoria Island",
  location: "Victoria Island, Lagos",
  price: 50000000,
  pricePerFraction: 10000,
  totalFractions: 5000,
  soldFractions: 3200,
  images: [
    "/modern-apartment-building.png",
    "/luxury-apartment-interior.png",
    "/modern-apartment-kitchen.png",
    "/cozy-apartment-bedroom.png",
  ],
  verified: true,
  roi: 12.5,
  type: "Residential",
  bedrooms: 3,
  bathrooms: 2,
  sqft: 1200,
  description:
    "A stunning luxury apartment located in the heart of Victoria Island, Lagos. This property features modern amenities, premium finishes, and excellent rental potential. Perfect for investors looking for stable returns in prime real estate.",
  seller: "Jane Smith",
  lawFirm: "Lagos Legal Associates",
  custodian: "Property Management Pro",
  verificationDate: "2024-12-15",
  listingDate: "2024-12-20",
  monthlyRent: 450000,
  yearBuilt: 2020,
  amenities: ["Swimming Pool", "Gym", "24/7 Security", "Parking", "Generator", "Elevator"],
  documents: [
    { name: "Certificate of Occupancy", verified: true },
    { name: "Survey Plan", verified: true },
    { name: "Building Approval", verified: true },
    { name: "Tax Clearance", verified: true },
  ],
  governance: [
    {
      id: 1,
      title: "Renovate lobby area",
      description: "Proposal to upgrade the lobby with modern fixtures",
      status: "active",
      votes: { approve: 120, reject: 45, modify: 30 },
      deadline: "2025-01-15",
    },
  ],
}

export default function PropertyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [purchaseAmount, setPurchaseAmount] = useState("")
  const [isLiked, setIsLiked] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const calculateProgress = (sold: number, total: number) => {
    return (sold / total) * 100
  }

  const handlePurchase = () => {
    // In real app, this would process the purchase
    console.log(`Purchasing ${purchaseAmount} fractions`)
    setIsPurchaseModalOpen(false)
    // Show success message or redirect to payment
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockProperty.title,
        text: `Check out this property investment opportunity: ${mockProperty.title}`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-heading font-bold text-foreground">{mockProperty.title}</h1>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {mockProperty.location}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "text-red-500 border-red-200" : ""}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="relative">
                <img
                  src={mockProperty.images[selectedImage] || "/placeholder.svg"}
                  alt={mockProperty.title}
                  className="w-full h-96 object-cover"
                />
                {mockProperty.verified && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-secondary/90 text-secondary-foreground">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary/90 text-primary-foreground">{mockProperty.type}</Badge>
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-2 overflow-x-auto">
                  {mockProperty.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? "border-primary" : "border-border"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Property Details */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="governance">Governance</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Property Description</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{mockProperty.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Bed className="h-4 w-4 text-muted-foreground" />
                        <span>{mockProperty.bedrooms} Bedrooms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath className="h-4 w-4 text-muted-foreground" />
                        <span>{mockProperty.bathrooms} Bathrooms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Square className="h-4 w-4 text-muted-foreground" />
                        <span>{mockProperty.sqft} sqft</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Built {mockProperty.yearBuilt}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {mockProperty.amenities.map((amenity) => (
                          <Badge key={amenity} variant="outline">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                      <div>
                        <span className="text-sm text-muted-foreground">Seller</span>
                        <div className="font-semibold">{mockProperty.seller}</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Law Firm</span>
                        <div className="font-semibold">{mockProperty.lawFirm}</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Custodian</span>
                        <div className="font-semibold">{mockProperty.custodian}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Legal Documents</CardTitle>
                    <CardDescription>All property documents verified by partner law firms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockProperty.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border border-border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">{doc.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {doc.verified && (
                              <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                                <Shield className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="governance" className="space-y-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Property Governance</CardTitle>
                    <CardDescription>Vote on property decisions and improvements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockProperty.governance.map((poll) => (
                        <div key={poll.id} className="border border-border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold">{poll.title}</h4>
                              <p className="text-sm text-muted-foreground">{poll.description}</p>
                            </div>
                            <Badge className="bg-secondary/10 text-secondary border-secondary/20">{poll.status}</Badge>
                          </div>

                          <div className="space-y-2 mb-4">
                            {Object.entries(poll.votes).map(([option, votes]) => {
                              const total = Object.values(poll.votes).reduce((a, b) => a + b, 0)
                              const percentage = (votes / total) * 100
                              return (
                                <div key={option} className="space-y-1">
                                  <div className="flex justify-between text-sm">
                                    <span className="capitalize">{option}</span>
                                    <span>
                                      {votes} votes ({percentage.toFixed(1)}%)
                                    </span>
                                  </div>
                                  <Progress value={percentage} />
                                </div>
                              )
                            })}
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              Deadline: {new Date(poll.deadline).toLocaleDateString()}
                            </span>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Vote className="h-4 w-4 mr-1" />
                                Vote
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-secondary" />
                        Performance Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Monthly Rent</span>
                          <span className="font-semibold">{formatCurrency(mockProperty.monthlyRent)}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Annual ROI</span>
                          <span className="font-semibold text-secondary">{mockProperty.roi}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Occupancy Rate</span>
                          <span className="font-semibold">95%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Investor Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Total Investors</span>
                          <span className="font-semibold">247</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Average Investment</span>
                          <span className="font-semibold">{formatCurrency(65000)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Largest Stake</span>
                          <span className="font-semibold">8.5%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Investment Summary */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Investment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Value</span>
                    <span className="font-semibold">{formatCurrency(mockProperty.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Price per Fraction</span>
                    <span className="font-semibold text-primary">{formatCurrency(mockProperty.pricePerFraction)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expected ROI</span>
                    <span className="font-semibold text-secondary">{mockProperty.roi}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sales Progress</span>
                    <span className="font-medium">
                      {mockProperty.soldFractions.toLocaleString()} / {mockProperty.totalFractions.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={calculateProgress(mockProperty.soldFractions, mockProperty.totalFractions)} />
                  <div className="text-center text-sm text-muted-foreground">
                    {calculateProgress(mockProperty.soldFractions, mockProperty.totalFractions).toFixed(1)}% sold
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={() => setIsPurchaseModalOpen(true)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Buy Fractions
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Property Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Listed</span>
                  <span>{new Date(mockProperty.listingDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Verified</span>
                  <span>{new Date(mockProperty.verificationDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Available Fractions</span>
                  <span>{(mockProperty.totalFractions - mockProperty.soldFractions).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Purchase Modal */}
        <Dialog open={isPurchaseModalOpen} onOpenChange={setIsPurchaseModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Purchase Property Fractions</DialogTitle>
              <DialogDescription>
                Enter the number of fractions you want to purchase for {mockProperty.title}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fractions">Number of Fractions</Label>
                <Input
                  id="fractions"
                  type="number"
                  placeholder="10"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                  className="bg-input border-border"
                />
                <div className="text-sm text-muted-foreground">
                  Price per fraction: {formatCurrency(mockProperty.pricePerFraction)}
                </div>
              </div>

              {purchaseAmount && (
                <Card className="bg-muted/20 border-border/50">
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Total Cost</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(Number(purchaseAmount) * mockProperty.pricePerFraction)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-2">
                <Button onClick={handlePurchase} className="flex-1" disabled={!purchaseAmount}>
                  Confirm Purchase
                </Button>
                <Button variant="outline" onClick={() => setIsPurchaseModalOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
