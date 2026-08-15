'use client';

// Used both by the standalone inspection route (app/preview/logo-3d) and,
// via Logo3DHero.tsx, embedded in the real homepage hero when no image has
// been uploaded for it — see components/sections/HeroSection.tsx.
import { Component, Suspense, useMemo, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Bounds,
  Center,
  Environment as DreiEnvironment,
  Html,
  OrbitControls,
  useGLTF,
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

export interface Logo3DPreviewProps {
  /** Public path to the .glb file, e.g. "/models/Scaloris_model.glb". */
  modelUrl: string;
  /** Defaults to filling its parent — pass a sized wrapper to constrain it. */
  className?: string;
  backgroundColor?: string;
  /** Drag/touch to orbit manually. Default true. */
  interactive?: boolean;
  /** Turns on its own regardless of `interactive` — pauses while dragged. Default true. */
  autoRotate?: boolean;
  /** Scroll/pinch to zoom. Default true — set false where that would fight page scroll. */
  enableZoom?: boolean;
}

function LoadingOverlay() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-sm text-neutral-400">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-600 border-t-neutral-200" />
        Chargement du modèle…
      </div>
    </Html>
  );
}

function ErrorOverlay({ message }: { message: string }) {
  return (
    <Html center>
      <div className="max-w-xs rounded-lg border border-red-800 bg-red-950 px-4 py-3 text-center text-sm text-red-300 shadow-sm">
        <p className="font-medium">Impossible de charger le modèle 3D</p>
        <p className="mt-1 text-xs opacity-80">{message}</p>
      </div>
    </Html>
  );
}

// useGLTF suspends while loading and throws on failure — a Suspense fallback
// covers the loading state, but catching the throw needs a real React error
// boundary (no hook equivalent exists), hence the class component.
class ModelErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error('Logo3DPreview: échec du chargement du modèle', error);
  }

  render() {
    if (this.state.error) {
      return <ErrorOverlay message={this.state.error.message || 'Fichier introuvable ou invalide.'} />;
    }
    return this.props.children;
  }
}

// Glass/crystal look — plain THREE.MeshPhysicalMaterial (transmission, ior,
// clearcoat, iridescence are native three.js PBR features, not a custom
// shader), assigned imperatively during a scene traversal so the GLTF's own
// node hierarchy/transforms stay intact. drei's <MeshTransmissionMaterial>
// looks fancier but is JSX-driven and would mean flattening the scene graph
// to reattach it per-mesh — not worth it for how close this already gets.
function makeGlassMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#dce9ff'),
    metalness: 0,
    roughness: 0.05,
    transmission: 1,
    // Thinner + a longer attenuation distance = less internal color
    // absorption, i.e. more see-through instead of tinted/solid-looking
    // glass. iridescence pulled back a touch too — less rainbow tinting
    // reads as clearer.
    thickness: 0.6,
    ior: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    iridescence: 0.3,
    iridescenceIOR: 1.3,
    attenuationColor: new THREE.Color('#7fb8ff'),
    attenuationDistance: 2.5,
    envMapIntensity: 1.6,
  });
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  const glass = useMemo(() => {
    // Clone so repeated mounts (e.g. React StrictMode double-invoke in dev)
    // never share/mutate the cached useGLTF scene graph, then swap every
    // mesh's material for the glass one — whatever the GLB shipped with is
    // replaced, not blended with.
    const cloned = scene.clone(true);
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = makeGlassMaterial();
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return cloned;
  }, [scene]);

  return <primitive object={glass} />;
}

// A small enclosing "light box" of colored panels, captured into a cubemap
// by <Environment>'s portal mode (children instead of a preset/HDRI file) —
// this is what the glass material reflects/refracts. Fully local: no network
// fetch, unlike <Environment preset="…">, whose CDN (raw.githack.com) isn't
// reachable from this environment. Colors chosen to match the target
// reference: blue key side, violet/magenta fill, a cyan-white rim.
function ColorEnvironment() {
  return (
    <>
      <color attach="background" args={['#02030a']} />
      <mesh position={[-6, 3, -4]} rotation={[0, Math.PI / 4, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshBasicMaterial color="#3b6bff" />
      </mesh>
      <mesh position={[6, -2, 4]} rotation={[0, -Math.PI / 3, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshBasicMaterial color="#8b3bff" />
      </mesh>
      <mesh position={[0, 6, -2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshBasicMaterial color="#3bd8ff" />
      </mesh>
      <mesh position={[0, -6, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshBasicMaterial color="#0a0a1a" />
      </mesh>
    </>
  );
}

function Environment() {
  return (
    <DreiEnvironment resolution={128} background={false}>
      <ColorEnvironment />
    </DreiEnvironment>
  );
}

export function Logo3DPreview({
  modelUrl,
  className,
  backgroundColor = '#02030a',
  interactive = true,
  autoRotate = true,
  enableZoom = true,
}: Logo3DPreviewProps) {
  const transparent = backgroundColor === 'transparent';
  return (
    <div
      className={className ?? 'h-dvh w-full'}
      style={{
        background: transparent ? undefined : backgroundColor,
        touchAction: interactive ? 'none' : undefined,
      }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: transparent, toneMapping: THREE.ACESFilmicToneMapping }}
        camera={{ position: [3, 2, 5], fov: 45, near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<LoadingOverlay />}>
          <ModelErrorBoundary>
            {/* Environment (reflections for the glass) — local, no HDRI
                fetch. Rendered once, doesn't need to be visible as the
                actual backdrop, hence background={false}. */}
            <Environment />

            {/* Key/fill/rim lights, colored to match, plus two tight, bright
                point lights close to the surface — these create the sharp
                specular hot-spots that <Bloom> below blooms into the
                sparkle highlights from the reference image. */}
            <ambientLight intensity={0.35} />
            <directionalLight position={[5, 8, 5]} intensity={1.2} color="#bcd4ff" castShadow />
            <directionalLight position={[-6, 2, -4]} intensity={0.8} color="#b48bff" />
            <pointLight position={[2, 3, 3]} intensity={40} color="#ffffff" distance={8} decay={2} />
            <pointLight position={[-2, -1, 2]} intensity={20} color="#8fd8ff" distance={8} decay={2} />

            {/* <Bounds fit clip observe> auto-fits the camera to whatever
                size the model actually is — no manual scale guessing, and it
                re-fits if the model ever changes. */}
            <Bounds fit clip observe margin={1.3}>
              <Center>
                <Model url={modelUrl} />
              </Center>
            </Bounds>
          </ModelErrorBoundary>
        </Suspense>

        <OrbitControls
          makeDefault
          enabled={interactive}
          enableZoom={interactive && enableZoom}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={0.3}
          maxDistance={100}
          autoRotate={autoRotate}
          autoRotateSpeed={1.2}
        />

        <EffectComposer>
          <Bloom
            mipmapBlur
            intensity={0.9}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.9}
            radius={0.8}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
