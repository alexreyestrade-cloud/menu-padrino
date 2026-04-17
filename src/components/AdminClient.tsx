'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MenuData, MenuSection, MenuItem, SectionType } from '@/types/menu';

const CURRENCY = (n: number) => `$${n.toLocaleString('es-MX')}`;

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || 'Error al iniciar sesión');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎩</div>
          <h1 className="text-2xl font-black text-white tracking-wider uppercase" style={{ fontFamily: 'Anton, sans-serif' }}>
            Panel Admin
          </h1>
          <p className="text-gray-500 text-sm mt-1">La Palapa del Padrino</p>
        </div>

        <form onSubmit={handleLogin} className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#2A2A2A]">
          <label className="block text-sm text-gray-400 mb-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#F5C518] transition-colors"
            placeholder="••••••••"
            required
          />
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-[#F5C518] text-black font-bold py-3 rounded-xl hover:bg-[#FFD84D] transition-colors disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="/" className="text-gray-500 text-sm hover:text-white transition-colors">
            ← Ver menú
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Item Form ────────────────────────────────────────────────────────────────

function ItemForm({
  item,
  sectionType,
  onSave,
  onCancel,
}: {
  item: Partial<MenuItem>;
  sectionType: SectionType;
  onSave: (item: MenuItem) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<MenuItem>>({
    id: item.id || `item-${Date.now()}`,
    name: item.name || '',
    description: item.description || '',
    price: item.price || 0,
    priceWithBotana: item.priceWithBotana,
    halfOrderPrice: item.halfOrderPrice,
    halfOrderPriceWithBotana: item.halfOrderPriceWithBotana,
    available: item.available ?? true,
  });

  const set = (key: keyof MenuItem, value: string | number | boolean) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || form.price === undefined) return;
    onSave(form as MenuItem);
  };

  const inp = 'w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C518] transition-colors';
  const lbl = 'block text-xs text-gray-400 mb-1';

  return (
    <form onSubmit={handleSubmit} className="bg-[#1A1A1A] rounded-xl p-4 border border-[#F5C518]/30 space-y-3">
      <div>
        <label className={lbl}>Nombre *</label>
        <input className={inp} value={form.name} onChange={e => set('name', e.target.value)} required />
      </div>
      <div>
        <label className={lbl}>Descripción</label>
        <input className={inp} value={form.description || ''} onChange={e => set('description', e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>
            {sectionType === 'with-botana' ? 'Precio sin botana' : 'Precio / Orden'}
          </label>
          <input
            className={inp} type="number" min="0"
            value={form.price}
            onChange={e => set('price', Number(e.target.value))}
            required
          />
        </div>
        {sectionType === 'with-botana' && (
          <div>
            <label className={lbl}>Con botana</label>
            <input
              className={inp} type="number" min="0"
              value={form.priceWithBotana || ''}
              onChange={e => set('priceWithBotana', Number(e.target.value))}
            />
          </div>
        )}
        {sectionType === 'with-half-order' && (
          <div>
            <label className={lbl}>½ Orden</label>
            <input
              className={inp} type="number" min="0"
              value={form.halfOrderPrice || ''}
              onChange={e => set('halfOrderPrice', Number(e.target.value))}
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="available"
          checked={form.available}
          onChange={e => set('available', e.target.checked)}
          className="accent-[#F5C518] w-4 h-4"
        />
        <label htmlFor="available" className="text-sm text-gray-300">Disponible</label>
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 bg-[#F5C518] text-black font-bold py-2 rounded-lg text-sm hover:bg-[#FFD84D] transition-colors"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-[#2A2A2A] text-gray-300 py-2 rounded-lg text-sm hover:bg-[#333] transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

// ─── Section Panel ────────────────────────────────────────────────────────────

function SectionPanel({
  section,
  onChange,
}: {
  section: MenuSection;
  onChange: (section: MenuSection) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);

  const updateItem = (updated: MenuItem) => {
    onChange({
      ...section,
      items: section.items.map(i => i.id === updated.id ? updated : i),
    });
    setEditingId(null);
  };

  const addItem = (newItem: MenuItem) => {
    onChange({ ...section, items: [...section.items, newItem] });
    setAddingNew(false);
  };

  const deleteItem = (id: string) => {
    if (!confirm('¿Eliminar este producto?')) return;
    onChange({ ...section, items: section.items.filter(i => i.id !== id) });
  };

  const toggleAvailable = (id: string) => {
    onChange({
      ...section,
      items: section.items.map(i => i.id === id ? { ...i, available: !i.available } : i),
    });
  };

  return (
    <div className="space-y-2">
      {section.items.map(item => (
        <div key={item.id}>
          {editingId === item.id ? (
            <ItemForm
              item={item}
              sectionType={section.type}
              onSave={updateItem}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all ${
              item.available ? 'border-[#2A2A2A] bg-[#1A1A1A]' : 'border-[#2A2A2A] bg-[#111] opacity-50'
            }`}>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{item.name}</p>
                <p className="text-xs text-[#F5C518]">
                  {CURRENCY(item.price)}
                  {item.priceWithBotana ? ` / ${CURRENCY(item.priceWithBotana)}` : ''}
                  {item.halfOrderPrice ? ` / ½ ${CURRENCY(item.halfOrderPrice)}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleAvailable(item.id)}
                  title={item.available ? 'Ocultar' : 'Mostrar'}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#2A2A2A] text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {item.available ? '👁️' : '🚫'}
                </button>
                <button
                  onClick={() => setEditingId(item.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#2A2A2A] text-gray-400 hover:text-white transition-colors text-sm"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-900/40 text-gray-400 hover:text-red-400 transition-colors text-sm"
                >
                  🗑️
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {addingNew ? (
        <ItemForm
          item={{}}
          sectionType={section.type}
          onSave={addItem}
          onCancel={() => setAddingNew(false)}
        />
      ) : (
        <button
          onClick={() => setAddingNew(true)}
          className="w-full py-2 border border-dashed border-[#F5C518]/30 rounded-lg text-[#F5C518]/60 text-sm hover:border-[#F5C518]/60 hover:text-[#F5C518] transition-colors"
        >
          + Agregar producto
        </button>
      )}
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

function AdminDashboard({ initialMenu }: { initialMenu: MenuData }) {
  const [menu, setMenu] = useState<MenuData>(initialMenu);
  const [activeSection, setActiveSection] = useState(initialMenu.sections[0]?.id || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const section = menu.sections.find(s => s.id === activeSection);

  const updateSection = (updated: MenuSection) => {
    setMenu(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === updated.id ? updated : s),
    }));
    setSaved(false);
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/menu', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menu),
      });
      setSaving(false);
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        router.refresh();
      } else {
        const body = await res.json().catch(() => ({}));
        alert(`Error ${res.status}: ${body.error || 'Error al guardar'}. Recarga la página e intenta de nuevo.`);
      }
    } catch (err) {
      setSaving(false);
      alert(`Error de red: ${err}. Verifica tu conexión.`);
    }
  };

  const logout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#2A2A2A]">
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎩</span>
            <div>
              <p className="text-white font-bold text-sm leading-none">Panel Admin</p>
              <a href="/" className="text-[#F5C518] text-xs hover:underline">Ver menú →</a>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={saveChanges}
              disabled={saving}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                saved
                  ? 'bg-green-600 text-white'
                  : 'bg-[#F5C518] text-black hover:bg-[#FFD84D]'
              } disabled:opacity-60`}
            >
              {saving ? 'Guardando...' : saved ? '✓ Guardado' : 'Guardar'}
            </button>
            <button
              onClick={logout}
              className="px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-[#2A2A2A] transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </div>

      {/* Section tabs */}
      <div className="overflow-x-auto scrollbar-hide px-4 py-3 flex gap-2 border-b border-[#2A2A2A] max-w-2xl mx-auto">
        {menu.sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              activeSection === s.id
                ? 'bg-[#F5C518] text-black border-[#F5C518]'
                : 'bg-transparent text-gray-400 border-[#2A2A2A] hover:border-[#F5C518]/50 hover:text-white'
            }`}
          >
            {s.icon} {s.name}
          </button>
        ))}
      </div>

      {/* Section content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {section && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#F5C518] text-lg">{section.icon}</span>
              <h2 className="text-white font-bold text-lg">{section.name}</h2>
              <span className="text-gray-500 text-sm">
                ({section.items.filter(i => i.available).length}/{section.items.length} activos)
              </span>
            </div>
            <SectionPanel section={section} onChange={updateSection} />
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AdminClient({
  initialMenu,
  isAuthenticated,
}: {
  initialMenu: MenuData | null;
  isAuthenticated: boolean;
}) {
  if (!isAuthenticated || !initialMenu) {
    return <LoginScreen />;
  }
  return <AdminDashboard initialMenu={initialMenu} />;
}
