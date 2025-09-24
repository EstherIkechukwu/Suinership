"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Upload, CheckCircle, XCircle, Eye, Clock, MapPin, Shield, AlertTriangle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

// Mock data for properties assigned to law firm
const mockAssignedProperties = [
  {
    id: 1,
    title: "Luxury Apartment in Victoria Island",
    seller: "Jane Smith",
    location: "Victoria Island, Lagos",
    price: 50000000,
    submissionDate: "2024-12-20",
    status: "under-review",
    documents: [
      { name: "Certificate of Occupancy", status: "verified", uploadDate: "2024-12-20" },
      { name: "Survey Plan", status: "verified", uploadDate: "2024-12-20" },
      { name: "Building Approval", status: "pending", uploadDate: "2024-12-20" },
    ],
    images: ["/modern-apartment-building.png"],
    type: "Residential",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    assignedDate: "2024-12-21",
    deadline: "2024-12-28",
  },
  {
    id: 2,
    title: "Commercial Plaza in Ikeja",
    seller: "John Doe",
    location: "Ikeja, Lagos",
    price: 120000000,
    submissionDate: "2024-12-28",
    status: "pending-documents",
    documents: [
      { name: "Certificate of Occupancy", status: "missing", uploadDate: null },
      { name: "Survey Plan", status: "verified", uploadDate: "2024-12-28" },
      { name: "Environmental Impact Assessment", status: "under-review", uploadDate: "2024-12-28" },
    ],
    images: ["/commercial-plaza-building.jpg"],
    type: "Commercial",
    floors: 4,
    units: 12,
    sqft: 8000,
    assignedDate: "2024-12-29",
    deadline: "2025-01-05",
  },
]

// Mock data for completed verifications
const mockCompletedVerifications = [
  {
    id: 3,
    title: "Residential Estate in Lekki",
    seller: "Mike Johnson",
    location: "Lekki Phase 1, Lagos",
    price: 80000000,
    verificationDate: "2024-12-15",
    status: "approved",
    verificationNotes: "All documents verified successfully. Property meets all legal requirements.",
    walrusHash: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
  },
  {
    id: 4,
    title: "Office Complex in Abuja",
    seller: "Sarah Wilson",
    location: "Wuse 2, Abuja",
    price: 200000000,
    verificationDate: "2024-12-10",
    status: "rejected",
    verificationNotes:
      "Missing environmental clearance certificate. Property ownership documents require additional verification.",
    walrusHash: null,
  },
]

