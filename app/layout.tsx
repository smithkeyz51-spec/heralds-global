import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/cart-store'
import { AuthProvider } from '@/components/ui/AuthProvider'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'

export const metadata: Metadata = {
  title: 'TheHeraldsGlobal | Agency · Real Estate · Autos',
  description: 'One Brand. Three Worlds. Social Media Agency, Shortlet Apartments, Premium Cars.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
