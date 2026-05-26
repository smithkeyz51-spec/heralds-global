import { BRANDS, formatPrice } from '@/lib/brands'
import ProductCard from '@/components/ui/ProductCard'

export default function MeridianPage() {
  const { sampleProperties } = BRANDS.meridian
  return (
    <div className="min-h-screen pt-24 pb-24" style={{ background: '#060D1E' }}>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <p className="font-mono text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(201,169,110,0.6)' }}>
          ✦ Aisle 02 · Real Estate ✦
        </p>
        <h1 className="font-condensed text-7xl md:text-9xl font-black uppercase leading-none text-white">MERIDIAN</h1>
        <p className="font-mono text-sm text-white/40 mt-6 max-w-xl leading-relaxed">
          Premium shortlet apartments and luxury real estate across Lagos Island, Lekki, and VGC.
          Every property is fully managed, fully serviced, and fully yours.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <a href="tel:+2349060443436" className="font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-full font-bold" style={{ background: '#C9A96E', color: '#0D1B3E' }}>
            Book a Viewing
          </a>
          <a href="https://instagram.com/heraldsmeridian" target="_blank" rel="noopener noreferrer" className="border font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-full" style={{ borderColor: 'rgba(201,169,110,0.3)', color: '#C9A96E' }}>
            @heraldsmeridian
          </a>
        </div>
      </section>

      <section className="border-y py-6 mb-16" style={{ borderColor: 'rgba(201,169,110,0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '30+', label: 'Listed Properties' },
            { value: '5★', label: 'Guest Ratings' },
            { value: 'VI · Lekki · VGC', label: 'Prime Locations' },
            { value: '24/7', label: 'Property Support' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-condensed text-3xl font-black" style={{ color: '#C9A96E' }}>{s.value}</p>
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(201,169,110,0.5)' }}>Featured Listings</p>
        <h2 className="font-display text-3xl font-bold text-white mb-8">Available Now</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {sampleProperties.map((p) => (
            <div key={p.id} className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(201,169,110,0.15)', background: '#0D1B3E' }}>
              <div className="relative h-56">
                <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B3E]/90 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full font-bold" style={{ background: '#C9A96E', color: '#0D1B3E' }}>
                    {p.type}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-display text-xl font-bold text-white">{p.title}</p>
                  <p className="font-mono text-xs text-white/50 mt-1">📍 {p.location}</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-mono text-xs text-white/30">from</p>
                    <p className="font-condensed text-3xl font-black" style={{ color: '#C9A96E' }}>{formatPrice(p.price)}</p>
                    <p className="font-mono text-xs text-white/30">/{p.priceUnit}</p>
                  </div>
                  {p.bedrooms && <p className="font-mono text-xs text-white/40">{p.bedrooms} bed · {p.bathrooms} bath</p>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.amenities.slice(0, 4).map((a) => (
                    <span key={a} className="font-mono text-[10px] px-2 py-1 rounded border text-white/50" style={{ borderColor: 'rgba(201,169,110,0.15)' }}>{a}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href="tel:+2349060443436" className="flex-1 text-center font-mono text-xs tracking-widest uppercase py-3 rounded-xl font-bold" style={{ background: '#C9A96E', color: '#0D1B3E' }}>Book Now</a>
                  <a href="https://wa.me/2349060443436" target="_blank" rel="noopener noreferrer" className="flex-1 text-center font-mono text-xs tracking-widest uppercase py-3 rounded-xl border" style={{ borderColor: 'rgba(201,169,110,0.2)', color: '#C9A96E' }}>WhatsApp</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(201,169,110,0.5)' }}>Add to Inquiry Cart</p>
        <h2 className="font-display text-2xl font-bold text-white mb-6">Quick Select</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sampleProperties.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              price={p.price}
              priceUnit={p.priceUnit}
              barcode={p.barcode}
              brand="meridian"
              brandName="Heralds Meridian"
              type="PROPERTY"
              slug={`/meridian/${p.slug}`}
              description={p.description}
              features={p.amenities}
              image={p.images[0]}
              available={p.available}
              nutrition={{
                'Type': p.type,
                'Bedrooms': String(p.bedrooms ?? 'N/A'),
                'Bathrooms': String(p.bathrooms ?? 'N/A'),
                'Location': p.location,
                'Rate': `${formatPrice(p.price)}/${p.priceUnit}`,
              }}
            />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="rounded-2xl p-10 text-center border" style={{ borderColor: 'rgba(201,169,110,0.2)', background: 'rgba(13,27,62,0.8)' }}>
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(201,169,110,0.5)' }}>Get in Touch</p>
          <h2 className="font-condensed text-5xl font-black text-white uppercase mb-4">Book Your Stay</h2>
          <p className="font-mono text-sm text-white/40 mb-6">@heraldsmeridian on Instagram & TikTok</p>
          <a href="tel:+2349060443436" className="inline-block font-mono text-xs tracking-widest uppercase px-10 py-4 rounded-full font-bold" style={{ background: '#C9A96E', color: '#0D1B3E' }}>
            +234 906 044 3436
          </a>
        </div>
      </section>
    </div>
  )
}
