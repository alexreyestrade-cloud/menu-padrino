'use client';

import { useState, useEffect, useRef } from 'react';
import { MenuData, MenuSection, MenuItem } from '@/types/menu';

const CURRENCY = (n: number) => `$${n.toLocaleString('es-MX')}`;

function BotanaHeader() {
  return (
    <div className="grid grid-cols-3 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">
      <span className="col-span-1" />
      <span className="text-center text-gold">Sin Botana</span>
      <span className="text-center text-gold">Con Botana</span>
    </div>
  );
}

function HalfOrderHeader() {
  return (
    <div className="grid grid-cols-3 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">
      <span className="col-span-1" />
      <span className="text-center text-gold">Orden</span>
      <span className="text-center text-gold">½ Orden</span>
    </div>
  );
}

function BotanaItem({ item }: { item: MenuItem }) {
  return (
    <div className="menu-card grid grid-cols-3 items-center py-3 px-3 rounded-lg border border-dark-border gap-2">
      <span className="col-span-1 text-sm text-white leading-snug">{item.name}</span>
      <span className="text-center text-gold font-bold price-tag">{CURRENCY(item.price)}</span>
      <span className="text-center text-gold font-bold price-tag">
        {item.priceWithBotana ? CURRENCY(item.priceWithBotana) : '—'}
      </span>
    </div>
  );
}

function HalfOrderItem({ item }: { item: MenuItem }) {
  return (
    <div className="menu-card grid grid-cols-3 items-center py-3 px-3 rounded-lg border border-dark-border gap-2">
      <div className="col-span-1">
        <p className="text-sm text-white leading-snug">{item.name}</p>
        {item.description && (
          <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
        )}
      </div>
      <span className="text-center text-gold font-bold price-tag">{CURRENCY(item.price)}</span>
      <span className="text-center text-gold font-bold price-tag">
        {item.halfOrderPrice ? CURRENCY(item.halfOrderPrice) : '—'}
      </span>
    </div>
  );
}

function SinglePriceItem({ item }: { item: MenuItem }) {
  return (
    <div className="menu-card flex items-center justify-between py-3 px-4 rounded-lg border border-dark-border">
      <div>
        <p className="text-sm text-white leading-snug">{item.name}</p>
        {item.description && (
          <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
        )}
      </div>
      <span className="text-gold font-bold text-lg price-tag ml-4 shrink-0">{CURRENCY(item.price)}</span>
    </div>
  );
}

function BottleItem({ item }: { item: MenuItem }) {
  return (
    <div className="menu-card flex items-center justify-between py-4 px-4 rounded-xl border border-dark-border bg-dark-card">
      <span className="text-white font-semibold tracking-wide">{item.name}</span>
      <span className="text-gold font-bold text-xl price-tag">{CURRENCY(item.price)}</span>
    </div>
  );
}

function ExtrasItem({ item }: { item: MenuItem }) {
  return (
    <div className="menu-card flex items-center justify-between py-2.5 px-4 rounded-lg border border-dark-border">
      <span className="text-sm text-gray-300">{item.name}</span>
      <span className="text-gold font-bold price-tag">{CURRENCY(item.price)}</span>
    </div>
  );
}

function SectionBlock({ section }: { section: MenuSection }) {
  const visible = section.items.filter(i => i.available);

  const renderItems = () => {
    switch (section.type) {
      case 'with-botana':
        return (
          <>
            <BotanaHeader />
            <div className="space-y-2">
              {visible.map(item => <BotanaItem key={item.id} item={item} />)}
            </div>
          </>
        );
      case 'with-half-order':
        return (
          <>
            <HalfOrderHeader />
            <div className="space-y-2">
              {visible.map(item => <HalfOrderItem key={item.id} item={item} />)}
            </div>
          </>
        );
      case 'bottles':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {visible.map(item => <BottleItem key={item.id} item={item} />)}
          </div>
        );
      case 'extras':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {visible.map(item => <ExtrasItem key={item.id} item={item} />)}
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {visible.map(item => <SinglePriceItem key={item.id} item={item} />)}
          </div>
        );
    }
  };

  return (
    <section id={section.id} className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="section-badge text-black text-sm font-black px-4 py-1.5 rounded-full tracking-widest uppercase">
          {section.icon} {section.name}
        </span>
      </div>
      {renderItems()}
      {section.note && (
        <p className="mt-3 text-xs text-gray-400 italic text-center">
          * {section.note}
        </p>
      )}
    </section>
  );
}

