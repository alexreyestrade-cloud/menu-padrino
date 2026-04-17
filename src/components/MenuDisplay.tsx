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
    <header className="relative overflow-hidden bg-gradient-to-b from-black to-dark pt-10 pb-8 text-center">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, #F5C518 0%, transparent 50%), radial-gradient(circle at 80% 20%, #F5C518 0%, transparent 40%)'
      }} />

      {/* Logo */}
      <div className="relative flex justify-center mb-4">
        <div className="w-28 h-28 rounded-full border-4 border-gold/60 overflow-hidden bg-amber-900/20 flex items-center justify-center shadow-2xl shadow-gold/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="La Palapa del Padrino"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.innerHTML = '<span style="font-size:3rem">🎩</span>';
            }}
          />
        </div>
      </div>

      {/* Restaurant name */}
      <p className="text-gray-400 text-sm tracking-[0.3em] uppercase font-light mb-1">La Palapa del</p>
      <h1
        className="text-5xl sm:text-6xl font-black uppercase tracking-wider text-gradient"
        style={{ fontFamily: 'Anton, Impact, sans-serif' }}
      >
        Padrino
      </h1>

      {/* Divider */}
      <div className="flex items-center justify-center gap-3 mt-5 mb-4 px-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
        <span className="text-gold text-lg">✦</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
      </div>

      <h2
        className="text-3xl sm:text-4xl text-white tracking-widest uppercase"
        style={{ fontFamily: 'Anton, Impact, sans-serif' }}
      >
        Nuestro Menú
      </h2>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-dark-border mt-16 py-10 px-4 text-center">
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-gold text-xl">📞</span>
          <a
            href="tel:9612668076"
            className="text-gold font-bold text-2xl tracking-wider hover:text-gold-light transition-colors"
          >
            (961) 266 80 76
          </a>
        </div>
        <p className="text-white font-semibold mt-1 mb-1">Servicio a Domicilio</p>
        <p className="text-gray-400 text-sm leading-relaxed">
          Fracc. Vida Mejor, Av. Prosperidad, Calle Aries<br />
          Col. Gabriel Zepeda, Tuxtla Gutiérrez, Chiapas
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-dark-border" />
          <span className="text-gold/40 text-xs">✦</span>
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
    </div>
  );
}
