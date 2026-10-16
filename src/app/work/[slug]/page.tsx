import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/awake/Navbar";
import PageHero from "@/components/awake/PageHero";
import CaseGallery from "@/components/awake/CaseGallery";
import CaseWorks from "@/components/awake/CaseWorks";
import CtaBand from "@/components/awake/CtaBand";
import { projectBySlug, projects } from "@/data/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return { title: "Work" };

  return {
    title: project.name,
    description: project.summary,
    openGraph: { title: project.name, description: project.summary },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="casePage-page">
      <div className="casePage-navRow">
        <Navbar variant="dev" />
      </div>

      <PageHero
        navRow={false}
        variant="red"
        title={project.name}
        subtitle={project.summary}
        meta={
          <>
            <span className="pageHero-metaItem">
              {project.index} — {project.kind}
            </span>
            <span className="pageHero-metaItem">
              {project.role} · {project.year}
            </span>
          </>
        }
      />

      <CaseGallery project={project} />
      <CaseWorks current={project.id} />
      <CtaBand variant="page" />
    </article>
  );
}
