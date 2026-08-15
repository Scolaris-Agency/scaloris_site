import { Mail, Phone, MapPin } from 'lucide-react';
import type { ContactProps } from '@/services/pages';

export function ContactSection({ props }: { props: ContactProps }) {
  if (!props.title && !props.email && !props.phone && !props.address) return null;

  return (
    <section className="relative z-10 mx-auto max-w-3xl px-8 py-20 text-center md:px-16 md:py-32">
      {props.title && (
        <h2 className="font-sora mb-4 text-4xl font-semibold text-white md:text-5xl">{props.title}</h2>
      )}
      {props.subtitle && <p className="mb-12 text-text-secondary">{props.subtitle}</p>}
      <div className="flex flex-wrap justify-center gap-8">
        {props.email && (
          <a href={`mailto:${props.email}`} className="flex items-center gap-3 text-white">
            <Mail size={18} className="text-primary" /> {props.email}
          </a>
        )}
        {props.phone && (
          <a href={`tel:${props.phone}`} className="flex items-center gap-3 text-white">
            <Phone size={18} className="text-tertiary" /> {props.phone}
          </a>
        )}
        {props.address && (
          <span className="flex items-center gap-3 text-white">
            <MapPin size={18} className="text-accent-pink" /> {props.address}
          </span>
        )}
      </div>
    </section>
  );
}
