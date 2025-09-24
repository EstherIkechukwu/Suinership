"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Building2, Vote, DollarSign, Plus, Eye, CheckCircle, MapPin, Clock } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

// Mock data for managed properties
const mockManagedProperties = [
  {
    id: 1,
    title: "Luxury Apartment in Victoria Island",
    location: "Victoria Island, Lagos",
    price: 50000000,
    totalFractions: 5000,
    soldFractions: 5000,
    status: "fully-sold",
    monthlyRevenue: 450000,
    totalInvestors: 247,
    averageOwnership: 20.2,
    lastDividendPayout: "2024-12-01",
    nextDividendDue: "2025-01-01",
    activePolls: 1,
    images: ["/modern-apartment-building.png"],
  },
  {
    id: 2,
    title: "Commercial Plaza in Ikeja",
    location: "Ikeja, Lagos",
    price: 120000000,
    totalFractions: 4800,
    soldFractions: 4800,
    status: "fully-sold",
    monthlyRevenue: 680000,
    totalInvestors: 189,
    averageOwnership: 25.4,
    lastDividendPayout: "2024-12-01",
    nextDividendDue: "2025-01-01",
    activePolls: 0,
    images: ["/commercial-plaza-building.jpg"],
  },
]

// Mock data for governance polls
const mockGovernancePolls = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: "Luxury Apartment in Victoria Island",
    title: "Renovate lobby area",
    description: "Proposal to upgrade the lobby with modern fixtures and furniture estimated at ₦2,500,000",
    options: ["Approve", "Reject", "Modify Budget"],
    votes: [120, 45, 30],
    totalVotes: 195,
    totalInvestors: 247,
    custodianVote: null,
    status: "active",
    createdDate: "2024-12-25",
    deadline: "2025-01-15",
    requiredConsensus: 75, // 75% because custodian hasn't voted
  },
  {
    id: 2,
    propertyId: 1,
    propertyTitle: "Luxury Apartment in Victoria Island",
    title: "Increase rent for next quarter",
    description: "Proposal to increase rent by 12% starting Q2 2025 based on market analysis",
    options: ["Approve", "Reject"],
    votes: [85, 110],
    totalVotes: 195,
    totalInvestors: 247,
    custodianVote: "Approve",
    status: "active",
    createdDate: "2024-12-20",
    deadline: "2025-01-10",
    requiredConsensus: 51, // 51% because custodian supports
  },
]

// Mock data for dividend payouts
const mockDividendPayouts = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: "Luxury Apartment in Victoria Island",
    month: "December 2024",
    totalAmount: 450000,
    perFraction: 90,
    status: "completed",
    payoutDate: "2024-12-01",
    investors: 247,
  },
  {
    id: 2,
    propertyId: 2,
    propertyTitle: "Commercial Plaza in Ikeja",
    month: "December 2024",
    totalAmount: 680000,
    perFraction: 141.67,
    status: "completed",
    payoutDate: "2024-12-01",
    investors: 189,
  },
]

