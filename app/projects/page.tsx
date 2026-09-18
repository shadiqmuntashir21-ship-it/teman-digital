import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Reveal } from "@/components/reveal";
import { getProjects, projectThumbnail } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata={title:"Karya",description:"Website, dashboard, dan aplikasi yang pernah dikerjakan Teman Digital."};

export default async function ProjectsPage(){
  const projects=await getProjects();
  return <main className="projects-page"><Navbar/><div className="container">
    <header className="page-head"><Reveal><div className="eyebrow">KARYA KAMI</div><h1 className="display">Bukan janji.<br/>Lihat hasilnya.</h1><p className="lead">Setiap thumbnail bisa langsung membawa kamu ke website atau aplikasi live.</p></Reveal></header>
    {projects.length===0?<div className="empty-state">Belum ada project yang dipublish. Tambahkan dari panel Admin.</div>:<div className="project-showcase-grid">
      {projects.map((project,index)=>{
        const thumb=projectThumbnail(project);
        return <Reveal key={project.id} delay={Math.min(index*.05,.2)}>
          <article className="portfolio-card">
            <a href={project.preview_url||`/projects/${project.slug}`} target={project.preview_url?"_blank":undefined} rel={project.preview_url?"noreferrer":undefined} className="portfolio-thumb">
              {thumb?<img src={thumb} alt={`Preview ${project.title}`} loading="lazy"/>:<div className="portfolio-placeholder">{project.title}</div>}
              <span className="view-live">Buka Live ↗</span>
            </a>
            <div className="portfolio-copy">
              <div className="muted-index">{project.category} / {project.year??"—"}</div><h3>{project.title}</h3><p>{project.excerpt}</p>
              <div className="work-tech">{project.technologies.map(item=><span className="pill" key={item}>{item}</span>)}</div>
              <Link href={`/projects/${project.slug}`} className="text-link">Lihat detail →</Link>
            </div>
          </article>
        </Reveal>;
      })}
    </div>}
  </div></main>;
}
