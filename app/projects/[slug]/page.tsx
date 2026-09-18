import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { getProject } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project" };
  return { title: project.title, description: project.excerpt };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return <main className="project-detail"><Navbar />
    <section className="detail-hero"><div className="container">
      <div className="eyebrow">{project.category} / {project.year ?? "Selected Work"}</div>
      <h1 className="display">{project.title}</h1><p className="lead">{project.excerpt}</p>
      <div className="detail-meta">{project.technologies.map(item=><span className="pill" key={item}>{item}</span>)}</div>
    </div></section>
    <section className="container detail-grid">
      <div><div className="eyebrow">CASE STUDY</div></div>
      <div className="detail-body">
        <h2>Overview</h2><p>{project.description || project.excerpt}</p>
        {project.challenge && <><h2>The Challenge</h2><p>{project.challenge}</p></>}
        {project.solution && <><h2>The Solution</h2><p>{project.solution}</p></>}
        <div className="hero-actions">
          {project.preview_url && <a className="button primary" href={project.preview_url} target="_blank" rel="noreferrer">Visit Live Website ↗</a>}
          {project.repository_url && <a className="button" href={project.repository_url} target="_blank" rel="noreferrer">Repository ↗</a>}
          <Link className="button" href="/start-project">Build Something Similar →</Link>
        </div>
      </div>
    </section>
  </main>;
}
