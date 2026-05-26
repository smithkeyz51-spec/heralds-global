'use client'
import { useState } from 'react'
import Barcode from './Barcode'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/brands'

interface ProductCardProps {
  id: string; title: string; price: number; priceUnit?: string
  barcode: string; brand: 'agency' | 'meridian' | 'autos'; brandName: string
  type: 'SERVICE' | 'PROPERTY' | 'CAR'; slug: string; description: string
  features?: string[]; nutrition?: Record<string, string>
  image?: string; available?: boolean; className?: string
}

const STYLES = {
  agency: { badge: 'bg-white text-black', accent: 'text-white', border: 'border-white/10', bg: 'bg-[#0A0A0A]', text: 'text-white', bcColor: '#F5F5F0' },
  meridian: { badge: 'bg-[#C9A96E] text-[#0D1B3E]', accent: 'text-[#C9A96E]', border: 'border-[#C9A96E]/20', bg: 'bg-[#0D1B3E]', text: 'text-white', bcColor: '#C9A96E' },
  autos: { badge: 'bg-[#D4A017] text-black', accent: 'text-[#D4A017]', border: 'border-[#D4A017]/20', bg: 'bg-[#0A0A0A]', text: 'text-white', bcColor: '#D4A017' },
}

export default function ProductCard({ id, title, price, priceUnit = 'unit', barcode, brand, brandName, type, slug, description, features = [], nutrition = {}, image, available = true, className = '' }: ProductCardProps) {
  const [added, setAdded] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const s = STYLES[brand]

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem({ id, type, title, price, priceUnit, barcode, brand, slug })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className={`relative cursor-pointer select-none ${className}`} style={{ perspective: '800px' }} onClick={() => setFlipped(f => !f)}>
      <div style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 0.7s' }}>

        {/* FRONT */}
        <div className={`rounded-2xl border ${s.border} ${s.bg} overflow-hidden`} style={{ backfaceVisibility: 'hidden', minHeight: 360 }}>
          <div className={`px-5 py-3 flex items-center justify-between ${s.badge}`}>
            <span className="font-mono text-xs font-bold tracking-widest uppercase">{brandName}</span>
          </div>
          {image && (
            <div className="relative h-36 overflow-hidden">
              <img src={image} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            </div>
          )}
          <div className="p-5 space-y-3">
            <div>
              <h3 className={`font-display text-lg font-bold leading-tight ${s.text}`}>{title}</h3>
              <p className="text-xs mt-1 opacity-60 text-white line-clamp-2">{description}</p>
            </div>
            <div className={`border-t border-b py-2 space-y-1 ${s.border}`}>
              {features.slice(0, 3).map((f) => (
                <p key={f} className={`font-mono text-xs text-white/70 flex gap-2`}>
                  <span className={s.accent}>›</span> {f}
                </p>
              ))}
            </div>
            <div className="flex items-end justify-between pt-1">
              <div>
                <p className="font-mono text-xs opacity-50 text-white">/{priceUnit}</p>
                <p className={`font-mono text-2xl font-bold ${s.accent}`}>{formatPrice(price)}</p>
              </div>
              <Barcode code={barcode} width={90} height={36} showCode={false} color={s.bcColor} />
            </div>
            <button
              onClick={handleAdd}
              disabled={!available}
              className={`w-full py-2.5 rounded-lg font-mono text-xs font-bold tracking-widest uppercase transition-all ${s.badge} ${!available ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-90'}`}
            >
              {!available ? '— OUT OF STOCK —' : added ? '✓ ADDED TO CART' : '+ ADD TO CART'}
            </button>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: '#FFF9F0' }}>
          <div className={`px-4 py-2 ${s.badge}`}>
            <span className="font-mono text-xs font-bold tracking-widest uppercase">{brandName} · FACTS</span>
          </div>
          <div className="p-4 space-y-3">
            <p className="font-mono text-xs font-bold text-black uppercase tracking-wider">{title}</p>
            <div style={{ borderTop: '2px dashed rgba(0,0,0,0.2)', margin: '8px 0' }} />
            <table className="nutrition-table text-black">
              <thead><tr><th colSpan={2} className="text-left">WHAT'S INSIDE ▼</th></tr></thead>
              <tbody>
                {Object.entries(nutrition).map(([k, v]) => (
                  <tr key={k}><td className="font-medium">{k}</td><td className="text-right font-bold">{v}</td></tr>
                ))}
              </tbody>
            </table>
            <div style={{ borderTop: '2px dashed rgba(0,0,0,0.2)', margin: '8px 0' }} />
            {features.map((f) => <p key={f} className="font-mono text-xs text-black">• {f}</p>)}
            <div className="flex flex-col items-center pt-2">
              <Barcode code={barcode} width={150} height={48} color="#1A1A1A" />
              <p className="font-mono text-[10px] text-black/40 mt-1 text-center">TAP TO FLIP BACK</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
o
