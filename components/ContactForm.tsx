'use client';

import { useState } from 'react';
import { Globe, Smartphone, Palette, Sparkles, Mail, Phone, Rocket } from 'lucide-react';
import type { AgencyConfig } from '@/services/agency';
import { leadsService } from '@/services/leads';

const projectTypes = [
  { label: 'Application web', icon: Globe, color: 'text-primary' },
  { label: 'Mobile', icon: Smartphone, color: 'text-tertiary' },
  { label: 'Identité de marque', icon: Palette, color: 'text-accent-pink' },
  { label: 'IA / Web3', icon: Sparkles, color: 'text-secondary' },
];

const BUDGET_RANGES = ['10 000 € - 25 000 €', '25 000 € - 50 000 €', '50 000 € - 100 000 €', '100 000 €+'];

export function ContactForm({ agency }: { agency: AgencyConfig }) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [budget, setBudget] = useState(BUDGET_RANGES[0]);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — see leads.ts
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const notesParts = [
        selectedType && `Type de projet : ${selectedType}`,
        `Budget : ${budget}`,
        message,
      ].filter(Boolean);
      await leadsService.submit({
        company,
        contact: name,
        email,
        notes: notesParts.join('\n'),
        website,
      });
      setSubmitted(true);
    } catch {
      setError('Une erreur est survenue — vérifiez votre connexion et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative z-10 mx-auto max-w-7xl px-8 pb-20 pt-28 sm:pt-32 md:px-16 md:pt-40">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
        {/* Form */}
        <div className="space-y-12 lg:col-span-7">
          <header className="space-y-4">
            <span className="inline-flex items-center rounded-full border border-primary-container/30 bg-primary-container/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              Démarrage de projet
            </span>
            <h1 className="font-sora text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-7xl">
              Construisons le <span className="text-gradient">futur</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
              Parlez-nous de votre vision, nous nous chargeons de la concrétiser. Votre projet
              numérique commence par une simple conversation.
            </p>
          </header>

          <div className="glass-card relative overflow-hidden rounded-[32px] p-8 md:p-12">
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-tertiary opacity-60" />

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-tertiary/10">
                  <Rocket size={40} className="text-tertiary" />
                </div>
                <h3 className="font-sora mb-4 text-3xl font-bold text-white">Mission lancée !</h3>
                <p className="max-w-sm text-text-secondary">
                  Merci ! Notre équipe vous recontactera sous 4 heures. Préparez-vous à construire
                  quelque chose d&apos;extraordinaire.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Honeypot — invisible to real visitors, catches naive bots
                    that fill every field they find. */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />
                {/* Step 1 */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container text-sm font-bold text-white">
                      1
                    </div>
                    <h3 className="font-sora text-2xl font-semibold text-white">
                      Pour qui construisons-nous ?
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-secondary">Nom complet</label>
                      <input
                        type="text"
                        placeholder="Jean Dupont"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-glass-border bg-[#0A0C1F] px-4 py-3 text-white outline-none placeholder:text-text-secondary/30 focus:ring-2 focus:ring-tertiary/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-secondary">Entreprise</label>
                      <input
                        type="text"
                        placeholder="Acme Inc."
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full rounded-xl border border-glass-border bg-[#0A0C1F] px-4 py-3 text-white outline-none placeholder:text-text-secondary/30 focus:ring-2 focus:ring-tertiary/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-text-secondary">Adresse email</label>
                      <input
                        type="email"
                        placeholder="john@company.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-glass-border bg-[#0A0C1F] px-4 py-3 text-white outline-none placeholder:text-text-secondary/30 focus:ring-2 focus:ring-tertiary/50 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container text-sm font-bold text-white">
                      2
                    </div>
                    <h3 className="font-sora text-2xl font-semibold text-white">La vision</h3>
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-text-secondary">Type de projet</label>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {projectTypes.map(({ label, icon: Icon, color }) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setSelectedType(label)}
                          className={`group rounded-xl border p-4 text-center transition-all ${
                            selectedType === label
                              ? 'border-primary bg-primary/10'
                              : 'border-glass-border hover:border-primary/50'
                          }`}
                        >
                          <Icon size={24} className={`mx-auto mb-2 ${color}`} />
                          <span className="text-xs text-text-secondary group-hover:text-white">
                            {label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Budget estimé</label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full rounded-xl border border-glass-border bg-[#0A0C1F] px-4 py-3 text-white outline-none focus:ring-2 focus:ring-tertiary/50 transition-all"
                    >
                      {BUDGET_RANGES.map((range) => (
                        <option key={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container text-sm font-bold text-white">
                      3
                    </div>
                    <h3 className="font-sora text-2xl font-semibold text-white">Détails</h3>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">
                      Parlez-nous de vos objectifs
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Partagez votre vision, vos contraintes et vos fonctionnalités indispensables..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full resize-none rounded-xl border border-glass-border bg-[#0A0C1F] px-4 py-3 text-white outline-none placeholder:text-text-secondary/30 focus:ring-2 focus:ring-tertiary/50 transition-all"
                    />
                  </div>
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] disabled:opacity-60"
                >
                  {submitting ? (
                    'Envoi en cours...'
                  ) : (
                    <>
                      Lancer le projet <Rocket size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8 lg:sticky lg:top-32 lg:col-span-5">
          <div className="glass-card rounded-[32px] border-l-4 border-l-tertiary p-8">
            <div className="mb-6 flex items-center justify-between">
              <h4 className="font-sora text-2xl font-semibold text-white">Activité de l&apos;agence</h4>
              <span className="rounded-full bg-tertiary/10 px-3 py-1 text-xs font-bold text-tertiary">
                EN DIRECT
              </span>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Taux de satisfaction</span>
                <span className="font-sora text-3xl font-bold text-white">98/100</span>
              </div>
              <div className="relative h-12 overflow-hidden rounded-lg">
                <div className="absolute inset-0 flex items-end gap-1 px-1">
                  {[4, 8, 6, 10, 12].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-tertiary transition-all"
                      style={{ height: `${h * 8}px`, opacity: 0.2 + i * 0.2 }}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-surface-container p-4">
                  <div className="font-sora text-2xl font-bold text-primary">14</div>
                  <div className="text-xs text-text-secondary">Sprints en cours</div>
                </div>
                <div className="rounded-2xl bg-surface-container p-4">
                  <div className="font-sora text-2xl font-bold text-tertiary">03</div>
                  <div className="text-xs text-text-secondary">Places disponibles</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card space-y-8 rounded-[32px] p-8">
            <div className="space-y-4">
              <h5 className="text-xs font-semibold uppercase tracking-widest text-primary">
                Contact direct
              </h5>
              {agency.agencyEmail && (
                <a href={`mailto:${agency.agencyEmail}`} className="group flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container/20 transition-all group-hover:bg-primary-container">
                    <Mail size={20} className="text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{agency.agencyEmail}</div>
                    <div className="text-xs text-text-secondary">Réponse sous 4 heures</div>
                  </div>
                </a>
              )}
              {agency.agencyPhone && (
                <a href={`tel:${agency.agencyPhone}`} className="group flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-tertiary/20 transition-all group-hover:bg-tertiary">
                    <Phone size={20} className="text-tertiary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{agency.agencyPhone}</div>
                  </div>
                </a>
              )}
              {!agency.agencyEmail && !agency.agencyPhone && (
                <p className="text-xs text-text-secondary/50">
                  Coordonnées à configurer depuis Paramètres → Agence.
                </p>
              )}
            </div>

            {agency.agencyCity && (
              <div className="space-y-4 border-t border-glass-border pt-4">
                <h5 className="text-xs font-semibold uppercase tracking-widest text-tertiary">Studio</h5>
                <div className="text-sm font-semibold text-white">{agency.agencyCity}</div>
                {agency.agencyAddress && (
                  <div className="text-xs text-text-secondary">{agency.agencyAddress}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
