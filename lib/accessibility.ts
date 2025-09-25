export type AccessibilityMode = "normal" | "high-contrast" | "dyslexia-friendly" | "simple-mode"

export interface AccessibilitySettings {
  highContrast: boolean
  dyslexiaFriendly: boolean
  simpleMode: boolean
  screenReader: boolean
}

export const defaultAccessibilitySettings: AccessibilitySettings = {
  highContrast: false,
  dyslexiaFriendly: false,
  simpleMode: false,
  screenReader: false,
}

export function applyAccessibilitySettings(settings: AccessibilitySettings) {
  const body = document.body

  // Remove existing accessibility classes
  body.classList.remove("high-contrast", "dyslexia-friendly", "simple-mode")

  // Apply new settings
  if (settings.highContrast) body.classList.add("high-contrast")
  if (settings.dyslexiaFriendly) body.classList.add("dyslexia-friendly")
  if (settings.simpleMode) body.classList.add("simple-mode")

  // Store in localStorage
  localStorage.setItem("accessibility-settings", JSON.stringify(settings))
}

export function loadAccessibilitySettings(): AccessibilitySettings {
  if (typeof window === "undefined") return defaultAccessibilitySettings

  try {
    const stored = localStorage.getItem("accessibility-settings")
    return stored ? JSON.parse(stored) : defaultAccessibilitySettings
  } catch {
    return defaultAccessibilitySettings
  }
}
