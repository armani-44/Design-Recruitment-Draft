import Reveal from "../components/Reveal";

const PRINCIPLES = [
  {
    no: "01",
    title: "Specialist, not generalist.",
    body:
      "We work in one industry — the KBB &amp; Builders Merchant sector — and we know it from the design floor up. That depth is the entire product.",
  },
  {
    no: "02",
    title: "Curate, don&rsquo;t broker.",
    body:
      "Every introduction is considered. We&rsquo;d rather present three exceptional candidates than ten plausible ones. The same goes for the briefs we accept.",
  },
  {
    no: "03",
    title: "Match for craft &amp; character.",
    body:
      "Skills get someone through the door. Character keeps them in the building. We hire the way the best studios hire — for the long arc of a career.",
  },
  {
    no: "04",
    title: "Stay close, stay honest.",
    body:
      "We tell candidates what they need to hear, not what they want to hear. We tell clients the same. The results compound over years of trust.",
  },
];

export default function Principles() {
  return (
    <section
      id="principles"
      data-bg="dark"
      style={{ background: "var(--ink)", padding: "120px 56px", borderTop: "1px solid var(--line)" }}
    >
      <div className="mx-auto" style={{ maxWidth: 1240 }}>
        <div className="mb-20 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <Reveal>
            <div className="section-tag" style={{ marginBottom: 22 }}>
              Principles
            </div>
            <h2
              className="serif"
              style={{
                fontSize: "var(--fs-display-md)",
                fontWeight: 300,
                lineHeight: 1.06,
                color: "var(--warm)",
                letterSpacing: "-0.02em",
              }}
            >
              Four ideas
              <br />
              <span className="serif-i" style={{ color: "var(--gold)" }}>
                we won&rsquo;t compromise on.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p
              style={{
                fontSize: 19,
                fontWeight: 300,
                lineHeight: 1.7,
                color: "rgba(242,237,228,0.6)",
                maxWidth: 460,
              }}
            >
              These aren&rsquo;t marketing lines. They&rsquo;re the rules we sign briefs against,
              the way we choose which candidates to represent, and the standard we hold the
              business to internally.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border md:grid-cols-2"
          style={{ borderColor: "var(--line)", background: "var(--line)" }}>
          {PRINCIPLES.map((p, i) => (
            <Reveal
              key={p.no}
              delay={((i % 4 + 1) * 100) as 100 | 200 | 300 | 400}
              as="div"
              className="group relative flex flex-col"
              style={{
                background: "var(--ink)",
                padding: "48px 44px 52px",
                minHeight: 260,
                cursor: "default",
              }}
            >
              <div className="flex items-baseline justify-between">
                <span
                  className="font-display"
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    color: "var(--gold)",
                  }}
                >
                  {p.no}
                </span>
                <span
                  aria-hidden
                  className="block h-px w-9 transition-colors group-hover:bg-gold"
                  style={{ background: "rgba(217,188,128,0.4)" }}
                />
              </div>

              <h3
                className="serif mt-10"
                style={{
                  fontSize: "var(--fs-2xl)",
                  fontWeight: 300,
                  lineHeight: 1.2,
                  color: "var(--warm)",
                  letterSpacing: "-0.01em",
                }}
                dangerouslySetInnerHTML={{ __html: p.title }}
              />

              <p
                className="mt-5"
                style={{
                  fontSize: 15.5,
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: "rgba(242,237,228,0.65)",
                  maxWidth: 460,
                }}
                dangerouslySetInnerHTML={{ __html: p.body }}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
