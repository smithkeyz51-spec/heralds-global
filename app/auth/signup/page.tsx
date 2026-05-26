'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'', confirm:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match'); setLoading(false); return }
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password: form.password }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Registration failed'); setLoading(false); return }
    await signIn('credentials', { email: form.email, password: form.password, redirect: false })
    router.push('/')
  }

  const input = "w-full border border-black/15 rounded-xl px-4 py-3 font-mono text-sm text-black placeholder-black/20 focus:outline-none focus:border-black/40 bg-white"
  const lbl = "font-mono text-[10px] text-black/40 uppercase tracking-widest block mb-1.5"

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6 pt-16 pb-16">
      <div className="w-full max-w-md">
        <div className="receipt-paper rounded-2xl overflow-hidden">
          <div className="bg-black px-6 py-4 text-center">
            <p className="font-condensed text-2xl font-black tracking-widest text-white uppercase">TheHeraldsGlobal</p>
            <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase mt-0.5">New Customer Registration</p>
          </div>
          <div className="p-8 space-y-4">
            <div className="receipt-dashes" />
            {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3"><p className="font-mono text-xs text-red-600">{error}</p></div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className={lbl}>Full Name</label><input type="text" value={form.name} onChange={update('name')} required placeholder="John Doe" className={input} /></div>
              <div><label className={lbl}>Email</label><input type="email" value={form.email} onChange={update('email')} required placeholder="your@email.com" className={input} /></div>
              <div><label className={lbl}>Phone (optional)</label><input type="tel" value={form.phone} onChange={update('phone')} placeholder="+234 xxx xxx xxxx" className={input} /></div>
              <div><label className={lbl}>Password</label><input type="password" value={form.password} onChange={update('password')} required placeholder="Min. 8 characters" className={input} /></div>
              <div><label className={lbl}>Confirm Password</label><input type="password" value={form.confirm} onChange={update('confirm')} required placeholder="Repeat password" className={input} /></div>
              <div className="receipt-dashes" />
              <button type="submit" disabled={loading} className="w-full bg-black text-white font-mono text-xs tracking-widest uppercase py-4 rounded-xl font-bold disabled:opacity-50">
                {loading ? '⟳ CREATING...' : 'CREATE ACCOUNT →'}
              </button>
            </form>
            <div className="receipt-dashes" />
            <p className="font-mono text-xs text-black/40 text-center">
              Already registered? <Link href="/auth/login" className="text-black font-bold hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
