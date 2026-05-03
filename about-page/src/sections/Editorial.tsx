export default function Editorial() {
  return (
    <section
      data-bg="dark"
      style={{
        position: "relative",
        height: 560,
        overflow: "hidden",
      }}
    >
      <img
        src="/Brand_assets/AWinship-8084-025-High-scaled.jpg"
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 40%",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(7,7,27,0.7) 0%, rgba(7,7,27,0.35) 50%, rgba(7,7,27,0.7) 100%)",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 56,
          top: "50%",
          transform: "translateY(-50%)",
          height: 120,
          width: 1,
          background:
            "linear-gradient(to bottom, transparent, rgba(200,169,106,0.5), transparent)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: 56,
          top: "50%",
          transform: "translateY(-50%)",
          height: 120,
          width: 1,
          background:
            "linear-gradient(to bottom, transparent, rgba(200,169,106,0.5), transparent)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 56px",
        }}
      >
        <div>
          <div
            className="section-tag is-solo"
            style={{
              justifyContent: "center",
              marginBottom: 28,
            }}
          >
            Our Promise
          </div>
          <h2
            className="serif"
            style={{
              fontSize: "var(--fs-display-lg)",
              fontWeight: 300,
              color: "var(--warm)",
              lineHeight: 1.14,
              letterSpacing: "-0.01em",
              marginBottom: 20,
            }}
          >
            Specialists by choice.
            <br />
            <span className="serif-i" style={{ color: "var(--gold)" }}>
              Generalists never.
            </span>
          </h2>
          <p
            style={{
              fontSize: 18,
              fontWeight: 300,
              lineHeight: 1.7,
              color: "rgba(242,237,228,0.7)",
              maxWidth: 620,
              margin: "0 auto",
            }}
          >
            Designer Recruitment exists to do one thing exceptionally well: place KBB
            talent inside the industry&rsquo;s most respected showrooms and studios. We
            decline briefs outside our remit, and we&rsquo;re unapologetic about it.
          </p>
        </div>
      </div>
    </section>
  );
}
