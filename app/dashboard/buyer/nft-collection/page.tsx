"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, ExternalLink, Search, Filter, MapPin, Calendar, TrendingUp, Eye, Share2 } from "lucide-react"

export default function NFTCollectionPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")

  // Mock NFT data based on property investments
  const nftCollection = [
    {
      id: 1,
      tokenId: "SUI_NFT_001",
      propertyName: "Luxury Apartment - Victoria Island",
      location: "Lagos, Nigeria",
      fractionOwned: 15,
      totalFractions: 100,
      investmentAmount: 750000,
      currentValue: 825000,
      purchaseDate: "2024-08-15",
      status: "verified" as const,
      image: "/luxury-apartment-lagos.jpg",
      nftImage: "/nft-luxury-apartment.png",
      contractAddress: "0x1234...5678",
      metadata: {
        propertyType: "Residential",
        yearBuilt: 2022,
        size: "120 sqm",
        amenities: ["Swimming Pool", "Gym", "Security", "Parking"],
      },
    },
    {
      id: 2,
      tokenId: "SUI_NFT_002",
      propertyName: "Commercial Plaza - Abuja CBD",
      location: "Abuja, Nigeria",
      fractionOwned: 8,
      totalFractions: 100,
      investmentAmount: 960000,
      currentValue: 1080000,
      purchaseDate: "2024-09-22",
      status: "verified" as const,
      image: "/commercial-plaza-abuja.jpg",
      nftImage: "/nft-commercial-plaza.png",
      contractAddress: "0x2345...6789",
      metadata: {
        propertyType: "Commercial",
        yearBuilt: 2021,
        size: "500 sqm",
        amenities: ["Elevator", "Parking", "Security", "Generator"],
      },
    },
    {
      id: 3,
      tokenId: "SUI_NFT_003",
      propertyName: "Residential Estate - Lekki",
      location: "Lagos, Nigeria",
      fractionOwned: 5,
      totalFractions: 100,
      investmentAmount: 290000,
      currentValue: 315000,
      purchaseDate: "2024-11-10",
      status: "pending" as const,
      image: "/residential-estate-lekki.jpg",
      nftImage: "/nft-residential-estate.png",
      contractAddress: "0x3456...7890",
      metadata: {
        propertyType: "Residential",
        yearBuilt: 2023,
        size: "85 sqm",
        amenities: ["Garden", "Security", "Playground"],
      },
    },
  ]

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC`
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Rejected
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
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "verified" && nft.status === "verified") ||
      (activeTab === "pending" && nft.status === "pending")

    return matchesSearch && matchesFilter && matchesTab
  })

  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
      case "oldest":
        return new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime()
      case "value-high":
        return b.currentValue - a.currentValue
      case "value-low":
        return a.currentValue - b.currentValue
      case "fraction-high":
        return b.fractionOwned - a.fractionOwned
      case "fraction-low":
        return a.fractionOwned - b.fractionOwned
      default:
        return 0
    }
  })

  const totalNFTs = nftCollection.length
  const totalValue = nftCollection.reduce((sum, nft) => sum + nft.currentValue, 0)
  const totalFractions = nftCollection.reduce((sum, nft) => sum + nft.fractionOwned, 0)

  return (
    <ProtectedRoute allowedRoles={["buyer"]}>
      <DashboardLayout userRole="buyer">
        <div className="space-y-8">
          {/* Collection Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total NFTs</CardTitle>
                <ImageIcon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalNFTs}</div>
                <p className="text-xs text-muted-foreground">Property fraction NFTs</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
                <p className="text-xs text-muted-foreground">Current portfolio value</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Ownership</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalFractions}%</div>
                <p className="text-xs text-muted-foreground">Across all properties</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle>My NFT Collection</CardTitle>
              <CardDescription>Your property fraction NFTs representing ownership stakes</CardDescription>
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
                    <SelectItem value="fraction-high">Highest Fraction</SelectItem>
                    <SelectItem value="fraction-low">Lowest Fraction</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All NFTs ({totalNFTs})</TabsTrigger>
                  <TabsTrigger value="verified">
                    Verified ({nftCollection.filter((n) => n.status === "verified").length})
                  </TabsTrigger>
                  <TabsTrigger value="pending">
                    Pending ({nftCollection.filter((n) => n.status === "pending").length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-6">
                  {sortedNFTs.length === 0 ? (
                    <div className="text-center py-12">
                      <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No NFTs Found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sortedNFTs.map((nft) => (
                        <Card key={nft.id} className="hover:shadow-lg transition-shadow">
                          <div className="relative">
                            <img
                              src={nft.nftImage || "/placeholder.svg?height=200&width=300&query=NFT property fraction"}
                              alt={`${nft.propertyName} NFT`}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="absolute top-4 left-4">{getStatusBadge(nft.status)}</div>
                            <div className="absolute top-4 right-4">
                              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                                {nft.fractionOwned}%
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
                                Purchased {new Date(nft.purchaseDate).toLocaleDateString()}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Token ID</span>
                                <span className="font-mono text-xs">{nft.tokenId}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Ownership</span>
                                <span className="font-medium">
                                  {nft.fractionOwned}/{nft.totalFractions} fractions
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Investment</span>
                                <span className="font-medium">{formatCurrency(nft.investmentAmount)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Current Value</span>
                                <span className="font-medium text-accent">{formatCurrency(nft.currentValue)}</span>
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
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
