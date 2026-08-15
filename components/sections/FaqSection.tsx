import { contentService } from '@/services/content';
import type { ContentRefProps } from '@/services/pages';

// Native <details>/<summary> — expand/collapse works without any client JS.
export async function FaqSection({ props }: { props: ContentRefProps }) {
  const faqs = await contentService.listFaqs(props.contentIds ?? []);
  if (faqs.length === 0) return null;

  return (
    <section className="relative z-10 mx-auto max-w-3xl px-8 py-20 md:px-16 md:py-32">
      {(props.title || props.subtitle) && (
        <div className="mb-16 space-y-4 text-center">
          {props.title && (
            <h2 className="font-sora text-4xl font-semibold text-white md:text-5xl">{props.title}</h2>
          )}
          {props.subtitle && <p className="text-text-secondary">{props.subtitle}</p>}
        </div>
      )}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details key={faq.id} className="glass-card group rounded-2xl p-6">
            <summary className="cursor-pointer list-none font-sora text-lg font-semibold text-white marker:content-none">
              {faq.data.question}
            </summary>
            <p className="mt-4 leading-relaxed text-text-secondary">{faq.data.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