export default function LawFirmDashboard() {
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [verificationNotes, setVerificationNotes] = useState("")
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "verified":
        return "bg-secondary/10 text-secondary border-secondary/20"
      case "under-review":
      case "pending-documents":
        return "bg-warning/10 text-warning border-warning/20"
      case "rejected":
      case "missing":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
      case "verified":
        return <CheckCircle className="h-4 w-4" />
      case "under-review":
      case "pending-documents":
        return <Clock className="h-4 w-4" />
      case "rejected":
      case "missing":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const calculateDocumentProgress = (documents: any[]) => {
    const verified = documents.filter((doc) => doc.status === "verified").length
    return (verified / documents.length) * 100
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const totalAssigned = mockAssignedProperties.length
  const underReview = mockAssignedProperties.filter((p) => p.status === "under-review").length
  const pendingDocs = mockAssignedProperties.filter((p) => p.status === "pending-documents").length
  const totalCompleted = mockCompletedVerifications.length
  const approvedCount = mockCompletedVerifications.filter((p) => p.status === "approved").length

  return (
    <DashboardLayout userRole="law-firm">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Law Firm Dashboard</h1>
            <p className="text-muted-foreground">Verify property documents and legal compliance</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-warning/10 text-warning border-warning/20">
              <Shield className="h-3 w-3 mr-1" />
              Lagos Legal Associates
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Assigned Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalAssigned}</div>
              <p className="text-xs text-warning">{underReview} under review</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{pendingDocs}</div>
              <p className="text-xs text-destructive">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalCompleted}</div>
              <p className="text-xs text-secondary">{approvedCount} approved</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Approval Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {totalCompleted > 0 ? Math.round((approvedCount / totalCompleted) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="assigned" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="assigned">Assigned Properties</TabsTrigger>
            <TabsTrigger value="completed">Completed Verifications</TabsTrigger>
          </TabsList>

          {/* Assigned Properties */}
          <TabsContent value="assigned" className="space-y-4">
            <div className="grid gap-6">
              {mockAssignedProperties.map((property) => {
                const daysLeft = getDaysUntilDeadline(property.deadline)
                const docProgress = calculateDocumentProgress(property.documents)

                return (
                  <Card key={property.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-heading">{property.title}</CardTitle>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {property.location}
                          </div>
                          <div className="text-sm text-muted-foreground">Seller: {property.seller}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(property.status)}>
                            {getStatusIcon(property.status)}
                            <span className="ml-1 capitalize">{property.status.replace("-", " ")}</span>
                          </Badge>
                          {daysLeft <= 2 && (
                            <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Due Soon
                            </Badge>
                          )}
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
                              <span className="text-muted-foreground">Property Value</span>
                              <div className="font-semibold">{formatCurrency(property.price)}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Assigned Date</span>
                              <div className="font-semibold">
                                {new Date(property.assignedDate).toLocaleDateString()}
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Deadline</span>
                              <div className={`font-semibold ${daysLeft <= 2 ? "text-destructive" : ""}`}>
                                {daysLeft} days left
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Document Progress</span>
                              <div className="font-semibold">{docProgress.toFixed(0)}% complete</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Document Status */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Document Verification Status</h4>
                        {property.documents.map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border border-border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="font-medium text-sm">{doc.name}</div>
                                {doc.uploadDate && (
                                  <div className="text-xs text-muted-foreground">
                                    Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                                  </div>
                                )}
                              </div>
                            </div>
                            <Badge className={getStatusColor(doc.status)}>
                              {getStatusIcon(doc.status)}
                              <span className="ml-1 capitalize">{doc.status.replace("-", " ")}</span>
                            </Badge>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          Submitted: {new Date(property.submissionDate).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setSelectedProperty(property)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Dialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                onClick={() => {
                                  setSelectedProperty(property)
                                  setIsVerificationDialogOpen(true)
                                }}
                              >
                                <Upload className="h-4 w-4 mr-1" />
                                Submit Verification
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Submit Property Verification</DialogTitle>
                                <DialogDescription>
                                  Upload verification proof and provide your assessment
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Verification Documents</Label>
                                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                                    <p className="text-sm text-muted-foreground mb-2">
                                      Upload verification proof to Walrus storage
                                    </p>
                                    <Button variant="outline" size="sm">
                                      <Upload className="h-4 w-4 mr-2" />
                                      Upload to Walrus
                                    </Button>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="notes">Verification Notes</Label>
                                  <Textarea
                                    id="notes"
                                    placeholder="Provide detailed notes about your verification process and findings..."
                                    value={verificationNotes}
                                    onChange={(e) => setVerificationNotes(e.target.value)}
                                    className="bg-input border-border min-h-[120px]"
                                  />
                                </div>

                                <div className="flex gap-2">
                                  <Button
                                    className="flex-1 bg-secondary hover:bg-secondary/90"
                                    onClick={() => setIsVerificationDialogOpen(false)}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve Property
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={() => setIsVerificationDialogOpen(false)}
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject Property
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Completed Verifications */}
          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-6">
              {mockCompletedVerifications.map((property) => (
                <Card key={property.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-heading">{property.title}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.location}
                        </div>
                        <div className="text-sm text-muted-foreground">Seller: {property.seller}</div>
                      </div>
                      <Badge className={getStatusColor(property.status)}>
                        {getStatusIcon(property.status)}
                        <span className="ml-1 capitalize">{property.status}</span>
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Property Value</span>
                        <div className="font-semibold">{formatCurrency(property.price)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Verification Date</span>
                        <div className="font-semibold">{new Date(property.verificationDate).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Walrus Hash</span>
                        <div className="font-semibold text-xs">
                          {property.walrusHash ? (
                            <span className="text-secondary">{property.walrusHash.substring(0, 20)}...</span>
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Verification Notes</h4>
                      <div className="p-3 bg-muted/20 border border-border rounded-lg text-sm">
                        {property.verificationNotes}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Full Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
