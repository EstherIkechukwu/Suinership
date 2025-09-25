"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Accessibility,
  Eye,
  Type,
  Zap,
  Volume2,
  VolumeX,
  MousePointer,
  Keyboard,
  Settings,
  RotateCcw,
} from "lucide-react"
import {
  type AccessibilitySettings,
  defaultAccessibilitySettings,
  applyAccessibilitySettings,
  loadAccessibilitySettings,
} from "@/lib/accessibility"

interface EnhancedAccessibilitySettings extends AccessibilitySettings {
  fontSize: number
  voiceSpeed: number
  keyboardNavigation: boolean
  reducedMotion: boolean
  focusIndicators: boolean
  audioDescriptions: boolean
}

const defaultEnhancedSettings: EnhancedAccessibilitySettings = {
  ...defaultAccessibilitySettings,
  fontSize: 16,
  voiceSpeed: 1,
  keyboardNavigation: true,
  reducedMotion: false,
  focusIndicators: true,
  audioDescriptions: false,
}

interface EnhancedAccessibilityProps {
  className?: string
  showFullPanel?: boolean
}

export function EnhancedAccessibility({ className, showFullPanel = false }: EnhancedAccessibilityProps) {
  const [settings, setSettings] = useState<EnhancedAccessibilitySettings>(defaultEnhancedSettings)
  const [isOpen, setIsOpen] = useState(false)
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null)

  useEffect(() => {
    const loadedSettings = loadAccessibilitySettings()
    const enhancedSettings = { ...defaultEnhancedSettings, ...loadedSettings }
    setSettings(enhancedSettings)
    applyEnhancedAccessibilitySettings(enhancedSettings)

    // Initialize speech synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechSynthesis(window.speechSynthesis)
    }
  }, [])

  const applyEnhancedAccessibilitySettings = (newSettings: EnhancedAccessibilitySettings) => {
    const body = document.body
    const root = document.documentElement

    // Apply base accessibility settings
    applyAccessibilitySettings(newSettings)

    // Apply enhanced settings
    root.style.fontSize = `${newSettings.fontSize}px`

    if (newSettings.reducedMotion) {
      body.classList.add("reduce-motion")
    } else {
      body.classList.remove("reduce-motion")
    }

    if (newSettings.focusIndicators) {
      body.classList.add("enhanced-focus")
    } else {
      body.classList.remove("enhanced-focus")
    }

    if (newSettings.keyboardNavigation) {
      body.classList.add("keyboard-navigation")
    } else {
      body.classList.remove("keyboard-navigation")
    }

    // Store enhanced settings
    localStorage.setItem("enhanced-accessibility-settings", JSON.stringify(newSettings))
  }

  const updateSetting = <K extends keyof EnhancedAccessibilitySettings>(
    key: K,
    value: EnhancedAccessibilitySettings[K],
  ) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    applyEnhancedAccessibilitySettings(newSettings)
  }

  const speakText = (text: string) => {
    if (speechSynthesis && settings.audioDescriptions) {
      speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = settings.voiceSpeed
      speechSynthesis.speak(utterance)
    }
  }

  const resetSettings = () => {
    setSettings(defaultEnhancedSettings)
    applyEnhancedAccessibilitySettings(defaultEnhancedSettings)
    speakText("Accessibility settings have been reset to default")
  }

  if (showFullPanel) {
    return (
      <Card className={`w-full max-w-md ${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Accessibility className="h-5 w-5 mr-2" />
            Accessibility Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Visual Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Visual</h3>

            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                High Contrast
              </Label>
              <Switch
                id="high-contrast"
                checked={settings.highContrast}
                onCheckedChange={(checked) => updateSetting("highContrast", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="dyslexia-friendly" className="flex items-center">
                <Type className="h-4 w-4 mr-2" />
                Dyslexia Friendly
              </Label>
              <Switch
                id="dyslexia-friendly"
                checked={settings.dyslexiaFriendly}
                onCheckedChange={(checked) => updateSetting("dyslexiaFriendly", checked)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Font Size: {settings.fontSize}px</Label>
              <Slider
                value={[settings.fontSize]}
                onValueChange={([value]) => updateSetting("fontSize", value)}
                min={12}
                max={24}
                step={1}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion" className="flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Reduce Motion
              </Label>
              <Switch
                id="reduced-motion"
                checked={settings.reducedMotion}
                onCheckedChange={(checked) => updateSetting("reducedMotion", checked)}
              />
            </div>
          </div>

          {/* Navigation Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Navigation</h3>

            <div className="flex items-center justify-between">
              <Label htmlFor="keyboard-nav" className="flex items-center">
                <Keyboard className="h-4 w-4 mr-2" />
                Enhanced Keyboard Navigation
              </Label>
              <Switch
                id="keyboard-nav"
                checked={settings.keyboardNavigation}
                onCheckedChange={(checked) => updateSetting("keyboardNavigation", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="focus-indicators" className="flex items-center">
                <MousePointer className="h-4 w-4 mr-2" />
                Enhanced Focus Indicators
              </Label>
              <Switch
                id="focus-indicators"
                checked={settings.focusIndicators}
                onCheckedChange={(checked) => updateSetting("focusIndicators", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="simple-mode" className="flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Simple Mode
              </Label>
              <Switch
                id="simple-mode"
                checked={settings.simpleMode}
                onCheckedChange={(checked) => updateSetting("simpleMode", checked)}
              />
            </div>
          </div>

          {/* Audio Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Audio</h3>

            <div className="flex items-center justify-between">
              <Label htmlFor="audio-descriptions" className="flex items-center">
                {settings.audioDescriptions ? (
                  <Volume2 className="h-4 w-4 mr-2" />
                ) : (
                  <VolumeX className="h-4 w-4 mr-2" />
                )}
                Audio Descriptions
              </Label>
              <Switch
                id="audio-descriptions"
                checked={settings.audioDescriptions}
                onCheckedChange={(checked) => updateSetting("audioDescriptions", checked)}
              />
            </div>

            {settings.audioDescriptions && (
              <div className="space-y-2">
                <Label className="text-sm">Voice Speed: {settings.voiceSpeed}x</Label>
                <Slider
                  value={[settings.voiceSpeed]}
                  onValueChange={([value]) => updateSetting("voiceSpeed", value)}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
              </div>
            )}
          </div>

          <Button onClick={resetSettings} variant="outline" className="w-full bg-transparent">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Default
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={className}
          aria-label="Accessibility Options"
          onFocus={() => speakText("Accessibility options menu")}
        >
          <Accessibility className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuItem
          onClick={() => updateSetting("highContrast", !settings.highContrast)}
          className="flex items-center justify-between"
          onFocus={() => speakText("High contrast mode")}
        >
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-2" />
            High Contrast
          </div>
          {settings.highContrast && <div className="w-2 h-2 bg-primary rounded-full" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => updateSetting("dyslexiaFriendly", !settings.dyslexiaFriendly)}
          className="flex items-center justify-between"
          onFocus={() => speakText("Dyslexia friendly fonts")}
        >
          <div className="flex items-center">
            <Type className="h-4 w-4 mr-2" />
            Dyslexia Friendly
          </div>
          {settings.dyslexiaFriendly && <div className="w-2 h-2 bg-primary rounded-full" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => updateSetting("simpleMode", !settings.simpleMode)}
          className="flex items-center justify-between"
          onFocus={() => speakText("Simple mode for reduced cognitive load")}
        >
          <div className="flex items-center">
            <Zap className="h-4 w-4 mr-2" />
            Simple Mode
          </div>
          {settings.simpleMode && <div className="w-2 h-2 bg-primary rounded-full" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => updateSetting("audioDescriptions", !settings.audioDescriptions)}
          className="flex items-center justify-between"
          onFocus={() => speakText("Audio descriptions for screen readers")}
        >
          <div className="flex items-center">
            {settings.audioDescriptions ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
            Audio Descriptions
          </div>
          {settings.audioDescriptions && <div className="w-2 h-2 bg-primary rounded-full" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => setIsOpen(false)}>
          <Settings className="h-4 w-4 mr-2" />
          More Settings
        </DropdownMenuItem>

        <DropdownMenuItem onClick={resetSettings}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Default
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
