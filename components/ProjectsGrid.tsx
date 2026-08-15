'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { CaseStudy } from '@/services/content';

// The case studies themselves are fetched server-side (app/projects/page.tsx)
// and passed in as props — only the category filter interaction needs to be
// client-side.
export function ProjectsGrid({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const industries = Array.from(
    new Set(caseStudies.map((cs) => cs.data.industry).filter((v): v is string => !!v)),
  );
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? caseStudies : caseStudies.filter((cs) => cs.data.industry === active);

  if (caseStudies.length === 0) {
    return (
      <p className="text-text-secondary">
        Aucune étude de cas publiée pour l&apos;instant — à ajouter depuis le tableau de bord, Contenu →
        Études de cas.
      </p>
    );
  }

  return (
    <>
      {industries.length > 0 && (
        <div className="mb-16 flex flex-wrap gap-3">
          {['All', ...industries].map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-8 py-3 text-sm font-medium transition-all ${
                active === f
                  ? 'border-transparent bg-gradient-to-r from-primary-container to-secondary-container text-white shadow-lg'
                  : 'border-glass-border bg-glass-bg text-text-secondary hover:border-primary/40 hover:text-white'
              }`}
            >
              {f === 'All' ? 'Tout' : f}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {filtered.map((cs, index) => {
          if (index === 0) {
            return (
              <a
                key={cs.id}
                href={cs.data.projectUrl || '#'}
                target={cs.data.projectUrl ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="glass-card group relative overflow-hidden rounded-[32px] md:col-span-8"
              >
                <div className="relative aspect-video w-full">
                  {cs.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element -- CMS-supplied URL, arbitrary remote host
                    <img
                      src={cs.coverImage}
                      alt={cs.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-8 md:p-12">
                  <div className="space-y-3">
                    {cs.data.industry && (
                      <span className="inline-block rounded-md border border-primary/30 bg-primary/20 px-3 py-1 text-xs font-bold uppercase text-primary">
                        {cs.data.industry}
                      </span>
                    )}
                    <h3 className="font-sora text-3xl font-bold text-white md:text-4xl">{cs.title}</h3>
                    <p className="max-w-lg text-sm text-text-secondary">{cs.excerpt}</p>
                  </div>
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-glass-border bg-white/5 backdrop-blur transition-colors group-hover:bg-primary">
                    <ArrowUpRight size={22} className="text-white" />
                  </div>
                </div>
              </a>
            );
          }

          return (
            <a
              key={cs.id}
              href={cs.data.projectUrl || '#'}
              target={cs.data.projectUrl ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="glass-card glass-card-hover group relative overflow-hidden rounded-[32px] md:col-span-4"
            >
              {cs.coverImage && (
                <div className="relative aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element -- CMS-supplied URL, arbitrary remote host */}
                  <img
                    src={cs.coverImage}
                    alt={cs.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                </div>
              )}
              <div className="p-6">
                {cs.data.industry && (
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {cs.data.industry}
                  </span>
                )}
                <h3 className="font-sora mt-2 text-xl font-bold text-white">{cs.title}</h3>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}
