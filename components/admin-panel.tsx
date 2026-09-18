"use client";

import { useEffect, useMemo, useState } from "react";

type AnyRow=Record<string,any>;
type Tab="overview"|"website"|"services"|"pricing"|"process"|"projects"|"testimonials"|"leads";

const tabs:[Tab,string][]=[
  ["overview","Ringkasan"],["website","Website"],["services","Layanan"],["pricing","Harga"],
  ["process","Proses"],["projects","Portfolio"],["testimonials","Testimonial"],["leads","Leads"]
];

const blankProject={
  slug:"",title:"",category:"Website",excerpt:"",description:"",challenge:"",solution:"",
  year:new Date().getFullYear(),technologies:[],cover_url:"",preview_url:"",repository_url:"",
  featured:false,published:true,display_order:0,seo_title:"",seo_description:""
};

export function AdminPanel(){
  const [authenticated,setAuthenticated]=useState<boolean|null>(null);
  const [pin,setPin]=useState("");
  const [tab,setTab]=useState<Tab>("overview");
  const [data,setData]=useState<any>(null);
  const [message,setMessage]=useState("");
  const [busy,setBusy]=useState(false);

  async function load(){
    const res=await fetch("/api/admin/data",{cache:"no-store"});
    if(res.status===401){setAuthenticated(false);setData(null);return;}
    const payload=await res.json();
    if(!res.ok){setMessage(payload.error||"Gagal memuat admin.");return;}
    setData(payload);setAuthenticated(true);
  }

  useEffect(()=>{load()},[]);

  async function login(e:React.FormEvent){
    e.preventDefault();setBusy(true);setMessage("");
    const res=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pin})});
    const payload=await res.json();
    setBusy(false);
    if(!res.ok){setMessage(payload.error||"PIN salah.");return;}
    setPin("");await load();
  }

  async function logout(){
    await fetch("/api/admin/logout",{method:"POST"});setAuthenticated(false);setData(null);
  }

  async function save(resource:string,id:string|number|undefined,payload:AnyRow){
    setBusy(true);setMessage("");
    const method=id===undefined?"POST":"PATCH";
    const res=await fetch("/api/admin/resource",{method,headers:{"Content-Type":"application/json"},body:JSON.stringify({resource,id,data:payload})});
    const body=await res.json();setBusy(false);
    if(!res.ok){setMessage(body.error||"Gagal menyimpan.");return false;}
    setMessage("Perubahan tersimpan.");await load();return true;
  }

  async function remove(resource:string,id:string){
    if(!confirm("Hapus item ini?")) return;
    setBusy(true);setMessage("");
    const res=await fetch("/api/admin/resource",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({resource,id})});
    const body=await res.json();setBusy(false);
    if(!res.ok){setMessage(body.error||"Gagal menghapus.");return;}
    setMessage("Item dihapus.");await load();
  }

  if(authenticated===null) return <div className="admin-login"><div className="admin-login-card">Memuat admin…</div></div>;

  if(!authenticated) return <div className="admin-login">
    <form className="admin-login-card" onSubmit={login}>
      <div className="eyebrow">TEMAN DIGITAL / ADMIN</div>
      <h1>Masuk Admin</h1>
      <p>Gunakan PIN admin untuk mengelola seluruh isi website.</p>
      <div className="field"><label>PIN</label><input className="pin-input" inputMode="numeric" type="password" value={pin} onChange={e=>setPin(e.target.value)} autoFocus maxLength={20}/></div>
      {message&&<div className="builder-status error">{message}</div>}
      <button className="button primary" style={{width:"100%",marginTop:18}} disabled={busy}>{busy?"Memeriksa…":"Masuk →"}</button>
    </form>
  </div>;

  const counts={
    projects:data?.projects?.length||0,
    published:data?.projects?.filter((x:AnyRow)=>x.published).length||0,
    leads:data?.leads?.length||0,
    newLeads:data?.leads?.filter((x:AnyRow)=>x.status==="new").length||0
  };

  return <div className="admin-shell">
    <aside className="admin-sidebar">
      <div className="brand"><span className="brand-mark">TD</span><span>Admin Studio</span></div>
      <nav className="admin-nav">{tabs.map(([key,label])=><button key={key} className={tab===key?"active":""} onClick={()=>setTab(key)}>{label}</button>)}</nav>
      <button className="button admin-logout" onClick={logout}>Keluar</button>
    </aside>

    <section className="admin-main">
      <div className="admin-topbar"><div><div className="eyebrow">CONTROL CENTER</div><h1>{tabs.find(x=>x[0]===tab)?.[1]}</h1></div><a className="button" href="/" target="_blank">Lihat Website ↗</a></div>
      {message&&<div className="admin-card">{message}</div>}
      {tab==="overview"&&<Overview counts={counts}/>}
      {tab==="website"&&<WebsiteEditor settings={data.settings} onSave={(payload)=>save("site_settings",1,payload)} busy={busy}/>}
      {tab==="services"&&<CollectionEditor title="Layanan" resource="services" rows={data.services} fields={[
        ["title","Judul"],["slug","Slug"],["eyebrow","Label kecil"],["short_description","Deskripsi singkat"],["starting_price","Harga awal"],["display_order","Urutan","number"],["active","Aktif","checkbox"]
      ]} onSave={save} onDelete={remove} busy={busy}/>}
      {tab==="pricing"&&<CollectionEditor title="Paket Harga" resource="pricing_packages" rows={data.pricing} fields={[
        ["name","Nama paket"],["slug","Slug"],["description","Deskripsi"],["price_label","Label harga"],["features","Fitur (pisahkan dengan koma)","array"],["cta_label","Teks tombol"],["display_order","Urutan","number"],["featured","Popular","checkbox"],["active","Aktif","checkbox"]
      ]} onSave={save} onDelete={remove} busy={busy}/>}
      {tab==="process"&&<><CollectionEditor title="Tahapan Proses" resource="process_steps" rows={data.process} fields={[
        ["step_no","Nomor","number"],["title","Judul"],["description","Deskripsi"],["display_order","Urutan","number"],["active","Aktif","checkbox"]
      ]} onSave={save} onDelete={remove} busy={busy}/>
      <CollectionEditor title="Keunggulan" resource="value_points" rows={data.values} fields={[
        ["label","Label"],["title","Judul"],["description","Deskripsi"],["display_order","Urutan","number"],["active","Aktif","checkbox"]
      ]} onSave={save} onDelete={remove} busy={busy}/></>}
      {tab==="projects"&&<ProjectEditor rows={data.projects} onSave={save} onDelete={remove} busy={busy}/>}
      {tab==="testimonials"&&<CollectionEditor title="Testimonial" resource="testimonials" rows={data.testimonials} fields={[
        ["name","Nama"],["company","Perusahaan"],["role","Jabatan"],["quote","Testimonial"],["avatar_url","URL foto"],["display_order","Urutan","number"],["published","Tampilkan","checkbox"]
      ]} onSave={save} onDelete={remove} busy={busy}/>}
      {tab==="leads"&&<Leads rows={data.leads} onSave={save} busy={busy}/>}
    </section>
  </div>;
}