export default function CustodianDashboard() {
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [isCreatePollOpen, setIsCreatePollOpen] = useState(false)
  const [pollForm, setPollForm] = useState({
    title: "",
    description: "",
    options: ["", ""],
    deadline: "",
  })
  const [custodianVote, setCustodianVote] = useState("")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "fully-sold":
      case "approved":
        return "bg-secondary/10 text-secondary border-secondary/20"
      case "active":
      case "pending":
        return "bg-warning/10 text-warning border-warning/20"
      case "rejected":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const calculateVotePercentage = (votes: number, total: number) => {
    return total > 0 ? (votes / total) * 100 : 0
  }

  const totalProperties = mockManagedProperties.length
  const totalInvestors = mockManagedProperties.reduce((sum, prop) => sum + prop.totalInvestors, 0)
  const totalMonthlyRevenue = mockManagedProperties.reduce((sum, prop) => sum + prop.monthlyRevenue, 0)
  const activePolls = mockGovernancePolls.filter((poll) => poll.status === "active").length

  return (
    <DashboardLayout userRole="custodian">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Custodian Dashboard</h1>
            <p className="text-muted-foreground">Manage property lifecycle and governance</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">
              <Building2 className="h-3 w-3 mr-1" />
              Property Management Pro
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Managed Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalProperties}</div>
              <p className="text-xs text-secondary">All fully sold</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Investors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalInvestors}</div>
              <p className="text-xs text-muted-foreground">Across all properties</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{formatCurrency(totalMonthlyRevenue)}</div>
              <p className="text-xs text-secondary">For dividend distribution</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Polls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{activePolls}</div>
              <p className="text-xs text-warning">Awaiting decisions</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="properties" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="properties">Managed Properties</TabsTrigger>
            <TabsTrigger value="governance">Governance Polls</TabsTrigger>
            <TabsTrigger value="dividends">Dividend Payouts</TabsTrigger>
          </TabsList>

          {/* Managed Properties */}
          <TabsContent value="properties" className="space-y-4">
            <div className="grid gap-6">
              {mockManagedProperties.map((property) => (
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
                      <Badge className={getStatusColor(property.status)}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Fully Sold
                      </Badge>
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
                            <span className="text-muted-foreground">Property Value</span>
                            <div className="font-semibold">{formatCurrency(property.price)}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Monthly Revenue</span>
                            <div className="font-semibold text-secondary">
                              {formatCurrency(property.monthlyRevenue)}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total Investors</span>
                            <div className="font-semibold">{property.totalInvestors}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Active Polls</span>
                            <div className="font-semibold">{property.activePolls}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Last Dividend Payout</span>
                        <div className="font-semibold">
                          {new Date(property.lastDividendPayout).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Next Dividend Due</span>
                        <div className="font-semibold text-warning">
                          {new Date(property.nextDividendDue).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Average ownership: {property.averageOwnership} fractions per investor
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Process Dividend
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Governance Polls */}
          <TabsContent value="governance" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-heading font-semibold">Active Governance Polls</h3>
              <Dialog open={isCreatePollOpen} onOpenChange={setIsCreatePollOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Poll
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create Governance Poll</DialogTitle>
                    <DialogDescription>Create a new poll for property management decisions</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pollTitle">Poll Title</Label>
                      <Input
                        id="pollTitle"
                        placeholder="e.g., Renovate lobby area"
                        value={pollForm.title}
                        onChange={(e) => setPollForm({ ...pollForm, title: e.target.value })}
                        className="bg-input border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pollDescription">Description</Label>
                      <Textarea
                        id="pollDescription"
                        placeholder="Detailed description of the proposal..."
                        value={pollForm.description}
                        onChange={(e) => setPollForm({ ...pollForm, description: e.target.value })}
                        className="bg-input border-border min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Poll Options</Label>
                      {pollForm.options.map((option, index) => (
                        <Input
                          key={index}
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...pollForm.options]
                            newOptions[index] = e.target.value
                            setPollForm({ ...pollForm, options: newOptions })
                          }}
                          className="bg-input border-border"
                        />
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPollForm({ ...pollForm, options: [...pollForm.options, ""] })}
                      >
                        Add Option
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deadline">Voting Deadline</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={pollForm.deadline}
                        onChange={(e) => setPollForm({ ...pollForm, deadline: e.target.value })}
                        className="bg-input border-border"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={() => setIsCreatePollOpen(false)} className="flex-1">
                        Create Poll
                      </Button>
                      <Button variant="outline" onClick={() => setIsCreatePollOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {mockGovernancePolls.map((poll) => (
                <Card key={poll.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-heading">{poll.title}</CardTitle>
                        <CardDescription>{poll.propertyTitle}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(poll.status)}>{poll.status}</Badge>
                        {poll.custodianVote && (
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            Custodian: {poll.custodianVote}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{poll.description}</p>

                    <div className="space-y-3">
                      {poll.options.map((option, index) => {
                        const votes = poll.votes[index]
                        const percentage = calculateVotePercentage(votes, poll.totalVotes)

                        return (
                          <div key={option} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{option}</span>
                              <span className="text-sm text-muted-foreground">
                                {votes} votes ({percentage.toFixed(1)}%)
                              </span>
                            </div>
                            <Progress value={percentage} />
                          </div>
                        )
                      })}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Total Votes</span>
                        <div className="font-semibold">{poll.totalVotes}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Participation</span>
                        <div className="font-semibold">
                          {((poll.totalVotes / poll.totalInvestors) * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Required Consensus</span>
                        <div className="font-semibold">{poll.requiredConsensus}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Deadline</span>
                        <div className="font-semibold">{new Date(poll.deadline).toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Created: {new Date(poll.createdDate).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        {!poll.custodianVote && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm">
                                <Vote className="h-4 w-4 mr-1" />
                                Cast Custodian Vote
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Cast Custodian Vote</DialogTitle>
                                <DialogDescription>
                                  Your vote will influence the required consensus threshold
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <RadioGroup value={custodianVote} onValueChange={setCustodianVote}>
                                  {poll.options.map((option) => (
                                    <div key={option} className="flex items-center space-x-2">
                                      <RadioGroupItem value={option} id={option} />
                                      <Label htmlFor={option}>{option}</Label>
                                    </div>
                                  ))}
                                </RadioGroup>

                                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                                  <div className="flex items-start gap-2">
                                    <Clock className="h-5 w-5 text-warning mt-0.5" />
                                    <div>
                                      <h4 className="font-semibold text-warning">Voting Impact</h4>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        If you support a choice, only 51% investor agreement is needed. If you abstain,
                                        75% consensus is required.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  <Button className="flex-1">Submit Vote</Button>
                                  <Button variant="outline" className="flex-1 bg-transparent">
                                    Abstain
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Dividend Payouts */}
          <TabsContent value="dividends" className="space-y-4">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Dividend Payouts</CardTitle>
                <CardDescription>Track dividend distributions to property investors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDividendPayouts.map((payout) => (
                    <div key={payout.id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{payout.propertyTitle}</h4>
                          <p className="text-sm text-muted-foreground">{payout.month}</p>
                        </div>
                        <Badge className={getStatusColor(payout.status)}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {payout.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">Total Amount</span>
                          <div className="font-semibold text-secondary">{formatCurrency(payout.totalAmount)}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Per Fraction</span>
                          <div className="font-semibold">{formatCurrency(payout.perFraction)}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Investors</span>
                          <div className="font-semibold">{payout.investors}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Payout Date</span>
                          <div className="font-semibold">{new Date(payout.payoutDate).toLocaleDateString()}</div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Transaction Details
                        </Button>
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