function CategoryNav({ sections, active, onSelect }: {
  sections: MenuSection[];
  active: string;
  onSelect: (id: string) => void;
}) {
  const navRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    onSelect(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    // Scroll the nav pill into view
    const btn = navRef.current?.querySelector(`[data-id="${id}"]`);
    btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <div className="sticky top-0 z-40 bg-dark/95 backdrop-blur-md border-b border-dark-border">
      <div
        ref={navRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3"
      >
        {sections.map(s => (
          <button
            key={s.id}
            data-id={s.id}
            onClick={() => scrollTo(s.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
              active === s.id
                ? 'bg-gold text-black border-gold'
                : 'bg-transparent text-gray-400 border-dark-border hover:border-gold/50 hover:text-white'
            }`}
          >
            {s.icon} {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="relative overflow-hidden text-center" style={{
      background: 'linear-gradient(180deg, #020d1a 0%, #041525 35%, #061a2e 60%, #0D0D0D 100%)',
      paddingTop: '2.5rem',
      paddingBottom: '3rem',
    }}>
      {/* Ocean glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{
          position: 'absolute', top: '-10%', left: '-10%',
          width: '55%', height: '55%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,80,140,0.35) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', top: '-5%', right: '-10%',
          width: '50%', height: '50%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,100,120,0.25) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '30%',
          width: '40%', height: '40%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,197,24,0.07) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }} />
      </div>

      {/* Decorative seafood icons */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <span style={{ position:'absolute', top:'8%',  left:'4%',  fontSize:'1.6rem', opacity:0.12, transform:'rotate(-15deg)' }}>🦐</span>
        <span style={{ position:'absolute', top:'15%', right:'5%', fontSize:'1.4rem', opacity:0.10, transform:'rotate(20deg)' }}>🐟</span>
        <span style={{ position:'absolute', top:'55%', left:'2%', fontSize:'1.2rem', opacity:0.08, transform:'rotate(-8deg)' }}>🦞</span>
        <span style={{ position:'absolute', top:'60%', right:'3%', fontSize:'1.3rem', opacity:0.09, transform:'rotate(12deg)' }}>🦀</span>
        <span style={{ position:'absolute', bottom:'18%', left:'8%', fontSize:'1.1rem', opacity:0.07, transform:'rotate(5deg)' }}>🐚</span>
        <span style={{ position:'absolute', bottom:'22%', right:'7%', fontSize:'1.2rem', opacity:0.08, transform:'rotate(-10deg)' }}>🦑</span>
      </div>

      {/* Logo — PNG 500x500 con transparencia real */}
      <div className="relative flex justify-center mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="La Palapa del Padrino"
          style={{
            width: 'min(82vw, 28rem)',
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 24px rgba(245,197,24,0.50)) drop-shadow(0 0 48px rgba(180,100,20,0.35))',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      {/* Restaurant name */}
      <p className="text-blue-300/60 text-xs tracking-[0.4em] uppercase font-light mb-1">La Palapa del</p>
      <h1
        className="text-5xl sm:text-7xl font-black uppercase tracking-wider text-gradient"
        style={{ fontFamily: 'Anton, Impact, sans-serif' }}
      >
        Padrino
      </h1>

      {/* Divider */}
      <div className="flex items-center justify-center gap-3 mt-5 mb-4 px-8">
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(245,197,24,0.5))' }} />
        <span className="text-gold">⚓</span>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(245,197,24,0.5))' }} />
      </div>

      <h2
        className="text-3xl sm:text-4xl text-white tracking-widest uppercase"
        style={{ fontFamily: 'Anton, Impact, sans-serif' }}
      >
        Nuestro Menú
      </h2>

      {/* Wave SVG at bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1200 40" xmlns="http://www.w3.org/2000/svg" style={{ display:'block', width:'100%' }}>
          <path
            d="M0,20 C150,40 350,0 600,20 C850,40 1050,5 1200,20 L1200,40 L0,40 Z"
            fill="#0D0D0D"
          />
        </svg>
      </div>
    </header>
  );
}

const WA_URL = 'https://wa.me/529612668076?text=Hola%2C%20me%20gustar%C3%ADa%20hacer%20un%20pedido%20a%20domicilio%20%F0%9F%9B%B5';
const MAPS_URL = 'https://maps.google.com/maps?q=Fraccionamiento+Vida+Mejor,+Av+Prosperidad,+Calle+Aries,+Colonia+Gabriel+Zepeda,+Tuxtla+Gutierrez,+Chiapas';

function Footer() {
  return (
    <footer className="bg-black border-t border-dark-border mt-16 pb-24 pt-10 px-4 text-center">
      <div className="max-w-sm mx-auto">

        {/* WhatsApp pedidos */}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl font-bold text-white text-base transition-all active:scale-95 mb-4"
          style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', boxShadow: '0 4px 24px rgba(37,211,102,0.35)' }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1.4rem', height: '1.4rem', flexShrink: 0 }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.549 4.106 1.514 5.836L.057 23.232a.75.75 0 0 0 .92.921l5.4-1.457A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.502-5.238-1.381l-.375-.214-3.882 1.048 1.048-3.882-.214-.375A9.958 9.958 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          Pedir a domicilio por WhatsApp
        </a>

        <p className="text-gray-500 text-xs mb-5">* El servicio a domicilio tiene costo adicional según la zona</p>

        {/* Teléfono */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-gold text-lg">📞</span>
          <a href="tel:9612668076" className="text-gold font-bold text-xl tracking-wider hover:text-gold-light transition-colors">
            (961) 266 80 76
          </a>
        </div>
        <p className="text-white font-semibold text-sm mb-4">Servicio a Domicilio</p>

        {/* Google Maps embed */}
        <div className="rounded-2xl overflow-hidden border border-dark-border mb-3" style={{ height: '220px' }}>
          <iframe
            title="Ubicación La Palapa del Padrino"
            src="https://maps.google.com/maps?q=Colonia+Gabriel+Zepeda,+Tuxtla+Gutierrez,+Chiapas,+Mexico&output=embed&z=15"
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-gold text-sm hover:underline mb-1"
        >
          <span>📍</span>
          <span>Abrir en Google Maps</span>
        </a>

        <p className="text-gray-500 text-xs leading-relaxed mt-1">
          Fracc. Vida Mejor, Av. Prosperidad, Calle Aries<br />
          Col. Gabriel Zepeda, Tuxtla Gutiérrez, Chiapas
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-dark-border" />
          <span className="text-gold/30 text-xs">✦</span>
          <div className="h-px flex-1 bg-dark-border" />
        </div>
        <p className="text-gray-600 text-xs mt-4">La Palapa del Padrino © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export default function MenuDisplay({ menuData }: { menuData: MenuData }) {
  const [activeSection, setActiveSection] = useState(menuData.sections[0]?.id || '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    menuData.sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [menuData.sections]);

  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <CategoryNav
        sections={menuData.sections}
        active={activeSection}
        onSelect={setActiveSection}
      />
      <main className="max-w-2xl mx-auto px-4 py-8">
        {menuData.sections.map(section => (
          <SectionBlock key={section.id} section={section} />
        ))}
      </main>
      <Footer />

      {/* Botón flotante WhatsApp */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pedir por WhatsApp"
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.25rem', zIndex: 50,
          width: '3.5rem', height: '3.5rem', borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.5)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.1)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 28px rgba(37,211,102,0.65)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(37,211,102,0.5)';
        }}
      >
        <svg viewBox="0 0 24 24" fill="white" style={{ width: '1.75rem', height: '1.75rem' }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.549 4.106 1.514 5.836L.057 23.232a.75.75 0 0 0 .92.921l5.4-1.457A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.502-5.238-1.381l-.375-.214-3.882 1.048 1.048-3.882-.214-.375A9.958 9.958 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>
    </div>
  );
}
