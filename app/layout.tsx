import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { agencyService } from '@/services/agency';

const sora = Sora({
  variable: '--font-sora-import',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  variable: '--font-inter-import',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export async function generateMetadata(): Promise<Metadata> {
  const agency = await agencyService.get();
  const name = agency.agencyName || 'Scaloris';
  return {
    title: { default: name, template: `%s | ${name}` },
    description: agency.agencyTagline || 'Agence digitale.',
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetched once here (Server Component, ISR-cached — see lib/api.ts) and
  // passed down to Navbar/Footer as props, so the real agency identity is
  // in the initial HTML on every page instead of a client-side fetch.
  const agency = await agencyService.get();

  return (
    <html lang="fr" className={`${sora.variable} ${inter.variable} dark`}>
      <body className="min-h-dvh bg-background text-white antialiased">
        <Navbar agency={agency} />
        {children}
        <Footer agency={agency} />
      </body>
    </html>
  );
}
