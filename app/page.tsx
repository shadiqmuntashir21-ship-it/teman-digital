import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { getHomeData, projectThumbnail } from "@/lib/data";

const WA_BASE = "https://wa.me/6282258687238";

function wa(text: string) {
  return `${WA_BASE}?text=${encodeURIComponent(text)}`;
}

const heroCapabilities = [
  ["01", "Website", "Promosi, profil, katalog, organisasi, dan portofolio."],
  ["02", "Dashboard", "Data, admin panel, laporan, dan alur kerja internal."],
  ["03", "Sistem Informasi", "Pendataan, pengajuan, monitoring, dan kebutuhan custom."],
  ["04", "LMS / E-Learning", "Materi, tugas, progress, kelas, dan pembelajaran online."],
];

export default async function HomePage() {
  const { services, pricing, projects, process, values, settings } = await getHomeData();

  return (
    <main>
      <Navbar />

      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="container">
          <div className="hero-layout">
            <div className="hero-copy">
              <Reveal>
                <div className="eyebrow">{settings.hero_eyebrow}</div>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="display">{settings.hero_title}</h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="lead hero-lead">{settings.hero_description}</p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="hero-actions">
                  <a
                    className="button primary"
                    href={wa("Halo Teman Digital, saya ingin konsultasi tentang website atau sistem berbasis web.")}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Konsultasi WhatsApp <span>↗</span>
                  </a>
                  <Link className="button" href="/projects">
                    Lihat Karya <span>→</span>
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="hero-proof">
                  <span>Rp300–700 ribu</span>
                  <span>Nyaman di HP</span>
                  <span>Bisa konsultasi dulu</span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.14} className="hero-panel-wrap">
              <aside className="hero-panel">
                <div className="hero-panel-head">
                  <div>
                    <div className="panel-kicker">SOLUSI BERBASIS WEB</div>
                    <h2>Tidak harus tahu istilah teknisnya.</h2>
                  </div>
                  <span className="panel-mark">TD</span>
                </div>

                <p className="panel-intro">
                  Ceritakan kebutuhanmu. Kami bantu pilih bentuk website atau sistem yang paling masuk akal.
                </p>

                <div className="capability-list">
                  {heroCapabilities.map(([index, title, description]) => (
                    <div className="capability-row" key={index}>
                      <span className="capability-index">{index}</span>
                      <div>
                        <strong>{title}</strong>
                        <p>{description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="panel-foot">
                  <span>Mulai dari</span>
                  <strong>Rp300 ribu</strong>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="section work-section" id="work">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <div>
                <div className="eyebrow">KARYA PILIHAN</div>
                <h2 className="section-title">Biar hasil yang bicara.</h2>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="lead">
                Portfolio bisa langsung membuka website atau aplikasi live. Tidak cuma screenshot yang diam.
              </p>
            </Reveal>
          </div>

          {projects.length > 0 ? (
            <div className="project-showcase-grid">
              {projects.slice(0, 6).map((project, index) => {
                const thumb = projectThumbnail(project);
                return (
                  <Reveal key={project.id} delay={Math.min(index * 0.05, 0.2)}>
                    <article className="portfolio-card">
                      <a
                        href={project.preview_url || `/projects/${project.slug}`}
                        target={project.preview_url ? "_blank" : undefined}
                        rel={project.preview_url ? "noreferrer" : undefined}
                        className="portfolio-thumb"
                      >
                        {thumb ? (
                          <img src={thumb} alt={`Preview ${project.title}`} loading="lazy" />
                        ) : (
                          <div className="portfolio-placeholder">{project.title}</div>
                        )}
                        <span className="view-live">Buka Live ↗</span>
                      </a>
                      <div className="portfolio-copy">
                        <div className="muted-index">
                          {String(index + 1).padStart(2, "0")} / {project.category}
                        </div>
                        <h3>{project.title}</h3>
                        <p>{project.excerpt}</p>
                        <div className="work-tech">
                          {project.technologies.map((tech) => (
                            <span className="pill" key={tech}>{tech}</span>
                          ))}
                        </div>
                        <Link href={`/projects/${project.slug}`} className="text-link">
                          Lihat detail project →
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <Reveal>
              <div className="empty-portfolio">
                <div>
                  <div className="eyebrow">PORTFOLIO SIAP DIISI</div>
                  <h3>Project live tinggal dimasukkan dari Admin.</h3>
                </div>
                <p>
                  Link Vercel, Apps Script, atau website publik lain bisa tampil sebagai thumbnail lalu dibuka langsung.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <div>
                <div className="eyebrow">LAYANAN</div>
                <h2 className="section-title">Pilih kebutuhan, bukan sekadar paket.</h2>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="lead">
                Mulai dari website sederhana sampai dashboard, sistem informasi, dan LMS untuk kebutuhan khusus.
              </p>
            </Reveal>
          </div>

          <div className="service-card-grid">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={Math.min(index * 0.04, 0.18)}>
                <article className="service-card">
                  <div className="service-card-top">
                    <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="service-label">{service.eyebrow}</span>
                  </div>

                  <div className="service-card-body">
                    <h3>{service.title}</h3>
                    <p>{service.short_description}</p>
                  </div>

                  <div className="service-card-foot">
                    <strong>{service.starting_price}</strong>
                    <a
                      href={wa(`Halo Teman Digital, saya ingin tanya tentang layanan ${service.title}.`)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Tanya layanan ↗
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="value-band">
        <div className="container">
          <div className="value-header">
            <Reveal>
              <div className="eyebrow dark-eyebrow">KENAPA TEMAN DIGITAL</div>
              <h2>Rapi dilihat. Jelas dipakai. Masuk akal untuk kebutuhanmu.</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                Kami tidak menumpuk fitur supaya terlihat canggih. Fokusnya adalah membuat solusi berbasis web yang terasa tepat dan mudah digunakan.
              </p>
            </Reveal>
          </div>

          <div className="value-grid">
            {values.map((item) => (
              <Reveal key={item.id}>
                <article className="value">
                  <div className="muted-index">{item.label}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section" id="process">
        <div className="container process-grid">
          <div className="process-sticky">
            <Reveal>
              <div className="eyebrow">PROSES</div>
              <h2 className="section-title">Santai ngobrolnya. Jelas pengerjaannya.</h2>
              <p className="lead">
                Kamu tidak perlu datang dengan brief teknis. Ceritakan masalah atau kebutuhan, lalu kami bantu rapikan arah project-nya.
              </p>
            </Reveal>
          </div>

          <div className="process-list">
            {process.map((item) => (
              <Reveal key={item.id}>
                <article className="process-step">
                  <div className="muted-index">{String(item.step_no).padStart(2, "0")}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section pricing-section" id="pricing">
        <div className="container">
          <div className="section-head pricing-head">
            <Reveal>
              <div>
                <div className="eyebrow">KISARAN HARGA</div>
                <h2 className="section-title">Harga sederhana, pilihan lebih jelas.</h2>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="lead">
                Range utama Rp300 ribu sampai Rp700 ribu. Pilih titik awalnya, lalu scope disesuaikan sebelum pengerjaan.
              </p>
            </Reveal>
          </div>

          <div className="pricing-grid">
            {pricing.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.06}>
                <article className={`price-card ${item.featured ? "featured" : ""} ${item.slug === "sistem-custom" ? "system-card" : ""}`}>
                  <div className="price-topline">
                    <span className="muted-index">0{index + 1}</span>
                    {item.featured && <span className="price-badge">PALING PAS</span>}
                    {item.slug === "sistem-custom" && <span className="price-badge system-badge">CUSTOM</span>}
                  </div>

                  <h3>{item.name}</h3>
                  <p className="price-description">{item.description}</p>
                  <div className="price">{item.price_label}</div>

                  <ul>
                    {item.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>

                  <a
                    href={wa(`Halo Teman Digital, saya tertarik dengan ${item.name} (${item.price_label}). Bisa konsultasi dulu?`)}
                    target="_blank"
                    rel="noreferrer"
                    className={item.featured || item.slug === "sistem-custom" ? "button primary" : "button"}
                  >
                    {item.cta_label} ↗
                  </a>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="pricing-note">
            * Harga untuk scope sederhana. Detail fitur dan batas pekerjaan disepakati lebih dulu supaya jelas dari awal.
          </p>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta-inner">
          <Reveal>
            <div className="eyebrow">MULAI DARI CERITA</div>
            <h2>{settings.final_cta_title}</h2>
            <p>{settings.final_cta_description}</p>
            <div className="hero-actions final-actions">
              <a
                className="button primary"
                href={wa("Halo Teman Digital, saya punya kebutuhan web tapi belum yakin solusi apa yang cocok. Bisa konsultasi?")}
                target="_blank"
                rel="noreferrer"
              >
                Chat WhatsApp <span>↗</span>
              </a>
              <Link className="button" href="/start-project">Isi Kebutuhan Singkat</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-row">
          <div className="brand"><span className="brand-mark">TD</span><span>Teman Digital</span></div>
          <span>{settings.footer_tagline}</span>
          <a href={wa("Halo Teman Digital, saya ingin konsultasi.")} target="_blank" rel="noreferrer">
            0822 5868 7238 ↗
          </a>
          <span>© {new Date().getFullYear()} Teman Digital</span>
        </div>
      </footer>
    </main>
  );
}
