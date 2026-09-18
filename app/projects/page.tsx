import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Reveal } from "@/components/reveal";
import { getProjects } from "@/lib/data";

export const metadata = { title: "Projects", description: "Selected work dan case studies Teman Digital." };

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <main className="projects-page"><Navbar /><div className="container">
    <header className="page-head"><Reveal><div className="eyebrow">OUR WORK</div><h1 className="display">Selected<br />Projects.</h1><p className="lead">Kumpulan website, dashboard, dan web application yang dibangun sebagai solusi, bukan sekadar tampilan.</p></Reveal></header>
    {projects.length===0 ? (
      <div className="empty-state">Portfolio CMS sudah siap. Project yang dipublish dari Supabase akan otomatis muncul di sini.</div>
    ) : (
      <div className="project-list">
        {projects.map((project,index)=>(
          <Reveal key={project.id} delay={Math.min(index*.06,.2)}>
            <Link href={`/projects/${project.slug}`} className="work-card">
              <div className="work-visual"><div className="work-label">{project.title}</div></div>
              <div className="work-info"><div>
                <div className="muted-index">{project.category} / {project.year ?? "—"}</div>
                <h3>{project.title}</h3><p>{project.excerpt}</p>
                <div className="work-tech">{project.technologies.map(item=><span className="pill" key={item}>{item}</span>)}</div>
              </div><span>View Case Study ↗</span></div>
            </Link>
          </Reveal>
        ))}
      </div>
    )}
  </div></main>;
}
