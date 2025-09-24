import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Shield, Users, FileCheck, Wallet, Vote } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl sm:text-2xl font-heading font-bold text-foreground">Suinership</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/auth/signin">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-4 bg-transparent">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="text-xs sm:text-sm px-2 sm:px-4">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">Powered by Sui Blockchain</Badge>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-foreground mb-6 text-balance">
            Fractional Real Estate Ownership on Sui
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Invest in premium real estate with as little as ₦10,000. Own verified property fractions, participate in
            governance, and earn dividends through blockchain transparency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto">
                Start Investing
              </Button>
            </Link>
            <Link href="/auth/signup?role=seller">
              <Button
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-transparent w-full sm:w-auto"
              >
                List Property
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">How Fractional Ownership Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent, and secure property investment in three steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-heading">1. Browse Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Explore verified real estate listings with complete documentation, legal verification, and transparent
                  pricing in Nigerian Naira.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-xl font-heading">2. Buy Fractions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Purchase property fractions starting from ₦10,000. Receive NFT ownership certificates stored securely
                  on the Sui blockchain.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Vote className="h-8 w-8 text-warning" />
                </div>
                <CardTitle className="text-xl font-heading">3. Govern & Earn</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Participate in DAO governance, vote on property decisions, earn rental dividends, and trade your NFTs
                  in the marketplace.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">Why Choose Suinership?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Revolutionary features that make real estate investment accessible and transparent
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Shield className="h-12 w-12 text-secondary mb-4" />
                <CardTitle className="text-xl font-heading">Blockchain Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  All transactions, ownership records, and governance decisions are immutably recorded on the Sui
                  blockchain for complete transparency.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Building2 className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl font-heading">Naira Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Invest using Nigerian Naira with seamless payment integration. No need for complex cryptocurrency
                  conversions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Users className="h-12 w-12 text-warning mb-4" />
                <CardTitle className="text-xl font-heading">DAO Governance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Vote on property management decisions with voting power proportional to your ownership stake. True
                  democratic property management.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <FileCheck className="h-12 w-12 text-secondary mb-4" />
                <CardTitle className="text-xl font-heading">Legal Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Every property is verified by licensed law firms with complete documentation stored securely using
                  Walrus decentralized storage.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Wallet className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl font-heading">NFT Ownership</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Receive tradeable NFT certificates representing your property ownership. Buy, sell, and transfer
                  ownership seamlessly.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Vote className="h-12 w-12 text-warning mb-4" />
                <CardTitle className="text-xl font-heading">Dividend Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Earn passive income through rental dividends distributed automatically based on your ownership
                  percentage.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">Platform Participants</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Different roles working together to create a transparent real estate ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-primary">Buyers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Invest in fractional property ownership, participate in governance, and earn dividends from rental
                  income.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-secondary">Sellers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  List properties for fractional sale, maintain ownership records, and receive proceeds from successful
                  sales.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-warning">Law Firms</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Verify property documentation, ensure legal compliance, and approve listings for the platform.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-primary">Custodians</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Manage property lifecycle, create governance polls, and execute community decisions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-destructive">Admins</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Oversee platform operations, manage user roles, and resolve disputes between participants.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-6">
            Ready to Start Your Real Estate Journey?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of investors already building wealth through fractional real estate ownership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto">
                Create Account
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-transparent w-full sm:w-auto"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-6 w-6 text-primary" />
                <span className="text-lg font-heading font-bold">Suinership</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Democratizing real estate investment through blockchain technology.
              </p>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/properties" className="hover:text-primary">
                    Browse Properties
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="hover:text-primary">
                    NFT Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/governance" className="hover:text-primary">
                    Governance
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="hover:text-primary">
                    Legal
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Suinership. All rights reserved. Built on Sui blockchain.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
