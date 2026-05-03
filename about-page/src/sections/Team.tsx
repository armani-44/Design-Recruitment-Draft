import Reveal from "../components/Reveal";

type Member = {
  name: string;
  role: string;
  image: string;
  bio: string;
  objectPosition?: string;
  filter?: string;
};

const TEAM: Member[] = [
  {
    name: "Ben Paine",
    role: "Managing Director",
    image: "/Brand_assets/Ben-Paine-Managing Director.jpg",
    bio: "With over a decade of experience in KBB recruitment, Ben leads the team with deep industry knowledge and a passion for matching exceptional talent with exceptional brands.",
    objectPosition: "center 35%",
  },
  {
    name: "Expert Consultants",
    role: "KBB Specialists",
    image: "/Brand_assets/Chris-Designer-.jpeg",
    bio: "Our team of dedicated recruitment consultants brings specialist knowledge across every role — from design floor to boardroom.",
    objectPosition: "center 5%",
    filter: "grayscale(10%) brightness(0.85)",
  },
];

export default function Team() {
  return (
    <section
      id="team"
      data-bg="light"
      style={{
        background: "var(--cream)",
        padding: "120px 56px",
        borderTop: "1px solid rgba(7,7,27,0.06)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1240 }}>
        <div className="mb-16 flex flex-wrap items-end justify-between gap-10">
          <Reveal>
            <div className="section-tag" style={{ color: "var(--color-blue)", marginBottom: 22 }}>
              The Team
            </div>
            <h2
              className="serif"
              style={{
                fontSize: "var(--fs-display-md)",
                fontWeight: 300,
                lineHeight: 1.06,
                color: "var(--navy)",
                letterSpacing: "-0.02em",
              }}
            >
              People who
              <br />
              <span className="serif-i">know people.</span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p
              style={{
                maxWidth: 360,
                fontSize: 18,
                fontWeight: 300,
                lineHeight: 1.75,
                color: "var(--navy)",
              }}
            >
              Our consultants are industry insiders &mdash; with direct experience in
              KBB retail, design studios, and trade.
            </p>
          </Reveal>
        </div>

        <div className="team-grid grid gap-12 md:grid-cols-2">
          {TEAM.map((m, i) => (
            <Reveal
              key={m.name + i}
              delay={((i + 1) * 100) as 100 | 200}
              as="div"
              className="team-card group relative overflow-hidden rounded-[14px]"
            >
              <div
                className="team-img relative overflow-hidden"
                style={{ aspectRatio: "4 / 3.75", background: "var(--surface)" }}
              >
                <img
                  src={m.image}
                  alt={`${m.name}, ${m.role}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-700 ease-out-expo will-change-transform group-hover:scale-[1.04] group-hover:[filter:none]"
                  style={{
                    objectPosition: m.objectPosition ?? "center top",
                    filter: m.filter ?? "grayscale(20%) brightness(0.95)",
                  }}
                />
                <div
                  className="team-info absolute inset-x-0 bottom-0 border-t"
                  style={{
                    padding: "28px 28px 32px",
                    background: "rgba(10,9,30,0.42)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    borderColor: "rgba(255,255,255,0.10)",
                  }}
                >
                  <p
                    className="serif"
                    style={{
                      fontSize: 22,
                      fontWeight: 400,
                      color: "var(--cream)",
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {m.name}
                  </p>
                  <p
                    style={{
                      marginTop: 6,
                      fontSize: 10,
                      fontWeight: 400,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                    }}
                  >
                    {m.role}
                  </p>
                  <p
                    style={{
                      marginTop: 12,
                      fontSize: 13,
                      fontWeight: 300,
                      lineHeight: 1.75,
                      color: "rgba(255,255,255,0.65)",
                      maxWidth: 480,
                    }}
                  >
                    {m.bio}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
