import { AdminPanel } from "@/components/admin-panel";

export const metadata={title:"Admin"};

export default function AdminPage(){
  return <main className="admin-page"><AdminPanel/></main>;
}
