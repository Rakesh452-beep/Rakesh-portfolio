import type { Metadata } from "next";
import PageHero from "@/components/awake/PageHero";
import CaseGrid from "@/components/awake/CaseGrid";
import CtaBand from "@/components/awake/CtaBand";
import { projects } from "@/data/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects by Rakesh Kumar I — a Next.js and Supabase freelance site, a React hackathon teammate-matching dashboard, and a scheduled Python cricket statistics pipeline.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Three builds, start to finished."
        subtitle="Each of these is something I designed, built and deployed — including the unglamorous parts like the email automation and the CI/CD."
        meta={
          <>
            <span className="pageHero-metaItem">{projects.length} case studies</span>
            <span className="pageHero-metaItem">2024 — 2025</span>
          </>
        }
      />

      <CaseGrid bare />
      <CtaBand variant="page" />
    </>
  );
}
