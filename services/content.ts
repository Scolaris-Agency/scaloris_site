import { apiFetch } from '@/lib/api';

// Mirrors Scolaris_backend's ContentItem — one generic row per CMS
// collection (see prisma/schema.prisma), filtered here to PUBLISHED-only via
// GET /content?type=. `data` holds the type-specific fields validated
// server-side (content.dto.ts) — typed per section below rather than as
// `unknown` so callers don't need casts.
interface ContentItemBase {
  id: string;
  title: string;
  slug: string;
  order: number;
  coverImage: string | null;
  excerpt: string | null;
  body: string | null;
}

export interface TeamMember extends ContentItemBase {
  data: {
    role?: string;
    bio?: string;
    avatarUrl?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
  };
}

export interface CaseStudy extends ContentItemBase {
  data: {
    clientName?: string;
    industry?: string;
    projectUrl?: string;
    technologies?: string[];
    results?: string[];
  };
}

export interface Testimonial extends ContentItemBase {
  data: {
    quote: string;
    authorName: string;
    authorCompany?: string;
    authorAvatar?: string;
    rating?: number;
  };
}

export interface Partner extends ContentItemBase {
  data: {
    logoUrl: string;
    websiteUrl?: string;
    description?: string;
  };
}

export interface PricingPlan extends ContentItemBase {
  data: {
    price: string;
    billingPeriod?: string;
    features?: string[];
    highlighted?: boolean;
    ctaLabel?: string;
    ctaUrl?: string;
  };
}

export interface Faq extends ContentItemBase {
  data: {
    question: string;
    answer: string;
  };
}

const idsParam = (ids: string[]) => (ids.length > 0 ? `&ids=${ids.join(',')}` : '');

export const contentService = {
  listTeamMembers: () => apiFetch<TeamMember[]>('/content?type=TEAM_MEMBER').catch(() => []),
  listCaseStudies: () => apiFetch<CaseStudy[]>('/content?type=CASE_STUDY').catch(() => []),
  listTestimonials: (ids: string[] = []) =>
    apiFetch<Testimonial[]>(`/content?type=TESTIMONIAL${idsParam(ids)}`).catch(() => []),
  listPartners: () => apiFetch<Partner[]>('/content?type=PARTNER').catch(() => []),
  listPricingPlans: (ids: string[] = []) =>
    apiFetch<PricingPlan[]>(`/content?type=PRICING_PLAN${idsParam(ids)}`).catch(() => []),
  listFaqs: (ids: string[] = []) =>
    apiFetch<Faq[]>(`/content?type=FAQ${idsParam(ids)}`).catch(() => []),
};
