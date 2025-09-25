export const languages = {
  en: "English",
  yo: "Yoruba",
  ha: "Hausa",
  ig: "Igbo",
} as const

export type Language = keyof typeof languages

export const translations = {
  en: {
    "landing.hero.title": "The simplest way to invest in real estate in Nigeria",
    "landing.hero.subtitle": "Own fractions of premium properties through blockchain technology",
    "landing.cta.invest": "Start Investing",
    "landing.cta.list": "List a Property",
    "nav.validator": "Validator",
    "nav.products": "Products",
    "nav.about": "About",
    "nav.contact": "Contact Us",
    "auth.signin": "Sign In",
    "auth.signup": "Sign Up",
    "dashboard.holdings": "My Holdings",
    "dashboard.marketplace": "Marketplace",
    "dashboard.nextofkin": "Next of Kin",
    "property.verified": "Verified",
    "property.pending": "Pending",
    "property.unverified": "Unverified",
    "accessibility.highContrast": "High Contrast",
    "accessibility.dyslexiaFriendly": "Dyslexia Friendly",
    "accessibility.simpleMode": "Simple Mode",
  },
  yo: {
    "landing.hero.title": "Ọna ti o rọrun julọ lati nawo sinu ile ati ilẹ ni Nigeria",
    "landing.hero.subtitle": "Ni awọn apakan ti awọn ohun-ini pataki nipasẹ imọ-ẹrọ blockchain",
    "landing.cta.invest": "Bẹrẹ Idoko-owo",
    "landing.cta.list": "Ṣe atokọ Ohun-ini kan",
    // Add more Yoruba translations...
  },
  ha: {
    "landing.hero.title": "Hanya mafi sauƙi don saka hannun jari a gidaje a Najeriya",
    "landing.hero.subtitle": "Mallaki ɓangarorin manyan kaddarorin ta hanyar fasahar blockchain",
    "landing.cta.invest": "Fara Saka Hannun Jari",
    "landing.cta.list": "Jera Kaddarori",
    // Add more Hausa translations...
  },
  ig: {
    "landing.hero.title": "Ụzọ kachasị mfe itinye ego na ala na ụlọ na Nigeria",
    "landing.hero.subtitle": "Nwee akụkụ nke ihe onwunwe dị elu site na teknụzụ blockchain",
    "landing.cta.invest": "Malite Itinye Ego",
    "landing.cta.list": "Depụta Ihe Onwunwe",
    // Add more Igbo translations...
  },
}

export function getTranslation(key: string, language: Language = "en"): string {
  return (
    translations[language]?.[key as keyof (typeof translations)["en"]] ||
    translations.en[key as keyof (typeof translations)["en"]] ||
    key
  )
}

export function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return "en"

  const browserLang = navigator.language.split("-")[0]
  return (Object.keys(languages) as Language[]).includes(browserLang as Language) ? (browserLang as Language) : "en"
}
