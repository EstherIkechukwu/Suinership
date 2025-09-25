export type UserRole = "buyer" | "seller" | "admin" | "law-firm" | "custodian"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  walletAddress?: string
  profileImage?: string
  createdAt: Date
  lastLoginAt: Date
  isVerified: boolean
  kycStatus?: "pending" | "approved" | "rejected"
  language: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

// Mock authentication service - in production this would integrate with zkLogin and Sui wallet
export class AuthService {
  private static instance: AuthService
  private currentUser: User | null = null

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async signInWithGoogle(role: UserRole = "buyer"): Promise<User> {
    // Simulate Google zkLogin flow
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockUser: User = {
      id: `user_${Date.now()}`,
      email: "user@example.com",
      name: "John Doe",
      role,
      walletAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
      createdAt: new Date(),
      lastLoginAt: new Date(),
      isVerified: role === "admin",
      kycStatus: role === "seller" ? "pending" : undefined,
      language: "en",
    }

    this.currentUser = mockUser
    localStorage.setItem("suinership_user", JSON.stringify(mockUser))
    return mockUser
  }

  async signInAdmin(credentials: { email: string; password: string }): Promise<User> {
    // Simulate admin authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (credentials.email !== "admin@suinership.com" || credentials.password !== "admin123") {
      throw new Error("Invalid admin credentials")
    }

    const adminUser: User = {
      id: "admin_001",
      email: credentials.email,
      name: "Super Admin",
      role: "admin",
      walletAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=admin`,
      createdAt: new Date(),
      lastLoginAt: new Date(),
      isVerified: true,
      language: "en",
    }

    this.currentUser = adminUser
    localStorage.setItem("suinership_user", JSON.stringify(adminUser))
    return adminUser
  }

  async signOut(): Promise<void> {
    this.currentUser = null
    localStorage.removeItem("suinership_user")
  }

  getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser

    const stored = localStorage.getItem("suinership_user")
    if (stored) {
      try {
        this.currentUser = JSON.parse(stored)
        return this.currentUser
      } catch {
        localStorage.removeItem("suinership_user")
      }
    }
    return null
  }

  async createSuiWallet(): Promise<string> {
    // Simulate Sui wallet creation
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return `0x${Math.random().toString(16).substr(2, 40)}`
  }

  async updateUserRole(userId: string, newRole: UserRole): Promise<void> {
    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser.role = newRole
      localStorage.setItem("suinership_user", JSON.stringify(this.currentUser))
    }
  }

  async signInWithZkLogin(email: string, role: UserRole): Promise<User> {
    // Simulate zkLogin authentication flow
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockUser: User = {
      id: `zklogin_${Date.now()}`,
      email,
      name: email
        .split("@")[0]
        .replace(/[^a-zA-Z]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      role,
      walletAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      createdAt: new Date(),
      lastLoginAt: new Date(),
      isVerified: true,
      kycStatus: role === "seller" ? "pending" : undefined,
      language: "en",
    }

    this.currentUser = mockUser
    localStorage.setItem("suinership_user", JSON.stringify(mockUser))
    return mockUser
  }
}
