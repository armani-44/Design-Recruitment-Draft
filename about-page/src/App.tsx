import Grain from "./components/Grain";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SkipLink from "./components/SkipLink";

import Hero from "./sections/Hero";
import Story from "./sections/Story";
import Numbers from "./sections/Numbers";
import Principles from "./sections/Principles";
import Editorial from "./sections/Editorial";
import Marquee from "./sections/Marquee";
import Team from "./sections/Team";
import Process from "./sections/Process";
import Cta from "./sections/Cta";

export default function App() {
  return (
    <>
      <SkipLink />
      <Grain />
      <Nav />

      <main id="about">
        <Hero />
        <Story />
        <Numbers />
        <Principles />
        <Editorial />
        <Marquee />
        <Team />
        <Process />
        <Cta />
      </main>

      <Footer />
    </>
  );
}
