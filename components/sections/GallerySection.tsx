import type { GalleryProps } from '@/services/pages';

export function GallerySection({ props }: { props: GalleryProps }) {
  const images = props.images ?? [];
  if (images.length === 0) return null;

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-8 py-20 md:px-16 md:py-32">
      {props.title && (
        <h2 className="font-sora mb-16 text-center text-4xl font-semibold text-white md:text-5xl">
          {props.title}
        </h2>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {images.map((img, i) => (
          <div key={i} className="glass-card overflow-hidden rounded-[32px]">
            {/* eslint-disable-next-line @next/next/no-img-element -- CMS-supplied URL, arbitrary remote host */}
            <img src={img} alt="" className="aspect-square w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
