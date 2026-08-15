import type { Metadata } from 'next';
import { pagesService, type RichTextProps } from '@/services/pages';

export async function generateMetadata({ params }: PageProps<'/legal/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const page = await pagesService.getBySlug(slug);
  return {
    title: page?.seoTitle || page?.title || 'Page',
    description: page?.seoDescription ?? undefined,
  };
}

// Privacy Policy / Terms of Service / Cookies (linked from the footer) are
// plain Pages (Contenu → Pages, slug "privacy-policy" etc.) carrying a
// single RICH_TEXT section — the same page/section builder as the rest of
// the site, rather than a separate content type.
export default async function LegalPage({ params }: PageProps<'/legal/[slug]'>) {
  const { slug } = await params;
  const page = await pagesService.getBySlug(slug);
  const richText = page?.sections.find((s) => s.type === 'RICH_TEXT');
  const props = richText?.props as RichTextProps | undefined;

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-background">
      {page && props?.body ? (
        <main className="relative z-10 mx-auto max-w-3xl px-8 pb-32 pt-28 sm:pt-32 md:px-16 md:pt-40 lg:pt-48">
          <h1 className="font-sora text-4xl font-bold text-white md:text-5xl">{page.title}</h1>
          <div
            className="prose prose-invert prose-headings:font-sora prose-a:text-primary mt-12 max-w-none"
            // Rich HTML from the dashboard's Tiptap editor (Contenu →
            // Pages) — staff-authored, not user input.
            dangerouslySetInnerHTML={{ __html: props.body }}
          />
        </main>
      ) : (
        <div className="relative z-10 mx-auto max-w-3xl px-8 pb-32 pt-28 text-center sm:pt-32 md:px-16 md:pt-40 lg:pt-48">
          <h1 className="font-sora text-3xl font-bold text-white">Page à venir</h1>
          <p className="mt-4 text-text-secondary">
            Cette page n&apos;a pas encore été publiée — elle se configure depuis le tableau de bord,
            Contenu → Pages (slug « {slug} »).
          </p>
        </div>
      )}
    </div>
  );
}
