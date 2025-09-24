"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  Search,
  MapPin,
  Wallet,
  Vote,
  TrendingUp,
  Eye,
  Heart,
  Share2,
  Filter,
  Grid3X3,
  List,
  ShoppingCart,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    title: "Luxury Apartment in Victoria Island",
    location: "Victoria Island, Lagos",
    price: 50000000,
    pricePerFraction: 10000,
    totalFractions: 5000,
    soldFractions: 3200,
    image: "/modern-apartment-building.png",
    verified: true,
    roi: 12.5,
    type: "Residential",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
  },
  {
    id: 2,
    title: "Commercial Plaza in Ikeja",
    location: "Ikeja, Lagos",
    price: 120000000,
    pricePerFraction: 25000,
    totalFractions: 4800,
    soldFractions: 1800,
    image: "/commercial-plaza-building.jpg",
    verified: true,
    roi: 15.2,
    type: "Commercial",
    floors: 4,
    units: 12,
    sqft: 8000,
  },
  {
    id: 3,
    title: "Residential Estate in Lekki",
    location: "Lekki Phase 1, Lagos",
    price: 80000000,
    pricePerFraction: 15000,
    totalFractions: 5333,
    soldFractions: 4200,
    image: "/residential-estate-houses.jpg",
    verified: true,
    roi: 10.8,
    type: "Residential",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 1800,
  },
]

// Mock data for user's NFTs
const mockNFTs = [
  {
    id: 1,
    propertyTitle: "Luxury Apartment in Victoria Island",
    fractions: 50,
    totalFractions: 5000,
    purchasePrice: 500000,
    currentValue: 520000,
    monthlyDividend: 2500,
    image: "/nft-certificate.jpg",
  },
  {
    id: 2,
    propertyTitle: "Commercial Plaza in Ikeja",
    fractions: 20,
    totalFractions: 4800,
    purchasePrice: 500000,
    currentValue: 510000,
    monthlyDividend: 3200,
    image: "/nft-certificate-commercial.jpg",
  },
]

// Mock governance polls
const mockPolls = [
  {
    id: 1,
    title: "Renovate lobby area of Victoria Island property",
    description: "Proposal to upgrade the lobby with modern fixtures and furniture",
    options: ["Approve", "Reject", "Modify"],
    votes: [120, 45, 30],
    totalVotes: 195,
    userVote: null,
    deadline: "2025-01-15",
    status: "active",
  },
  {
    id: 2,
    title: "Increase rent for Ikeja Commercial Plaza",
    description: "Proposal to increase rent by 15% starting next quarter",
    options: ["Approve", "Reject"],
    votes: [85, 110],
    totalVotes: 195,
    userVote: "Reject",
    deadline: "2025-01-10",
    status: "active",
  },
]

