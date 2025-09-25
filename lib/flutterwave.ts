// Flutterwave payment integration utilities
export interface FlutterwaveConfig {
  public_key: string
  tx_ref: string
  amount: number
  currency: string
  payment_options: string
  customer: {
    email: string
    phone_number: string
    name: string
  }
  customizations: {
    title: string
    description: string
    logo: string
  }
  callback: (response: FlutterwaveResponse) => void
  onclose: () => void
}

export interface FlutterwaveResponse {
  status: "successful" | "cancelled" | "failed"
  transaction_id: string
  tx_ref: string
  flw_ref: string
  amount: number
  currency: string
  customer: {
    id: number
    email: string
    phone_number: string
    name: string
  }
}

export interface PaymentData {
  amount: number
  currency: string
  email: string
  phone: string
  name: string
  description: string
}

// Mock Flutterwave integration - in production, use actual Flutterwave SDK
export class FlutterwaveService {
  private static instance: FlutterwaveService
  private publicKey: string

  private constructor() {
    // In production, this would come from environment variables
    this.publicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "FLWPUBK_TEST-mock-key"
  }

  public static getInstance(): FlutterwaveService {
    if (!FlutterwaveService.instance) {
      FlutterwaveService.instance = new FlutterwaveService()
    }
    return FlutterwaveService.instance
  }

  public async initializePayment(paymentData: PaymentData): Promise<FlutterwaveResponse> {
    // Generate unique transaction reference
    const tx_ref = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    return new Promise((resolve, reject) => {
      // Simulate payment processing delay (2-4 seconds for realism)
      const processingTime = Math.random() * 2000 + 2000

      setTimeout(() => {
        // Mock different payment scenarios based on amount
        const amount = paymentData.amount
        let successRate = 0.9 // 90% default success rate

        // Lower success rate for very high amounts (simulate bank limits)
        if (amount > 1000000) successRate = 0.7
        // Higher success rate for smaller amounts
        if (amount < 50000) successRate = 0.95

        const isSuccessful = Math.random() < successRate

        if (isSuccessful) {
          const response: FlutterwaveResponse = {
            status: "successful",
            transaction_id: `TXN_${Date.now()}`,
            tx_ref,
            flw_ref: `FLW_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            amount: paymentData.amount,
            currency: paymentData.currency,
            customer: {
              id: Math.floor(Math.random() * 10000),
              email: paymentData.email,
              phone_number: paymentData.phone,
              name: paymentData.name,
            },
          }
          resolve(response)
        } else {
          const errorScenarios = [
            "Insufficient funds in account",
            "Transaction declined by bank",
            "Network timeout - please try again",
            "Card expired or invalid",
            "Daily transaction limit exceeded",
          ]

          const randomError = errorScenarios[Math.floor(Math.random() * errorScenarios.length)]

          const response: FlutterwaveResponse = {
            status: "failed",
            transaction_id: `TXN_${Date.now()}`,
            tx_ref,
            flw_ref: `FLW_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            amount: paymentData.amount,
            currency: paymentData.currency,
            customer: {
              id: Math.floor(Math.random() * 10000),
              email: paymentData.email,
              phone_number: paymentData.phone,
              name: paymentData.name,
            },
          }

          const error = new Error(randomError)
          Object.assign(error, response)
          reject(error)
        }
      }, processingTime)
    })
  }

  public async verifyPayment(transactionId: string): Promise<boolean> {
    // Mock payment verification - in production, this would call Flutterwave API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock verification (95% success rate)
        resolve(Math.random() > 0.05)
      }, 1000)
    })
  }

  public convertNairaToUSDC(nairaAmount: number): number {
    const baseRate = 1600 // Base rate: 1 USDC = 1600 NGN
    const fluctuation = (Math.random() - 0.5) * 20 // ±10 NGN fluctuation
    const currentRate = baseRate + fluctuation
    return nairaAmount / currentRate
  }

  public convertUSDCToNaira(usdcAmount: number): number {
    const baseRate = 1580 // Base rate with spread: 1 USDC = 1580 NGN
    const fluctuation = (Math.random() - 0.5) * 15 // ±7.5 NGN fluctuation
    const currentRate = baseRate + fluctuation
    return usdcAmount * currentRate
  }

  public calculateFees(amount: number, type: "deposit" | "withdrawal"): number {
    if (type === "deposit") {
      // Flutterwave fees for deposits (1.4% + NGN 100)
      return amount * 0.014 + 100
    } else {
      // Withdrawal fees (0.5% minimum 1 USDC equivalent)
      const feeAmount = amount * 0.005
      const minimumFee = this.convertNairaToUSDC(1600) // 1 USDC minimum
      return Math.max(feeAmount, minimumFee)
    }
  }
}

// Export singleton instance
export const flutterwaveService = FlutterwaveService.getInstance()
