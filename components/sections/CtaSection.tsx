import Link from 'next/link';
import type { CtaProps } from '@/services/pages';

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function CtaSection({ props }: { props: CtaProps }) {
  if (!props.title) return null;
  const href = props.buttonHref || '/start';
  const className =
    'rounded-full bg-primary-container px-12 py-5 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(124,58,237,0.3)] transition-all hover:scale-105';

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-8 py-20 md:px-16 md:py-32">
      <div className="relative overflow-hidden rounded-[48px] border border-glass-border bg-glass-bg p-12 text-center backdrop-blur-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:p-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-tertiary/20" />
        <div className="relative z-10 mx-auto max-w-3xl space-y-8">
          <h2 className="font-sora text-4xl font-bold text-white md:text-6xl">{props.title}</h2>
          {props.subtitle && <p className="text-lg text-text-secondary">{props.subtitle}</p>}
          {props.buttonLabel && (
            <div className="flex justify-center pt-4">
              {isExternal(href) ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                  {props.buttonLabel}
                </a>
              ) : (
                <Link href={href} className={className}>
                  {props.buttonLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
