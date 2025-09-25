"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Mic, MicOff } from "lucide-react"
import { type Language, getTranslation } from "@/lib/i18n"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface AIChatbotProps {
  userRole?: "buyer" | "seller" | "admin" | "law-firm" | "custodian"
  language?: Language
  className?: string
}

export function AIChatbot({ userRole = "buyer", language = "en", className }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const t = (key: string) => getTranslation(key, language)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initialize with welcome message based on user role
    const welcomeMessages = {
      buyer:
        "Hello! I'm your AI advisor. I can help you understand investment opportunities, compare properties, and guide you through the buying process. What would you like to know?",
      seller:
        "Welcome! I'm here to help you list your property, understand the verification process, and optimize your listing. How can I assist you today?",
      admin:
        "Hi! I can help you with platform oversight, compliance questions, and administrative tasks. What do you need help with?",
      "law-firm":
        "Hello! I'm here to guide you through the verification process and help with legal compliance. How can I assist you?",
      custodian:
        "Welcome! I can help you with property management, analytics, and custodial responsibilities. What would you like to know?",
    }

    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          content: welcomeMessages[userRole],
          isUser: false,
          timestamp: new Date(),
        },
      ])
    }
  }, [userRole, messages.length])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate AI response (in real implementation, this would call an AI service)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue, userRole, language),
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const generateAIResponse = (input: string, role: string, lang: Language): string => {
    const lowerInput = input.toLowerCase()

    // Role-specific knowledge base
    const knowledgeBase = {
      buyer: {
        en: {
          investment:
            "For real estate investment in Nigeria, I recommend focusing on properties with verified documentation, strong rental yields (15-25% annually), and locations with good infrastructure. Lagos (Victoria Island, Lekki) and Abuja (CBD, Maitama) offer the best opportunities. Would you like specific property recommendations?",
          process:
            "The buying process involves: 1) KYC verification (2-3 days), 2) Property selection and due diligence, 3) Fractional purchase (minimum ₦50,000), 4) Legal documentation, 5) Ownership transfer. I can guide you through each step.",
          roi: "Average ROI in Nigerian fractional real estate ranges from 15-25% annually. Commercial properties in Lagos CBD typically yield 20-25%, while residential properties in Lekki average 15-20%. Factors affecting ROI include location, property type, and market conditions.",
          risks:
            "Key risks include: market volatility, regulatory changes, property devaluation, and liquidity constraints. Mitigation strategies: diversify across locations and property types, verify all documentation, and maintain emergency funds.",
          documents:
            "Required documents for buyers: Valid ID, proof of address, bank statements, and source of funds declaration. For properties above ₦1M, additional KYC documentation is required.",
        },
        yo: {
          investment:
            "Fun idoko-owo ile ati ilẹ ni Nigeria, Mo ṣeduro pe ki o dojukọ awọn ohun-ini ti o ni iwe idaniloju, awọn ere iyalo ti o lagbara (15-25% lọdun), ati awọn aaye ti o ni amayederun to dara. Lagos ati Abuja ni awọn aye ti o dara julọ.",
          process:
            "Ilana rira naa ni: 1) Idaniloju KYC, 2) Yiyan ohun-ini ati iwadii, 3) Rira apakan, 4) Iwe ofin, 5) Gbigbe nini. Mo le ṣe itọsọna fun ọ.",
        },
      },
      seller: {
        en: {
          listing:
            "To list your property successfully: 1) Complete KYC verification, 2) Upload property documents (Title Deed, Survey Plan, Building Approval), 3) Property valuation by certified valuers, 4) Set competitive pricing, 5) Professional photography. The process takes 5-7 business days.",
          documents:
            "Required documents: Original Title Deed, Survey Plan, Building Approval, Certificate of Occupancy (if available), Property Tax receipts, and Insurance policy. All documents must be verified by our legal partners.",
          pricing:
            "Pricing strategy: Research comparable properties, consider location premium, factor in property condition, and set competitive fraction prices. Our analytics show properties priced 5-10% below market rate sell 40% faster.",
          marketing:
            "Effective marketing includes: high-quality photos, detailed property descriptions, highlighting unique features, showcasing neighborhood amenities, and providing ROI projections. Professional staging can increase sale speed by 25%.",
          legal:
            "Legal requirements: Property must have clear title, no encumbrances, compliance with building codes, and proper documentation. Our legal partners verify all documents before listing approval.",
        },
      },
      admin: {
        en: {
          verification:
            "Verification process involves: Document authenticity checks, property title verification, KYC compliance, legal review, and final approval. Average processing time is 5-7 business days. Priority cases can be expedited.",
          compliance:
            "Platform compliance includes: SEC registration, CBN guidelines adherence, AML/KYC procedures, data protection (NDPR), and regular audits. We maintain 99.8% compliance rate.",
          analytics:
            "Key metrics to monitor: User acquisition rate, transaction volume, verification success rate, platform uptime, security incidents, and customer satisfaction. Monthly reports available in the analytics dashboard.",
          security:
            "Security measures: Multi-factor authentication, encrypted data storage, regular security audits, blockchain transaction records, and 24/7 monitoring. We maintain 99.9% uptime.",
        },
      },
      "law-firm": {
        en: {
          verification:
            "Legal verification process: Title deed authentication, encumbrance checks, survey plan validation, building approval verification, and compliance assessment. Each property undergoes thorough legal due diligence.",
          disputes:
            "Common property disputes: Ownership conflicts, boundary disputes, inheritance claims, and contract disagreements. Resolution involves mediation, arbitration, or court proceedings as necessary.",
          compliance:
            "Legal compliance requirements: Land Use Act adherence, property registration, tax obligations, environmental clearances, and regulatory approvals. We ensure full compliance before listing approval.",
          documentation:
            "Standard legal documents: Fractional Ownership Agreement, Property Transfer Deed, Next-of-Kin Declaration, Power of Attorney, and Dispute Resolution Agreement. All templates are regularly updated.",
        },
      },
      custodian: {
        en: {
          custody:
            "Custodial services include: Secure document storage, property monitoring, insurance management, maintenance coordination, and compliance reporting. We maintain 99.8% security score.",
          security:
            "Security protocols: Multi-signature wallets, encrypted storage, regular audits, insurance coverage, and 24/7 monitoring. All assets are fully insured and protected.",
          reporting:
            "Regular reports include: Asset valuation updates, maintenance schedules, insurance renewals, compliance status, and performance metrics. Monthly and quarterly reports available.",
          compliance:
            "Regulatory compliance: SEC registration, CBN guidelines, insurance requirements, audit schedules, and reporting obligations. We maintain 100% compliance rate.",
        },
      },
    }

    // Enhanced response matching
    const roleKnowledge = knowledgeBase[role as keyof typeof knowledgeBase]
    if (!roleKnowledge) return "I'm here to help! Could you please rephrase your question?"

    const langKnowledge = roleKnowledge[lang] || roleKnowledge.en
    if (!langKnowledge) return "I'm here to help! Could you please rephrase your question?"

    // Smart keyword matching
    for (const [topic, response] of Object.entries(langKnowledge)) {
      const keywords = {
        investment: ["invest", "investment", "buy", "purchase", "property", "real estate", "roi", "return"],
        process: ["process", "how to", "steps", "procedure", "guide", "help"],
        roi: ["roi", "return", "profit", "yield", "income", "dividend"],
        risks: ["risk", "danger", "safe", "security", "protect", "loss"],
        documents: ["document", "paper", "requirement", "need", "kyc", "verification"],
        listing: ["list", "sell", "upload", "submit", "property"],
        pricing: ["price", "cost", "value", "worth", "market"],
        marketing: ["market", "promote", "advertise", "sell faster"],
        legal: ["legal", "law", "lawyer", "court", "dispute"],
        verification: ["verify", "check", "approve", "review", "validate"],
        compliance: ["comply", "regulation", "rule", "law", "requirement"],
        analytics: ["analytic", "data", "metric", "report", "statistic"],
        security: ["secure", "safe", "protect", "hack", "breach"],
        custody: ["custody", "custodian", "store", "keep", "manage"],
        reporting: ["report", "update", "status", "information"],
        disputes: ["dispute", "conflict", "problem", "issue", "disagreement"],
      }

      const topicKeywords = keywords[topic as keyof typeof keywords] || []
      if (topicKeywords.some((keyword) => lowerInput.includes(keyword))) {
        return response
      }
    }

    // Default responses by role
    const defaultResponses = {
      buyer: {
        en: "I can help you with property investment, the buying process, ROI analysis, risk assessment, and documentation requirements. What specific aspect would you like to know more about?",
        yo: "Mo le ran ọ lọwọ pẹlu idoko-owo ohun-ini, ilana rira, itupalẹ ROI, ayẹwo ewu, ati awọn ibeere iwe. Iru wo ni o fẹ mọ si?",
      },
      seller: {
        en: "I can assist with property listing, document requirements, pricing strategies, marketing tips, and legal compliance. What would you like help with?",
        yo: "Mo le ṣe iranlọwọ pẹlu atokọ ohun-ini, awọn ibeere iwe, awọn ilana idiyele, awọn imọran titaja, ati ibamu ofin. Kini o fẹ ki n ran ọ lọwọ?",
      },
      admin: {
        en: "I can help with verification processes, compliance monitoring, platform analytics, security protocols, and administrative tasks. What do you need assistance with?",
        yo: "Mo le ṣe iranlọwọ pẹlu awọn ilana idaniloju, ibojuwo ibamu, awọn itupalẹ eto, awọn ilana aabo, ati awọn iṣẹ iṣakoso. Kini o nilo iranlọwọ?",
      },
      "law-firm": {
        en: "I can assist with legal verification, dispute resolution, compliance requirements, and documentation. What legal matter can I help you with?",
        yo: "Mo le ṣe iranlọwọ pẹlu idaniloju ofin, ipinnu ariyanjiyan, awọn ibeere ibamu, ati iwe. Ọrọ ofin wo ni mo le ran ọ lọwọ?",
      },
      custodian: {
        en: "I can help with custodial services, security protocols, asset reporting, and compliance matters. What aspect of custody would you like to discuss?",
        yo: "Mo le ṣe iranlọwọ pẹlu awọn iṣẹ itọju, awọn ilana aabo, ijabọ ohun-ini, ati awọn ọrọ ibamu. Iru itọju wo ni o fẹ jiroro?",
      },
    }

    const roleDefaults = defaultResponses[role as keyof typeof defaultResponses]
    return roleDefaults?.[lang] || roleDefaults?.en || "I'm here to help! How can I assist you today?"
  }

  const toggleVoiceInput = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      setIsListening(!isListening)
      // Voice recognition implementation would go here
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg z-50 ${className}`}
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className={`fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">AI Assistant</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button variant="ghost" size="sm" onClick={toggleVoiceInput} className={isListening ? "text-primary" : ""}>
            {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </Button>
          <Button onClick={handleSendMessage} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