function Overview({counts}:{counts:Record<string,number>}){
  return <><div className="metric-grid">
    <div className="metric"><strong>{counts.projects}</strong><span>Total portfolio</span></div>
    <div className="metric"><strong>{counts.published}</strong><span>Project tayang</span></div>
    <div className="metric"><strong>{counts.leads}</strong><span>Total leads</span></div>
    <div className="metric"><strong>{counts.newLeads}</strong><span>Lead baru</span></div>
  </div>
  <div className="admin-card" style={{marginTop:16}}><h2>Yang bisa kamu atur di sini</h2><p className="lead">Hero dan copy website, layanan, harga, proses kerja, keunggulan, portfolio beserta link Vercel/Apps Script, testimonial, serta status leads.</p></div></>;
}

function WebsiteEditor({settings,onSave,busy}:{settings:AnyRow,onSave:(p:AnyRow)=>void,busy:boolean}){
  const [form,setForm]=useState(settings||{});
  useEffect(()=>setForm(settings||{}),[settings]);
  const fields=[
    ["brand_name","Nama brand"],["hero_eyebrow","Label Hero"],["hero_title","Judul Hero"],["hero_description","Deskripsi Hero","textarea"],
    ["final_cta_title","Judul CTA Akhir"],["final_cta_description","Deskripsi CTA","textarea"],["footer_tagline","Footer tagline"],
    ["whatsapp","WhatsApp"],["email","Email"],["instagram_url","Instagram URL"],["linkedin_url","LinkedIn URL"],["github_url","GitHub URL"]
  ];
  return <div className="admin-card"><h2>Konten utama website</h2><div className="admin-grid">
    {fields.map(([key,label,type])=><Field key={key} label={label} value={form[key]??""} type={type} onChange={v=>setForm({...form,[key]:v})}/>)}
  </div><div className="admin-actions"><button className="button primary" disabled={busy} onClick={()=>onSave(form)}>Simpan Perubahan</button></div></div>;
}

