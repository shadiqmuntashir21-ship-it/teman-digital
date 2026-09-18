import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { getHomeData } from "@/lib/data";

const values = [
  ["01","Thoughtful Design","Desain dibuat untuk kebutuhan user dan tujuan bisnis, bukan sekadar mengikuti tren."],
  ["02","Modern Development","Stack modern, struktur bersih, dan fondasi yang siap berkembang bersama bisnis."],
  ["03","Performance First","Motion tetap terasa premium tanpa mengorbankan responsivitas dan kecepatan."],
  ["04","Business Focus","Setiap halaman punya arah yang jelas: membangun kepercayaan dan mendorong tindakan."],
];
const process = [
  ["01","Discover","Memahami kebutuhan, target, karakter brand, dan hasil yang ingin dicapai."],
  ["02","Design","Menyusun struktur, visual direction, dan pengalaman yang terasa tepat untuk brand."],
  ["03","Build","Mengubah desain menjadi produk fullstack yang cepat, responsive, dan terintegrasi."],
  ["04","Review","Testing, refinement, dan memastikan detail bekerja dengan baik di berbagai device."],
  ["05","Launch","Deploy, final check, dan produk siap digunakan untuk bisnis."],
];

export default async function HomePage() {
  const { services, pricing, projects, settings } = await getHomeData();
  return (
    <main>
      <Navbar />
      <section className="hero">
        <div className="hero-grid" /><div className="hero-orb" />
        <div className="container">
          <div className="hero-copy">
            <Reveal><div className="eyebrow">{settings.hero_eyebrow}</div></Reveal>
            <Reveal delay={0.08}><h1 className="display">{settings.hero_title}</h1></Reveal>
            <Reveal delay={0.16}><p className="lead">{settings.hero_description}</p></Reveal>
            <Reveal delay={0.22}>
              <div className="hero-actions">
                <Link className="button primary" href="/start-project">Mulai Project <span>↗</span></Link>
                <Link className="button" href="/projects">Lihat Hasil Kami <span>→</span></Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.26} className="hero-bottom">
            <div className="browser">
              <div className="browser-bar">
                <span className="browser-dot" /><span className="browser-dot" /><span className="browser-dot" />
                <span className="browser-address">temandigital / experience</span>
              </div>
              <div className="browser-stage">
                <div className="browser-copy">
                  <div className="eyebrow">BUILT TO FEEL DIFFERENT</div>
                  <h2>Digital that looks good and works hard.</h2>
                  <div className="browser-meta">
                    <span className="pill">STRATEGY</span><span className="pill">UI/UX</span>
                    <span className="pill">FULLSTACK</span><span className="pill">MOTION</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <Marquee />

      <section className="section" id="work">
        <div className="container">
          <div className="works-head">
            <Reveal><div><div className="eyebrow">SELECTED WORK</div><h2 className="section-title">Yang sudah kami ubah menjadi pengalaman digital.</h2></div></Reveal>
            <Reveal delay={0.1}><p className="lead">Bukan hanya screenshot. Setiap project nantinya dapat dibuka sebagai case study dan live preview.</p></Reveal>
          </div>
          {projects.length > 0 ? (
            <div className="work-grid">
              {projects.slice(0,3).map((project,index)=>(
                <Reveal key={project.id} delay={index*0.08}>
                  <Link className="work-card" href={`/projects/${project.slug}`}>
                    <div className="work-visual"><div className="work-label">{project.title}</div></div>
                    <div className="work-info">
                      <div>
                        <div className="muted-index">0{index+1} / {project.category}</div>
                        <h3>{project.title}</h3><p>{project.excerpt}</p>
                        <div className="work-tech">{project.technologies.map((tech)=><span className="pill" key={tech}>{tech}</span>)}</div>
                      </div>
                      <span>Explore Project ↗</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="work-card">
                <div className="work-visual"><div className="work-label">Your work, here.</div></div>
                <div className="work-info">
                  <div><div className="muted-index">PORTFOLIO CMS READY</div><h3>Project pertama tinggal dipublish.</h3><p>Portfolio sudah terhubung ke Supabase. Begitu project ditambahkan dan dipublish, halaman ini otomatis hidup.</p></div>
                  <Link href="/start-project">Build the next one ↗</Link>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <div className="services-head">
            <Reveal><div><div className="eyebrow">SERVICES</div><h2 className="section-title">Apa yang ingin Anda bangun?</h2></div></Reveal>
            <Reveal delay={0.1}><p className="lead">Pilih titik awal. Kalau kebutuhannya belum jelas, kita bantu petakan dari masalah bisnisnya.</p></Reveal>
          </div>
          <div className="services-list">
            {services.map((service,index)=>(
              <Reveal key={service.id} delay={Math.min(index*0.04,0.2)}>
                <Link href={`/start-project?service=${service.slug}`} className="service-row">
                  <span className="muted-index">{String(index+1).padStart(2,"0")}</span>
                  <h3>{service.title}</h3><p>{service.short_description}</p><span className="service-arrow">↗</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="value-band">
        <div className="giant-type">BUILD SOMETHING THAT MATTERS —</div>
        <div className="container">
          <div className="value-grid">
            {values.map(([index,title,description])=>(
              <div className="value" key={index}><div className="muted-index">{index}</div><h3>{title}</h3><p>{description}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="process">
        <div className="container process-grid">
          <div className="process-sticky">
            <Reveal><div className="eyebrow">HOW WE WORK</div><h2 className="section-title">Dari cerita sampai launch.</h2><p className="lead">Proses dibuat jelas supaya Anda selalu tahu project sedang berada di tahap mana.</p></Reveal>
          </div>
          <div className="process-list">
            {process.map(([index,title,description])=>(
              <Reveal key={index}><article className="process-step"><div className="muted-index">{index}</div><h3>{title}</h3><p>{description}</p></article></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="container">
          <div className="pricing-head">
            <Reveal><div><div className="eyebrow">STARTING POINT</div><h2 className="section-title">Pilih cara paling nyaman untuk mulai.</h2></div></Reveal>
            <Reveal delay={0.1}><p className="lead">Harga menjadi titik awal. Scope final tetap mengikuti fitur, kompleksitas, dan kebutuhan bisnis.</p></Reveal>
          </div>
          <div className="pricing-grid">
            {pricing.map((item,index)=>(
              <Reveal key={item.id} delay={index*0.08}>
                <article className={`price-card ${item.featured ? "featured" : ""}`}>
                  {item.featured && <span className="price-badge">MOST POPULAR</span>}
                  <div className="eyebrow">0{index+1}</div><h3>{item.name}</h3><p>{item.description}</p>
                  <div className="price">{item.price_label}</div>
                  <ul>{item.features.map((feature)=><li key={feature}>{feature}</li>)}</ul>
                  <Link href={`/start-project?package=${item.slug}`} className={item.featured ? "button primary" : "button"}>{item.cta_label} ↗</Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container">
          <Reveal><div className="eyebrow">YOUR IDEA COULD BE NEXT</div><h2>LET&apos;S BUILD<br />SOMETHING GREAT.</h2><p>Punya ide, sistem yang masih manual, atau bisnis yang butuh tampil lebih serius? Ceritakan. Kita mulai dari sana.</p><Link className="button primary" href="/start-project">Start Your Project <span>↗</span></Link></Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-row">
          <div className="brand"><span className="brand-dot" /> Teman Digital</div>
          <span>Design • Development • Digital Experience</span>
          <span>© {new Date().getFullYear()} Teman Digital</span>
        </div>
      </footer>
    </main>
  );
}
