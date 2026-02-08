import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { FloatingActionButton } from "@/src/components/floating-action-button"
import { FloatingSubscribe } from "@/src/components/floating-subscribe"

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

export const metadata = {
  title: 'That Tree Guy | Professional Landscaping Services in Canada',
  description: 'Transform your outdoor space with expert tree cutting, garden design, and landscape organization services across Canada.',
  keywords: 'landscaping, tree cutting, garden design, landscape services, Canada, outdoor renovation, tree removal, garden organization',
  openGraph: {
    title: 'That Tree Guy | Professional Landscaping Services',
    description: 'Expert tree cutting and garden design services across Canada',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <FloatingSubscribe />
        <FloatingActionButton />
        
      </body>
    </html>
  )
}