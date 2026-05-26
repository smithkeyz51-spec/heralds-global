'use client'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { BRANDS, formatPrice } from '@/lib/brands'

const ProductShelf = dynamic(() => import('@/components/3d/ProductShelf'), { ssr: false })

function AisleDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 my-16">
      <div className="flex-1 h-px bg-white/10" />
      <span className="font-mono text-xs tracking-[0.3em] text-white/30 uppercase">{label}</span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  )
}

export default function HomePage() {
  const agencyProducts = BRANDS.agency.services.map((s) => ({
    id: s.id, label: s.title, price: formatPrice(s.price), priceRaw: s.price,
    brand: 'TheHeraldsGlobal', brandKey: 'agency' as const,
    color: '#0A0A0A', accentColor: '#E0E0D8',
    barcode: s.barcode, slug: `/agency#${s.slug}`, type: 'SERVICE' as const,
  }))

  const meridianProducts = BRANDS.meridian.sampleProperties.map((p) => ({
    id: p.id, label: p.title, price: `${formatPrice(p.price)}/${p.priceUnit}`, priceRaw: p.price,
    brand: 'Heralds Meridian', brandKey: 'meridian' as const,
    color: '#0D1B3E', accentColor: '#C9A96E',
    barcode: p.barcode, slug: `/meridian/${p.slug}`, type: 'PROPERTY' as const,
  }))

  const autosProducts = BRANDS.autos.sampleCars.map((c) => ({
    id: c.id, label: c.title, price: formatPrice(c.price), priceRaw: c.price,
    brand: 'Heralds Autos', brandKey: 'autos' as const,
    color: '#080808', accentColor: '#D4A017',
    barcode: c.barcode, slug: `/autos/${c.slug}`, type: 'CAR' as const,
  }))

  return (
    <div className="min-h-screen bg-[#0A0A0A]">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center pt-16">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <p className="font-mono text-xs tracking-[0.4em] text-white/25 uppercase mb-6">★★★ Heralds Global · Est. 2024 ★★★</p>
          <h1 className="font-condensed font-black uppercase leading-none">
            <span className="block text-6xl md:text-[120px] text-white">WE SELL</span>
            <span className="block text-6xl md:text-[120px]" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)', color: 'transparent' }}>RESULTS</span>
            <span className="block text-4xl md:text-6xl text-white/40 font-light tracking-widest mt-2">not promises</span>
          </h1>
          <p className="font-mono text-sm text-white/40 mt-8 max-w-xl leading-relaxed">
            Three premium brands. One roof. Social media, real estate, premium cars — TheHeraldsGlobal delivers.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <Link href="/agency" className="bg-white text-black font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-full hover:bg-white/90 font-bold">Shop Services</Link>
            <Link href="/cart" className="border border-white/20 text-white font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-full hover:bg-white/5">View Cart</Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="font-mono text-[10px] tracking-widest uppercase text-white">Scroll to Shop</span>
          <div className="w-px h-8 bg-white/40 animate-pulse" />
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden border-y border-white/10 py-3">
        <div className="flex gap-12 whitespace-nowrap font-mono text-xs tracking-widest text-white/30 uppercase" style={{ animation: 'marquee 30s linear infinite' }}>
          {['✦ SOCIAL MEDIA','✦ SHORTLET APARTMENTS','✦ LUXURY CARS','✦ BRAND IDENTITY','✦ PAID ADS','✦ VICTORIA ISLAND','✦ LEKKI','✦ MERCEDES-BENZ','✦ RANGE ROVER','✦ VGC AJAH'].flatMap(i=>[i,i]).map((item,i)=><span key={i}>{item}</span>)}
        </div>
        <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      </div>

      {/* Sector cards */}
      <section className="max-w-7xl mx-auto px-6">
        <AisleDivider label="Explore All Sectors" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { href:'/agency', img:'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80', title:'TheHeraldsGlobal', sub:'Social Media Agency', tag:'01' },
            { href:'/meridian', img:'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80', title:'Heralds Meridian', sub:'Real Estate & Shortlets', tag:'02' },
            { href:'/autos', img:'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80', title:'Heralds Autos', sub:'Premium Vehicles', tag:'03' },
          ].map(c=>(
            <Link key={c.href} href={c.href} className="group relative overflow-hidden rounded-2xl border border-white/10 block">
              <div className="relative h-56 overflow-hidden">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="absolute top-4 left-4 font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/20 text-white/70">Aisle {c.tag}</span>
              </div>
              <div className="p-5 bg-white/3">
                <p className="font-mono text-xs text-white/40 mb-1">{c.sub}</p>
                <h3 className="font-display text-xl font-bold text-white">{c.title}</h3>
                <p className="font-mono text-xs text-white/40 mt-2">Shop now →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Agency shelf */}
      <section className="max-w-7xl mx-auto px-6">
        <AisleDivider label="Aisle 01 · Agency Services" />
        <div className="mb-6">
          <p className="font-mono text-xs text-white/30 uppercase mb-1">TheHeraldsGlobal</p>
          <h2 className="font-display text-3xl font-bold text-white">Social Media Services</h2>
        </div>
        <ProductShelf products={agencyProducts} height={440} />
      </section>

      {/* Meridian shelf */}
      <section className="max-w-7xl mx-auto px-6">
        <AisleDivider label="Aisle 02 · Real Estate" />
        <div className="mb-6">
          <p className="font-mono text-xs uppercase mb-1" style={{color:'rgba(201,169,110,0.5)'}}>Heralds Meridian</p>
          <h2 className="font-display text-3xl font-bold text-white">Properties & Shortlets</h2>
        </div>
        <ProductShelf products={meridianProducts} height={440} />
      </section>

      {/* Autos shelf */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <AisleDivider label="Aisle 03 · Premium Autos" />
        <div className="mb-6">
          <p className="font-mono text-xs uppercase mb-1" style={{color:'rgba(212,160,23,0.5)'}}>Heralds Autos</p>
          <h2 className="font-display text-3xl font-bold text-white">Statement Vehicles</h2>
        </div>
        <ProductShelf products={autosProducts} height={440} />
      </section>

      {/* CTA */}
      <section className="mx-6 mb-24 rounded-2xl border border-white/10 p-12 text-center">
        <p className="font-mono text-xs tracking-[0.4em] text-white/30 uppercase mb-4">Ready to Checkout?</p>
        <h2 className="font-condensed text-5xl font-black text-white uppercase mb-4">Let's Build Your Vision</h2>
        <p className="font-mono text-sm text-white/40 mb-8">Creek Haven Estate, VGC Ajah, Lagos.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="tel:+2349060443436" className="bg-white text-black font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-full font-bold">+234 906 044 3436</a>
          <a href="mailto:heraldsglobal@gmail.com" className="border border-white/20 text-white font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-full">heraldsglobal@gmail.com</a>
        </div>
      </section>
    </div>
  )
}
