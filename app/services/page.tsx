import type { Metadata } from 'next';
import { pagesService } from '@/services/pages';
import { CmsSections } from '@/components/CmsSections';

export async function generateMetadata(): Promise<Metadata> {
  const page = await pagesService.getBySlug('services');
  return {
    title: page?.seoTitle || page?.title || 'Services',
    description: page?.seoDescription ?? undefined,
  };
}

// Fully editable from the dashboard's Contenu → Pages (slug "services") —
// no hardcoded copy left here.
export default function ServicesPage() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="aurora-blob bg-primary-container opacity-20"
          style={{ width: 500, height: 500, top: '-5%', left: '-8%' }}
        />
        <div
          className="aurora-blob bg-tertiary opacity-15"
          style={{ width: 400, height: 400, bottom: '10%', right: '-5%' }}
        />
      </div>
      <CmsSections slug="services" fallbackTitle="Services" />
    </div>
  );
}
