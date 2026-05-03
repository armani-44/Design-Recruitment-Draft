type FootLink = { label: string; href: string };
type FootCol = { head: string; links: FootLink[] };

const FOOT_COLS: FootCol[] = [
  {
    head: "Company",
    links: [
      { label: "About", href: "#about-hero" },
      { label: "Our Story", href: "#story" },
      { label: "Principles", href: "#principles" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    head: "For Candidates",
    links: [
      { label: "Find a Role", href: "/#contact" },
      { label: "Submit your CV", href: "mailto:hello@designerrecruitment.co.uk?subject=CV%20submission" },
      { label: "Career Advice", href: "mailto:hello@designerrecruitment.co.uk?subject=Career%20advice%20request" },
      { label: "Request a Salary Guide", href: "mailto:hello@designerrecruitment.co.uk?subject=Salary%20guide%20request" },
    ],
  },
  {
    head: "For Clients",
    links: [
      { label: "Hire Talent", href: "mailto:hello@designerrecruitment.co.uk?subject=Hiring%20enquiry" },
      { label: "Post a Job", href: "mailto:hello@designerrecruitment.co.uk?subject=Post%20a%20role" },
      { label: "Consultancy", href: "mailto:hello@designerrecruitment.co.uk?subject=Consultancy%20enquiry" },
      { label: "Sectors", href: "/#expertise" },
    ],
  },
];

const LEGAL_LINKS: FootLink[] = [
  { label: "Privacy", href: "/privacy.html" },
  { label: "Cookies", href: "/cookies.html" },
  { label: "Terms", href: "/terms.html" },
];

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        background: "var(--midnight)",
        borderColor: "var(--line)",
        padding: "88px 56px 36px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1240 }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 72,
          }}
        >
          <div>
            <img
              src="/Brand_assets/DR-Logo-White-2.png"
              alt="Designer Recruitment"
              style={{ height: 36, marginBottom: 28, display: "block" }}
            />
            <p
              style={{
                fontSize: 13.5,
                fontWeight: 300,
                lineHeight: 1.75,
                color: "var(--muted)",
                maxWidth: 320,
              }}
            >
              The UK's specialist recruitment partner for the Kitchen, Bedroom,
              Bathroom &amp; Builders Merchant industry.
            </p>
          </div>

          {FOOT_COLS.map((col) => (
            <div key={col.head}>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--cream)",
                  marginBottom: 22,
                }}
              >
                {col.head}
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0 }}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      style={{
                        fontSize: 13,
                        fontWeight: 300,
                        letterSpacing: "0.04em",
                        color: "var(--muted)",
                        textDecoration: "none",
                        transition: "color 0.22s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 24,
            borderTop: "1px solid var(--line)",
            flexWrap: "wrap",
            gap: 16,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(242,237,228,0.4)",
          }}
        >
          <span>© {new Date().getFullYear()} Designer Recruitment®. All rights reserved.</span>
          <span style={{ display: "flex", gap: 24 }}>
            {LEGAL_LINKS.map((l) => (
              <a key={l.label} href={l.href} style={{ color: "inherit", textDecoration: "none" }}>
                {l.label}
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
