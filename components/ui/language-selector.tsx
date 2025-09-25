"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { languages, type Language, detectBrowserLanguage } from "@/lib/i18n"

interface LanguageSelectorProps {
  onLanguageChange?: (language: Language) => void
  className?: string
}

export function LanguageSelector({ onLanguageChange, className }: LanguageSelectorProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")

  useEffect(() => {
    // Load saved language or detect browser language
    const savedLanguage = localStorage.getItem("preferred-language") as Language
    const detectedLanguage = detectBrowserLanguage()
    const initialLanguage = savedLanguage || detectedLanguage

    setCurrentLanguage(initialLanguage)
    onLanguageChange?.(initialLanguage)
  }, [onLanguageChange])

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem("preferred-language", language)
    onLanguageChange?.(language)

    // Update HTML lang attribute
    document.documentElement.lang = language
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={className}>
          <Globe className="h-4 w-4 mr-2" />
          {languages[currentLanguage]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code as Language)}
            className={currentLanguage === code ? "bg-accent" : ""}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
