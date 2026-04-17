import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'La Palapa del Padrino — Menú',
  description: 'Menú digital de La Palapa del Padrino. Platillos de mariscos, bebidas, botellas y más. Servicio a domicilio (961) 266 80 76.',
  keywords: 'La Palapa del Padrino, menú, mariscos, Tuxtla Gutiérrez, Chiapas',
  openGraph: {
    title: 'La Palapa del Padrino — Menú',
    description: 'Platillos de mariscos, bebidas y más.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0D0D0D',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
