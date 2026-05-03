import { useEffect, useState } from "react";

const PRIMARY_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "/#services" },
  { label: "Sectors", href: "/#expertise" },
  { label: "Get in Touch", href: "#contact" },
];

const SECONDARY_LINKS = [
  { label: "KBB Insights", href: "/#insights" },
  { label: "Post a Role", href: "mailto:hello@designerrecruitment.co.uk?subject=Post%20a%20role" },
  { label: "Find a Role", href: "/#contact" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/designer-recruitment/" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-bg]");
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.4) {
            setOnLight(e.target.getAttribute("data-bg") === "light");
          }
        });
      },
      { threshold: [0.4, 0.6] },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      className={`fixed left-1/2 z-[200] -translate-x-1/2 ${
        open ? "open" : ""
      }`}
      style={{ bottom: 20, width: "min(460px, calc(100vw - 48px))" }}
      data-on-light={onLight}
    >
      {/* Pill */}
      <div
        className="relative z-[2] grid grid-cols-[1fr_auto_1fr] items-center rounded-full border backdrop-blur-xl transition-colors"
        style={{
          padding: "7px 7px 7px 6px",
          background: onLight ? "rgba(7,7,26,0.55)" : "rgba(255,255,255,0.10)",
          borderColor: onLight ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.16)",
          boxShadow: onLight
            ? "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.18), 0 8px 32px rgba(7,7,26,0.22)"
            : undefined,
        }}
      >
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="nav-dropdown"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2.5 justify-self-start rounded-full bg-transparent px-3 py-2 text-[13px] font-light tracking-[0.05em] text-cream"
        >
          <span className="relative block h-3 w-[18px]">
            <span
              className="absolute left-0 right-0 h-px origin-center bg-cream transition-[top,transform] duration-500 ease-out-expo"
              style={{
                top: open ? "5.5px" : "2px",
                transform: open ? "rotate(45deg)" : "none",
              }}
            />
            <span
              className="absolute left-0 right-0 h-px origin-center bg-cream transition-[top,transform] duration-500 ease-out-expo"
              style={{
                top: open ? "5.5px" : "9px",
                transform: open ? "rotate(-45deg)" : "none",
              }}
            />
          </span>
          <span>Menu</span>
        </button>

        <a
          href="/"
          aria-label="Designer Recruitment home"
          className="justify-self-center transition-opacity hover:opacity-75"
        >
          <img
            src="/Brand_assets/DR-Logo-White-2.png"
            alt="Designer Recruitment"
            className="block"
            style={{ height: 30 }}
          />
        </a>

        <a
          href="#contact"
          className="justify-self-end whitespace-nowrap rounded-full bg-cream px-[22px] py-[10px] text-[11px] font-normal uppercase tracking-[0.07em] text-midnight transition-transform hover:scale-95 hover:opacity-90"
        >
          Contact
        </a>
      </div>

      {/* Dropdown card — opens upward */}
      <div
        id="nav-dropdown"
        aria-hidden={!open}
        className="absolute bottom-[calc(100%+8px)] left-0 right-0 rounded-lg border p-8 transition-[clip-path,opacity] duration-500 ease-out-expo"
        style={{
          background: "rgba(14,13,35,0.96)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          borderColor: "rgba(242,237,228,0.10)",
          clipPath: open ? "inset(0 0 0 0 round 20px)" : "inset(100% 0 0 0 round 20px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <nav aria-label="Site links">
          {PRIMARY_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className="serif block border-b py-3.5 text-[clamp(28px,4vw,38px)] font-light leading-[1.2] tracking-[-0.01em] text-warm transition-colors hover:text-gold"
              style={{
                borderColor: "rgba(242,237,228,0.08)",
                borderTopWidth: i === 0 ? 1 : 0,
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.45s cubic-bezier(0.16,1,0.3,1) ${0.08 + i * 0.06}s, transform 0.45s cubic-bezier(0.16,1,0.3,1) ${0.08 + i * 0.06}s, color 0.2s ease`,
              }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div
          className="flex flex-wrap items-center gap-5 pt-5 transition-[opacity,transform] duration-500 ease-out-expo"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(8px)",
            transitionDelay: open ? "0.3s" : "0s",
          }}
        >
          {SECONDARY_LINKS.map((link, i) => (
            <span key={link.label} className="flex items-center gap-5">
              <a
                href={link.href}
                className="text-[11px] font-light uppercase tracking-[0.1em] text-muted transition-colors hover:text-cream"
              >
                {link.label}
              </a>
              {i < SECONDARY_LINKS.length - 1 && (
                <span
                  aria-hidden
                  className="block h-[3px] w-[3px] rounded-full"
                  style={{ background: "rgba(242,237,228,0.2)" }}
                />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
