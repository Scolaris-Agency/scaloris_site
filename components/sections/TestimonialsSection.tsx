import { Star } from 'lucide-react';
import { contentService } from '@/services/content';
import type { ContentRefProps } from '@/services/pages';

export async function TestimonialsSection({ props }: { props: ContentRefProps }) {
  const testimonials = await contentService.listTestimonials(props.contentIds ?? []);
  if (testimonials.length === 0) return null;

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-8 py-20 md:px-16 md:py-32">
      {(props.title || props.subtitle) && (
        <div className="mb-20 space-y-4 text-center">
          {props.title && (
            <h2 className="font-sora text-4xl font-semibold text-white md:text-5xl">{props.title}</h2>
          )}
          {props.subtitle && <p className="mx-auto max-w-2xl text-text-secondary">{props.subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {testimonials.map((t) => (
          <div key={t.id} className="glass-card rounded-[32px] p-10">
            {t.data.rating && (
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.data.rating }, (_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>
            )}
            <p className="text-lg leading-relaxed text-white">&ldquo;{t.data.quote}&rdquo;</p>
            <div className="mt-6 flex items-center gap-4">
              {t.data.authorAvatar && (
                // eslint-disable-next-line @next/next/no-img-element -- CMS-supplied URL, arbitrary remote host
                <img
                  src={t.data.authorAvatar}
                  alt={t.data.authorName}
                  className="h-12 w-12 rounded-full object-cover"
                />
              )}
              <div>
                <div className="font-semibold text-white">{t.data.authorName}</div>
                {t.data.authorCompany && (
                  <div className="text-sm text-text-secondary">{t.data.authorCompany}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
