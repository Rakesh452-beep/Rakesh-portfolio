import type { Metadata } from "next";
import PageHero from "@/components/awake/PageHero";
import ServicesStack from "@/components/awake/ServicesStack";
import CtaBand from "@/components/awake/CtaBand";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack web apps, dashboards and portals, Python automation, and AI tooling — what I build and how I work.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="What I build"
        subtitle="Four ways I usually get involved — from a full product build to the scheduled job nobody wants to run by hand."
        meta={
          <>
            <span className="pageHero-metaItem">{services.length} services</span>
            <span className="pageHero-metaItem">2024 — 2026</span>
          </>
        }
      />

      <ServicesStack />

      <CtaBand variant="page" />
    </>
  );
}
