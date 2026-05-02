import Reveal from "../components/Reveal";

const STATS = [
  { value: "10+", label: "Years in KBB" },
  { value: "500+", label: "Placements made" },
  { value: "200+", label: "Active clients" },
  { value: "98%", label: "Client retention" },
];

const TIMELINE = [
  { year: "2014", text: "Designer Recruitment is founded with a focus on independent KBB studios." },
  { year: "2017", text: "Network expands across the UK; first executive placements with luxury showroom groups." },
  { year: "2020", text: "Consultancy practice launches — talent mapping and structure work for high-growth retailers." },
  { year: "2024", text: "Tenth anniversary; 500+ placements and a community programme for designers in transition." },
];

export default function Numbers() {
  return (
    <section
      id="numbers"
      data-bg="dark"
      style={{
        background: "var(--color-navy-deep)",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {/* Stats strip */}
      <div
        style={{ padding: "80px 56px", borderBottom: "1px solid rgba(255,255,255,0.12)" }}
      >
        <div
          className="mx-auto grid grid-cols-2 lg:grid-cols-4"
          style={{ maxWidth: 1240 }}
        >
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={(((i + 1) * 100) as 100 | 200 | 300 | 400)}
              className="text-center"
              style={{
                padding: "10px 32px",
                borderRight:
                  i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.18)" : "none",
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: "clamp(48px, 6vw, 84px)",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "var(--warm)",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  marginTop: 14,
                  fontSize: 10,
                  fontWeight: 400,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ padding: "96px 56px", background: "var(--midnight)" }} data-bg="dark">
        <div className="mx-auto" style={{ maxWidth: 1240 }}>
          <div className="grid gap-16 lg:grid-cols-[5fr_7fr]">
            <div>
              <Reveal>
                <div className="section-tag" style={{ marginBottom: 22 }}>
                  Milestones
                </div>
              </Reveal>
              <Reveal delay={100}>
                <h2
                  className="serif"
                  style={{
                    fontSize: "clamp(32px, 3.6vw, 52px)",
                    fontWeight: 300,
                    lineHeight: 1.1,
                    color: "var(--warm)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  A decade
                  <br />
                  <span className="serif-i" style={{ color: "var(--gold)" }}>
                    in the making.
                  </span>
                </h2>
              </Reveal>
            </div>

            <div className="relative">
              <div
                aria-hidden
                className="absolute left-[7px] top-2 bottom-2 w-px"
                style={{ background: "var(--line)" }}
              />
              <ul className="space-y-12">
                {TIMELINE.map((t, i) => (
                  <Reveal
                    key={t.year}
                    delay={((i + 1) * 100) as 100 | 200 | 300 | 400}
                    as="div"
                    className="relative pl-12"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-1.5 block h-3.5 w-3.5 rounded-full border"
                      style={{
                        background: "var(--midnight)",
                        borderColor: "var(--gold)",
                      }}
                    />
                    <div
                      className="font-display"
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        marginBottom: 10,
                      }}
                    >
                      {t.year}
                    </div>
                    <p
                      style={{
                        fontSize: 18,
                        fontWeight: 300,
                        lineHeight: 1.6,
                        color: "rgba(242,237,228,0.78)",
                        maxWidth: 540,
                      }}
                    >
                      {t.text}
                    </p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
