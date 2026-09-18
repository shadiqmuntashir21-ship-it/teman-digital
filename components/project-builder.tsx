"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";

type State = {
  service: string; goal: string; features: string[]; design_style: string;
  timeline: string; budget: string; name: string; business_name: string;
  phone: string; email: string; notes: string;
};

const services = ["Landing Page","Business Website","Dashboard","Web Application","E-Commerce","Custom System","Saya belum yakin"];
const goals = ["Meningkatkan penjualan","Meningkatkan kredibilitas","Membuat sistem internal","Menampilkan portfolio","Mengotomatisasi pekerjaan","Membuat produk digital"];
const featureOptions = ["Login","Admin Dashboard","Database","CMS","Payment","Booking","WhatsApp","Email Notification","File Upload","Analytics","API Integration"];
const styles = ["Minimal","Elegant","Bold","Corporate","Creative"];
const timelines = ["Secepatnya","1–2 minggu","Bulan ini","Bulan depan","Masih planning"];
const budgets = ["< Rp3 juta","Rp3–5 juta","Rp5–10 juta","Rp10–20 juta","Rp20 juta+","Belum menentukan"];

const initialState: State = { service:"",goal:"",features:[],design_style:"",timeline:"",budget:"",name:"",business_name:"",phone:"",email:"",notes:"" };

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

  const setSingle=(key:keyof State,value:string)=>setState(current=>({...current,[key]:value}));
  const toggleFeature=(feature:string)=>setState(current=>({...current,features:current.features.includes(feature)?current.features.filter(item=>item!==feature):[...current.features,feature]}));

  async function submit() {
    if(!canContinue) return;
    setStatus("loading"); setMessage("");
    try {
      const response=await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(state)});
      const payload=await response.json();
      if(!response.ok) throw new Error(payload.error || "Project belum berhasil dikirim.");
      setStatus("success");
    } catch(error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Terjadi kesalahan.");
    }
  }

  if(status==="success") {
    return <div className="builder-shell"><div className="builder-success"><div>
      <div className="success-mark">✓</div><div className="eyebrow">PROJECT RECEIVED</div>
      <h1>Project kamu sudah masuk.</h1>
      <p className="lead">Brief sudah tersimpan. Teman Digital tinggal meninjau kebutuhan dan melanjutkan diskusi dari kontak yang kamu kirim.</p>
      <Link href="/" className="button primary">Kembali ke Home ↗</Link>
    </div></div></div>;
  }

  const screens = [
    { eyebrow:"01 / PROJECT TYPE", title:"Mau dibuatkan apa?", description:"Tidak harus tahu istilah teknisnya. Pilih yang paling mendekati kebutuhanmu.",
      content:<div className="option-grid">{services.map(item=><Choice key={item} label={item} selected={state.service===item} onClick={()=>setSingle("service",item)} />)}</div> },
    { eyebrow:"02 / GOAL", title:"Apa tujuan utamanya?", description:"Supaya solusi yang dibuat fokus pada hasil, bukan sekadar daftar fitur.",
      content:<div className="option-grid">{goals.map(item=><Choice key={item} label={item} selected={state.goal===item} onClick={()=>setSingle("goal",item)} />)}</div> },
    { eyebrow:"03 / FEATURES", title:"Fitur apa yang terasa penting?", description:"Boleh pilih lebih dari satu. Nanti scope final tetap kita rapikan bersama.",
      content:<div className="option-grid">{featureOptions.map(item=><Choice key={item} label={item} selected={state.features.includes(item)} onClick={()=>toggleFeature(item)} />)}</div> },
    { eyebrow:"04 / VISUAL STYLE", title:"Gaya mana yang paling dekat?", description:"Ini membantu menentukan mood awal sebelum masuk ke eksplorasi desain.",
      content:<div className="option-grid">{styles.map(item=><Choice key={item} label={item} selected={state.design_style===item} onClick={()=>setSingle("design_style",item)} />)}</div> },
    { eyebrow:"05 / TIMELINE", title:"Kapan ingin mulai?", description:"Kami gunakan ini untuk memahami urgensi dan menyusun ritme project.",
      content:<div className="option-grid">{timelines.map(item=><Choice key={item} label={item} selected={state.timeline===item} onClick={()=>setSingle("timeline",item)} />)}</div> },
    { eyebrow:"06 / BUDGET", title:"Range budget yang disiapkan?", description:"Ini membantu kami menyarankan scope yang realistis sejak awal.",
      content:<div className="option-grid">{budgets.map(item=><Choice key={item} label={item} selected={state.budget===item} onClick={()=>setSingle("budget",item)} />)}</div> },
    { eyebrow:"07 / CONTACT", title:"Terakhir, kami hubungi ke mana?", description:"Cukup informasi dasar. Tidak ada form panjang yang melelahkan.",
      content:<div className="builder-fields">
        <div className="field"><label>Nama *</label><input value={state.name} onChange={e=>setSingle("name",e.target.value)} placeholder="Nama kamu" /></div>
        <div className="field"><label>Nama bisnis</label><input value={state.business_name} onChange={e=>setSingle("business_name",e.target.value)} placeholder="Opsional" /></div>
        <div className="field"><label>WhatsApp *</label><input value={state.phone} onChange={e=>setSingle("phone",e.target.value)} placeholder="08xxxxxxxxxx" /></div>
        <div className="field"><label>Email</label><input type="email" value={state.email} onChange={e=>setSingle("email",e.target.value)} placeholder="nama@email.com" /></div>
        <div className="field"><label>Catatan tambahan</label><textarea value={state.notes} onChange={e=>setSingle("notes",e.target.value)} placeholder="Ceritakan sedikit kalau ada hal penting..." /></div>
      </div> },
  ];

  const current=screens[step];
  return <div className="builder-shell">
    <div className="builder-top">
      <div className="brand"><span className="brand-dot" /> Project Builder</div>
      <div className="progress" aria-label={`Step ${step+1} of ${totalSteps}`}><span style={{width:`${progress}%`}} /></div>
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
      <button className="button" type="button" onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0} style={{opacity:step===0?.35:1}}>← Back</button>
      {step<totalSteps-1 ? (
        <button className="button primary" type="button" disabled={!canContinue} onClick={()=>setStep(s=>Math.min(totalSteps-1,s+1))} style={{opacity:canContinue?1:.45}}>Continue →</button>
      ) : (
        <button className="button primary" type="button" disabled={!canContinue || status==="loading"} onClick={submit} style={{opacity:canContinue?1:.45}}>{status==="loading"?"Mengirim...":"Kirim Project ↗"}</button>
      )}
    </div>
  </div>;
}
