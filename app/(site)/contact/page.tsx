'use client'
import { useState } from 'react'

const SECTORS = ['Agency — Social Media', 'Meridian — Real Estate', 'Autos — Cars', 'General Enquiry']

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', sector: SECTORS[0], message:'' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) { setSent(true) }
    else { setError('Failed to send. Please email us directly at heraldsglobal@gmail.com') }
    setLoading(false)
  }

  const input = "w-full border border-black/15 rounded-xl px-4 py-3 font-mono text-sm text-black placeholder-black/20 focus:outline-none focus:border-black/40 bg-white"
  const label = "font-mono text-[10px] text-black/40 uppercase tracking-widest block mb-1.5"

  if (sent) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6 pt-16">
        <div className="receipt-paper rounded-2xl p-10 text-center max-w-md w-full space-y-4">
          <p className="font-condensed text-5xl font-black text-black uppercase">Sent!</p>
          <p className="font-mono text-xs text-black/50 leading-relaxed">We'll get back to you within 24 hours.</p>
          <div className="receipt-dashes" />
          <p className="font-mono text-xs text-black/40">heraldsglobal@gmail.com</p>
          <p className="font-mono text-xs text-black/40">+234 906 044 3436</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-xs tracking-[0.4em] text-white/25 uppercase mb-2">Reach Us</p>
          <h1 className="font-condensed text-5xl font-black text-white uppercase">Contact</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Phone / WhatsApp', value: '+234 906 044 3436', href: 'tel:+2349060443436' },
            { label: 'Email', value: 'heraldsglobal@gmail.com', href: 'mailto:heraldsglobal@gmail.com' },
            { label: 'Address', value: 'Creek Haven Estate, VGC Ajah, Lagos', href: '#' },
          ].map((c) => (
            <a key={c.label} href={c.href} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors block">
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1">{c.label}</p>
              <p className="font-mono text-xs text-white leading-relaxed">{c.value}</p>
            </a>
          ))}
        </div>

        <div className="receipt-paper rounded-2xl overflow-hidden">
          <div className="bg-black px-6 py-4">
            <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Send a Message</p>
          </div>
          <div className="p-8">
            {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4"><p className="font-mono text-xs text-red-600">{error}</p></div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={label}>Your Name</label>
                  <input type="text" value={form.name} onChange={update('name')} required placeholder="John Doe" className={input} />
                </div>
                <div>
                  <label className={label}>Email</label>
                  <input type="email" value={form.email} onChange={update('email')} required placeholder="you@email.com" className={input} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={label}>Phone</label>
                  <input type="tel" value={form.phone} onChange={update('phone')} placeholder="+234..." className={input} />
                </div>
                <div>
                  <label className={label}>Sector</label>
                  <select value={form.sector} onChange={update('sector')} className={input}>
                    {SECTORS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={label}>Message</label>
                <textarea value={form.message} onChange={update('message')} required rows={4} placeholder="Tell us about your project..." className={`${input} resize-none`} />
              </div>
              <div className="receipt-dashes" />
              <button type="submit" disabled={loading} className="w-full bg-black text-white font-mono text-xs tracking-widest uppercase py-4 rounded-xl font-bold disabled:opacity-50">
                {loading ? '⟳ SENDING...' : 'SEND MESSAGE →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
