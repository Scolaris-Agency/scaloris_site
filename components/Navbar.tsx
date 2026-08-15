"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { AgencyConfig } from "@/services/agency";

const links = [
  { label: "Accueil", to: "/" },
  { label: "Projets", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "À propos", to: "/about" },
];

// Client Component for the scroll show/hide behavior only — the agency
// identity itself is fetched once, server-side, in app/layout.tsx and
// passed down as a prop, so it's present in the initial HTML (no
// client-side fetch/flash of a fallback name).
export function Navbar({ agency }: { agency: AgencyConfig }) {
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const agencyName = agency.agencyName || "SCALORIS";

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current <= 80) {
        setVisible(true);
      } else if (current > lastScroll) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScroll(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <header
      className="fixed top-4 left-1/2 z-50 w-[90%] max-w-7xl transition-all duration-500"
      style={{
        transform: `translateX(-50%) translateY(${visible ? "0" : "-120px"})`,
        opacity: visible ? 1 : 0,
      }}
    >
      <nav className="nav-glass flex items-center justify-between rounded-full px-8 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <Link
          href="/"
          className="flex items-center gap-2 font-sora text-2xl font-bold tracking-tighter text-white"
        >
          {agency.agencyLogoUrl && (
            // eslint-disable-next-line @next/next/no-img-element -- CMS-supplied URL, arbitrary remote host
            <img
              src={agency.agencyLogoUrl}
              alt=""
              className="h-10 w-10 object-contain"
            />
          )}
          {agencyName}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map(({ label, to }) => {
            const active = pathname === to;
            return (
              <Link
                key={label}
                href={to}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                  active
                    ? "text-primary font-semibold"
                    : "text-text-secondary hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/start"
          className="hidden rounded-full bg-primary-container px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(124,58,237,0.3)] transition-all hover:scale-105 active:scale-95 md:block"
        >
          Démarrer un projet
        </Link>

        <button
          className="rounded-full border border-glass-border p-2 text-white md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="mt-2 rounded-3xl nav-glass p-6">
          <div className="flex flex-col gap-4">
            {links.map(({ label, to }) => (
              <Link
                key={label}
                href={to}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-text-secondary hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/start"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full bg-primary-container px-6 py-3 text-center text-sm font-semibold text-white"
            >
              Démarrer un projet
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
