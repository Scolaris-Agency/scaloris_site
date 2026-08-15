import type { FeaturesGridProps } from '@/services/pages';

export function FeaturesGridSection({ props }: { props: FeaturesGridProps }) {
  const items = props.items ?? [];
  if (items.length === 0) return null;
  // Avoid orphaning a card in its own row when the count doesn't divide
  // evenly into 3 (e.g. 4 items → 2x2 instead of 3+1 with dead space).
  const gridCols = items.length % 3 === 0 ? 'md:grid-cols-3' : items.length % 2 === 0 ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-8 py-20 md:px-16 md:py-32">
      {(props.title || props.subtitle) && (
        <div className="mb-20 space-y-4 text-center">
          {props.title && (
            <h2 className="font-sora text-4xl font-semibold text-white md:text-5xl">{props.title}</h2>
          )}
          {props.subtitle && (
            <p className="mx-auto max-w-2xl text-text-secondary">{props.subtitle}</p>
          )}
        </div>
      )}
      <div className={`grid grid-cols-1 gap-8 ${gridCols}`}>
        {items.map((item, i) => (
          <div
            key={i}
            className="glass-card glass-card-hover rounded-[32px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <h3 className="font-sora mb-4 text-2xl font-semibold text-white">{item.title}</h3>
            <p className="text-text-secondary leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
