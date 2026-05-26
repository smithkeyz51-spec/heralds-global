import { BRANDS, formatPrice } from '@/lib/brands'
import ProductCard from '@/components/ui/ProductCard'

export default function AutosPage() {
  const { sampleCars } = BRANDS.autos
  return (
    <div className="min-h-screen pt-24 pb-24" style={{ background: '#050505' }}>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <p className="font-mono text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(212,160,23,0.6)' }}>
          ✦ Aisle 03 · Premium Autos ✦
        </p>
        <h1 className="font-condensed text-7xl md:text-9xl font-black uppercase leading-none text-white">AUTOS</h1>
        <p className="font-mono text-sm text-white/40 mt-6 max-w-xl leading-relaxed">
          Foreign used. Duty paid. Immaculate. Every vehicle personally verified, Lagos cleared, ready to make a statement.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <a href="tel:+2349060443436" className="font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-full font-bold" style={{ background: '#D4A017', color: '#080808' }}>
            Enquire Now
          </a>
          <a href="https://wa.me/2349060443436" target="_blank" rel="noopener noreferrer" className="border font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-full" style={{ borderColor: 'rgba(212,160,23,0.3)', color: '#D4A017' }}>
            WhatsApp Us
          </a>
        </div>
      </section>

      <section className="border-y py-6 mb-16" style={{ borderColor: 'rgba(212,160,23,0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '100%', label: 'Duty Paid' },
            { value: 'Verified', label: 'Foreign Used' },
            { value: '24hrs', label: 'Inspection Ready' },
            { value: 'NG Cleared', label: 'Lagos Verified' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-condensed text-3xl font-black" style={{ color: '#D4A017' }}>{s.value}</p>
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(212,160,23,0.5)' }}>Current Inventory</p>
        <h2 className="font-display text-3xl font-bold text-white mb-8">Available Vehicles</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {sampleCars.map((car) => (
            <div key={car.id} className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(212,160,23,0.15)', background: '#0F0F0F' }}>
              <div className="relative h-56">
                <img src={car.images[0]} alt={car.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/90 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full font-bold" style={{ background: '#D4A017', color: '#080808' }}>{car.year}</span>
                  <span className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.7)', color: '#D4A017', border: '1px solid rgba(212,160,23,0.3)' }}>Foreign Used</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-display text-xl font-bold text-white">{car.title}</p>
                  <p className="font-mono text-xs text-white/50 mt-1">{car.transmission} · {car.fuelType} · {car.color}</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-mono text-xs text-white/30">asking price</p>
                    <p className="font-condensed text-3xl font-black" style={{ color: '#D4A017' }}>{formatPrice(car.price)}</p>
                  </div>
                  {car.mileage && <p className="font-mono text-xs text-white/40">{car.mileage.toLocaleString()} km</p>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((f) => (
                    <span key={f} className="font-mono text-[10px] px-2 py-1 rounded border text-white/50" style={{ borderColor: 'rgba(212,160,23,0.15)' }}>{f}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href={`https://wa.me/2349060443436?text=I'm interested in the ${encodeURIComponent(car.title)}`} target="_blank" rel="noopener noreferrer" className="flex-1 text-center font-mono text-xs tracking-widest uppercase py-3 rounded-xl font-bold" style={{ background: '#D4A017', color: '#080808' }}>Inquire</a>
                  <a href="tel:+2349060443436" className="flex-1 text-center font-mono text-xs tracking-widest uppercase py-3 rounded-xl border" style={{ borderColor: 'rgba(212,160,23,0.2)', color: '#D4A017' }}>Call Us</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(212,160,23,0.5)' }}>Add to Inquiry Cart</p>
        <h2 className="font-display text-2xl font-bold text-white mb-6">Quick Select</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sampleCars.map((car) => (
            <ProductCard
              key={car.id}
              id={car.id}
              title={car.title}
              price={car.price}
              barcode={car.barcode}
              brand="autos"
              brandName="Heralds Autos"
              type="CAR"
              slug={`/autos/${car.slug}`}
              description={car.description}
              features={car.features}
              image={car.images[0]}
              available={car.available}
              nutrition={{
                'Year': String(car.year),
                'Mileage': `${car.mileage?.toLocaleString()} km`,
                'Fuel': car.fuelType,
                'Gearbox': car.transmission,
                'Color': car.color ?? 'N/A',
                'Status': 'Foreign Used',
              }}
            />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="rounded-2xl p-10 text-center" style={{ background: '#D4A017' }}>
          <p className="font-mono text-xs uppercase tracking-widest mb-3 text-black/50">Ready to Own</p>
          <h2 className="font-condensed text-5xl font-black text-black uppercase mb-4">Make Your Statement</h2>
          <p className="font-mono text-sm text-black/60 mb-6">Creek Haven Estate, VGC Ajah, Lagos</p>
          <a href="tel:+2349060443436" className="inline-block bg-black text-white font-mono text-xs tracking-widest uppercase px-10 py-4 rounded-full font-bold hover:bg-black/80 transition-all">
            +234 906 044 3436
          </a>
        </div>
      </section>
    </div>
  )
}
