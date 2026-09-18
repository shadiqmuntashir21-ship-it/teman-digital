import Link from "next/link";

export function Navbar() {
  return (
    <div className="nav-wrap">
      <nav className="nav" aria-label="Primary navigation">
        <Link href="/" className="brand"><span className="brand-dot" />Teman Digital</Link>
        <div className="nav-links">
          <Link href="/#work">Work</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#process">Process</Link>
          <Link href="/#pricing">Pricing</Link>
        </div>
        <Link href="/start-project" className="button primary">Start a Project <span>↗</span></Link>
      </nav>
    </div>
  );
}
