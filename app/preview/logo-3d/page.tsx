// TEMPORARY inspection route — not linked from anywhere in the site's nav.
// Delete this whole app/preview/ directory (and components/Logo3DPreview.tsx)
// once the 3D logo work moves into its real, animated component.
import { Logo3DPreview } from '@/components/Logo3DPreview';

export const metadata = { title: 'Aperçu logo 3D (interne)' };

export default function Logo3DPreviewPage() {
  return <Logo3DPreview modelUrl="/models/Scaloris_model.glb" />;
}
