"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";

type State = {
  service: string; goal: string; features: string[]; design_style: string;
  timeline: string; budget: string; name: string; business_name: string;
  phone: string; email: string; notes: string;
};

const services = [
  "Landing Page",
  "Website Company Profile",
  "Website UMKM & Bisnis",
  "Website Portofolio",
  "Website Organisasi & Komunitas",
  "Aplikasi Web & Dashboard Sederhana",
  "Saya belum yakin"
];

const goals = [
  "Mengenalkan usaha atau layanan",
  "Menampilkan portofolio atau karya",
  "Membuat organisasi lebih mudah ditemukan",
  "Mengarahkan calon pelanggan ke WhatsApp",
  "Mengelola data atau form secara online",
  "Membuat kebutuhan digital lainnya"
];

const featureOptions = [
  "WhatsApp",
  "Form Kontak",
  "Galeri",
  "Daftar Produk/Layanan",
  "Lokasi / Maps",
  "Login",
  "Dashboard",
  "Database",
  "Upload File",
  "Berita / Kegiatan"
];

const styles = ["Clean & Minimal","Elegan","Modern","Profesional","Kreatif"];
const timelines = ["Secepatnya","1–2 minggu","Bulan ini","Bulan depan","Masih rencana"];
const budgets = ["Rp300 ribu","Rp400 ribu","Rp500 ribu","Rp600 ribu","Rp700 ribu","Belum yakin"];

const initialState: State = { service:"",goal:"",features:[],design_style:"",timeline:"",budget:"",name:"",business_name:"",phone:"",email:"",notes:"" };
const WA_BASE="https://wa.me/6282258687238";

function Choice({label,selected,onClick,note}:{label:string;selected:boolean;onClick:()=>void;note?:string;}) {
  return <button type="button" className={`option ${selected ? "selected" : ""}`} onClick={onClick}><strong>{label}</strong>{note && <small>{note}</small>}</button>;
}

