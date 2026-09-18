import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Reveal } from "@/components/reveal";
import { getHomeData, projectThumbnail } from "@/lib/data";

export const dynamic = "force-dynamic";
// Final simplified conversion layout.

const WA_BASE = "https://wa.me/6282258687238";
const wa = (text:string) => `${WA_BASE}?text=${encodeURIComponent(text)}`;

export default async function HomePage(){
  const {services,pricing,projects,process,settings}=await getHomeData();

  return <main>
    <Navbar/>

    <section className="hero hero-final">
      <div className="hero-grid"/>
      <div className="container hero-final-grid">
        <div className="hero-copy">
          <Reveal><div className="eyebrow">{settings.hero_eyebrow}</div></Reveal>
          <Reveal delay={0.05}><h1 className="display">{settings.hero_title}</h1></Reveal>
          <Reveal delay={0.1}><p className="lead hero-lead">{settings.hero_description}</p></Reveal>
          <Reveal delay={0.15}>
            <div className="hero-actions">
              <a className="button primary" href={wa("Halo Teman Digital, saya ingin konsultasi project web.")} target="_blank" rel="noreferrer">Konsultasi Project ↗</a>
              <Link className="button" href="/projects">Lihat Karya →</Link>
            </div>
          </Reveal>
          <Reveal delay={0.2}><div className="hero-price-pill">Rp300 ribu – Rp500 ribu</div></Reveal>
        </div>

        <Reveal delay={0.1} className="hero-character-wrap">
          <div className="hero-character-stage">
            <div className="hero-orbit"/>
            <img className="hero-character" src="/hero-hijabi-woman.webp" alt="Ilustrasi perempuan berhijab memegang laptop"/>
            <div className="hero-badge hb1"><strong>Modern</strong><span>Rapi & meyakinkan</span></div>
            <div className="hero-badge hb2"><strong>Responsive</strong><span>Nyaman di HP</span></div>
            <div className="hero-badge hb3"><strong>Custom</strong><span>Sesuai kebutuhan</span></div>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="section work-section" id="work">
      <div className="container">
        <div className="section-head compact-head">
          <Reveal><div><div className="eyebrow">KARYA</div><h2 className="section-title">Hasil kerja yang bisa kamu buka.</h2></div></Reveal>
          <Reveal delay={0.05}><p className="lead">Klik preview untuk melihat website live.</p></Reveal>
        </div>

        <div className="project-showcase-grid final-project-grid">
          {projects.slice(0,3).map((project,index)=>{
            const thumb=projectThumbnail(project);
            return <Reveal key={project.id} delay={index*.05}>
              <article className="portfolio-card final-portfolio-card">
                <a href={project.preview_url||`/projects/${project.slug}`} target={project.preview_url?"_blank":undefined} rel={project.preview_url?"noreferrer":undefined} className="portfolio-thumb">
                  {thumb?<img src={thumb} alt={`Preview ${project.title}`} loading="lazy"/>:<div className="portfolio-placeholder">{project.title}</div>}
                </a>
                <div className="portfolio-copy">
                  <div className="muted-index">{project.category}</div>
                  <h3>{project.title}</h3>
                  <p className="clamp-2">{project.excerpt}</p>
                  <div className="portfolio-actions">
                    <Link href={`/projects/${project.slug}`} className="button small-btn">Detail</Link>
                    {project.preview_url&&<a href={project.preview_url} target="_blank" rel="noreferrer" className="button primary small-btn">Buka Live ↗</a>}
                  </div>
                </div>
              </article>
            </Reveal>;
          })}
        </div>
      </div>
    </section>

    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-head compact-head">
          <Reveal><div><div className="eyebrow">LAYANAN</div><h2 className="section-title">Apa yang bisa dibuat?</h2></div></Reveal>
          <Reveal delay={0.05}><p className="lead">Pilih yang paling dekat dengan kebutuhanmu.</p></Reveal>
        </div>

        <div className="service-simple-grid">
          {services.map((service,index)=><Reveal key={service.id} delay={index*.04}>
            <article className="service-simple">
              <span className="service-number">{String(index+1).padStart(2,"0")}</span>
              <div><h3>{service.title}</h3><p>{service.short_description}</p></div>
            </article>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section className="section process-section" id="process">
      <div className="container">
        <div className="section-head compact-head">
          <Reveal><div><div className="eyebrow">PROSES</div><h2 className="section-title">Singkat, jelas, lalu tayang.</h2></div></Reveal>
        </div>
        <div className="process-compact">
          {process.slice(0,3).map((item,index)=><Reveal key={item.id} delay={index*.05}>
            <article className="process-mini"><span>0{index+1}</span><h3>{item.title}</h3><p>{item.description}</p></article>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section className="section pricing-section" id="pricing">
      <div className="container">
        <div className="section-head compact-head">
          <Reveal><div><div className="eyebrow">HARGA</div><h2 className="section-title">Paket sederhana dan jelas.</h2></div></Reveal>
          <Reveal delay={0.05}><p className="lead">Maksimal Rp500 ribu untuk paket yang ditampilkan di sini.</p></Reveal>
        </div>

        <div className="pricing-grid">
          {pricing.map((item,index)=><Reveal key={item.id} delay={index*.05}>
            <article className={`price-card ${item.featured?"featured":""} ${item.slug==="sistem-custom"?"system-card":""}`}>
              <div className="price-topline"><span className="muted-index">0{index+1}</span>{item.featured&&<span className="price-badge">POPULER</span>}</div>
              <h3>{item.name}</h3>
              <p className="price-description">{item.description}</p>
              <div className="price">{item.price_label}</div>
              <ul>{item.features.slice(0,4).map(f=><li key={f}>{f}</li>)}</ul>
              <a href={wa(`Halo Teman Digital, saya tertarik dengan ${item.name} (${item.price_label}).`)} target="_blank" rel="noreferrer" className={item.featured||item.slug==="sistem-custom"?"button primary":"button"}>{item.cta_label} ↗</a>
            </article>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section className="final-cta final-cta-dark">
      <div className="container final-cta-inner">
        <Reveal>
          <div className="eyebrow dark-eyebrow">MULAI PROJECT</div>
          <h2>{settings.final_cta_title}</h2>
          <p>{settings.final_cta_description}</p>
          <a className="button final-light-btn" href={wa("Halo Teman Digital, saya punya ide project web. Bisa dibantu?")} target="_blank" rel="noreferrer">Ceritakan Project ↗</a>
        </Reveal>
      </div>
    </section>

    <footer className="footer"><div className="container footer-row">
      <div className="brand"><span className="brand-mark">TD</span><span>Teman Digital</span></div>
      <span>{settings.footer_tagline}</span>
      <a href={wa("Halo Teman Digital, saya ingin konsultasi.")} target="_blank" rel="noreferrer">0822 5868 7238 ↗</a>
      <span>© {new Date().getFullYear()}</span>
    </div></footer>
  </main>;
}
