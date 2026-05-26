import Link from 'next/link'

const IG = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
const TT = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 000 12.68 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z"/></svg>
const TW = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
const FB = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>

export default function SiteFooter() {
  return (
    <footer className="bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          <div className="space-y-4">
            <p className="font-condensed text-3xl font-black tracking-widest text-white uppercase leading-none">The<br/>Heralds<br/>Global</p>
            <p className="font-mono text-xs text-white/30 tracking-widest">One Brand. Three Worlds.</p>
            <div style={{borderTop:'1px dashed rgba(255,255,255,0.1)',margin:'12px 0'}} />
            <a href="tel:+2349060443436" className="block font-mono text-xs text-white/50 hover:text-white">+234 906 044 3436</a>
            <a href="mailto:heraldsglobal@gmail.com" className="block font-mono text-xs text-white/50 hover:text-white">heraldsglobal@gmail.com</a>
            <p className="font-mono text-xs text-white/30 leading-relaxed">Creek Haven Estate, Opp Harris-Drive VGC Ajah, Lagos NG.</p>
          </div>

          <div className="space-y-4">
            <p className="font-condensed text-lg font-bold text-white">TheHeraldsGlobal</p>
            <p className="font-mono text-xs text-white/30">Social Media Marketing</p>
            <div className="space-y-2">
              {[['https://instagram.com/the_heraldsmedia','@the_heraldsmedia',<IG/>],['https://twitter.com/theheraldsglobal','@theheraldsglobal',<TW/>],['https://facebook.com/theheraldsglobal','TheHeraldsGlobal',<FB/>]].map(([href,label,Icon]:any)=>(
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-xs text-white/50 hover:text-white">{Icon}<span>{label}</span></a>
              ))}
            </div>
            <Link href="/agency" className="block font-mono text-xs text-white/30 hover:text-white uppercase tracking-widest">View Services →</Link>
          </div>

          <div className="space-y-4">
            <p className="font-condensed text-lg font-bold" style={{color:'#C9A96E'}}>Heralds Meridian</p>
            <p className="font-mono text-xs text-white/30">Shortlet & Real Estate</p>
            <div className="space-y-2">
              {[['https://instagram.com/heraldsmeridian','@heraldsmeridian',<IG/>],['https://tiktok.com/@heraldsmeridian','@heraldsmeridian',<TT/>],['https://twitter.com/heraldsmeridian','@heraldsmeridian',<TW/>],['https://facebook.com/heraldsmeridian','Heralds Meridian',<FB/>]].map(([href,label,Icon]:any)=>(
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-xs text-white/50 hover:text-[#C9A96E]">{Icon}<span>{label}</span></a>
              ))}
            </div>
            <Link href="/meridian" className="block font-mono text-xs uppercase tracking-widest" style={{color:'rgba(201,169,110,0.4)'}}>View Properties →</Link>
          </div>

          <div className="space-y-4">
            <p className="font-condensed text-lg font-bold" style={{color:'#D4A017'}}>Heralds Autos</p>
            <p className="font-mono text-xs text-white/30">Premium Cars</p>
            <div className="space-y-2">
              {[['https://instagram.com/heraldsautos','@heraldsautos',<IG/>],['https://twitter.com/heraldsautos','@heraldsautos',<TW/>],['https://facebook.com/heraldsautos','Heralds Autos',<FB/>]].map(([href,label,Icon]:any)=>(
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-xs text-white/50 hover:text-[#D4A017]">{Icon}<span>{label}</span></a>
              ))}
            </div>
            <Link href="/autos" className="block font-mono text-xs uppercase tracking-widest" style={{color:'rgba(212,160,23,0.4)'}}>View Cars →</Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="font-mono text-[10px] text-white/20 tracking-widest">
            © 2026 HERALDS GLOBAL · ALL RIGHTS RESERVED · CREEK HAVEN ESTATE · VGC AJAH · LAGOS · NG
          </p>
        </div>
      </div>
    </footer>
  )
}
