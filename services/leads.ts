import { apiFetch } from '@/lib/api';

// POST /leads — the actual top of the CRM funnel: a public submission lands
// as a real Lead (source: "website", status: NEW) in the dashboard's CRM →
// Leads. Called client-side from ContactForm.tsx (interactive form), unlike
// every other service here which runs server-side.
export interface LeadSubmission {
  company: string;
  contact: string;
  email: string;
  phone?: string;
  notes?: string;
  // Honeypot — always empty for real visitors (hidden field, see
  // ContactForm.tsx). Never read; only whether it's non-empty matters
  // server-side.
  website?: string;
}

export const leadsService = {
  submit: (payload: LeadSubmission) =>
    apiFetch<{ success: true }>('/leads', { method: 'POST', body: payload }),
};
