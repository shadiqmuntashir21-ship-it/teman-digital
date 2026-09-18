const WA="https://wa.me/6282258687238?text=Halo%20Teman%20Digital%2C%20saya%20ingin%20konsultasi%20tentang%20kebutuhan%20website%2Fweb.";

export function WhatsAppFloat(){
  return <a className="wa-float" href={WA} target="_blank" rel="noreferrer" aria-label="Chat Teman Digital lewat WhatsApp">
    <span className="wa-dot">WA</span>
    <span className="wa-label">Tanya dulu</span>
  </a>;
}
