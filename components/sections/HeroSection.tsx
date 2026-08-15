import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HeroProps } from "@/services/pages";
import { Logo3DHero } from "@/components/Logo3DHero";

const isExternal = (href: string) => /^https?:\/\//.test(href);

function CtaLink({
  label,
  href,
  primary,
}: {
  label: string;
  href: string;
  primary: boolean;
}) {
  const className = primary
    ? "flex items-center gap-2 rounded-full bg-primary-container px-10 py-4 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(124,58,237,0.25)] transition-all hover:scale-105"
    : "rounded-full border border-glass-border bg-glass-bg px-10 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/5";
  if (isExternal(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {label} {primary && <ArrowRight size={18} />}
      </a>
    );
  }
  return (
    <Link href={href || "/"} className={className}>
      {label} {primary && <ArrowRight size={18} />}
    </Link>
  );
}

export function HeroSection({ props }: { props: HeroProps }) {
  const alignment = props.alignment ?? "left";
  const spacing = props.spacing ?? "normal";
  const paddingY =
    spacing === "compact"
      ? "py-12 md:py-20"
      : spacing === "spacious"
        ? "py-24 md:py-48"
        : "py-16 md:py-32";
  const align =
    alignment === "center"
      ? "items-center text-center mx-auto"
      : alignment === "right"
        ? "items-end text-right ml-auto"
        : "";

  // "Image" only wins if one was actually uploaded — picking that mode with
  // no image falls back to the 3D logo instead of leaving an empty slot.
  const showImage = props.mediaType === "image" && !!props.image;

  return (
    <section
      // min-h-dvh + flex-centering keeps the whole hero (title, subtitle,
      // CTAs) inside one mobile screen without scrolling; md+ drops back to
      // natural content height, matching the original desktop layout.
      className={`relative z-10 mx-auto flex min-h-dvh max-w-7xl flex-col justify-center px-8 ${paddingY} pt-28 sm:pt-32 md:min-h-0 md:px-16 md:pt-40 lg:pt-48`}
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className={`space-y-6 md:space-y-8 lg:col-span-7 ${align}`}>
          {props.title && (
            <h1 className="font-sora text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl lg:leading-[1.05]">
              {props.title}
            </h1>
          )}
          {props.subtitle && (
            <p className="text-base leading-relaxed text-text-secondary md:text-lg">
              {props.subtitle}
            </p>
          )}
          {(props.primaryCtaLabel || props.secondaryCtaLabel) && (
            <div
              className={`flex flex-wrap gap-4 pt-4 ${alignment === "center" ? "justify-center" : ""}`}
            >
              {props.primaryCtaLabel && (
                <CtaLink
                  label={props.primaryCtaLabel}
                  href={props.primaryCtaHref || "/start"}
                  primary
                />
              )}
              {props.secondaryCtaLabel && (
                <CtaLink
                  label={props.secondaryCtaLabel}
                  href={props.secondaryCtaHref || "/"}
                  primary={false}
                />
              )}
            </div>
          )}
        </div>

        {/* Visual slot, right of the text on desktop — set from Contenu →
            Pages (Type de média: Modèle 3D / Image). The 3D logo has no
            card/background of its own: it just sits on the page. On mobile
            it doesn't render at all (see Logo3DHero) — no fallback shown
            there on purpose, for performance/battery, not a bug. In 3D mode
            the slot itself is hidden below lg so it doesn't leave an empty
            grid row (and its gap-12) on mobile/tablet. */}
        <div className={`lg:col-span-5 ${showImage ? "" : "hidden lg:block"}`}>
          {showImage ? (
            // eslint-disable-next-line @next/next/no-img-element -- CMS-supplied URL, arbitrary remote host
            <img
              src={props.image}
              alt=""
              className="h-[420px] w-full rounded-[32px] border border-glass-border object-cover md:h-[520px]"
            />
          ) : (
            <Logo3DHero className="h-[420px] w-full md:h-[560px]" />
          )}
        </div>
      </div>
    </section>
  );
}
