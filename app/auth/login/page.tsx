'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', { email, password, redirect: false })
    if (result?.error) { setError('Invalid email or password'); setLoading(false) }
    else { router.push('/') }
  }

  const input = "w-full border border-black/15 rounded-xl px-4 py-3 font-mono text-sm text-black placeholder-black/20 focus:outline-none focus:border-black/40 bg-white"

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6 pt-16">
      <div className="w-full max-w-md">
        <div className="receipt-paper rounded-2xl overflow-hidden">
          <div className="bg-black px-6 py-4 text-center">
            <p className="font-condensed text-2xl font-black tracking-widest text-white uppercase">TheHeraldsGlobal</p>
            <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase mt-0.5">Customer Login</p>
          </div>
          <div className="p-8 space-y-5">
            <div className="receipt-dashes" />
            {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3"><p className="font-mono text-xs text-red-600">{error}</p></div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-[10px] text-black/40 uppercase tracking-widest block mb-1.5">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" className={input} />
              </div>
              <div>
                <label className="font-mono text-[10px] text-black/40 uppercase tracking-widest block mb-1.5">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className={input} />
              </div>
              <div className="receipt-dashes" />
              <button type="submit" disabled={loading} className="w-full bg-black text-white font-mono text-xs tracking-widest uppercase py-4 rounded-xl font-bold disabled:opacity-50">
                {loading ? '⟳ LOGGING IN...' : 'LOGIN →'}
              </button>
            </form>
            <div className="receipt-dashes" />
            <p className="font-mono text-xs text-black/40 text-center">
              New customer? <Link href="/auth/signup" className="text-black font-bold hover:underline">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
