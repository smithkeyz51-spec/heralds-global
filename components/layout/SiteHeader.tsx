'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const count = useCartStore((s) => s.count())

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-condensed text-xl font-black tracking-widest text-white uppercase">TheHeraldS</span>
          <span className="font-mono text-[9px] tracking-[0.4em] text-white/40 uppercase">Global</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {[['/', 'Home'], ['/agency', 'Agency'], ['/meridian', 'Meridian'], ['/autos', 'Autos']].map(([href, label]) => (
            <Link key={href} href={href} className="font-mono text-xs tracking-widest text-white/60 hover:text-white uppercase transition-colors">{label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="hidden md:block font-mono text-xs tracking-widest text-white/50 hover:text-white uppercase transition-colors">Login</Link>
          <Link href="/cart" className="relative flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-4 py-2 transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <span className="font-mono text-xs text-white">Cart</span>
            {count > 0 && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white text-black font-mono text-[10px] font-bold flex items-center justify-center">{count}</span>}
          </Link>
          <button className="md:hidden text-white p-1" onClick={() => setMenuOpen(o => !o)}>
            <div className={`w-5 h-0.5 bg-white mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-white mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10 px-6 py-6 space-y-4">
          {[['/', 'Home'], ['/agency', 'Agency'], ['/meridian', 'Meridian'], ['/autos', 'Autos'], ['/cart', `Cart (${count})`], ['/auth/login', 'Login']].map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="block font-mono text-sm tracking-widest text-white/70 hover:text-white uppercase border-b border-white/5 pb-4">{label}</Link>
          ))}
        </div>
      )}
    </header>
  )
}
