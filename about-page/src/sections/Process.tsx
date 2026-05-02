import Reveal from "../components/Reveal";

const STEPS = [
  {
    label: "Discover",
    body:
      "We start with a conversation, not a brief. What does the studio actually need? What does the candidate actually want? The interesting work happens here.",
  },
  {
    label: "Curate",
    body:
      "We open the network. Three to five carefully matched candidates per role. Long-form context on each: craft, character, motivation, fit.",
  },
  {
    label: "Place",
    body:
      "We coach the process — from first interview to negotiation. Both sides come out feeling chosen, not sold to. That&rsquo;s how placements stick.",
  },
  {
    label: "Stay",
    body:
      "We keep showing up after the offer is signed. First-90-day check-ins, future career planning, talent mapping for the next hire.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      data-bg="dark"
      style={{
        position: "relative",
        background: "var(--midnight)",
        overflow: "hidden",
      }}
    >
      {/* Decorative gradient mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, rgba(200,169,106,0.10), transparent 60%), radial-gradient(50% 50% at 20% 100%, rgba(27,45,79,0.4), transparent 60%)",
        }}
      />

      <div className="relative mx-auto" style={{ maxWidth: 1240, padding: "120px 56px" }}>
        <div className="mb-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <Reveal>
            <div className="section-tag" style={{ marginBottom: 22 }}>
              How We Work
            </div>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(34px, 4vw, 60px)",
                fontWeight: 300,
                lineHeight: 1.06,
                color: "var(--warm)",
                letterSpacing: "-0.02em",
              }}
            >
              A four-step
              <br />
              <span className="serif-i" style={{ color: "var(--gold)" }}>
                deliberate process.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p
              style={{
                fontSize: 18,
                fontWeight: 300,
                lineHeight: 1.7,
                color: "rgba(242,237,228,0.6)",
                maxWidth: 460,
              }}
            >
              We move slowly on purpose. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit &mdash; replace with the agency&rsquo;s methodology copy when ready.
            </p>
          </Reveal>
        </div>

        <ol className="grid gap-px lg:grid-cols-4" style={{ background: "var(--line)" }}>
          {STEPS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={((i + 1) * 100) as 100 | 200 | 300 | 400}
              as="div"
              className="group relative flex flex-col"
              style={{
                background: "var(--midnight)",
                padding: "44px 32px 48px",
                minHeight: 280,
              }}
            >
              <div className="flex items-baseline justify-between">
                <span
                  className="font-display"
                  style={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: "0.32em",
                    color: "var(--gold)",
                  }}
                >
                  STEP 0{i + 1}
                </span>
                <span
                  className="serif-i"
                  style={{
                    fontSize: 30,
                    fontWeight: 300,
                    color: "rgba(242,237,228,0.18)",
                    lineHeight: 1,
                  }}
                >
                  /0{i + 1}
                </span>
              </div>

              <h3
                className="serif mt-12"
                style={{
                  fontSize: 26,
                  fontWeight: 300,
                  color: "var(--warm)",
                  letterSpacing: "-0.01em",
                }}
              >
                {s.label}
              </h3>

              <p
                className="mt-4"
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.7,
                  fontWeight: 300,
                  color: "rgba(242,237,228,0.6)",
                }}
                dangerouslySetInnerHTML={{ __html: s.body }}
              />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