type FieldDef=[string,string,string?];
function CollectionEditor({title,resource,rows,fields,onSave,onDelete,busy}:{title:string;resource:string;rows:AnyRow[];fields:FieldDef[];onSave:any;onDelete:any;busy:boolean}){
  const blank=Object.fromEntries(fields.map(([key,,type])=>[key,type==="checkbox"?true:type==="number"?0:type==="array"?[]:""]));
  const [draft,setDraft]=useState<AnyRow>(blank);
  return <div className="admin-card"><h2>{title}</h2>
    <div className="admin-item" style={{marginBottom:14}}><div className="admin-item-head"><h3>Tambah baru</h3></div>
      <RowFields form={draft} fields={fields} setForm={setDraft}/>
      <div className="admin-actions"><button className="button primary" disabled={busy} onClick={async()=>{if(await onSave(resource,undefined,draft))setDraft(blank)}}>Tambah</button></div>
    </div>
    <div className="admin-table">{rows.map(row=><EditableItem key={row.id} resource={resource} row={row} fields={fields} onSave={onSave} onDelete={onDelete} busy={busy}/>)}</div>
  </div>;
}

function EditableItem({resource,row,fields,onSave,onDelete,busy}:{resource:string;row:AnyRow;fields:FieldDef[];onSave:any;onDelete:any;busy:boolean}){
  const [form,setForm]=useState(row);
  useEffect(()=>setForm(row),[row]);
  return <div className="admin-item"><div className="admin-item-head"><h3>{row.title||row.name||row.label||"Item"}</h3><span className="status-pill">{row.active===false||row.published===false?"draft":"aktif"}</span></div>
    <RowFields form={form} fields={fields} setForm={setForm}/>
    <div className="admin-actions"><button className="button primary" disabled={busy} onClick={()=>onSave(resource,row.id,form)}>Simpan</button><button className="button danger" disabled={busy} onClick={()=>onDelete(resource,row.id)}>Hapus</button></div>
  </div>;
}

function RowFields({form,fields,setForm}:{form:AnyRow;fields:FieldDef[];setForm:(v:AnyRow)=>void}){
  return <div className="admin-grid">{fields.map(([key,label,type])=><Field key={key} label={label} value={form[key]??(type==="checkbox"?false:"")} type={type} onChange={v=>setForm({...form,[key]:v})}/>)}</div>;
}

function Field({label,value,type,onChange}:{label:string;value:any;type?:string;onChange:(v:any)=>void}){
  if(type==="checkbox") return <label className="field"><span>{label}</span><input type="checkbox" checked={Boolean(value)} onChange={e=>onChange(e.target.checked)}/></label>;
  if(type==="textarea") return <label className="field full"><span>{label}</span><textarea value={value??""} onChange={e=>onChange(e.target.value)}/></label>;
  if(type==="array") return <label className="field full"><span>{label}</span><input value={Array.isArray(value)?value.join(", "):value??""} onChange={e=>onChange(e.target.value.split(",").map(x=>x.trim()).filter(Boolean))}/></label>;
  return <label className="field"><span>{label}</span><input type={type==="number"?"number":"text"} value={value??""} onChange={e=>onChange(type==="number"?Number(e.target.value):e.target.value)}/></label>;
}

function ProjectEditor({rows,onSave,onDelete,busy}:{rows:AnyRow[];onSave:any;onDelete:any;busy:boolean}){
  const [draft,setDraft]=useState<AnyRow>(blankProject);
  return <div className="admin-card"><h2>Portfolio & Live Preview</h2><p className="lead">Masukkan link Vercel, Apps Script, atau website publik di kolom Live URL. Thumbnail otomatis dibuat dari link tersebut jika Cover URL dikosongkan.</p>
    <ProjectForm form={draft} setForm={setDraft}/>
    <div className="admin-actions"><button className="button primary" disabled={busy} onClick={async()=>{if(await onSave("portfolio_projects",undefined,draft))setDraft(blankProject)}}>Tambah Project</button></div>
    <div className="admin-table" style={{marginTop:22}}>{rows.map(row=><ProjectItem key={row.id} row={row} onSave={onSave} onDelete={onDelete} busy={busy}/>)}</div>
  </div>;
}

