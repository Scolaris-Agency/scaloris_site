import { CheckCircle2 } from 'lucide-react';
import { contentService } from '@/services/content';
import type { ContentRefProps } from '@/services/pages';

// Async Server Component — fetched server-side at render/revalidation time
// (see contentService.listPricingPlans), no client-side loading state needed.
export async function PricingSection({ props }: { props: ContentRefProps }) {
  const plans = await contentService.listPricingPlans(props.contentIds ?? []);
  if (plans.length === 0) return null;

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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`glass-card rounded-[32px] p-10 ${
              plan.data.highlighted ? 'border-primary/40 shadow-[0_20px_50px_rgba(124,58,237,0.25)]' : ''
            }`}
          >
            <h3 className="font-sora text-2xl font-semibold text-white">{plan.title}</h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-sora text-4xl font-bold text-white">{plan.data.price}</span>
              {plan.data.billingPeriod && (
                <span className="text-text-secondary">/{plan.data.billingPeriod}</span>
              )}
            </div>
            {plan.excerpt && <p className="mt-4 text-text-secondary">{plan.excerpt}</p>}
            {(plan.data.features ?? []).length > 0 && (
              <ul className="mt-8 space-y-3">
                {plan.data.features!.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-text-secondary">
                    <CheckCircle2 size={15} className="flex-shrink-0 text-tertiary" />
                    {f}
                  </li>
                ))}
              </ul>
            )}
            {plan.data.ctaLabel && (
              <a
                href={plan.data.ctaUrl || '/start'}
                className="mt-8 block rounded-full bg-primary-container px-6 py-3 text-center text-sm font-semibold text-white transition-all hover:scale-105"
              >
                {plan.data.ctaLabel}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
