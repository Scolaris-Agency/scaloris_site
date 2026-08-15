'use client';

// Client-only, dynamically imported: the 3D stack (three.js + R3F + drei +
// postprocessing) is heavy and irrelevant to SEO/LCP for the homepage's
// text — no reason to make every visitor's initial HTML/JS pay for it, or
// to have Next attempt to server-render a WebGL canvas at all. Mounted from
// HeroSection.tsx (a Server Component) only when the Hero's media type is
// "3d" (Contenu → Pages).
import { useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';

const Logo3DPreview = dynamic(
  () => import('./Logo3DPreview').then((m) => m.Logo3DPreview),
  { ssr: false },
);

// Below this, the model isn't mounted at all — not just visually hidden.
// Skips fetching the GLB (8.5MB) and the three.js/R3F bundle entirely on
// phones, for battery/GPU reasons, not just layout.
const DESKTOP_QUERY = '(min-width: 1024px)';

function subscribe(callback: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function useIsDesktop() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false, // server snapshot — matches the pre-hydration "don't mount" default
  );
}

export function Logo3DHero({ className }: { className?: string }) {
  const isDesktop = useIsDesktop();
  if (!isDesktop) return null;

  return (
    <Logo3DPreview
      modelUrl="/models/Scaloris_model.glb"
      className={className}
      backgroundColor="transparent"
      interactive
      autoRotate
      enableZoom={false}
    />
  );
}
