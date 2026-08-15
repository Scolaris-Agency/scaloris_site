import { apiFetch } from '@/lib/api';

// Mirrors Scolaris_backend's AgencyConfig (settings.service.ts) — the single
// source of truth for the agency's own identity, editable from the
// dashboard's Paramètres → Agence.
export interface AgencyConfig {
  agencyName: string;
  agencyLogoUrl: string;
  agencyFooterLogoUrl: string;
  agencyTagline: string;
  agencyEmail: string;
  agencyPhone: string;
  agencyWebsite: string;
  agencyAddress: string;
  agencyCity: string;
  agencyPostalCode: string;
  agencyCountry: string;
  socialLinkedin: string;
  socialInstagram: string;
  socialFacebook: string;
  socialX: string;
}

export const EMPTY_AGENCY: AgencyConfig = {
  agencyName: '',
  agencyLogoUrl: '',
  agencyFooterLogoUrl: '',
  agencyTagline: '',
  agencyEmail: '',
  agencyPhone: '',
  agencyWebsite: '',
  agencyAddress: '',
  agencyCity: '',
  agencyPostalCode: '',
  agencyCountry: '',
  socialLinkedin: '',
  socialInstagram: '',
  socialFacebook: '',
  socialX: '',
};

export const agencyService = {
  get: () => apiFetch<AgencyConfig>('/agency').catch(() => EMPTY_AGENCY),
};
