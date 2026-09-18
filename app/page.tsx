import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { getHomeData, projectThumbnail } from "@/lib/data";

const WA_BASE="https://wa.me/6282258687238";

function wa(text:string){
  return `${WA_BASE}?text=${encodeURIComponent(text)}`;
}

export default async function HomePage(){
  const {services,pricing,projects,process,values,settings}=await getHomeData();

  return <main>
    <Navbar />

    <section className="hero">
      <div className="hero-grid"/>
      <div className="hero-orb"/>
      <div className="hero-accent hero-accent-a"/>
      <div className="hero-accent hero-accent-b"/>
      <div className="container">
        <div className="hero-layout">
          <div className="hero-copy">
            <Reveal><div className="eyebrow">{settings.hero_eyebrow}</div></Reveal>
            <Reveal delay={0.06}><h1 className="display">{settings.hero_title}</h1></Reveal>
            <Reveal delay={0.12}><p className="lead">{settings.hero_description}</p></Reveal>
            <Reveal delay={0.18}>
              <div className="hero-actions">
                <a className="button primary" href={wa("Halo Teman Digital, saya ingin konsultasi tentang kebutuhan website/web.")} target="_blank" rel="noreferrer">Tanya lewat WhatsApp <span>↗</span></a>
                <Link className="button" href="/projects">Lihat Karya <span>→</span></Link>
              </div>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="hero-proof">
                <span>Harga mulai Rp300 ribu</span>
                <span>Mobile-friendly</span>
                <span>Bisa konsultasi dulu</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="hero-showcase">
            <div className="solution-card solution-card-main">
              <div className="solution-top"><span className="mini-dot"/><span>temandigital.id</span><span>↗</span></div>
              <div className="solution-body">
                <div className="solution-kicker">BUKAN CUMA TAMPILAN</div>
                <h2>Mulai dari masalahnya.<br/>Baru pilih solusi webnya.</h2>
                <p>Kami bantu menyederhanakan kebutuhan menjadi website yang jelas, rapi, dan siap dipakai.</p>
              </div>
            </div>
            <div className="floating-note note-one">Website Portofolio</div>
            <div className="floating-note note-two">Company Profile</div>
            <div className="floating-note note-three">Web App Sederhana</div>
          </Reveal>
        </div>
      </div>
    </section>

    <Marquee/>

    <section className="section work-section" id="work">
      <div className="container">
        <div className="works-head">
          <Reveal><div><div className="eyebrow">KARYA PILIHAN</div><h2 className="section-title">Biar hasil yang bicara.</h2></div></Reveal>
          <Reveal delay={0.08}><p className="lead">Setiap project bisa punya live preview. Klik thumbnail untuk melihat langsung website atau aplikasi aslinya.</p></Reveal>
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
            <div><div className="eyebrow">PORTFOLIO SIAP DIISI</div><h3>Masukkan link project dari Admin.</h3></div>
            <p>Link Vercel, Apps Script, atau website publik lain bisa ditampilkan sebagai thumbnail dan dibuka langsung dari portfolio.</p>
          </div>
        </Reveal>}
      </div>
    </section>

    <section className="section services-section" id="services">
      <div className="container">
        <div className="services-head">
          <Reveal><div><div className="eyebrow">LAYANAN</div><h2 className="section-title">Bukan jualan fitur. Kami bantu cari bentuk web yang paling pas.</h2></div></Reveal>
          <Reveal delay={0.08}><p className="lead">Mulai dari profil pribadi, usaha, organisasi, komunitas, sampai kebutuhan web sederhana yang melibatkan form atau data.</p></Reveal>
        </div>
        <div className="services-list">
          {services.map((service,index)=><Reveal key={service.id} delay={Math.min(index*.04,.18)}>
            <div className="service-row">
              <span className="muted-index">{String(index+1).padStart(2,"0")}</span>
              <div className="service-name-wrap"><h3>{service.title}</h3><span className="service-mobile-price">{service.starting_price}</span></div>
              <p>{service.short_description}</p>
              <div className="service-tail">
                <span>{service.starting_price}</span>
                <a href={wa(`Halo Teman Digital, saya ingin tanya tentang layanan ${service.title}.`)} target="_blank" rel="noreferrer" className="service-wa">Tanya ↗</a>
              </div>
            </div>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section className="value-band">
      <div className="giant-type">RAPI. JELAS. ENAK DIPAKAI. —</div>
      <div className="container">
        <div className="value-grid">
          {values.map(item=><div className="value" key={item.id}><div className="muted-index">{item.label}</div><h3>{item.title}</h3><p>{item.description}</p></div>)}
        </div>
      </div>
    </section>

    <section className="section process-section" id="process">
      <div className="container process-grid">
        <div className="process-sticky">
          <Reveal><div className="eyebrow">PROSES</div><h2 className="section-title">Santai ngobrolnya. Jelas pengerjaannya.</h2><p className="lead">Kamu tidak perlu datang dengan brief teknis. Ceritakan masalah atau kebutuhan, lalu kami bantu rapikan arah project-nya.</p></Reveal>
        </div>
        <div className="process-list">
          {process.map(item=><Reveal key={item.id}><article className="process-step"><div className="muted-index">{String(item.step_no).padStart(2,"0")}</div><h3>{item.title}</h3><p>{item.description}</p></article></Reveal>)}
        </div>
      </div>
    </section>

    <section className="section pricing-section" id="pricing">
      <div className="container">
        <div className="pricing-head">
          <Reveal><div><div className="eyebrow">KISARAN HARGA</div><h2 className="section-title">Mulai kecil. Tetap terlihat serius.</h2></div></Reveal>
          <Reveal delay={0.08}><p className="lead">Untuk kebutuhan web sederhana, kisaran kami Rp300 ribu sampai Rp700 ribu. Scope menyesuaikan kebutuhan supaya tetap realistis dan hasilnya rapi.</p></Reveal>
        </div>
        <div className="pricing-grid">
          {pricing.map((item,index)=><Reveal key={item.id} delay={index*.06}>
            <article className={`price-card ${item.featured?"featured":""}`}>
              {item.featured&&<span className="price-badge">PALING PAS</span>}
              <div className="eyebrow">0{index+1}</div><h3>{item.name}</h3><p>{item.description}</p>
              <div className="price">{item.price_label}</div>
              <ul>{item.features.map(feature=><li key={feature}>{feature}</li>)}</ul>
              <a href={wa(`Halo Teman Digital, saya tertarik dengan paket ${item.name} (${item.price_label}). Bisa konsultasi dulu?`)} target="_blank" rel="noreferrer" className={item.featured?"button primary":"button"}>{item.cta_label} ↗</a>
            </article>
          </Reveal>)}
        </div>
        <div className="pricing-note">* Harga berlaku untuk scope web sederhana. Kebutuhan di luar scope akan dibicarakan dulu sebelum pengerjaan.</div>
      </div>
    </section>

    <section className="final-cta">
      <div className="container">
        <Reveal>
          <div className="eyebrow">TIDAK HARUS SUDAH PUNYA BRIEF</div>
          <h2>{settings.final_cta_title}</h2>
          <p>{settings.final_cta_description}</p>
          <div className="hero-actions final-actions">
            <a className="button primary" href={wa("Halo Teman Digital, saya punya kebutuhan digital tapi belum yakin solusi web apa yang cocok. Bisa konsultasi?")} target="_blank" rel="noreferrer">Chat WhatsApp <span>↗</span></a>
            <Link className="button" href="/start-project">Isi Kebutuhan Singkat</Link>
          </div>
        </Reveal>
      </div>
    </section>

    <footer className="footer"><div className="container footer-row">
      <div className="brand"><span className="brand-mark">TD</span><span>Teman Digital</span></div>
      <span>{settings.footer_tagline}</span>
      <a href={wa("Halo Teman Digital, saya ingin konsultasi.")} target="_blank" rel="noreferrer">0822 5868 7238 ↗</a>
      <span>© {new Date().getFullYear()} Teman Digital</span>
    </div></footer>
  </main>;
}
