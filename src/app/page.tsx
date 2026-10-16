import Hero from "@/components/awake/Hero";
import Statement from "@/components/awake/Statement";
import AboutMe from "@/components/awake/AboutMe";
import Internships from "@/components/awake/Internships";
import Skills from "@/components/awake/Skills";
import CaseGrid from "@/components/awake/CaseGrid";
import Archive from "@/components/awake/Archive";
import ServicesStack from "@/components/awake/ServicesStack";
import Deliverables from "@/components/awake/Deliverables";
import CtaBand from "@/components/awake/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <AboutMe />
      <Internships />
      <Skills />
      <CaseGrid />
      <Archive />
      <ServicesStack />
      <Deliverables />
      <CtaBand variant="home" />
    </>
  );
}