export default function BuyerDashboard() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const activeTab = searchParams.get("tab") || "properties"

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

  const handleViewProperty = (propertyId: number) => {
    router.push(`/property/${propertyId}`)
  }

  const handleBuyProperty = (propertyId: number) => {
    router.push(`/property/${propertyId}?action=buy`)
  }

  return (
    <DashboardLayout userRole="buyer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Buyer Dashboard</h1>
            <p className="text-muted-foreground">Explore properties and manage your investments</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-secondary/10 text-secondary border-secondary/20">
              <Wallet className="h-3 w-3 mr-1" />
              Portfolio Value: {formatCurrency(1030000)}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Investment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{formatCurrency(1000000)}</div>
              <p className="text-xs text-secondary">+3.2% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Properties Owned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2</div>
              <p className="text-xs text-muted-foreground">70 total fractions</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Dividends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{formatCurrency(5700)}</div>
              <p className="text-xs text-secondary">Next payout in 12 days</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Polls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2</div>
              <p className="text-xs text-warning">1 vote pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="properties">Browse Properties</TabsTrigger>
            <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="marketplace">NFT Marketplace</TabsTrigger>
          </TabsList>

          {/* Browse Properties */}
          <TabsContent value="properties" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search properties..."
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
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {mockProperties.map((property) => (
                <Card key={property.id} className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                  <div className="relative">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      {property.verified && (
                        <Badge className="bg-secondary/90 text-secondary-foreground">Verified</Badge>
                      )}
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-heading line-clamp-2">{property.title}</CardTitle>
                      <Badge variant="outline" className="ml-2">
                        {property.type}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">
                          {property.soldFractions.toLocaleString()} / {property.totalFractions.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={calculateProgress(property.soldFractions, property.totalFractions)} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Total Value</span>
                        <div className="font-semibold">{formatCurrency(property.price)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Per Fraction</span>
                        <div className="font-semibold text-primary">{formatCurrency(property.pricePerFraction)}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-secondary">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {property.roi}% ROI
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewProperty(property.id)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" onClick={() => handleBuyProperty(property.id)}>
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Buy
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Portfolio */}
          <TabsContent value="portfolio" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockNFTs.map((nft) => (
                <Card key={nft.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-heading">{nft.propertyTitle}</CardTitle>
                    <CardDescription>NFT Ownership Certificate</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={nft.image || "/placeholder.svg"}
                        alt="NFT Certificate"
                        className="w-20 h-20 rounded-lg object-cover border border-border"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Ownership</span>
                          <span className="font-medium">
                            {nft.fractions} / {nft.totalFractions} fractions
                          </span>
                        </div>
                        <Progress value={(nft.fractions / nft.totalFractions) * 100} />
                        <div className="text-sm text-muted-foreground">
                          {((nft.fractions / nft.totalFractions) * 100).toFixed(2)}% ownership
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-sm text-muted-foreground">Purchase Price</span>
                        <div className="font-semibold">{formatCurrency(nft.purchasePrice)}</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Current Value</span>
                        <div className="font-semibold text-secondary">{formatCurrency(nft.currentValue)}</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Monthly Dividend</span>
                        <div className="font-semibold text-primary">{formatCurrency(nft.monthlyDividend)}</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Gain/Loss</span>
                        <div className="font-semibold text-secondary">
                          +{formatCurrency(nft.currentValue - nft.purchasePrice)}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => handleViewProperty(nft.id)}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => console.log("List for sale:", nft.id)}
                      >
                        List for Sale
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Governance */}
          <TabsContent value="governance" className="space-y-4">
            <div className="space-y-4">
              {mockPolls.map((poll) => (
                <Card key={poll.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-heading">{poll.title}</CardTitle>
                        <CardDescription>{poll.description}</CardDescription>
                      </div>
                      <Badge className={poll.status === "active" ? "bg-secondary/10 text-secondary" : ""}>
                        {poll.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {poll.options.map((option, index) => {
                        const votes = poll.votes[index]
                        const percentage = (votes / poll.totalVotes) * 100
                        const isUserVote = poll.userVote === option

                        return (
                          <div key={option} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className={`font-medium ${isUserVote ? "text-primary" : ""}`}>
                                {option} {isUserVote && "(Your Vote)"}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {votes} votes ({percentage.toFixed(1)}%)
                              </span>
                            </div>
                            <Progress value={percentage} className={isUserVote ? "bg-primary/20" : ""} />
                          </div>
                        )
                      })}
                    </div>

                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Total votes: {poll.totalVotes}</span>
                      <span>Deadline: {new Date(poll.deadline).toLocaleDateString()}</span>
                    </div>

                    {!poll.userVote && (
                      <div className="flex gap-2">
                        {poll.options.map((option) => (
                          <Button key={option} size="sm" variant="outline">
                            <Vote className="h-4 w-4 mr-1" />
                            Vote {option}
                          </Button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* NFT Marketplace */}
          <TabsContent value="marketplace" className="space-y-4">
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold mb-2">NFT Marketplace Coming Soon</h3>
              <p className="text-muted-foreground mb-4">
                Buy and sell property NFTs from other investors in our secondary marketplace.
              </p>
              <Button variant="outline">Get Notified</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
