import Link from "next/link";
import { Rocket, Users, Clock, ArrowUpRight, Sparkles } from "lucide-react";
import { contentService } from "@/services/content";
import { getPageSections } from "@/components/CmsSections";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesGridSection } from "@/components/sections/FeaturesGridSection";
import { CtaSection } from "@/components/sections/CtaSection";
import type { HeroProps, FeaturesGridProps, CtaProps } from "@/services/pages";

const AVATAR_COLORS = [
  "text-primary",
  "text-tertiary",
  "text-accent-pink",
  "text-secondary",
];

// The hero, the "Our Expertise" teaser, and the final CTA are editable from
// the dashboard's Contenu → Pages (slug "home"). The bento stats and the
// team/case-studies/partners blocks below stay hand-coded / driven by their
// own Content collections — there's no SectionType that fits a bento stat
// grid, and team/case-studies/partners are already independently editable
// via Contenu → Équipe / Études de cas / Partenaires.
export default async function HomePage() {
  const [sections, partners, caseStudies, team] = await Promise.all([
    getPageSections("home"),
    contentService.listPartners(),
    contentService.listCaseStudies(),
    contentService.listTeamMembers(),
  ]);
  const hero = sections.find((s) => s.type === "HERO");
  const featuresGrid = sections.find((s) => s.type === "FEATURES_GRID");
  const cta = sections.find((s) => s.type === "CTA");
  const featuredCaseStudies = caseStudies.slice(0, 2);

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-background">
      {/* Aurora background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="aurora-blob bg-primary-container opacity-20"
          style={{ width: 600, height: 600, top: "-10%", left: "-10%" }}
        />
        <div
          className="aurora-blob bg-tertiary opacity-15"
          style={{ width: 500, height: 500, bottom: "-10%", right: "-5%" }}
        />
      </div>

      {/* Hero — editable: Contenu → Pages → Accueil */}
      {hero && <HeroSection props={hero.props as HeroProps} />}

      {/* Marquee */}
      {partners.length > 0 && (
        <section className="overflow-hidden border-y border-glass-border bg-white/[0.02] py-10 backdrop-blur-[32px]">
          <div className="flex animate-marquee gap-20 whitespace-nowrap">
            {[...partners, ...partners].map((p, i) => (
              // eslint-disable-next-line @next/next/no-img-element -- CMS-supplied URL, arbitrary remote host
              <img
                key={i}
                src={p.data.logoUrl}
                alt={p.title}
                className="h-15 opacity-20 grayscale transition-all hover:opacity-60 hover:grayscale-0"
              />
            ))}
          </div>
        </section>
      )}

      {/* Stats Bento */}
      <section className="relative z-10 mx-auto max-w-7xl px-8 py-20 md:px-16 md:py-32">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="glass-card glass-card-hover flex flex-col justify-between rounded-[32px] p-8 md:col-span-4">
            <Rocket size={36} className="mb-12 text-primary" />
            <div>
              <h4 className="font-sora text-5xl font-bold leading-none text-white mb-2 md:text-[64px]">
                120+
              </h4>
              <p className="text-sm text-text-secondary">
                Projets livrés dans le monde entier
              </p>
            </div>
          </div>
          <div className="glass-card glass-card-hover relative overflow-hidden rounded-[32px] p-12 md:col-span-8">
            <div className="relative z-10 flex h-full flex-col justify-center">
              <h4 className="font-sora text-4xl font-semibold text-white mb-4">
                98% de clients satisfaits
              </h4>
              <p className="max-w-md text-text-secondary">
                Notre exigence de qualité et notre rigueur technique font de
                nous un partenaire de confiance pour des entreprises
                ambitieuses.
              </p>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/10 to-transparent" />
          </div>
          <div className="glass-card glass-card-hover flex items-center gap-6 rounded-[32px] p-8 md:col-span-6">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl border border-glass-border bg-tertiary/10">
              <Users size={30} className="text-tertiary" />
            </div>
            <div>
              <h4 className="font-sora text-3xl font-semibold text-white">
                15+ experts
              </h4>
              <p className="text-sm text-text-secondary">
                Designers et ingénieurs seniors
              </p>
            </div>
          </div>
          <div className="glass-card glass-card-hover flex items-center gap-6 rounded-[32px] p-8 md:col-span-6">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl border border-glass-border bg-accent-pink/10">
              <Clock size={30} className="text-accent-pink" />
            </div>
            <div>
              <h4 className="font-sora text-3xl font-semibold text-white">
                8 ans
              </h4>
              <p className="text-sm text-text-secondary">
                D&apos;expertise en innovation numérique
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="relative z-10 mx-auto max-w-7xl px-8 py-20 md:px-16 md:py-32">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="space-y-3">
            <h2 className="font-sora text-4xl font-semibold text-white md:text-5xl">
              Projets sélectionnés
            </h2>
            <p className="text-text-secondary">
              Un aperçu de nos réalisations.
            </p>
          </div>
        </div>

        {featuredCaseStudies.length > 0 ? (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {featuredCaseStudies.map((cs) => (
              <Link
                key={cs.id}
                href="/projects"
                className="group cursor-pointer"
              >
                <div className="relative mb-6 overflow-hidden rounded-[32px] border border-glass-border bg-surface-container shadow-[0_20px_50px_rgba(0,0,0,0.5)] aspect-[4/3]">
                  {cs.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element -- CMS-supplied URL, arbitrary remote host
                    <img
                      src={cs.coverImage}
                      alt={cs.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  {cs.data.industry && (
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-surface/80 to-transparent p-8 opacity-0 backdrop-blur-[4px] transition-opacity group-hover:opacity-100">
                      <span className="rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-on-primary shadow-lg">
                        {cs.data.industry}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between px-2">
                  <div>
                    <h3 className="font-sora text-2xl font-semibold text-white mb-1">
                      {cs.title}
                    </h3>
                    <p className="text-sm text-text-secondary">{cs.excerpt}</p>
                  </div>
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-glass-border backdrop-blur-md transition-all group-hover:border-primary group-hover:bg-primary">
                    <ArrowUpRight
                      size={20}
                      className="transition-colors group-hover:text-white"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-text-secondary">
            Aucune étude de cas publiée pour l&apos;instant — à ajouter depuis
            Contenu → Études de cas.
          </p>
        )}

        <div className="mt-20 flex justify-center">
          <Link
            href="/projects"
            className="glass-card flex items-center gap-3 rounded-full px-12 py-5 text-sm font-semibold text-white transition-all hover:border-primary/40 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          >
            Découvrir plus de projets <Sparkles size={18} />
          </Link>
        </div>
      </section>

      {/* Services teaser — editable: Contenu → Pages → Accueil */}
      {featuresGrid && (
        <FeaturesGridSection props={featuresGrid.props as FeaturesGridProps} />
      )}

      {/* Team */}
      {team.length > 0 && (
        <section className="relative z-10 mx-auto max-w-7xl px-8 py-20 md:px-16 md:py-32">
          <div className="mb-20 space-y-4 text-center">
            <h2 className="font-sora text-4xl font-semibold text-white md:text-5xl">
              L&apos;équipe
            </h2>
            <p className="mx-auto max-w-xl text-text-secondary">
              Les esprits visionnaires derrière chaque projet.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <div
                key={member.id}
                className="group relative overflow-hidden rounded-[32px] border border-glass-border bg-surface-container aspect-[3/4] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                {member.data.avatarUrl && (
                  // eslint-disable-next-line @next/next/no-img-element -- CMS-supplied URL, arbitrary remote host
                  <img
                    src={member.data.avatarUrl}
                    alt={member.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 transition-transform duration-500 group-hover:-translate-y-3">
                  <h4 className="font-sora text-xl font-bold text-white">
                    {member.title}
                  </h4>
                  <p
                    className={`text-sm font-medium ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                  >
                    {member.data.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA — editable: Contenu → Pages → Accueil */}
      {cta && <CtaSection props={cta.props as CtaProps} />}
    </div>
  );
}
