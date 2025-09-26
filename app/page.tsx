"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LanguageSelector } from "@/components/ui/language-selector"
import { AccessibilityToolbar } from "@/components/ui/accessibility-toolbar"
import { StatusBadge } from "@/components/ui/status-badge"
import { AIChatbot } from "@/components/ui/ai-chatbot"
import { UserMenu } from "@/components/ui/user-menu"
import { useAuth } from "@/components/auth/auth-provider"
import { ArrowRight, Home, TrendingUp, Users, MapPin, DollarSign } from "lucide-react"
import { type Language, getTranslation } from "@/lib/i18n"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")
  const { user } = useAuth()

  const t = (key: string) => getTranslation(key, currentLanguage)

  const propertyShowcase = [
    {
      id: 1,
      title: "Luxury Apartment - Victoria Island",
      location: "Lagos, Nigeria",
      price: "₦50,000,000",
      suggestedUse: "Rental Income",
      fractionalAvailability: "75% Available",
      status: "verified" as const,
      image: "/luxury-apartment-lagos.jpg",
    },
    {
      id: 2,
      title: "Commercial Plaza - Abuja CBD",
      location: "Abuja, Nigeria",
      price: "₦120,000,000",
      suggestedUse: "Commercial Lease",
      fractionalAvailability: "40% Available",
      status: "verified" as const,
      image: "/commercial-plaza-abuja.jpg",
    },
    {
      id: 3,
      title: "Residential Estate - Lekki",
      location: "Lagos, Nigeria",
      price: "₦80,000,000",
      suggestedUse: "Capital Appreciation",
      fractionalAvailability: "90% Available",
      status: "pending" as const,
      image: "/residential-estate-lekki.jpg",
    },
  ]

  const howItWorksSteps = [
    {
      icon: Users,
      title: "Sign Up",
      description: "Create your account with Google zkLogin and get your Sui wallet automatically",
    },
    {
      icon: Home,
      title: "Browse & Invest",
      description: "Explore verified properties and purchase fractional ownership through NFTs",
    },
    {
      icon: TrendingUp,
      title: "Receive Ownership",
      description: "Get your fractional NFTs and start earning dividends from your investments",
    },
  ]

  return (
    <div className="min-h-screen bg-background">

      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className=" flex items-center justify-center">
                   <Image
                        src="/Suinership_logo_white.png"
                        alt="Suinership"
                        width={100}
                        height={100}
                    />
                </div>
                </div>
              <nav className="hidden md:flex items-center space-x-6 ml-115">
                <Link href="#validator" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.validator")}
                </Link>
                <Link href="#products" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.products")}
                </Link>
                <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.about")}
                </Link>
                <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.contact")}
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector onLanguageChange={setCurrentLanguage} />
              <AccessibilityToolbar />
              {user ? (
                <UserMenu />
              ) : (
                <Button variant="ghost" size="sm">
                  {t("auth.signin")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>


      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight text-balance text-left">
                  {t("landing.hero.title")}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                  {t("landing.hero.subtitle")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch text-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                  <Link href="/auth">
                    {t("landing.cta.invest")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button className="text-center" size="lg" variant="outline" asChild>
                  <Link href="/auth">{t("landing.cta.list")}</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8">
                <img
                  src="/modern-real-estate-dashboard.png"
                  alt="Suinership Dashboard Preview"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start your real estate investment journey in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Featured Properties</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover premium real estate opportunities across Nigeria
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propertyShowcase.map((property) => (
              <Card key={property.id} className="bg-card border-border hover:shadow-lg transition-all group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <StatusBadge status={property.status} />
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{property.title}</h3>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.location}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-foreground font-semibold">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {property.price}
                      </div>
                      <div className="text-sm text-accent font-medium">{property.fractionalAvailability}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Suggested Use:</span> {property.suggestedUse}
                    </div>
                    <Button className="w-full bg-transparent" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-primary">₦2.5B+</div>
              <div className="text-muted-foreground">Total Property Value</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-accent">1,200+</div>
              <div className="text-muted-foreground">Active Investors</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-warning">150+</div>
              <div className="text-muted-foreground">Properties Listed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-foreground">98%</div>
              <div className="text-muted-foreground">Verification Rate</div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Ready to Start Your Real Estate Journey?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of investors building wealth through fractional real estate ownership
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <Link href="/auth">
                  {t("landing.cta.invest")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth">{t("landing.cta.list")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      <AIChatbot userRole="buyer" language={currentLanguage} />


      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center">
                    <Image
                        src="/Suinership_logo_white.png"
                        alt="Suinership"
                        width={100}
                        height={100}
                        className="rounded-lg"
                    />
                </div>
              </div>
              <p className="text-muted-foreground">
                Democratizing real estate investment through blockchain technology
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Platform</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Marketplace
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Analytics
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Support</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Legal</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Compliance
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 Suinership. All rights reserved. Built on Sui blockchain.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
