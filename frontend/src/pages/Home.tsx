import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ServiceCard } from "../components/ServiceCard";

export default function Home() {
  const nav = useNavigate();

  const services = [
    { title: "Plumber",     icon: "🚰" },
    { title: "Electrician", icon: "💡" },
    { title: "Handyman",    icon: "🔧" },
    { title: "Mechanic",    icon: "🧰" },
    { title: "Locksmith",   icon: "🔑" },
    { title: "Cleaner",     icon: "🧽" }
  ];

  // simple form state (mock)
  const [location, setLocation] = React.useState("");
  const [details, setDetails]   = React.useState("");

  function seePrices() {
    const jobId = Math.random().toString(36).slice(2);
    nav(`/finding/${jobId}`);
  }

  return (
    <>
      <Navbar />
      <main className="container">

        <h1 className="section-title">Services</h1>

        <section className="grid grid-3" style={{ marginBottom: 40 }}>
          {services.map(s => (
            <ServiceCard
              key={s.title}
              title={s.title}
              icon={s.icon}
              onClick={() => nav(`/book?service=${encodeURIComponent(s.title)}`)}
            />
          ))}
        </section>

        <h2 className="section-title" style={{ marginTop: 24 }}>Request a Fixer</h2>

        <section style={{ maxWidth: 520, margin: "0 auto" }}>
          <label className="subtle" htmlFor="loc">Enter location</label>
          <input id="loc" className="input" placeholder="123 George St, Sydney"
                 value={location} onChange={e => setLocation(e.target.value)} />

          <label className="subtle" htmlFor="det" style={{ marginTop: 12, display: "block" }}>Details</label>
          <input id="det" className="input" placeholder="Brief description"
                 value={details} onChange={e => setDetails(e.target.value)} />

          <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
            <button className="btn btn--primary" onClick={seePrices}>See prices</button>
          </div>
        </section>

      </main>
    </>
  );
}
