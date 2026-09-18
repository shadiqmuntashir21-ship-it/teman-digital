import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function NotFound() {
  return <main className="builder-page"><Navbar /><div className="container" style={{paddingTop:80}}>
    <div className="eyebrow">404 / LOST IN DIGITAL</div><h1 className="display">Page<br />not found.</h1>
    <p className="lead">Halaman ini tidak ada atau sudah berpindah.</p>
    <Link href="/" className="button primary">Back Home ↗</Link>
  </div></main>;
}
