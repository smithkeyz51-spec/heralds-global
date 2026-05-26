'use client'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/brands'
import Barcode from '@/components/ui/Barcode'
import Link from 'next/link'
import { useState } from 'react'

const BRAND_META = {
  agency:  { name: 'TheHeraldsGlobal' },
  meridian:{ name: 'Heralds Meridian' },
  autos:   { name: 'Heralds Autos' },
}

function ReceiptRow({ item }: { item: any }) {
  const { removeItem, updateQty } = useCartStore()
  const meta = BRAND_META[item.brand as keyof typeof BRAND_META]
  return (
    <div className="border-b border-black/10 py-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="font-mono text-[10px] text-black/40 uppercase tracking-widest">{meta.name}</p>
          <p className="font-mono text-sm font-medium text-black leading-tight mt-0.5">{item.title}</p>
          {item.priceUnit && <p className="font-mono text-[10px] text-black/40">per {item.priceUnit}</p>}
        </div>
        <div className="text-right">
          <p className="font-mono text-sm font-bold text-black">{formatPrice(item.price * item.quantity)}</p>
          <p className="font-mono text-[10px] text-black/40">{formatPrice(item.price)} × {item.quantity}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <Barcode code={item.barcode} width={100} height={28} showCode={false} color="#1A1A1A" />
        <div className="flex items-center gap-3">
          <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-6 h-6 rounded-full border border-black/20 font-mono text-xs flex items-center justify-center">−</button>
          <span className="font-mono text-xs w-4 text-center">{item.quantity}</span>
          <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-6 h-6 rounded-full border border-black/20 font-mono text-xs flex items-center justify-center">+</button>
          <button onClick={() => removeItem(item.id)} className="font-mono text-[10px] text-red-400 uppercase tracking-widest ml-2">VOID</button>
        </div>
      </div>
    </div>
  )
}

export default function CartPage() {
  const { items, total, clearCart, count } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const now = new Date()
  const receiptNo = `HG-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}-${String(Math.floor(Math.random()*9999)).padStart(4,'0')}`

  const handleCheckout = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    setDone(true)
    setLoading(false)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] pt-24 flex items-center justify-center px-6">
        <div className="receipt-paper rounded-2xl p-8 text-center space-y-4 max-w-md w-full">
          <p className="font-mono text-xs tracking-widest text-black/40 uppercase">★ Transaction Complete ★</p>
          <p className="font-condensed text-5xl font-black text-black uppercase">THANK YOU</p>
          <p className="font-mono text-xs text-black/50 leading-relaxed">
            Inquiry submitted. Our team will contact you within 24 hours.
          </p>
          <div className="receipt-dashes" />
          <p className="font-mono text-xs text-black/40">heraldsglobal@gmail.com</p>
          <p className="font-mono text-xs text-black/40">+234 906 044 3436</p>
          <div className="receipt-dashes" />
          <Barcode code={receiptNo} width={200} height={48} color="#1A1A1A" />
          <Link href="/" className="block mt-4 font-mono text-xs uppercase tracking-widest text-black/50 hover:text-black">← Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-xs tracking-[0.4em] text-white/25 uppercase mb-2">Checkout</p>
          <h1 className="font-condensed text-5xl font-black text-white uppercase">Your Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="receipt-paper rounded-2xl p-12 text-center space-y-4">
            <p className="font-condensed text-4xl font-black text-black/20 uppercase">Cart Empty</p>
            <div className="receipt-dashes" />
            <Link href="/" className="block font-mono text-xs text-black/50 hover:text-black uppercase tracking-widest">← Browse Products</Link>
          </div>
        ) : (
          <div className="receipt-paper rounded-2xl overflow-hidden">
            <div className="p-6 border-b-2 border-dashed border-black/15 text-center space-y-1">
              <p className="font-condensed text-2xl font-black tracking-widest text-black uppercase">TheHeraldsGlobal</p>
              <p className="font-mono text-[10px] text-black/40 uppercase">Creek Haven Estate, VGC Ajah, Lagos NG</p>
              <p className="font-mono text-[10px] text-black/30">heraldsglobal@gmail.com · +234 906 044 3436</p>
              <div className="receipt-dashes" />
              <div className="flex justify-between font-mono text-[10px] text-black/40">
                <span>RECEIPT: {receiptNo}</span>
                <span>{now.toLocaleDateString('en-NG')}</span>
              </div>
            </div>

            <div className="px-6">
              {items.map((item) => <ReceiptRow key={item.id} item={item} />)}
            </div>

            <div className="p-6 border-t-2 border-dashed border-black/15 space-y-2">
              <div className="flex justify-between font-mono text-xs text-black/50">
                <span>SUBTOTAL ({count()} items)</span>
                <span>{formatPrice(total())}</span>
              </div>
              <div className="flex justify-between font-mono text-xs text-black/50">
                <span>CONSULTATION</span>
                <span>FREE</span>
              </div>
              <div className="receipt-dashes" />
              <div className="flex justify-between font-condensed text-2xl font-black text-black">
                <span>TOTAL</span>
                <span>{formatPrice(total())}</span>
              </div>
              <div className="receipt-dashes" />
              <div className="flex justify-center py-2">
                <Barcode code={receiptNo} width={200} height={52} color="#1A1A1A" />
              </div>
              <p className="font-mono text-[10px] text-black/30 text-center uppercase">
                *** Service inquiry receipt — team will confirm ***
              </p>
              <div className="receipt-dashes" />
              <button onClick={handleCheckout} disabled={loading} className="w-full bg-black text-white font-mono text-xs tracking-widest uppercase py-4 rounded-xl font-bold disabled:opacity-50">
                {loading ? '⟳ PROCESSING...' : 'SUBMIT INQUIRY →'}
              </button>
              <button onClick={clearCart} className="w-full font-mono text-[10px] text-black/30 hover:text-red-400 uppercase tracking-widest mt-2">
                VOID ALL ITEMS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
