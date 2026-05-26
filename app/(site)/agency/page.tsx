import ProductCard from '@/components/ui/ProductCard'
import { BRANDS } from '@/lib/brands'

export default function AgencyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-24">

      <section className="max-w-7xl mx-auto px-6 py-16">
        <p className="font-mono text-xs tracking-[0.4em] text-white/20 uppercase mb-4">★★★ Aisle 01 · Agency ★★★</p>
        <h1 className="font-condensed text-7xl md:text-9xl font-black uppercase text-white leading-none">AGENCY</h1>
        <p className="font-mono text-sm text-white/40 mt-6 max-w-xl leading-relaxed">
          We don't just post. We build presence, craft narratives, and grow communities that convert.
        </p>
      </section>

      <section className="border-y border-white/5 py-6 mb-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '50+', label: 'Brands Managed' },
            { value: '340%', label: 'Avg Engagement Lift' },
            { value: '₦500M+', label: 'Revenue Generated' },
            { value: '24hrs', label: 'Response Time' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-condensed text-3xl font-black text-white">{s.value}</p>
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-2">Our Menu</p>
        <h2 className="font-display text-3xl font-bold text-white mb-2">Service Products</h2>
        <p className="font-mono text-xs text-white/25 mb-8">Tap card to flip · See full details on the back</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRANDS.agency.services.map((s) => (
            <ProductCard
              key={s.id}
              id={s.id}
              title={s.title}
              price={s.price}
              priceUnit={s.priceUnit}
              barcode={s.barcode}
              brand="agency"
              brandName="TheHeraldsGlobal"
              type="SERVICE"
              slug={`/agency#${s.slug}`}
              description={s.description}
              features={s.features}
              nutrition={s.nutrition}
              available
            />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="border border-white/10 rounded-2xl p-8 md:p-12">
          <p className="font-mono text-xs text-white/25 uppercase tracking-widest mb-2">How It Works</p>
          <h2 className="font-display text-3xl font-bold text-white mb-10">The Heralds Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'We audit your current presence and study your market' },
              { step: '02', title: 'Strategy', desc: 'Custom content calendar and campaign blueprint' },
              { step: '03', title: 'Execution', desc: 'Daily posts, stories, ads, and community management' },
              { step: '04', title: 'Scale', desc: 'Monthly reports, optimisation, and growth roadmap' },
            ].map((p) => (
              <div key={p.step} className="space-y-3">
                <span className="font-mono text-4xl font-black text-white/10">{p.step}</span>
                <div className="h-px w-8 bg-white/20" />
                <h3 className="font-condensed text-xl font-bold text-white uppercase">{p.title}</h3>
                <p className="font-mono text-xs text-white/40 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="bg-white text-black rounded-2xl p-10 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-black/40 mb-3">Ready to Start?</p>
          <h2 className="font-condensed text-5xl font-black uppercase mb-4">Let's Talk</h2>
          <p className="font-mono text-sm text-black/50 mb-6">
            Instagram: @the_heraldsmedia · heraldsglobal@gmail.com
          </p>
          <a href="tel:+2349060443436" className="inline-block bg-black text-white font-mono text-xs tracking-widest uppercase px-10 py-4 rounded-full font-bold hover:bg-black/80 transition-all">
            Call +234 906 044 3436
          </a>
        </div>
      </section>
    </div>
  )
}
