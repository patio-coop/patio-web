import Link from "next/link";

import { services } from "@/data/home";

export default function AiProductDevelopmentPage() {
  return (
    <main className="internal-page">
      <header className="internal-header">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true" />
          <span>PATIO</span>
        </Link>
        <Link className="button button--pale" href="/#what-we-do">
          Back
        </Link>
      </header>
      <section className="internal-hero">
        <p className="section-kicker">Home / What we do / Industries</p>
        <h1>AI Product Development</h1>
        <p>
          We help organizations design and build useful AI products through
          cooperative teams that combine product thinking, engineering, and
          responsible delivery.
        </p>
      </section>
      <section className="internal-section internal-section--dark">
        <h2>Why AI product development?</h2>
        <div className="internal-stats">
          <article>
            <strong>77%</strong>
            <span>of people use a service or device that is AI-powered</span>
          </article>
          <article>
            <strong>91.5%</strong>
            <span>of leading businesses are spending money to develop AI</span>
          </article>
          <article>
            <strong>By 2030</strong>
            <span>the AI market is projected to grow substantially</span>
          </article>
          <article>
            <strong>64%</strong>
            <span>of businesses expect AI to increase productivity</span>
          </article>
        </div>
      </section>
      <section className="internal-section">
        <h2>When to use it?</h2>
        <div className="process-grid">
          {[
            "Personalized custom experience",
            "Efficiency automation",
            "Product innovation",
            "Enhanced decision-making"
          ].map((item, index) => (
            <article className="process-card" key={item}>
              <strong>{index + 1}</strong>
              <h3>{item}</h3>
              <p>
                A cooperative product team can help scope, validate, build, and
                iterate toward useful outcomes.
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="internal-section internal-section--dark">
        <h2>Selected services</h2>
        <div className="work-grid">
          {services.slice(0, 4).map((service) => (
            <article className="work-card" key={service}>
              {service}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
