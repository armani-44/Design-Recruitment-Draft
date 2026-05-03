import Reveal from "../components/Reveal";

export default function Cta() {
  return (
    <section
      id="contact"
      data-bg="light"
      style={{
        background: "var(--cream)",
        padding: "140px 56px",
        borderTop: "1px solid rgba(7,7,27,0.06)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1100 }}>
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div
              className="section-tag"
              style={{ color: "var(--color-blue)", marginBottom: 26 }}
            >
              Begin a Conversation
            </div>
            <h2
              className="serif"
              style={{
                fontSize: "var(--fs-display-lg)",
                fontWeight: 300,
                lineHeight: 1,
                color: "var(--midnight)",
                letterSpacing: "-0.02em",
              }}
            >
              Hire well.
              <br />
              <span className="serif-i" style={{ color: "var(--color-blue)" }}>
                Be hired well.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 300,
                lineHeight: 1.75,
                color: "rgba(7,7,27,0.6)",
              }}
            >
              <p>
                Whether you&rsquo;re a studio looking for someone exceptional, or a
                designer ready for the next chapter &mdash; we&rsquo;d like to hear from you.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="mailto:hello@designerrecruitment.co.uk" className="btn-primary">
                  Start a search
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
                <a href="mailto:hello@designerrecruitment.co.uk?subject=CV%20submission" className="btn-dark-ghost">
                  Submit your CV
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
          </Reveal>
        </div>

        {/* Detail row */}
        <div
          className="mt-24 grid gap-10 border-t pt-12 sm:grid-cols-3"
          style={{ borderColor: "rgba(7,7,27,0.12)" }}
        >
          {[
            { head: "Studio", body: "Manchester, UK\nBy appointment" },
            { head: "General", body: "hello@designerrecruitment.co.uk" },
            { head: "Press &amp; Partnerships", body: "press@designerrecruitment.co.uk" },
          ].map((c, i) => (
            <Reveal key={c.head} delay={((i + 1) * 100) as 100 | 200 | 300}>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-blue)",
                  marginBottom: 14,
                }}
                dangerouslySetInnerHTML={{ __html: c.head }}
              />
              <p
                className="serif"
                style={{
                  fontSize: 19,
                  fontWeight: 400,
                  lineHeight: 1.55,
                  color: "var(--midnight)",
                  whiteSpace: "pre-line",
                }}
              >
                {c.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
