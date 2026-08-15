import { pagesService } from '@/services/pages';
import { SectionRenderer } from './sections/SectionRenderer';

// Renders every section of a Page (dashboard's Contenu → Pages, by slug) in
// order — used by pages that are fully CMS-driven (Services, legal pages).
// Home/About mix CMS sections with bespoke hand-coded blocks, so they fetch
// the page themselves and place individual sections (see getPageSections).
export async function CmsSections({ slug, fallbackTitle }: { slug: string; fallbackTitle: string }) {
  const page = await pagesService.getBySlug(slug);

  if (!page) {
    return (
      <div className="relative z-10 mx-auto max-w-3xl px-8 pb-32 pt-28 text-center sm:pt-32 md:px-16 md:pt-40 lg:pt-48">
        <h1 className="font-sora text-3xl font-bold text-white">{fallbackTitle}</h1>
        <p className="mt-4 text-text-secondary">
          Cette page n&apos;a pas encore été publiée — elle se configure depuis le tableau de bord,
          Contenu → Pages (slug « {slug} »).
        </p>
      </div>
    );
  }

  return (
    <>
      {page.sections
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
    </>
  );
}

// Home/About: fetch a page's sections and let the caller pick a specific
// one (by type) to slot into a fixed spot in an otherwise custom layout —
// see app/page.tsx and app/about/page.tsx.
export async function getPageSections(slug: string) {
  const page = await pagesService.getBySlug(slug);
  return page?.sections ?? [];
}
