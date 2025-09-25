import type React from "react"
import type { Metadata } from "next"
import { Sora } from "next/font/google"
import { Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/components/auth/auth-provider"
import { SkipLinks } from "@/components/ui/skip-links"
import "./globals.css"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Suinership - Fractional Real Estate Investment",
  description: "The simplest way to invest in real estate in Nigeria through blockchain technology",
  generator: "Suinership",
  keywords: ["real estate", "blockchain", "investment", "Nigeria", "fractional ownership"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${sora.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <SkipLinks />
        <AuthProvider>
          <Suspense fallback={null}>
            <div id="main-content">{children}</div>
          </Suspense>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
