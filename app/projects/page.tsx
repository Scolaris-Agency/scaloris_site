import type { Metadata } from 'next';
import Link from 'next/link';
import { contentService } from '@/services/content';
import { ProjectsGrid } from '@/components/ProjectsGrid';

export const metadata: Metadata = { title: 'Projets' };

export default async function ProjectsPage() {
  const caseStudies = await contentService.listCaseStudies();

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="aurora-blob bg-primary-container opacity-20"
          style={{ width: 600, height: 600, top: '-10%', left: '-10%' }}
        />
        <div
          className="aurora-blob bg-tertiary opacity-15"
          style={{ width: 500, height: 500, bottom: '-10%', right: '-10%' }}
        />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-8 pb-32 pt-28 sm:pt-32 md:px-16 md:pt-40 lg:pt-48">
        <header className="mb-20 space-y-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Notre portfolio
            </span>
          </div>
          <h1 className="font-sora text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-7xl">
            Nos <span className="text-gradient">réalisations</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-text-secondary">
            Une sélection d&apos;expériences numériques pensées pour la performance et la précision
            technique.
          </p>
        </header>

        <ProjectsGrid caseStudies={caseStudies} />

        <section className="mt-32 overflow-hidden rounded-[48px] border border-glass-border bg-gradient-to-br from-primary/10 to-tertiary/10 p-12 text-center md:p-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-0 top-0 h-64 w-64 bg-primary opacity-10 blur-[100px]" />
            <div className="absolute bottom-0 right-0 h-64 w-64 bg-tertiary opacity-10 blur-[100px]" />
          </div>
          <div className="relative z-10 space-y-8">
            <h2 className="font-sora text-4xl font-bold text-white md:text-5xl">
              Un projet ambitieux en tête ?
            </h2>
            <p className="mx-auto max-w-xl text-lg text-text-secondary">
              Nous sommes toujours à la recherche du prochain défi. Construisons ensemble quelque
              chose qui fait entrer le futur dans le présent.
            </p>
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link
                href="/start"
                className="rounded-full bg-primary-container px-10 py-5 text-base font-bold text-white shadow-[0_20px_40px_rgba(124,58,237,0.3)] transition-all hover:scale-105"
              >
                Démarrer l&apos;aventure
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-glass-border bg-glass-bg px-10 py-5 text-base font-bold text-white backdrop-blur-md transition-all hover:bg-white/5"
              >
                Voir notre process
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
