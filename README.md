# Suinership - Fractional Real Estate Investment Platform

A comprehensive blockchain-based fractional real estate investment platform built on the Sui Network, designed specifically for the Nigerian market with multilingual support and advanced accessibility features.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/lawal-olabodes-projects/v0-splash-dash-design)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/Fr9t1exC4oJ)

## 🏗️ Features

- **Multi-Role Dashboard System**: Buyer, Seller, Admin, Law Firm, and Custodian interfaces
- **Multilingual Support**: English, Yoruba, Hausa, and Igbo languages
- **Advanced Accessibility**: WCAG 2.1 AA compliant with high contrast, dyslexia-friendly fonts, and screen reader support
- **AI-Powered Advisor**: Role-specific AI assistance for investment guidance and platform navigation
- **Blockchain Integration**: Built on Sui Network with Google zkLogin authentication
- **Document Management**: Walrus storage integration for KYC and property documents
- **Anonymous Ownership**: Privacy-focused ownership with next-of-kin functionality
- **Fractional NFTs**: Property tokenization and trading capabilities

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/suinership-design-and-frontend.git
   cd suinership-design-and-frontend
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Environment Setup** (Optional)
   
   Create a `.env.local` file in the root directory for any environment variables:
   \`\`\`bash
   # Example environment variables (if needed)
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📁 Project Structure

\`\`\`
suinership/
├── app/                          # Next.js App Router
│   ├── auth/                     # Authentication pages
│   ├── dashboard/                # Role-based dashboards
│   │   ├── buyer/               # Buyer dashboard
│   │   ├── seller/              # Seller dashboard
│   │   ├── admin/               # Admin dashboard
│   │   ├── law-firm/            # Law firm dashboard
│   │   └── custodian/           # Custodian dashboard
│   ├── globals.css              # Global styles with accessibility features
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Landing page
├── components/                   # Reusable components
│   ├── auth/                    # Authentication components
│   ├── dashboard/               # Dashboard-specific components
│   └── ui/                      # UI components (buttons, forms, etc.)
├── lib/                         # Utility functions
│   ├── auth.ts                  # Authentication utilities
│   ├── i18n.ts                  # Internationalization
│   └── accessibility.ts        # Accessibility utilities
└── public/                      # Static assets
    └── images/                  # Property and UI images
\`\`\`

## 🎨 Design System

The platform uses a sophisticated dark navy theme with:

- **Primary Colors**: Dark Navy (#0A0E17), Professional Blue (#1E40AF)
- **Typography**: Sora for headings, Space Grotesk for body text
- **Accessibility**: High contrast mode, dyslexia-friendly fonts, reduced motion support
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🌐 Multilingual Support

The platform supports four languages:

- **English** (en) - Default
- **Yoruba** (yo) - West African language
- **Hausa** (ha) - Northern Nigerian language  
- **Igbo** (ig) - Southeastern Nigerian language

Language selection is available in the header and persists across sessions.

## ♿ Accessibility Features

- **High Contrast Mode**: Enhanced visibility for users with visual impairments
- **Dyslexia-Friendly Fonts**: OpenDyslexic font option
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Reduced Motion**: Respects user's motion preferences
- **Focus Indicators**: Clear focus states for all interactive elements

## 🤖 AI Advisor

Each user role has access to a specialized AI advisor:

- **Buyer Advisor**: Investment strategies, property analysis, market insights
- **Seller Advisor**: Property listing optimization, market positioning
- **Admin Advisor**: Platform management, compliance guidance
- **Legal Advisor**: Regulatory compliance, legal documentation
- **Custodian Advisor**: Asset management, security protocols

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

The project is configured for easy deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Configure environment variables** (if any)
3. **Deploy** - Vercel will automatically build and deploy your application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue on GitHub
- **Community**: Join our community discussions

## 🔗 Links

- **Live Demo**: [https://vercel.com/lawal-olabodes-projects/v0-splash-dash-design](https://vercel.com/lawal-olabodes-projects/v0-splash-dash-design)
- **v0 Project**: [https://v0.app/chat/projects/Fr9t1exC4oJ](https://v0.app/chat/projects/Fr9t1exC4oJ)

---

Built with ❤️ using [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [v0.app](https://v0.app)
