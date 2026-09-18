import Link from "next/link";

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
      <Link href="/start-project" className="button primary">Mulai Project <span>↗</span></Link>
    </nav>
  </div>;
}
