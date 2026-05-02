import Reveal from "../components/Reveal";

export default function Story() {
  return (
    <section
      id="story"
      data-bg="light"
      className="relative"
      style={{ background: "var(--cream)", padding: "140px 56px" }}
    >
      <div className="mx-auto grid w-full gap-20 lg:grid-cols-[5fr_7fr]" style={{ maxWidth: 1240 }}>
        {/* Left rail — sticky */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <div className="section-tag" style={{ color: "var(--color-blue)", marginBottom: 22 }}>
              Our Story
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(38px, 4.6vw, 68px)",
                fontWeight: 300,
                lineHeight: 1.04,
                color: "var(--midnight)",
                letterSpacing: "-0.02em",
              }}
            >
              Built by the
              <br />
              <span className="serif-i" style={{ color: "var(--color-blue)" }}>
                industry,
              </span>
              <br />
              for the industry.
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <div
              className="mt-10 flex items-center gap-3 text-[11px] uppercase"
              style={{ letterSpacing: "0.22em", color: "rgba(7,7,26,0.45)" }}
            >
              <span className="block h-px w-9" style={{ background: "rgba(7,7,26,0.25)" }} />
              Est. 2014 — Manchester, UK
            </div>
          </Reveal>
        </div>

        {/* Right column — copy + pull quote */}
        <div className="space-y-10">
          <Reveal delay={100}>
            <p
              style={{
                fontSize: 22,
                fontWeight: 300,
                lineHeight: 1.6,
                color: "var(--midnight)",
              }}
            >
              Designer Recruitment was founded on a single, stubborn belief — that the KBB
              industry deserves recruiters who understand it from the inside. Not generalists
              with a database, but specialists with a network, an eye for craft, and a
              genuine respect for the work.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p
              style={{
                fontSize: 17,
                fontWeight: 300,
                lineHeight: 1.85,
                color: "rgba(7,7,26,0.7)",
              }}
            >
              Lorem ipsum placeholder — replace with the founding story. Ben Paine started
              the agency after a decade inside KBB retail and design, frustrated by how often
              brilliant designers were funnelled into the wrong studios and how often great
              showrooms were sold &ldquo;the next CV&rdquo; instead of the right person. He wanted
              something different: an agency that would behave more like a curator than a
              broker.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <p
              style={{
                fontSize: 17,
                fontWeight: 300,
                lineHeight: 1.85,
                color: "rgba(7,7,26,0.7)",
              }}
            >
              Today we&rsquo;re a small, deliberately specialist team. We don&rsquo;t cover everything &mdash;
              we cover one industry, exceptionally well. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Reveal>

          {/* Pull quote — editorial card */}
          <Reveal delay={300}>
            <figure
              className="relative overflow-hidden"
              style={{
                marginTop: 56,
                padding: "44px 48px",
                background: "var(--midnight)",
                borderRadius: 18,
                color: "var(--warm)",
              }}
            >
              <span
                aria-hidden
                className="serif-i absolute"
                style={{
                  top: 18,
                  right: 32,
                  fontSize: 140,
                  lineHeight: 1,
                  color: "var(--gold)",
                  opacity: 0.25,
                }}
              >
                &rdquo;
              </span>
              <blockquote
                className="serif-i relative"
                style={{
                  fontSize: "clamp(22px, 2.4vw, 32px)",
                  fontWeight: 300,
                  lineHeight: 1.35,
                }}
              >
                We don&rsquo;t fill roles. We build careers and teams that last &mdash; the kind
                that compound a studio&rsquo;s reputation over years, not quarters.
              </blockquote>
              <figcaption
                className="relative mt-8 flex items-center gap-3"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                <span className="block h-px w-9 bg-gold" />
                Ben Paine, Managing Director
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
