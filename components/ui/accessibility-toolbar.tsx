"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Accessibility, Eye, Type, Zap } from "lucide-react"
import {
  type AccessibilitySettings,
  defaultAccessibilitySettings,
  applyAccessibilitySettings,
  loadAccessibilitySettings,
} from "@/lib/accessibility"

interface AccessibilityToolbarProps {
  className?: string
}

export function AccessibilityToolbar({ className }: AccessibilityToolbarProps) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultAccessibilitySettings)

  useEffect(() => {
    const loadedSettings = loadAccessibilitySettings()
    setSettings(loadedSettings)
    applyAccessibilitySettings(loadedSettings)
  }, [])

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    const newSettings = { ...settings, [key]: !settings[key] }
    setSettings(newSettings)
    applyAccessibilitySettings(newSettings)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={className} aria-label="Accessibility Options">
          <Accessibility className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => toggleSetting("highContrast")} className="flex items-center justify-between">
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-2" />
            High Contrast
          </div>
          {settings.highContrast && <div className="w-2 h-2 bg-primary rounded-full" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => toggleSetting("dyslexiaFriendly")}
          className="flex items-center justify-between"
        >
          <div className="flex items-center">
            <Type className="h-4 w-4 mr-2" />
            Dyslexia Friendly
          </div>
          {settings.dyslexiaFriendly && <div className="w-2 h-2 bg-primary rounded-full" />}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => toggleSetting("simpleMode")} className="flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="h-4 w-4 mr-2" />
            Simple Mode
          </div>
          {settings.simpleMode && <div className="w-2 h-2 bg-primary rounded-full" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            const newSettings = defaultAccessibilitySettings
            setSettings(newSettings)
            applyAccessibilitySettings(newSettings)
          }}
        >
          Reset to Default
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
