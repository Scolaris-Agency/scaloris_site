import { apiFetch } from '@/lib/api';

// Mirrors Scolaris_backend's SECTION_TYPES / per-type props schemas
// (pages.dto.ts) — the dashboard's Contenu → Pages builder writes these.
export type SectionType =
  | 'HERO'
  | 'FEATURES_GRID'
  | 'PRICING'
  | 'TESTIMONIALS'
  | 'FAQ'
  | 'GALLERY'
  | 'CAROUSEL'
  | 'CTA'
  | 'CONTACT'
  | 'FOOTER'
  | 'RICH_TEXT';

export interface HeroProps {
  title?: string;
  subtitle?: string;
  image?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  alignment?: 'left' | 'center' | 'right';
  background?: 'light' | 'dark' | 'image';
  spacing?: 'compact' | 'normal' | 'spacious';
  /** What the hero's visual slot shows — set from Contenu → Pages. */
  mediaType?: '3d' | 'image';
}

export interface FeaturesGridProps {
  title?: string;
  subtitle?: string;
  items?: { title: string; description: string }[];
}

// PRICING / TESTIMONIALS / FAQ sections reference Content collection rows —
// see content.ts (listPricingPlans/listTestimonials/listFaqs).
export interface ContentRefProps {
  title?: string;
  subtitle?: string;
  contentIds?: string[];
}

export interface GalleryProps {
  title?: string;
  images?: string[];
}

export interface CtaProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonHref?: string;
  background?: 'light' | 'dark';
}

export interface ContactProps {
  title?: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  address?: string;
}

// Long-form flowing content (legal pages) — `body` is rich HTML from the
// dashboard's Tiptap editor, rendered as-is (see app/legal/[slug]/page.tsx).
export interface RichTextProps {
  title?: string;
  body?: string;
}

export interface PublicSection {
  id: string;
  type: SectionType;
  order: number;
  props: Record<string, unknown>;
}

export interface PublicPage {
  id: string;
  title: string;
  slug: string;
  seoTitle: string | null;
  seoDescription: string | null;
  sections: PublicSection[];
}

export const pagesService = {
  getBySlug: (slug: string) => apiFetch<PublicPage | null>(`/pages/${slug}`).catch(() => null),
};
