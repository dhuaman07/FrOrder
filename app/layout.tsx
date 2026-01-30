import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { PrimeProvider } from '@/src/presentation/providers/PrimeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SGP',
  description: 'Sistema de Gestión de Pedidos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <PrimeProvider>{children}</PrimeProvider>
      </body>
    </html>
  );
}