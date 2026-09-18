const items = ["WEB DESIGN","FULLSTACK DEVELOPMENT","LANDING PAGE","DASHBOARD","WEB APPLICATION","DIGITAL EXPERIENCE"];

export function Marquee() {
  const repeated = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {repeated.map((item, index) => (
          <div className="marquee-item" key={`${item}-${index}`}>
            <span>{item}</span><span className="marquee-star">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
