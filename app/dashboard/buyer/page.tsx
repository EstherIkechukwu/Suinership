"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StatusBadge } from "@/components/ui/status-badge"
import { AIChatbot } from "@/components/ui/ai-chatbot"
import { InvestmentModal } from "@/components/ui/investment-modal"
import { Home, TrendingUp, DollarSign, PieChart, ArrowUpRight, MapPin, Users, Eye } from "lucide-react"

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false)

  const walletBalance = 15750


  const portfolioData = {
    totalValue: 2450000,
    totalInvested: 2000000,
    totalReturn: 450000,
    returnPercentage: 22.5,
    propertiesOwned: 8,
    monthlyDividends: 45000,
  }

  const holdings = [
    {
      id: 1,
      propertyName: "Luxury Apartment - Victoria Island",
      location: "Lagos, Nigeria",
      fractionOwned: 15,
      investmentAmount: 750000,
      currentValue: 825000,
      monthlyDividend: 12500,
      status: "verified" as const,
      image: "/luxury-apartment-lagos.jpg",
      purchaseDate: "2024-08-15",
    },
    {
      id: 2,
      propertyName: "Commercial Plaza - Abuja CBD",
      location: "Abuja, Nigeria",
      fractionOwned: 8,
      investmentAmount: 960000,
      currentValue: 1080000,
      monthlyDividend: 18000,
      status: "verified" as const,
      image: "/commercial-plaza-abuja.jpg",
      purchaseDate: "2024-09-22",
    },
    {
      id: 3,
      propertyName: "Residential Estate - Lekki",
      location: "Lagos, Nigeria",
      fractionOwned: 5,
      investmentAmount: 290000,
      currentValue: 315000,
      monthlyDividend: 8500,
      status: "pending" as const,
      image: "/residential-estate-lekki.jpg",
      purchaseDate: "2024-11-10",
    },
  ]

  const marketplaceProperties = [
    {
      id: 4,
      title: "Modern Office Complex - Ikoyi",
      location: "Lagos, Nigeria",
      price: 180000000,
      minInvestment: 50000,
      fractionsAvailable: 85,
      totalFractions: 100,
      expectedROI: 18.5,
      status: "verified" as const,
      image: "/modern-office-ikoyi.jpg",
      suggestedUse: "Commercial Lease",
    },
    {
      id: 5,
      title: "Luxury Villa - Banana Island",
      location: "Lagos, Nigeria",
      price: 350000000,
      minInvestment: 100000,
      fractionsAvailable: 92,
      totalFractions: 100,
      expectedROI: 15.2,
      status: "verified" as const,
      image: "/luxury-villa-banana.jpg",
      suggestedUse: "Rental Income",
    },
    {
      id: 6,
      title: "Shopping Mall - Wuse II",
      location: "Abuja, Nigeria",
      price: 450000000,
      minInvestment: 75000,
      fractionsAvailable: 67,
      totalFractions: 100,
      expectedROI: 22.8,
      status: "verified" as const,
      image: "/shopping-mall-wuse.jpg",
      suggestedUse: "Commercial Lease",
    },
  ]

  const formatCurrency = (amount: number) => {
      return `${amount.toLocaleString("en-US", {minimumFractionDigits: 0})} USDC`
  }

  const handleInvestClick = (property: any) => {
    setSelectedProperty(property)
    setIsInvestmentModalOpen(true)
  }

  const handleInvestmentSuccess = (investmentAmount: number) => {
    console.log(`Investment of ${investmentAmount} USDC successful`)
  }

  return (
    <ProtectedRoute allowedRoles={["buyer"]}>
      <DashboardLayout userRole="buyer">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                <PieChart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-1.8xl font-bold">{formatCurrency(portfolioData.totalValue)}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-accent flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />+{portfolioData.returnPercentage}%
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-1.8xl font-bold">{formatCurrency(portfolioData.totalInvested)}</div>
                <p className="text-xs text-muted-foreground">Across {portfolioData.propertiesOwned} properties</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Dividends</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-1.5xl font-bold">{formatCurrency(portfolioData.monthlyDividends)}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-accent">+12% from last month</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Properties Owned</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-1.8xl font-bold">{portfolioData.propertiesOwned}</div>
                <p className="text-xs text-muted-foreground">Fractional ownership</p>
              </CardContent>
            </Card>
          </div>


          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Holdings</TabsTrigger>
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              <TabsTrigger value="resell">Resell</TabsTrigger>
              <TabsTrigger value="next-of-kin">Next of Kin</TabsTrigger>
            </TabsList>


            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Property Holdings</CardTitle>
                  <CardDescription>Your fractional real estate investments and their performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {holdings.map((holding) => (
                      <div key={holding.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                        <img
                          src={holding.image || "/placeholder.svg"}
                          alt={holding.propertyName}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-foreground">{holding.propertyName}</h3>
                            <StatusBadge status={holding.status} />
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" />
                            {holding.location}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Ownership</p>
                              <p className="font-medium">{holding.fractionOwned}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Invested</p>
                              <p className="font-medium">{formatCurrency(holding.investmentAmount)}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Current Value</p>
                              <p className="font-medium text-accent">{formatCurrency(holding.currentValue)}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Monthly Dividend</p>
                              <p className="font-medium">{formatCurrency(holding.monthlyDividend)}</p>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>


            <TabsContent value="marketplace" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Marketplace</CardTitle>
                  <CardDescription>Discover new investment opportunities in verified properties</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marketplaceProperties.map((property) => (
                      <Card key={property.id} className="hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <img
                            src={property.image || "/placeholder.svg"}
                            alt={property.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="absolute top-4 left-4">
                            <StatusBadge status={property.status} />
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge variant="secondary" className="bg-accent text-accent-foreground">
                              {property.expectedROI}% ROI
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6 space-y-4">
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">{property.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-1" />
                              {property.location}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Available Fractions</span>
                              <span className="font-medium">
                                {property.fractionsAvailable}/{property.totalFractions}
                              </span>
                            </div>
                            <Progress
                              value={(property.fractionsAvailable / property.totalFractions) * 100}
                              className="h-2"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Total Value</p>
                              <p className="font-semibold">{formatCurrency(property.price)}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Min. Investment</p>
                              <p className="font-semibold">{formatCurrency(property.minInvestment)}</p>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium">Suggested Use:</span> {property.suggestedUse}
                          </div>
                          <Button className="w-full" onClick={() => handleInvestClick(property)}>
                            Invest Now
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>


            <TabsContent value="resell" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resell Your Fractions</CardTitle>
                  <CardDescription>List your fractional ownership for sale on the secondary market</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {holdings.map((holding) => (
                      <div
                        key={holding.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={holding.image || "/placeholder.svg"}
                            alt={holding.propertyName}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-foreground">{holding.propertyName}</h3>
                            <p className="text-sm text-muted-foreground">{holding.fractionOwned}% ownership</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Current Value</p>
                            <p className="font-semibold">{formatCurrency(holding.currentValue)}</p>
                          </div>
                          <Button variant="outline">List for Sale</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>


            <TabsContent value="next-of-kin" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Next of Kin Management</CardTitle>
                  <CardDescription>Assign beneficiaries for your fractional real estate investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-6 border border-border rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-4 mb-4">
                        <Users className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-semibold text-foreground">Primary Beneficiary</h3>
                          <p className="text-sm text-muted-foreground">Main inheritor of your investments</p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Name</p>
                          <p className="font-medium">Sarah Johnson</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Relationship</p>
                          <p className="font-medium">Spouse</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Allocation</p>
                          <p className="font-medium">70%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <Badge variant="secondary" className="bg-accent text-accent-foreground">
                            Verified
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border border-border rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-4 mb-4">
                        <Users className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <h3 className="font-semibold text-foreground">Secondary Beneficiary</h3>
                          <p className="text-sm text-muted-foreground">Additional inheritor</p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Name</p>
                          <p className="font-medium">Michael Johnson</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Relationship</p>
                          <p className="font-medium">Son</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Allocation</p>
                          <p className="font-medium">30%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <Badge variant="outline">Pending Verification</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button>Add Beneficiary</Button>
                      <Button variant="outline">Update Allocations</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>


        <AIChatbot userRole="buyer" />

        <InvestmentModal
          isOpen={isInvestmentModalOpen}
          onClose={() => setIsInvestmentModalOpen(false)}
          property={selectedProperty}
          walletBalance={walletBalance}
          onSuccess={handleInvestmentSuccess}
        />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
