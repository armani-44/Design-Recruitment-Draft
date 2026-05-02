import { useEffect, useState } from "react";
import HlsVideo from "../components/HlsVideo";

// Big Buck Bunny — public test stream. Swap for the brand reel when available.
const HLS_TEST_STREAM =
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
const HERO_POSTER =
  "https://placehold.co/1920x1080/07071a/c8a96a?text=Designer+Recruitment";

export default function Hero() {
  const [wipe, setWipe] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setWipe(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      id="about-hero"
      data-bg="dark"
      className="relative flex items-end justify-center overflow-hidden"
      style={{ height: "100vh", minHeight: 720 }}
      aria-label="About Designer Recruitment"
    >
      {/* Video background */}
      <div className="absolute inset-0">
        <HlsVideo
          src={HLS_TEST_STREAM}
          poster={HERO_POSTER}
          ariaLabel="Showroom craft, decorative"
          className="absolute inset-0 h-full w-full object-cover scale-[1.04]"
        />
        {/* Vignette layers — subtle gradient + warm shadow at the base */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(7,7,26,0.55) 0%, rgba(7,7,26,0.22) 28%, rgba(7,7,26,0.45) 60%, rgba(7,7,26,0.94) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 30%, transparent 35%, rgba(7,7,26,0.55) 100%)",
          }}
        />
      </div>

      {/* Editorial side-rule */}
      <div
        aria-hidden
        className="absolute left-14 top-1/2 hidden h-[180px] w-px -translate-y-1/2 lg:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(200,169,106,0.5), transparent)",
        }}
      />

      {/* Eyebrow caption (top-right) */}
      <div className="pointer-events-none absolute right-14 top-32 hidden text-right md:block">
        <p
          className="text-[10px] font-light uppercase text-cream/55"
          style={{ letterSpacing: "0.32em" }}
        >
          Chapter 01
        </p>
        <p className="serif-i mt-2 text-[16px] font-light text-cream/80">
          The story behind<br />the agency.
        </p>
      </div>

      {/* Hero content */}
      <div
        className={`relative z-10 mx-auto flex w-full max-w-[1080px] flex-col items-center px-14 pb-28 pt-40 text-center ${
          wipe ? "wipe-on" : ""
        }`}
      >
        <div
          className="mb-7 inline-flex items-center gap-3 text-[10px] font-normal uppercase tracking-[0.32em] text-gold"
          style={{
            opacity: wipe ? 1 : 0,
            transition: "opacity 0.9s cubic-bezier(.16,1,.3,1) 0.1s",
          }}
        >
          <span className="block h-px w-7 bg-gold" />
          About Designer Recruitment
          <span className="block h-px w-7 bg-gold" />
        </div>

        <h1
          className="serif mb-8 font-light text-warm"
          style={{
            fontSize: "clamp(54px, 8.4vw, 124px)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="wipe-line">
            <span>Quietly building</span>
          </span>
          <span className="wipe-line">
            <span className="serif-i">the industry's</span>
          </span>
          <span className="wipe-line">
            <span>most trusted network.</span>
          </span>
        </h1>

        <p
          className="max-w-[600px] text-[19px] font-light leading-[1.7] text-cream/65"
          style={{
            opacity: wipe ? 1 : 0,
            transform: wipe ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 0.9s cubic-bezier(.16,1,.3,1) 0.42s, transform 0.9s cubic-bezier(.16,1,.3,1) 0.42s",
          }}
        >
          A specialist recruitment studio for the KBB &amp; Builders Merchant
          industry — founded on the belief that craft, character, and culture
          should be matched with the same precision as skill.
        </p>

        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-6"
          style={{
            opacity: wipe ? 1 : 0,
            transform: wipe ? "translateY(0)" : "translateY(16px)",
            transition:
              "opacity 0.9s cubic-bezier(.16,1,.3,1) 0.55s, transform 0.9s cubic-bezier(.16,1,.3,1) 0.55s",
          }}
        >
          <a href="#story" className="btn-primary">
            Read our story
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M6.5 2v8M2.5 6.5l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="#team" className="btn-ghost">
            Meet the team
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M1.5 6.5h10M7.5 2.5l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden
        className="absolute bottom-10 right-14 z-10 hidden flex-col items-center gap-2.5 md:flex"
      >
        <div
          className="h-14 w-px animate-scrollDrop"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(242,237,228,0.4))",
          }}
        />
        <span
          className="text-[9px] uppercase text-cream/30"
          style={{ letterSpacing: "0.22em" }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
