import Link from 'next/link';
import { Globe, Mail, MapPin } from 'lucide-react';
import type { AgencyConfig } from '@/services/agency';

const legalLinks = [
  { label: 'Confidentialité', slug: 'privacy-policy' },
  { label: "Conditions d'utilisation", slug: 'terms-of-service' },
  { label: 'Cookies', slug: 'cookies' },
];

// Plain Server Component — no client hooks needed, so this whole footer
// (including the legal links) is present in the initial server-rendered
// HTML, not bolted on after hydration.
export function Footer({ agency }: { agency: AgencyConfig }) {
  const agencyName = agency.agencyName || 'SCALORIS';
  // Falls back to the header logo if no dedicated footer variant was
  // uploaded (Paramètres → Agence → Logo — pied de page).
  const footerLogo = agency.agencyFooterLogoUrl || agency.agencyLogoUrl;
  const socials = [
    { href: agency.socialLinkedin, icon: Globe },
    { href: agency.agencyEmail ? `mailto:${agency.agencyEmail}` : '', icon: Mail },
    { href: agency.agencyWebsite, icon: MapPin },
  ].filter((s) => s.href);

  return (
    <footer className="w-full rounded-t-[48px] border-t border-glass-border bg-glass-bg backdrop-blur-[32px]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-12 px-8 py-20 md:grid-cols-4 md:px-16">
        <div className="col-span-2 space-y-6 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-sora text-2xl font-bold tracking-tighter text-white">
            {footerLogo && (
              // eslint-disable-next-line @next/next/no-img-element -- CMS-supplied URL, arbitrary remote host
              <img src={footerLogo} alt="" className="h-8 w-8 object-contain" />
            )}
            {agencyName}
          </Link>
          <p className="text-sm leading-relaxed text-text-secondary">
            {agency.agencyTagline || 'Des produits numériques conçus avec précision pour des marques visionnaires.'}
          </p>
          {socials.length > 0 && (
            <div className="flex gap-3">
              {socials.map(({ href, icon: Icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-border text-text-secondary transition-all hover:border-primary hover:bg-primary hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h5 className="text-xs font-bold uppercase tracking-widest text-white">Agence</h5>
          <ul className="space-y-4 text-sm text-text-secondary">
            {[
              { label: 'À propos', to: '/about' },
              { label: 'Notre process', to: '/services' },
              { label: 'Projets', to: '/projects' },
              { label: 'Démarrer un projet', to: '/start' },
            ].map((item) => (
              <li key={item.label}>
                <Link href={item.to} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h5 className="text-xs font-bold uppercase tracking-widest text-white">Services</h5>
          <ul className="space-y-4 text-sm text-text-secondary">
            {['Développement web', 'Applications SaaS', 'Applications mobiles', 'Stratégie de marque'].map((item) => (
              <li key={item}>
                <Link href="/services" className="transition-colors hover:text-white">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h5 className="text-xs font-bold uppercase tracking-widest text-white">Contact</h5>
          <ul className="space-y-4 text-sm text-text-secondary">
            {agency.agencyEmail && <li>{agency.agencyEmail}</li>}
            {agency.agencyPhone && <li>{agency.agencyPhone}</li>}
            {!agency.agencyEmail && !agency.agencyPhone && (
              <li className="text-text-secondary/50">Coordonnées à configurer</li>
            )}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-glass-border px-8 py-8 text-xs text-text-secondary md:flex-row md:px-16">
        <span>© {new Date().getFullYear()} {agencyName}. Tous droits réservés.</span>
        <div className="flex gap-8">
          {legalLinks.map((l) => (
            <Link key={l.slug} href={`/legal/${l.slug}`} className="transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
