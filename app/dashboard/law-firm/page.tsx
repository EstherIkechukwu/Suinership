"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import { AIChatbot } from "@/components/ui/ai-chatbot"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Scale,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Download,
  Upload,
  Gavel,
  Shield,
  Users,
  DollarSign,
} from "lucide-react"

export default function LawFirmDashboard() {
  const [activeTab, setActiveTab] = useState("cases")

  // Mock data - in production this would come from API
  const lawFirmData = {
    activeCases: 34,
    pendingReviews: 12,
    completedCases: 156,
    monthlyRevenue: 8500000,
    clientSatisfaction: 96.8,
    averageCaseTime: 14,
  }

  const legalCases = [
    {
      id: 1,
      caseNumber: "SUI-2024-001",
      title: "Property Ownership Dispute - Victoria Island",
      client: "John Adebayo",
      propertyValue: 180000000,
      status: "active" as const,
      priority: "high" as const,
      assignedLawyer: "Barrister Adunni Okafor",
      dateOpened: "2024-11-10",
      nextHearing: "2024-11-25",
      description: "Dispute over fractional ownership rights and dividend distribution",
    },
    {
      id: 2,
      caseNumber: "SUI-2024-002",
      title: "Contract Review - Commercial Plaza Abuja",
      client: "Michael Okafor",
      propertyValue: 350000000,
      status: "pending" as const,
      priority: "medium" as const,
      assignedLawyer: "Barrister Kemi Adeleke",
      dateOpened: "2024-11-08",
      nextHearing: null,
      description: "Legal review of fractional ownership agreement and terms",
    },
    {
      id: 3,
      caseNumber: "SUI-2024-003",
      title: "Inheritance Claim - Lekki Estate",
      client: "Sarah Johnson",
      propertyValue: 120000000,
      status: "completed" as const,
      priority: "high" as const,
      assignedLawyer: "Barrister Tunde Bakare",
      dateOpened: "2024-10-15",
      nextHearing: null,
      description: "Next-of-kin inheritance claim for fractional property ownership",
    },
  ]

  const documentReviews = [
    {
      id: 1,
      documentType: "Property Title Deed",
      propertyTitle: "Luxury Apartment Complex - Victoria Island",
      submittedBy: "John Adebayo",
      submissionDate: "2024-11-14",
      status: "pending" as const,
      priority: "high" as const,
      reviewDeadline: "2024-11-18",
    },
    {
      id: 2,
      documentType: "Fractional Ownership Agreement",
      propertyTitle: "Commercial Plaza - Abuja CBD",
      submittedBy: "Michael Okafor",
      submissionDate: "2024-11-13",
      status: "under_review" as const,
      priority: "medium" as const,
      reviewDeadline: "2024-11-17",
    },
    {
      id: 3,
      documentType: "Next-of-Kin Declaration",
      propertyTitle: "Residential Estate - Lekki",
      submittedBy: "Sarah Johnson",
      submissionDate: "2024-11-12",
      status: "approved" as const,
      priority: "low" as const,
      reviewDeadline: "2024-11-16",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-warning text-warning-foreground"
      case "low":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <ProtectedRoute allowedRoles={["law_firm"]}>
      <DashboardLayout userRole="law_firm">
        <div className="space-y-8">
          {/* Law Firm Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(lawFirmData.monthlyRevenue)}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-accent">+12.5% from last month</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
                <Scale className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lawFirmData.activeCases}</div>
                <p className="text-xs text-muted-foreground">{lawFirmData.completedCases} completed total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <Clock className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lawFirmData.pendingReviews}</div>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Client Satisfaction</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lawFirmData.clientSatisfaction}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-accent">Excellent rating</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="cases">Legal Cases</TabsTrigger>
              <TabsTrigger value="documents">Document Review</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            {/* Legal Cases Tab */}
            <TabsContent value="cases" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Legal Cases</CardTitle>
                  <CardDescription>Manage ongoing legal matters and property disputes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {legalCases.map((case_) => (
                      <div key={case_.id} className="border border-border rounded-lg p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold text-foreground">{case_.title}</h3>
                              <Badge className={getPriorityColor(case_.priority)}>
                                {case_.priority.charAt(0).toUpperCase() + case_.priority.slice(1)} Priority
                              </Badge>
                              <StatusBadge status={case_.status} />
                            </div>
                            <p className="text-sm text-muted-foreground">Case #{case_.caseNumber}</p>
                            <p className="text-sm text-muted-foreground">{case_.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Documents
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Client</p>
                            <p className="font-medium">{case_.client}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Property Value</p>
                            <p className="font-medium">{formatCurrency(case_.propertyValue)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Assigned Lawyer</p>
                            <p className="font-medium">{case_.assignedLawyer}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              {case_.nextHearing ? "Next Hearing" : "Date Opened"}
                            </p>
                            <p className="font-medium">
                              {case_.nextHearing
                                ? new Date(case_.nextHearing).toLocaleDateString()
                                : new Date(case_.dateOpened).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Document Review Tab */}
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Document Reviews</CardTitle>
                  <CardDescription>Review and approve legal documents for property transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documentReviews.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-foreground">{doc.documentType}</h3>
                            <Badge className={getPriorityColor(doc.priority)}>
                              {doc.priority.charAt(0).toUpperCase() + doc.priority.slice(1)}
                            </Badge>
                            <StatusBadge status={doc.status} />
                          </div>
                          <p className="text-sm text-muted-foreground">{doc.propertyTitle}</p>
                          <p className="text-xs text-muted-foreground">
                            Submitted by {doc.submittedBy} on {new Date(doc.submissionDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-warning">
                            Deadline: {new Date(doc.reviewDeadline).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          {doc.status === "pending" && (
                            <Button size="sm" className="bg-accent text-accent-foreground">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Compliance Tab */}
            <TabsContent value="compliance" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Regulatory Compliance</CardTitle>
                    <CardDescription>Monitor compliance with Nigerian property laws</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-accent" />
                          <span className="text-sm">Land Use Act Compliance</span>
                        </div>
                        <Badge className="bg-accent text-accent-foreground">Compliant</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-accent" />
                          <span className="text-sm">Property Registration</span>
                        </div>
                        <Badge className="bg-accent text-accent-foreground">Compliant</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-warning" />
                          <span className="text-sm">Tax Documentation</span>
                        </div>
                        <Badge className="bg-warning text-warning-foreground">Review Required</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Legal Templates</CardTitle>
                    <CardDescription>Standard legal documents and agreements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Fractional Ownership Agreement</span>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Next-of-Kin Declaration</span>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Property Transfer Agreement</span>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Upload Legal Document</CardTitle>
                  <CardDescription>Submit new legal templates or case documents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="document-title">Document Title</Label>
                      <Input id="document-title" placeholder="e.g., Property Ownership Agreement" />
                    </div>
                    <div>
                      <Label htmlFor="document-type">Document Type</Label>
                      <Input id="document-type" placeholder="e.g., Legal Agreement" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="document-description">Description</Label>
                    <Textarea
                      id="document-description"
                      placeholder="Describe the purpose and contents of this document..."
                      rows={3}
                    />
                  </div>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground mb-2">Drag and drop document here, or click to browse</p>
                    <Button variant="outline">Choose File</Button>
                  </div>
                  <div className="flex justify-end">
                    <Button>Upload Document</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Statistics</CardTitle>
                    <CardDescription>Overview of legal case performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Success Rate</span>
                        <span className="font-semibold text-accent">94.2%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Average Case Duration</span>
                        <span className="font-semibold">{lawFirmData.averageCaseTime} days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Cases This Month</span>
                        <span className="font-semibold">8</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Breakdown</CardTitle>
                    <CardDescription>Legal services revenue analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Property Disputes</span>
                        <span className="font-semibold">{formatCurrency(3400000)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Document Review</span>
                        <span className="font-semibold">{formatCurrency(2800000)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Legal Consultation</span>
                        <span className="font-semibold">{formatCurrency(2300000)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Generate Report</CardTitle>
                      <CardDescription>Create detailed reports for analysis</CardDescription>
                    </div>
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Export All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <Gavel className="h-6 w-6 mb-2" />
                      Case Summary Report
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <FileText className="h-6 w-6 mb-2" />
                      Document Review Report
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <DollarSign className="h-6 w-6 mb-2" />
                      Revenue Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Chatbot */}
        <AIChatbot userRole="law_firm" />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
