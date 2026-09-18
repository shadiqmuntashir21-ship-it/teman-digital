import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { getHomeData, projectThumbnail } from "@/lib/data";

export default async function HomePage(){
  const {services,pricing,projects,process,values,settings}=await getHomeData();

  return <main>
    <Navbar />

    <section className="hero">
      <div className="hero-grid"/>
      <div className="hero-orb"/>
      <div className="container">
        <div className="hero-copy">
          <Reveal><div className="eyebrow">{settings.hero_eyebrow}</div></Reveal>
          <Reveal delay={0.06}><h1 className="display">{settings.hero_title}</h1></Reveal>
          <Reveal delay={0.12}><p className="lead">{settings.hero_description}</p></Reveal>
          <Reveal delay={0.18}>
            <div className="hero-actions">
              <Link className="button primary" href="/start-project">Ceritakan Idemu <span>↗</span></Link>
              <Link className="button" href="/projects">Lihat Karya <span>→</span></Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.22} className="hero-bottom">
          <div className="browser light-browser">
            <div className="browser-bar">
              <span className="browser-dot"/><span className="browser-dot"/><span className="browser-dot"/>
              <span className="browser-address">temandigital.id / studio</span>
            </div>
            <div className="browser-stage">
              <div className="browser-copy">
                <div className="eyebrow">DESIGN WITH PURPOSE</div>
                <h2>Digital yang enak dilihat, mudah dipakai, dan terasa meyakinkan.</h2>
                <div className="browser-meta">
                  <span className="pill">UI/UX</span><span className="pill">FULLSTACK</span>
                  <span className="pill">DASHBOARD</span><span className="pill">MOTION</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    <Marquee/>

    <section className="section" id="work">
      <div className="container">
        <div className="works-head">
          <Reveal><div><div className="eyebrow">KARYA PILIHAN</div><h2 className="section-title">Lihat hasilnya, buka langsung websitenya.</h2></div></Reveal>
          <Reveal delay={0.08}><p className="lead">Setiap project bisa punya live preview. Klik thumbnail untuk melihat website atau aplikasi aslinya.</p></Reveal>
        </div>

        {projects.length>0 ? <div className="project-showcase-grid">
          {projects.slice(0,6).map((project,index)=>{
            const thumb=projectThumbnail(project);
            return <Reveal key={project.id} delay={Math.min(index*.05,.2)}>
              <article className="portfolio-card">
                <a href={project.preview_url||`/projects/${project.slug}`} target={project.preview_url?"_blank":undefined} rel={project.preview_url?"noreferrer":undefined} className="portfolio-thumb">
                  {thumb ? <img src={thumb} alt={`Preview ${project.title}`} loading="lazy"/> : <div className="portfolio-placeholder">{project.title}</div>}
                  <span className="view-live">Buka Live ↗</span>
                </a>
                <div className="portfolio-copy">
                  <div className="muted-index">{String(index+1).padStart(2,"0")} / {project.category}</div>
                  <h3>{project.title}</h3>
                  <p>{project.excerpt}</p>
                  <div className="work-tech">{project.technologies.map(tech=><span className="pill" key={tech}>{tech}</span>)}</div>
                  <Link href={`/projects/${project.slug}`} className="text-link">Lihat detail project →</Link>
                </div>
              </article>
            </Reveal>;
          })}
        </div> : <Reveal>
          <div className="empty-portfolio">
            <div><div className="eyebrow">PORTFOLIO CMS SIAP</div><h3>Tinggal masukkan link project dari Admin.</h3></div>
            <p>Masukkan URL Vercel, Apps Script, atau website publik lainnya. Thumbnail akan dibuat otomatis dan bisa langsung diklik.</p>
          </div>
        </Reveal>}
      </div>
    </section>

    <section className="section services-section" id="services">
      <div className="container">
        <div className="services-head">
          <Reveal><div><div className="eyebrow">LAYANAN</div><h2 className="section-title">Mau dibantu bikin apa?</h2></div></Reveal>
          <Reveal delay={0.08}><p className="lead">Tidak harus tahu istilah teknis. Ceritakan kebutuhannya, kami bantu pilih arah yang paling masuk akal.</p></Reveal>
        </div>
        <div className="services-list">
          {services.map((service,index)=><Reveal key={service.id} delay={Math.min(index*.04,.18)}>
            <Link href={`/start-project?service=${service.slug}`} className="service-row">
              <span className="muted-index">{String(index+1).padStart(2,"0")}</span>
              <h3>{service.title}</h3><p>{service.short_description}</p>
              <div className="service-tail"><span>{service.starting_price}</span><span className="service-arrow">↗</span></div>
            </Link>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section className="value-band">
      <div className="giant-type">GOOD DESIGN. SMART BUILD. REAL IMPACT. —</div>
      <div className="container">
        <div className="value-grid">
          {values.map(item=><div className="value" key={item.id}><div className="muted-index">{item.label}</div><h3>{item.title}</h3><p>{item.description}</p></div>)}
        </div>
      </div>
    </section>

    <section className="section" id="process">
      <div className="container process-grid">
        <div className="process-sticky">
          <Reveal><div className="eyebrow">CARA KAMI BEKERJA</div><h2 className="section-title">Jelas dari awal sampai tayang.</h2><p className="lead">Supaya project tidak terasa seperti masuk ke kotak hitam. Kamu tahu apa yang sedang dikerjakan dan apa langkah berikutnya.</p></Reveal>
        </div>
        <div className="process-list">
          {process.map(item=><Reveal key={item.id}><article className="process-step"><div className="muted-index">{String(item.step_no).padStart(2,"0")}</div><h3>{item.title}</h3><p>{item.description}</p></article></Reveal>)}
        </div>
      </div>
    </section>

    <section className="section pricing-section" id="pricing">
      <div className="container">
        <div className="pricing-head">
          <Reveal><div><div className="eyebrow">TITIK MULAI</div><h2 className="section-title">Mulai dari kebutuhanmu, bukan paket yang dipaksakan.</h2></div></Reveal>
          <Reveal delay={0.08}><p className="lead">Harga adalah titik awal. Scope final menyesuaikan kompleksitas, fitur, dan target project.</p></Reveal>
        </div>
        <div className="pricing-grid">
          {pricing.map((item,index)=><Reveal key={item.id} delay={index*.06}>
            <article className={`price-card ${item.featured?"featured":""}`}>
              {item.featured&&<span className="price-badge">PILIHAN POPULER</span>}
              <div className="eyebrow">0{index+1}</div><h3>{item.name}</h3><p>{item.description}</p>
              <div className="price">{item.price_label}</div>
              <ul>{item.features.map(feature=><li key={feature}>{feature}</li>)}</ul>
              <Link href={`/start-project?package=${item.slug}`} className={item.featured?"button primary":"button"}>{item.cta_label} ↗</Link>
            </article>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section className="final-cta">
      <div className="container">
        <Reveal><div className="eyebrow">PROJECT BERIKUTNYA BISA PUNYA KAMU</div><h2>{settings.final_cta_title}</h2><p>{settings.final_cta_description}</p><Link className="button primary" href="/start-project">Mulai dari Sini <span>↗</span></Link></Reveal>
      </div>
    </section>

    <footer className="footer"><div className="container footer-row">
      <div className="brand"><span className="brand-mark">TD</span><span>Teman Digital</span></div>
      <span>{settings.footer_tagline}</span>
      <span>© {new Date().getFullYear()} Teman Digital</span>
    </div></footer>
  </main>;
}
