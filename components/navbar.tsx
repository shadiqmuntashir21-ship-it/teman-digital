import Link from "next/link";

const WA="https://wa.me/6282258687238?text=Halo%20Teman%20Digital%2C%20saya%20ingin%20konsultasi%20tentang%20kebutuhan%20website%2Fweb.";

export function Navbar(){
  return <div className="nav-wrap">
    <nav className="nav" aria-label="Navigasi utama">
      <Link href="/" className="brand"><span className="brand-mark">TD</span><span>Teman Digital</span></Link>
      <div className="nav-links">
        <Link href="/#work">Karya</Link>
        <Link href="/#services">Layanan</Link>
        <Link href="/#process">Proses</Link>
        <Link href="/#pricing">Harga</Link>
      </div>
      <a href={WA} target="_blank" rel="noreferrer" className="button primary nav-whatsapp"><span className="desktop-wa">Mulai Project</span><span className="mobile-wa">Mulai</span><span>↗</span></a>
    </nav>
  </div>;
}
