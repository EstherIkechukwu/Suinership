"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, ExternalLink, Search, Filter, MapPin, Calendar, TrendingUp, Eye, Share2, Users } from "lucide-react"

export default function SellerNFTCollectionPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")


  const nftCollection = [
    {
      id: 1,
      tokenId: "SUI_PROP_001",
      propertyName: "Modern Office Complex - Ikoyi",
      location: "Lagos, Nigeria",
      totalFractions: 100,
      soldFractions: 85,
      availableFractions: 15,
      totalValue: 180000000,
      soldValue: 153000000,
      listingDate: "2024-07-20",
      status: "active" as const,
      image: "/modern-office-ikoyi.jpg",
      nftImage: "/nft-modern-office.png",
      contractAddress: "0x4567...8901",
      metadata: {
        propertyType: "Commercial",
        yearBuilt: 2023,
        size: "2000 sqm",
        amenities: ["Elevator", "Parking", "Security", "Generator", "Conference Rooms"],
      },
      investors: 42,
    },
    {
      id: 2,
      tokenId: "SUI_PROP_002",
      propertyName: "Luxury Villa - Banana Island",
      location: "Lagos, Nigeria",
      totalFractions: 100,
      soldFractions: 92,
      availableFractions: 8,
      totalValue: 350000000,
      soldValue: 322000000,
      listingDate: "2024-08-10",
      status: "active" as const,
      image: "/luxury-villa-banana.jpg",
      nftImage: "/nft-luxury-villa.png",
      contractAddress: "0x5678...9012",
      metadata: {
        propertyType: "Residential",
        yearBuilt: 2022,
        size: "800 sqm",
        amenities: ["Swimming Pool", "Garden", "Security", "Parking", "Gym"],
      },
      investors: 38,
    },
    {
      id: 3,
      tokenId: "SUI_PROP_003",
      propertyName: "Shopping Mall - Wuse II",
      location: "Abuja, Nigeria",
      totalFractions: 100,
      soldFractions: 67,
      availableFractions: 33,
      totalValue: 450000000,
      soldValue: 301500000,
      listingDate: "2024-09-05",
      status: "active" as const,
      image: "/shopping-mall-wuse.jpg",
      nftImage: "/nft-shopping-mall.png",
      contractAddress: "0x6789...0123",
      metadata: {
        propertyType: "Commercial",
        yearBuilt: 2021,
        size: "5000 sqm",
        amenities: ["Escalators", "Parking", "Security", "Food Court", "Cinema"],
      },
      investors: 29,
    },
  ]

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString("en-US", { minimumFractionDigits:0})} USDC`
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "sold-out":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Sold Out
          </Badge>
        )
      case "paused":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Paused
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredNFTs = nftCollection.filter((nft) => {
    const matchesSearch =
      nft.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterBy === "all" || nft.metadata.propertyType.toLowerCase() === filterBy

    return matchesSearch && matchesFilter
  })

  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.listingDate).getTime() - new Date(a.listingDate).getTime()
      case "oldest":
        return new Date(a.listingDate).getTime() - new Date(b.listingDate).getTime()
      case "value-high":
        return b.totalValue - a.totalValue
      case "value-low":
        return a.totalValue - b.totalValue
      case "sold-high":
        return b.soldFractions - a.soldFractions
      case "sold-low":
        return a.soldFractions - b.soldFractions
      default:
        return 0
    }
  })

  const totalProperties = nftCollection.length
  const totalValue = nftCollection.reduce((sum, nft) => sum + nft.totalValue, 0)
  const totalSoldValue = nftCollection.reduce((sum, nft) => sum + nft.soldValue, 0)
  const totalInvestors = nftCollection.reduce((sum, nft) => sum + nft.investors, 0)

  return (
    <ProtectedRoute allowedRoles={["seller"]}>
      <DashboardLayout userRole="seller">
        <div className="space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                <ImageIcon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-1.8xl font-bold">{totalProperties}</div>
                <p className="text-xs text-muted-foreground">Listed properties</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-1.8xl font-bold">{formatCurrency(totalValue)}</div>
                <p className="text-xs text-muted-foreground">Combined property value</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sold Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-1.8xl font-bold">{formatCurrency(totalSoldValue)}</div>
                <p className="text-xs text-muted-foreground">Revenue generated</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Investors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-1.8xl font-bold">{totalInvestors}</div>
                <p className="text-xs text-muted-foreground">Across all properties</p>
              </CardContent>
            </Card>
          </div>


          <Card>
            <CardHeader>
              <CardTitle>Property NFT Collection</CardTitle>
              <CardDescription>Your listed properties and their fractional ownership NFTs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by property name or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="value-high">Highest Value</SelectItem>
                    <SelectItem value="value-low">Lowest Value</SelectItem>
                    <SelectItem value="sold-high">Most Sold</SelectItem>
                    <SelectItem value="sold-low">Least Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {sortedNFTs.length === 0 ? (
                <div className="text-center py-12">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Properties Found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedNFTs.map((nft) => (
                    <Card key={nft.id} className="hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={nft.nftImage || "/placeholder.svg?height=200&width=300&query=Property NFT collection"}
                          alt={`${nft.propertyName} NFT`}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-4 left-4">{getStatusBadge(nft.status)}</div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-primary text-primary-foreground">
                            {nft.soldFractions}% Sold
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6 space-y-4">
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">{nft.propertyName}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {nft.location}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            Listed {new Date(nft.listingDate).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Token ID</span>
                            <span className="font-mono text-xs">{nft.tokenId}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Fractions Sold</span>
                            <span className="font-medium">
                              {nft.soldFractions}/{nft.totalFractions}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total Value</span>
                            <span className="font-medium">{formatCurrency(nft.totalValue)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Revenue</span>
                            <span className="font-medium text-accent">{formatCurrency(nft.soldValue)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Investors</span>
                            <span className="font-medium">{nft.investors}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Property Details</h4>
                          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                            <div>Type: {nft.metadata.propertyType}</div>
                            <div>Size: {nft.metadata.size}</div>
                            <div>Built: {nft.metadata.yearBuilt}</div>
                            <div>Amenities: {nft.metadata.amenities.length}</div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
