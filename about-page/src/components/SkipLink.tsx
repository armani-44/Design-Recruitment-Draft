/**
 * Visually-hidden skip-link that becomes visible on keyboard focus.
 * First focusable element on the page so keyboard users can bypass
 * the bottom-pill nav and jump straight to main content.
 */
export default function SkipLink() {
  return (
    <a
      href="#about-hero"
      className="skip-link"
      style={{
        position: "absolute",
        top: 8,
        left: 8,
        zIndex: 10000,
        padding: "12px 22px",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--color-midnight)",
        background: "var(--color-gold)",
        borderRadius: "var(--radius-full)",
        textDecoration: "none",
        transform: "translateY(-150%)",
        transition: "transform 0.2s var(--ease-out-expo)",
      }}
    >
      Skip to content
    </a>
  );
}
