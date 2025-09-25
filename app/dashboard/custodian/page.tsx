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
import { Progress } from "@/components/ui/progress"
import {
  Vault,
  Shield,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Eye,
  Download,
  Upload,
  FileText,
  Lock,
  Key,
  CheckCircle,
  Clock,
} from "lucide-react"

export default function CustodianDashboard() {
  const [activeTab, setActiveTab] = useState("assets")

  // Mock data - in production this would come from API
  const custodianData = {
    totalAssetsUnderCustody: 15600000000,
    numberOfProperties: 234,
    activeClients: 1847,
    monthlyFees: 12500000,
    securityScore: 99.8,
    complianceRate: 100,
  }

  const custodyAssets = [
    {
      id: 1,
      propertyTitle: "Luxury Apartment Complex - Victoria Island",
      owner: "John Adebayo",
      totalValue: 180000000,
      fractionsHeld: 85,
      totalFractions: 100,
      custodyStartDate: "2024-08-15",
      status: "active" as const,
      lastAudit: "2024-11-01",
      documents: ["Title Deed", "Insurance Policy", "Valuation Report"],
    },
    {
      id: 2,
      propertyTitle: "Commercial Plaza - Abuja CBD",
      owner: "Michael Okafor",
      totalValue: 350000000,
      fractionsHeld: 67,
      totalFractions: 100,
      custodyStartDate: "2024-09-22",
      status: "active" as const,
      lastAudit: "2024-10-28",
      documents: ["Certificate of Occupancy", "Building Plan", "Insurance Policy"],
    },
    {
      id: 3,
      propertyTitle: "Residential Estate - Lekki",
      owner: "Sarah Johnson",
      totalValue: 120000000,
      fractionsHeld: 23,
      totalFractions: 100,
      custodyStartDate: "2024-11-10",
      status: "pending_audit" as const,
      lastAudit: "2024-10-15",
      documents: ["Survey Plan", "Building Approval"],
    },
  ]

  const securityAudits = [
    {
      id: 1,
      auditType: "Security Assessment",
      propertyTitle: "Luxury Apartment Complex - Victoria Island",
      auditDate: "2024-11-01",
      auditor: "SecureAudit Nigeria Ltd",
      status: "completed" as const,
      score: 98.5,
      findings: "Minor recommendations for access control improvements",
    },
    {
      id: 2,
      auditType: "Compliance Review",
      propertyTitle: "Commercial Plaza - Abuja CBD",
      auditDate: "2024-10-28",
      auditor: "Compliance Partners Ltd",
      status: "completed" as const,
      score: 100,
      findings: "Full compliance with all regulatory requirements",
    },
    {
      id: 3,
      auditType: "Asset Verification",
      propertyTitle: "Residential Estate - Lekki",
      auditDate: "2024-11-15",
      auditor: "Asset Verify Solutions",
      status: "in_progress" as const,
      score: null,
      findings: "Audit currently in progress",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getAuditStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-accent text-accent-foreground"
      case "in_progress":
        return "bg-warning text-warning-foreground"
      case "pending":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <ProtectedRoute allowedRoles={["custodian"]}>
      <DashboardLayout userRole="custodian">
        <div className="space-y-8">
          {/* Custodian Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assets Under Custody</CardTitle>
                <Vault className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(custodianData.totalAssetsUnderCustody)}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-accent flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +8.2% this month
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Properties</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{custodianData.numberOfProperties}</div>
                <p className="text-xs text-muted-foreground">Across {custodianData.activeClients} clients</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Fees</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(custodianData.monthlyFees)}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-accent">+5.3% from last month</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                <Shield className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">{custodianData.securityScore}%</div>
                <p className="text-xs text-muted-foreground">Excellent security rating</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="assets">Custody Assets</TabsTrigger>
              <TabsTrigger value="security">Security & Audits</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            {/* Custody Assets Tab */}
            <TabsContent value="assets" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assets Under Custody</CardTitle>
                  <CardDescription>Manage and monitor all properties under custodial care</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {custodyAssets.map((asset) => (
                      <div key={asset.id} className="border border-border rounded-lg p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold text-foreground">{asset.propertyTitle}</h3>
                              <StatusBadge status={asset.status} />
                            </div>
                            <p className="text-sm text-muted-foreground">Owner: {asset.owner}</p>
                            <p className="text-sm text-muted-foreground">
                              Custody since: {new Date(asset.custodyStartDate).toLocaleDateString()}
                            </p>
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
                            <p className="text-muted-foreground">Total Value</p>
                            <p className="font-semibold">{formatCurrency(asset.totalValue)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Fractions in Custody</p>
                            <p className="font-semibold">
                              {asset.fractionsHeld}/{asset.totalFractions}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Custody Percentage</p>
                            <p className="font-semibold">
                              {Math.round((asset.fractionsHeld / asset.totalFractions) * 100)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Last Audit</p>
                            <p className="font-semibold">{new Date(asset.lastAudit).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Custody Progress</span>
                            <span className="font-medium">
                              {Math.round((asset.fractionsHeld / asset.totalFractions) * 100)}%
                            </span>
                          </div>
                          <Progress value={(asset.fractionsHeld / asset.totalFractions) * 100} className="h-2" />
                        </div>

                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Documents:</span>
                            <div className="flex space-x-1">
                              {asset.documents.map((doc, index) => (
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

            {/* Security & Audits Tab */}
            <TabsContent value="security" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Status</CardTitle>
                    <CardDescription>Overall security metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mx-auto mb-4">
                        <Shield className="h-8 w-8 text-accent" />
                      </div>
                      <div className="text-3xl font-bold text-accent">{custodianData.securityScore}%</div>
                      <p className="text-sm text-muted-foreground">Security Score</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Access Control</CardTitle>
                    <CardDescription>Authentication systems</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Key className="h-4 w-4 text-accent" />
                          <span className="text-sm">Multi-Factor Auth</span>
                        </div>
                        <CheckCircle className="h-4 w-4 text-accent" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Lock className="h-4 w-4 text-accent" />
                          <span className="text-sm">Encrypted Storage</span>
                        </div>
                        <CheckCircle className="h-4 w-4 text-accent" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-accent" />
                          <span className="text-sm">Backup Systems</span>
                        </div>
                        <CheckCircle className="h-4 w-4 text-accent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Rate</CardTitle>
                    <CardDescription>Regulatory compliance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-accent" />
                      </div>
                      <div className="text-3xl font-bold text-accent">{custodianData.complianceRate}%</div>
                      <p className="text-sm text-muted-foreground">Compliance Rate</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Security Audits</CardTitle>
                  <CardDescription>Recent security assessments and compliance reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityAudits.map((audit) => (
                      <div
                        key={audit.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-foreground">{audit.auditType}</h3>
                            <Badge className={getAuditStatusColor(audit.status)}>
                              {audit.status.replace("_", " ").charAt(0).toUpperCase() +
                                audit.status.replace("_", " ").slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{audit.propertyTitle}</p>
                          <p className="text-xs text-muted-foreground">
                            Audited by {audit.auditor} on {new Date(audit.auditDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-muted-foreground">{audit.findings}</p>
                        </div>
                        <div className="text-right">
                          {audit.score && <div className="text-2xl font-bold text-accent mb-1">{audit.score}%</div>}
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View Report
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
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
                    <CardTitle>Regulatory Requirements</CardTitle>
                    <CardDescription>Compliance with Nigerian financial regulations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          <span className="text-sm">SEC Registration</span>
                        </div>
                        <Badge className="bg-accent text-accent-foreground">Compliant</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          <span className="text-sm">CBN Guidelines</span>
                        </div>
                        <Badge className="bg-accent text-accent-foreground">Compliant</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          <span className="text-sm">Anti-Money Laundering</span>
                        </div>
                        <Badge className="bg-accent text-accent-foreground">Compliant</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-warning" />
                          <span className="text-sm">Annual Audit Due</span>
                        </div>
                        <Badge className="bg-warning text-warning-foreground">Due Soon</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Risk Assessment</CardTitle>
                    <CardDescription>Current risk levels and mitigation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Operational Risk</span>
                        <Badge className="bg-accent text-accent-foreground">Low</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Market Risk</span>
                        <Badge className="bg-warning text-warning-foreground">Medium</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Credit Risk</span>
                        <Badge className="bg-accent text-accent-foreground">Low</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Liquidity Risk</span>
                        <Badge className="bg-accent text-accent-foreground">Low</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Documentation</CardTitle>
                  <CardDescription>Upload and manage compliance documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">Upload compliance documents</p>
                      <Button variant="outline">Choose Files</Button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">SEC Certificate</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Audit Report</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Insurance Policy</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Custody Performance</CardTitle>
                    <CardDescription>Asset custody metrics and performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Assets Under Management</span>
                        <span className="font-semibold">{formatCurrency(custodianData.totalAssetsUnderCustody)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Client Satisfaction</span>
                        <span className="font-semibold text-accent">98.7%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Service Uptime</span>
                        <span className="font-semibold text-accent">99.9%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Analysis</CardTitle>
                    <CardDescription>Custodial fee revenue breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Custody Fees</span>
                        <span className="font-semibold">{formatCurrency(8500000)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Transaction Fees</span>
                        <span className="font-semibold">{formatCurrency(2800000)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Advisory Fees</span>
                        <span className="font-semibold">{formatCurrency(1200000)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Generate Reports</CardTitle>
                      <CardDescription>Create detailed custody and compliance reports</CardDescription>
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
                      <Vault className="h-6 w-6 mb-2" />
                      Custody Report
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <Shield className="h-6 w-6 mb-2" />
                      Security Report
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <TrendingUp className="h-6 w-6 mb-2" />
                      Performance Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Chatbot */}
        <AIChatbot userRole="custodian" />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