export function ProjectBuilder() {
  const [step,setStep]=useState(0);
  const [state,setState]=useState<State>(initialState);
  const [status,setStatus]=useState<"idle"|"loading"|"error"|"success">("idle");
  const [message,setMessage]=useState("");
  const totalSteps=7;
  const progress=((step+1)/totalSteps)*100;

  const canContinue=useMemo(()=>{
    if(step===0) return Boolean(state.service);
    if(step===1) return Boolean(state.goal);
    if(step===2) return state.features.length>0;
    if(step===3) return Boolean(state.design_style);
    if(step===4) return Boolean(state.timeline);
    if(step===5) return Boolean(state.budget);
    return Boolean(state.name.trim() && state.phone.trim());
  },[state,step]);

  const waMessage=useMemo(()=>encodeURIComponent(
    `Halo Teman Digital, saya ${state.name||"ingin konsultasi"}.\n\nKebutuhan: ${state.service||"-"}\nTujuan: ${state.goal||"-"}\nFitur: ${state.features.join(", ")||"-"}\nGaya: ${state.design_style||"-"}\nTimeline: ${state.timeline||"-"}\nBudget: ${state.budget||"-"}\n\nCatatan: ${state.notes||"-"}`
  ),[state]);

  const setSingle=(key:keyof State,value:string)=>setState(current=>({...current,[key]:value}));
  const toggleFeature=(feature:string)=>setState(current=>({...current,features:current.features.includes(feature)?current.features.filter(item=>item!==feature):[...current.features,feature]}));

  async function submit() {
    if(!canContinue) return;
    setStatus("loading"); setMessage("");
    try {
      const response=await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(state)});
      const payload=await response.json();
      if(!response.ok) throw new Error(payload.error || "Kebutuhanmu belum berhasil dikirim.");
      setStatus("success");
    } catch(error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Terjadi kesalahan.");
    }
  }

  if(status==="success") {
    return <div className="builder-shell"><div className="builder-success"><div>
      <div className="success-mark">✓</div><div className="eyebrow">SUDAH TERSIMPAN</div>
      <h1>Siap. Tinggal lanjut ngobrol.</h1>
      <p className="lead">Kebutuhanmu sudah masuk. Supaya lebih cepat, lanjutkan lewat WhatsApp dan kami bantu arahkan solusi yang paling pas.</p>
      <div className="hero-actions" style={{justifyContent:"center"}}>
        <a href={`${WA_BASE}?text=${waMessage}`} target="_blank" rel="noreferrer" className="button primary">Lanjut ke WhatsApp ↗</a>
        <Link href="/" className="button">Kembali ke Home</Link>
      </div>
    </div></div></div>;
  }

  const screens = [
    { eyebrow:"01 / KEBUTUHAN", title:"Mau dibuatkan apa?", description:"Pilih yang paling mendekati. Kalau belum yakin, aman — nanti kami bantu arahkan.",
      content:<div className="option-grid">{services.map(item=><Choice key={item} label={item} selected={state.service===item} onClick={()=>setSingle("service",item)} />)}</div> },
    { eyebrow:"02 / TUJUAN", title:"Kamu ingin hasil akhirnya seperti apa?", description:"Biar kami tidak sekadar bikin halaman, tapi benar-benar menyelesaikan kebutuhanmu.",
      content:<div className="option-grid">{goals.map(item=><Choice key={item} label={item} selected={state.goal===item} onClick={()=>setSingle("goal",item)} />)}</div> },
    { eyebrow:"03 / FITUR", title:"Apa yang perlu ada?", description:"Boleh pilih lebih dari satu. Fitur final tetap menyesuaikan kebutuhan dan budget.",
      content:<div className="option-grid">{featureOptions.map(item=><Choice key={item} label={item} selected={state.features.includes(item)} onClick={()=>toggleFeature(item)} />)}</div> },
    { eyebrow:"04 / GAYA", title:"Tampilan seperti apa yang kamu suka?", description:"Supaya dari awal kami sudah punya arah visual yang pas.",
      content:<div className="option-grid">{styles.map(item=><Choice key={item} label={item} selected={state.design_style===item} onClick={()=>setSingle("design_style",item)} />)}</div> },
    { eyebrow:"05 / WAKTU", title:"Kapan ingin mulai?", description:"Kami gunakan ini untuk menyesuaikan prioritas dan alur pengerjaan.",
      content:<div className="option-grid">{timelines.map(item=><Choice key={item} label={item} selected={state.timeline===item} onClick={()=>setSingle("timeline",item)} />)}</div> },
    { eyebrow:"06 / BUDGET", title:"Budget yang paling nyaman?", description:"Semua paket kami berada di kisaran Rp300 ribu sampai Rp700 ribu untuk kebutuhan web sederhana.",
      content:<div className="option-grid">{budgets.map(item=><Choice key={item} label={item} selected={state.budget===item} onClick={()=>setSingle("budget",item)} />)}</div> },
    { eyebrow:"07 / KONTAK", title:"Kami hubungi ke mana?", description:"Isi singkat saja. Setelah ini bisa langsung lanjut lewat WhatsApp.",
      content:<div className="builder-fields">
        <div className="field"><label>Nama *</label><input value={state.name} onChange={e=>setSingle("name",e.target.value)} placeholder="Nama kamu" /></div>
        <div className="field"><label>Nama usaha / organisasi</label><input value={state.business_name} onChange={e=>setSingle("business_name",e.target.value)} placeholder="Opsional" /></div>
        <div className="field"><label>WhatsApp *</label><input inputMode="tel" value={state.phone} onChange={e=>setSingle("phone",e.target.value)} placeholder="08xxxxxxxxxx" /></div>
        <div className="field"><label>Email</label><input type="email" value={state.email} onChange={e=>setSingle("email",e.target.value)} placeholder="nama@email.com" /></div>
        <div className="field"><label>Catatan tambahan</label><textarea value={state.notes} onChange={e=>setSingle("notes",e.target.value)} placeholder="Ceritakan kebutuhanmu kalau ada detail tambahan..." /></div>
      </div> },
  ];

  const current=screens[step];
  return <div className="builder-shell">
    <div className="builder-top">
      <div className="brand"><span className="brand-mark">TD</span><span>Project Builder</span></div>
      <div className="progress" aria-label={`Langkah ${step+1} dari ${totalSteps}`}><span style={{width:`${progress}%`}} /></div>
    </div>
    <div className="builder-main">
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{opacity:0,y:18,filter:"blur(6px)"}} animate={{opacity:1,y:0,filter:"blur(0)"}} exit={{opacity:0,y:-14,filter:"blur(5px)"}} transition={{duration:.35,ease:[.22,1,.36,1]}}>
          <div className="eyebrow">{current.eyebrow}</div><h1>{current.title}</h1><p>{current.description}</p>{current.content}
          {message && <div className="builder-status error">{message}</div>}
        </motion.div>
      </AnimatePresence>
    </div>
    <div className="builder-bottom">
      <button className="button" type="button" onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0} style={{opacity:step===0?.35:1}}>← Kembali</button>
      {step<totalSteps-1 ? (
        <button className="button primary" type="button" disabled={!canContinue} onClick={()=>setStep(s=>Math.min(totalSteps-1,s+1))} style={{opacity:canContinue?1:.45}}>Lanjut →</button>
      ) : (
        <button className="button primary" type="button" disabled={!canContinue || status==="loading"} onClick={submit} style={{opacity:canContinue?1:.45}}>{status==="loading"?"Mengirim...":"Kirim Kebutuhan ↗"}</button>
      )}
    </div>
  </div>;
}
