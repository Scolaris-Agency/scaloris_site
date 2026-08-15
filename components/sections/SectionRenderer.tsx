import type { PublicSection } from '@/services/pages';
import { HeroSection } from './HeroSection';
import { FeaturesGridSection } from './FeaturesGridSection';
import { PricingSection } from './PricingSection';
import { TestimonialsSection } from './TestimonialsSection';
import { FaqSection } from './FaqSection';
import { GallerySection } from './GallerySection';
import { CtaSection } from './CtaSection';
import { ContactSection } from './ContactSection';

// One component per SectionType (pages.dto.ts's SECTION_TYPES), styled to
// match the site's existing dark-glass aesthetic. PRICING/TESTIMONIALS/FAQ
// are async Server Components (they fetch their referenced Content rows
// server-side) — rendering them via JSX here, without awaiting, is the
// correct RSC pattern; React resolves them as part of the render tree.
// FOOTER isn't rendered here — the site has a single global <Footer> shared
// across every route (see app/layout.tsx).
export function SectionRenderer({ section }: { section: PublicSection }) {
  switch (section.type) {
    case 'HERO':
      return <HeroSection props={section.props} />;
    case 'FEATURES_GRID':
      return <FeaturesGridSection props={section.props} />;
    case 'PRICING':
      return <PricingSection props={section.props} />;
    case 'TESTIMONIALS':
      return <TestimonialsSection props={section.props} />;
    case 'FAQ':
      return <FaqSection props={section.props} />;
    case 'GALLERY':
    case 'CAROUSEL':
      return <GallerySection props={section.props} />;
    case 'CTA':
      return <CtaSection props={section.props} />;
    case 'CONTACT':
      return <ContactSection props={section.props} />;
    case 'FOOTER':
    default:
      return null;
  }
}
