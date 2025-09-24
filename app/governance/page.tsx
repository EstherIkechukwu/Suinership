"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Users, Vote, TrendingUp, AlertCircle, CheckCircle, XCircle, Plus } from "lucide-react"

export default function GovernancePage() {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null)
  const [newProposal, setNewProposal] = useState({
    title: "",
    description: "",
    type: "",
    votingPeriod: "7",
    options: ["Yes", "No"],
  })

  const activeProposals = [
    {
      id: "1",
      title: "Increase Platform Fee to 2.5%",
      description:
        "Proposal to increase the platform transaction fee from 2% to 2.5% to fund additional security audits and platform improvements.",
      type: "Fee Change",
      status: "active",
      votingPower: 15420,
      totalVotes: 8934,
      yesVotes: 6234,
      noVotes: 2700,
      endDate: "2024-01-15",
      timeLeft: "3 days",
      quorum: 10000,
      consensusType: "Simple Majority",
      proposer: "Admin Council",
    },
    {
      id: "2",
      title: "Add New Property Category: Commercial Warehouses",
      description:
        "Expand platform to include commercial warehouse properties for fractional ownership, including new verification requirements.",
      type: "Platform Feature",
      status: "active",
      votingPower: 12800,
      totalVotes: 5420,
      yesVotes: 4100,
      noVotes: 1320,
      endDate: "2024-01-18",
      timeLeft: "6 days",
      quorum: 8000,
      consensusType: "Weighted Consensus",
      proposer: "Community",
    },
    {
      id: "3",
      title: "Partnership with Regional Bank for Custody Services",
      description:
        "Establish partnership with First National Bank to provide additional custody services for high-value properties.",
      type: "Partnership",
      status: "active",
      votingPower: 18900,
      totalVotes: 12450,
      yesVotes: 8900,
      noVotes: 3550,
      endDate: "2024-01-20",
      timeLeft: "8 days",
      quorum: 12000,
      consensusType: "Supermajority (66%)",
      proposer: "Custodian Council",
    },
  ]

  const completedProposals = [
    {
      id: "4",
      title: "Implement Multi-Signature Wallet Requirements",
      description: "Require multi-signature wallets for all transactions above $50,000.",
      type: "Security",
      status: "passed",
      finalVotes: { yes: 15420, no: 3200 },
      executionDate: "2024-01-05",
      consensusType: "Simple Majority",
    },
    {
      id: "5",
      title: "Reduce Minimum Investment to $500",
      description: "Lower the minimum investment threshold from $1,000 to $500 to increase accessibility.",
      type: "Platform Policy",
      status: "rejected",
      finalVotes: { yes: 6800, no: 11200 },
      executionDate: "2024-01-02",
      consensusType: "Simple Majority",
    },
  ]

  const userVotingPower = 1250 // Based on NFT ownership

  const handleVote = (proposalId: string, vote: string) => {
    console.log(`Voting ${vote} on proposal ${proposalId} with power ${userVotingPower}`)
    // Implement voting logic
  }

  const handleCreateProposal = () => {
    console.log("Creating proposal:", newProposal)
    // Implement proposal creation logic
  }

  return (
    <DashboardLayout userRole="buyer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white font-sora">Governance</h1>
            <p className="text-slate-400 mt-2">Participate in platform governance and shape the future of Suinership</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-sui-blue hover:bg-sui-blue/90">
                <Plus className="w-4 h-4 mr-2" />
                Create Proposal
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white font-sora">Create New Proposal</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Submit a new governance proposal for community voting
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-white">
                    Proposal Title
                  </Label>
                  <Input
                    id="title"
                    value={newProposal.title}
                    onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                    className="bg-slate-800 border-slate-600 text-white"
                    placeholder="Enter proposal title"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-white">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newProposal.description}
                    onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
                    className="bg-slate-800 border-slate-600 text-white min-h-[100px]"
                    placeholder="Provide detailed description of the proposal"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type" className="text-white">
                      Proposal Type
                    </Label>
                    <Select
                      value={newProposal.type}
                      onValueChange={(value) => setNewProposal({ ...newProposal, type: value })}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="fee-change">Fee Change</SelectItem>
                        <SelectItem value="platform-feature">Platform Feature</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="policy">Platform Policy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="voting-period" className="text-white">
                      Voting Period (days)
                    </Label>
                    <Select
                      value={newProposal.votingPeriod}
                      onValueChange={(value) => setNewProposal({ ...newProposal, votingPeriod: value })}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleCreateProposal} className="w-full bg-sui-blue hover:bg-sui-blue/90">
                  Submit Proposal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Voting Power Card */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white font-sora">Your Voting Power</h3>
                <p className="text-slate-400">Based on your NFT ownership and platform participation</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-sui-blue font-sora">{userVotingPower.toLocaleString()}</div>
                <div className="text-sm text-slate-400">Voting Power</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Governance Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="active" className="data-[state=active]:bg-sui-blue data-[state=active]:text-white">
              Active Proposals ({activeProposals.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-sui-blue data-[state=active]:text-white">
              Completed ({completedProposals.length})
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-sui-blue data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeProposals.map((proposal) => (
              <Card key={proposal.id} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-white font-sora">{proposal.title}</CardTitle>
                        <Badge variant="outline" className="border-sui-blue text-sui-blue">
                          {proposal.type}
                        </Badge>
                      </div>
                      <CardDescription className="text-slate-400">{proposal.description}</CardDescription>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Proposed by {proposal.proposer}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {proposal.timeLeft} remaining
                        </div>
                        <div className="flex items-center gap-1">
                          <Vote className="w-4 h-4" />
                          {proposal.consensusType}
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Voting Progress */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Voting Progress</span>
                      <span className="text-white">
                        {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()} (Quorum)
                      </span>
                    </div>
                    <Progress value={(proposal.totalVotes / proposal.quorum) * 100} className="h-2 bg-slate-700" />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">Yes Votes</span>
                          <span className="text-white">{proposal.yesVotes.toLocaleString()}</span>
                        </div>
                        <Progress
                          value={(proposal.yesVotes / proposal.totalVotes) * 100}
                          className="h-1 bg-slate-700"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-red-400">No Votes</span>
                          <span className="text-white">{proposal.noVotes.toLocaleString()}</span>
                        </div>
                        <Progress value={(proposal.noVotes / proposal.totalVotes) * 100} className="h-1 bg-slate-700" />
                      </div>
                    </div>
                  </div>

                  {/* Voting Actions */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={() => handleVote(proposal.id, "yes")}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Vote Yes
                    </Button>
                    <Button
                      onClick={() => handleVote(proposal.id, "no")}
                      variant="outline"
                      className="flex-1 border-red-500 text-red-400 hover:bg-red-500/10"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Vote No
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedProposals.map((proposal) => (
              <Card key={proposal.id} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-white font-sora">{proposal.title}</CardTitle>
                        <Badge variant="outline" className="border-slate-500 text-slate-400">
                          {proposal.type}
                        </Badge>
                      </div>
                      <CardDescription className="text-slate-400">{proposal.description}</CardDescription>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Executed on {proposal.executionDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Vote className="w-4 h-4" />
                          {proposal.consensusType}
                        </div>
                      </div>
                    </div>
                    <Badge
                      className={
                        proposal.status === "passed"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }
                    >
                      {proposal.status === "passed" ? "Passed" : "Rejected"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-400">Yes Votes</span>
                        <span className="text-white">{proposal.finalVotes.yes.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-red-400">No Votes</span>
                        <span className="text-white">{proposal.finalVotes.no.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white font-sora text-lg">Total Proposals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-sui-blue font-sora">24</div>
                  <p className="text-sm text-slate-400">All time</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white font-sora text-lg">Participation Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400 font-sora">78%</div>
                  <p className="text-sm text-slate-400">Average voter turnout</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white font-sora text-lg">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400 font-sora">65%</div>
                  <p className="text-sm text-slate-400">Proposals passed</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white font-sora">Governance Activity</CardTitle>
                <CardDescription className="text-slate-400">Recent governance participation trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="text-white font-medium">Voter Participation</div>
                        <div className="text-sm text-slate-400">Up 12% this month</div>
                      </div>
                    </div>
                    <div className="text-green-400 font-semibold">+12%</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                      <div>
                        <div className="text-white font-medium">Proposal Quality</div>
                        <div className="text-sm text-slate-400">More detailed proposals needed</div>
                      </div>
                    </div>
                    <div className="text-yellow-400 font-semibold">Review</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-sui-blue" />
                      <div>
                        <div className="text-white font-medium">Execution Rate</div>
                        <div className="text-sm text-slate-400">All passed proposals executed</div>
                      </div>
                    </div>
                    <div className="text-sui-blue font-semibold">100%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
