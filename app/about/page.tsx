import type { Metadata } from 'next';
import Link from 'next/link';
import { contentService } from '@/services/content';
import { pagesService } from '@/services/pages';
import { getPageSections } from '@/components/CmsSections';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesGridSection } from '@/components/sections/FeaturesGridSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { CtaSection } from '@/components/sections/CtaSection';
import type { HeroProps, FeaturesGridProps, GalleryProps, CtaProps } from '@/services/pages';

const timeline = [
  {
    year: '2018',
    title: 'Genèse',
    desc: 'Fondée par une poignée d\'ingénieurs déterminés à bien faire les choses.',
    color: 'bg-primary shadow-[0_0_20px_rgba(210,187,255,0.8)]',
    textColor: 'text-primary',
  },
  {
    year: '2020',
    title: 'Expansion',
    desc: 'Constitution d\'une équipe complète et lancement de notre propre méthode de conception et de livraison.',
    color: 'bg-tertiary shadow-[0_0_20px_rgba(47,217,244,0.8)]',
    textColor: 'text-tertiary',
  },
  {
    year: '2023',
    title: 'L\'orbite',
    desc: 'Accompagnement de clients ambitieux pour réinventer ce que leur logiciel pouvait être.',
    color: 'bg-accent-pink shadow-[0_0_20px_rgba(236,72,153,0.8)]',
    textColor: 'text-accent-pink',
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const page = await pagesService.getBySlug('about');
  return {
    title: page?.seoTitle || page?.title || 'À propos',
    description: page?.seoDescription ?? undefined,
  };
}

// Hero, Philosophy and Studio are editable from the dashboard's Contenu →
// Pages (slug "about"). Timeline stays hand-coded (no SectionType fits a
// chronological journey) and Team stays driven by Contenu → Équipe — both
// already achieve "editable by non-devs" through their own mechanism.
export default async function AboutPage() {
  const [sections, team] = await Promise.all([
    getPageSections('about'),
    contentService.listTeamMembers(),
  ]);
  const hero = sections.find((s) => s.type === 'HERO');
  const philosophy = sections.find((s) => s.type === 'FEATURES_GRID');
  const studio = sections.find((s) => s.type === 'GALLERY');
  const cta = sections.find((s) => s.type === 'CTA');

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="aurora-blob bg-primary-container opacity-15" style={{ width: 500, height: 500, top: '-100px', left: '-100px' }} />
        <div className="aurora-blob bg-tertiary opacity-15" style={{ width: 600, height: 600, bottom: '-200px', right: '-100px' }} />
      </div>

      {/* Hero — editable: Contenu → Pages → À propos */}
      {hero && <HeroSection props={{ ...(hero.props as HeroProps), alignment: 'center' }} />}

      <main className="relative z-10 mx-auto max-w-7xl px-8 pb-20 md:px-16">
        {/* Philosophy — editable: Contenu → Pages → À propos */}
        {philosophy && <FeaturesGridSection props={philosophy.props as FeaturesGridProps} />}

        {/* Studio — editable: Contenu → Pages → À propos */}
        {studio && <GallerySection props={studio.props as GalleryProps} />}

        {/* Timeline */}
        <section className="mb-40 mt-40">
          <h2 className="font-sora mb-16 text-center text-4xl font-semibold text-white md:text-5xl">
            Notre parcours
          </h2>
          {/* Mobile: single left-rail list (rail + dot at left-4, full-width
              text). md+: restores the original alternating left/right rail
              centered at left-1/2. */}
          <div className="relative mx-auto max-w-4xl py-20">
            <div className="absolute bottom-0 left-4 top-0 w-px bg-glass-border md:left-1/2 md:-translate-x-1/2" />
            <div className="space-y-16 md:space-y-32">
              {timeline.map(({ year, title, desc, color, textColor }, i) => (
                <div key={year} className="group relative flex items-start pl-12 md:items-center md:pl-0">
                  {i % 2 === 0 ? (
                    <>
                      <div className="w-full text-left md:flex-1 md:pr-12 md:text-right">
                        <span className={`font-sora mb-2 block text-4xl font-bold opacity-50 ${textColor}`}>
                          {year}
                        </span>
                        <h4 className="font-sora mb-2 text-2xl font-bold text-white">{title}</h4>
                        <p className="text-sm text-text-secondary">{desc}</p>
                      </div>
                      <div
                        className={`absolute left-4 top-1 z-10 h-4 w-4 -translate-x-1/2 rounded-full transition-transform group-hover:scale-150 md:left-1/2 md:top-auto ${color}`}
                      />
                      <div className="hidden md:block md:flex-1 md:pl-12" />
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block md:flex-1 md:pr-12" />
                      <div
                        className={`absolute left-4 top-1 z-10 h-4 w-4 -translate-x-1/2 rounded-full transition-transform group-hover:scale-150 md:left-1/2 md:top-auto ${color}`}
                      />
                      <div className="w-full text-left md:flex-1 md:pl-12">
                        <span className={`font-sora mb-2 block text-4xl font-bold opacity-50 ${textColor}`}>
                          {year}
                        </span>
                        <h4 className="font-sora mb-2 text-2xl font-bold text-white">{title}</h4>
                        <p className="text-sm text-text-secondary">{desc}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-40">
          <div className="mb-16 flex items-center justify-between">
            <div>
              <h2 className="font-sora mb-4 text-4xl font-semibold text-white md:text-5xl">
                Le collectif
              </h2>
              <p className="text-text-secondary">Les esprits brillants derrière chaque réalisation.</p>
            </div>
            <Link
              href="/start"
              className="rounded-full border border-glass-border bg-glass-bg px-6 py-2 text-sm font-medium text-white transition-colors hover:text-primary"
            >
              Nous rejoindre
            </Link>
          </div>

          {team.length === 0 ? (
            <p className="text-text-secondary">
              Équipe à venir — à ajouter depuis le tableau de bord, Contenu → Équipe.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="glass-card group rounded-[40px] p-6 text-center transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-[32px]">
                    {member.data.avatarUrl && (
                      // eslint-disable-next-line @next/next/no-img-element -- CMS-supplied URL, arbitrary remote host
                      <img
                        src={member.data.avatarUrl}
                        alt={member.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-background/80 to-transparent pb-6 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex gap-4">
                        {member.data.linkedinUrl && (
                          <a
                            href={member.data.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-xs text-white backdrop-blur-md hover:bg-primary"
                          >
                            in
                          </a>
                        )}
                        {member.data.twitterUrl && (
                          <a
                            href={member.data.twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-xs text-white backdrop-blur-md hover:bg-primary"
                          >
                            ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <h4 className="font-sora mb-1 text-xl font-bold text-white">{member.title}</h4>
                  <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                    {member.data.role}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* CTA — editable: Contenu → Pages → À propos */}
      {cta && <CtaSection props={cta.props as CtaProps} />}
    </div>
  );
}
