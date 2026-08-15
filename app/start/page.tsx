import type { Metadata } from 'next';
import { agencyService } from '@/services/agency';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = { title: 'Démarrer un projet' };

export default async function StartPage() {
  const agency = await agencyService.get();

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="aurora-blob bg-primary-container opacity-15"
          style={{
            inset: 0,
            background:
              'radial-gradient(circle at 10% 10%, rgba(124,58,237,0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(47,217,244,0.15) 0%, transparent 40%)',
          }}
        />
      </div>
      <ContactForm agency={agency} />
    </div>
  );
}