function ProjectItem({row,onSave,onDelete,busy}:{row:AnyRow;onSave:any;onDelete:any;busy:boolean}){
  const [form,setForm]=useState(row);useEffect(()=>setForm(row),[row]);
  const thumb=form.cover_url||(form.preview_url?`https://image.thum.io/get/width/900/crop/560/noanimate/${form.preview_url}`:null);
  return <div className="admin-item">
    {thumb&&<div className="admin-preview"><img src={thumb} alt="Preview"/></div>}
    <div className="admin-item-head"><h3>{form.title||"Project"}</h3><span className="status-pill">{form.published?"tayang":"draft"}</span></div>
    <ProjectForm form={form} setForm={setForm}/>
    <div className="admin-actions"><button className="button primary" disabled={busy} onClick={()=>onSave("portfolio_projects",row.id,form)}>Simpan</button>{form.preview_url&&<a className="button" href={form.preview_url} target="_blank" rel="noreferrer">Buka Live ↗</a>}<button className="button danger" disabled={busy} onClick={()=>onDelete("portfolio_projects",row.id)}>Hapus</button></div>
  </div>;
}

function ProjectForm({form,setForm}:{form:AnyRow;setForm:(v:AnyRow)=>void}){
  return <div className="admin-grid">
    <Field label="Nama Project" value={form.title} onChange={v=>setForm({...form,title:v})}/>
    <Field label="Slug" value={form.slug} onChange={v=>setForm({...form,slug:v})}/>
    <Field label="Kategori" value={form.category} onChange={v=>setForm({...form,category:v})}/>
    <Field label="Tahun" value={form.year} type="number" onChange={v=>setForm({...form,year:v})}/>
    <Field label="Deskripsi singkat" value={form.excerpt} type="textarea" onChange={v=>setForm({...form,excerpt:v})}/>
    <Field label="Deskripsi detail" value={form.description} type="textarea" onChange={v=>setForm({...form,description:v})}/>
    <Field label="Live URL (Vercel / Apps Script / website)" value={form.preview_url} onChange={v=>setForm({...form,preview_url:v})}/>
    <Field label="Cover URL opsional" value={form.cover_url} onChange={v=>setForm({...form,cover_url:v})}/>
    <Field label="Repository URL opsional" value={form.repository_url} onChange={v=>setForm({...form,repository_url:v})}/>
    <Field label="Teknologi (pisahkan koma)" value={form.technologies} type="array" onChange={v=>setForm({...form,technologies:v})}/>
    <Field label="Urutan" value={form.display_order} type="number" onChange={v=>setForm({...form,display_order:v})}/>
    <Field label="Tampilkan di website" value={form.published} type="checkbox" onChange={v=>setForm({...form,published:v})}/>
    <Field label="Featured" value={form.featured} type="checkbox" onChange={v=>setForm({...form,featured:v})}/>
  </div>;
}

function Leads({rows,onSave,busy}:{rows:AnyRow[];onSave:any;busy:boolean}){
  return <div className="admin-card"><h2>Lead Masuk</h2><div className="admin-table">{rows.length===0?<div className="empty-state">Belum ada lead.</div>:rows.map(row=><div className="admin-item" key={row.id}>
    <div className="admin-item-head"><div><h3>{row.name}</h3><div className="muted-index">{new Date(row.created_at).toLocaleString("id-ID")}</div></div><span className="status-pill">{row.status}</span></div>
    <p><strong>{row.service}</strong> • {row.budget||"Budget belum ditentukan"} • {row.timeline||"Timeline belum ditentukan"}</p>
    <p>{row.business_name||"—"} · {row.phone} · {row.email||"tanpa email"}</p>
    {row.goal&&<p>Tujuan: {row.goal}</p>}{row.notes&&<p>Catatan: {row.notes}</p>}
    <div className="admin-actions">
      {["new","contacted","discussion","proposal","accepted","rejected","archived"].map(status=><button key={status} className="button" disabled={busy||row.status===status} onClick={()=>onSave("leads",row.id,{status})}>{status}</button>)}
    </div>
  </div>)}</div></div>;
}
