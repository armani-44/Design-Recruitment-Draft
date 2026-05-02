const ITEMS = [
  "Specialist Search",
  "Executive Placement",
  "Talent Mapping",
  "Showroom Recruitment",
  "Designer Placement",
  "Strategic Consultancy",
  "Industry Advisory",
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div
      data-bg="dark"
      style={{
        background: "#8a6d3b",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        padding: "20px 0",
        overflow: "hidden",
      }}
      aria-hidden
    >
      <div className="flex animate-marquee gap-14" style={{ width: "max-content" }}>
        {doubled.map((label, i) => (
          <span key={i} className="flex items-center gap-14 whitespace-nowrap">
            <span
              style={{
                fontSize: 12.5,
                fontWeight: 300,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.78)",
              }}
            >
              {label}
            </span>
            <span style={{ color: "var(--gold)", fontSize: 9, opacity: 0.8 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
