"use client"

import Link from "next/link"

export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <Link
        href="#main-content"
        className="skip-link absolute top-0 left-0 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 transform -translate-y-full focus:translate-y-0 transition-transform"
      >
        Skip to main content
      </Link>
      <Link
        href="#navigation"
        className="skip-link absolute top-0 left-20 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 transform -translate-y-full focus:translate-y-0 transition-transform"
      >
        Skip to navigation
      </Link>
    </div>
  )
}
