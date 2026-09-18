import { Navbar } from "@/components/navbar";
import { ProjectBuilder } from "@/components/project-builder";

export const metadata = {
  title: "Start a Project",
  description: "Ceritakan kebutuhan project Anda kepada Teman Digital.",
};

export default function StartProjectPage() {
  return <main className="builder-page"><Navbar /><div className="container"><ProjectBuilder /></div></main>;
}
