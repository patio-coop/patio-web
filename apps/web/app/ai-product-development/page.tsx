import Image from "next/image";
import Link from "next/link";

import { sitePath } from "@/lib/sitePath";

const relatedIndustries = [
  "Government Tech",
  "Educational Tech",
  "Health Tech",
  "Cyber Security",
  "Finance Tech",
  "Web3",
];

const aiStats = [
  { index: "26190", value: "77%", text: "of people use a service or device that is AI-powered", source: "Zippia" },
  { index: "80531", value: "91.5%", text: "of leading businesses are spending money to further develop AI", source: "Zippia" },
  { index: "29729", value: "By 2030", text: "the AI market is projected to grow twentyfold, reaching a value of nearly two trillion U.S. dollars", source: "Statista" },
  { index: "97061", value: "64%", text: "of businesses expect AI to increase overall productivity", source: "Forbes" },
];

const useCases = [
  { title: "Personalized custom experience", text: "AI enables businesses to tailor products and services to individual customer preferences, leading to higher customer satisfaction and loyalty." },
  { title: "Efficiency automation", text: "AI diminishes the burden of routine tasks, resulting in lower operating expenses and granting employees the liberty to concentrate on more strategic endeavors." },
  { title: "Product innovation", text: "AI can accelerate the product development process by assisting in research, design, and testing phases, leading to innovative and competitive products." },
  { title: "Enhanced decision-making", text: "Custom AI solutions can analyze vast datasets to provide valuable insights, helping businesses make data-driven decisions with increased accuracy." },
];

function CurveSignal({ className, label }: { className: string; label: string }) {
  return (
    <div className={`ai-signal ${className}`} aria-hidden="true">
      <Image src={sitePath("/assets/what-we-do-curve.svg")} alt="" width={328} height={262} />
      <span>USR<br />{label}</span>
    </div>
  );
}

function AiHeader() {
  return (
    <header className="ai-header">
      <Link className="ai-header__brand" href={sitePath("/")}>
        <Image src={sitePath("/assets/patio-logo.svg")} alt="Patio" width={136} height={35} priority />
      </Link>
      <nav className="ai-header__nav" aria-label="Main navigation">
        <Link href={sitePath("/#who-we-are")}><small>01</small>Who we are</Link>
        <Link href={sitePath("/#what-we-do")}><small>02</small>What we do</Link>
        <Link href={sitePath("/#how-we-work")}><small>03</small>How we work</Link>
        <Link href={sitePath("/#philosophy")}><small>04</small>Our philosophy</Link>
        <Link href={sitePath("/#community")}><small>05</small>Community building</Link>
      </nav>
      <div className="ai-header__actions">
        <Link className="ai-header__contact" href={sitePath("/#contact")}>Get in touch</Link>
      </div>
      <span className="ai-header__menu" aria-hidden="true"><i /><i /><i /></span>
    </header>
  );
}

function AiFooter() {
  return (
    <footer className="ai-footer">
      <div className="ai-footer__grid">
        <div><strong>01</strong><Link href={sitePath("/#who-we-are")}>Who we are</Link><span>Region 1</span><span>Region 2</span><span>Region 3</span><span>Region 4</span></div>
        <div><strong>02</strong><Link href={sitePath("/#industries")}>Industries</Link><span>AI Product Dev</span><span>GovTech</span><span>Web 3</span><span>CyberSecurity</span><span>HealthTech</span><span>EdTech</span><span>FinTech</span></div>
        <div><strong>03</strong><Link href={sitePath("/#services")}>Services</Link><span>Full-Stack Development</span><span>UI/UX Design &amp; Animation</span><span>Branding &amp; Creative</span><span>Mobile Development</span><span>IoT</span><span>DevOps</span><span>Blockchain</span><span>Machine Learning</span></div>
        <div className="ai-footer__stack"><strong>04</strong><Link href={sitePath("/#how-we-work")}>How we work</Link><span>Membership Model</span><span>Ways to Qualify</span><strong>05</strong><Link href={sitePath("/#philosophy")}>Our philosophy</Link><strong>06</strong><Link href={sitePath("/#community")}>Community building</Link><strong>07</strong><Link href={sitePath("/#membership")}>Members</Link></div>
        <Link className="ai-footer__logo" href="#top" aria-label="Back to top"><Image src={sitePath("/assets/patio-logo.svg")} alt="Patio" width={136} height={35} /></Link>
      </div>
      <div className="ai-footer__legal">
        <span>© 2026 Patio.coop. All rights reserved.</span>
        <nav aria-label="Legal"><Link href={sitePath("/privacy/")}>Privacy Policy</Link><Link href={sitePath("/terms/")}>Terms &amp; Conditions</Link><Link href={sitePath("/cookies/")}>Cookie Policy</Link></nav>
      </div>
    </footer>
  );
}

export default function AiProductDevelopmentPage() {
  return (
    <main className="ai-page" id="top">
      <AiHeader />

      <section className="ai-hero" aria-labelledby="ai-page-title">
        <div className="ai-breadcrumbs" aria-label="Breadcrumb">
          <Link href={sitePath("/")}>Home</Link><span>›</span>
          <Link href={sitePath("/#what-we-do")}>What we do</Link><span>›</span>
          <Link href={sitePath("/#industries")}>Industries</Link><span>›</span>
          <span>AI Product Development</span>
        </div>
        <h1 id="ai-page-title">AI Product Development</h1>
        <CurveSignal className="ai-signal--hero" label="91290" />
        <div className="ai-hero__body">
          <aside className="ai-industries" aria-label="More industries">
            <strong>More industries:</strong>
            {relatedIndustries.map((industry) => (
              <Link href={sitePath("/#industries")} key={industry}>
                <span>{industry}</span>
                <Image src={sitePath("/assets/arrow-outward.svg")} alt="" width={18} height={18} />
              </Link>
            ))}
          </aside>
          <div className="ai-hero__copy">
            <h2>Why choose Patio for your custom AI development?</h2>
            <p>We live and breathe AI because we’re committed to creating a brighter, more powerful future for humanity. In every custom AI product we design and develop, we embed our vision of a world where AI amplifies human intelligence.</p>
            <p>Patio exists to evolve human collaboration. We are here to craft tailored software solutions for your unique needs.</p>
          </div>
        </div>
        <Link className="ai-button ai-button--green ai-hero__quote" href={sitePath("/#contact")}>Get a quote</Link>
      </section>

      <section className="ai-why ai-dark" aria-labelledby="ai-why-heading">
        <div className="ai-section-heading ai-section-heading--right"><span>ID:12024</span><h2 id="ai-why-heading">Why AI product<br />development?</h2></div>
        <CurveSignal className="ai-signal--why" label="26480" />
        <div className="ai-stats">
          {aiStats.map((stat, index) => (
            <article className={index === 2 ? "is-highlighted" : ""} key={stat.value}>
              <small>{stat.index}</small><strong>{stat.value}</strong><p>{stat.text} <u>{stat.source}</u></p>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-uses" aria-labelledby="ai-uses-heading">
        <div className="ai-section-heading"><span>ID:43072</span><h2 id="ai-uses-heading">When to use it?</h2></div>
        <CurveSignal className="ai-signal--uses" label="90271" />
        <div className="ai-use-grid">
          {useCases.map((item, index) => (
            <article key={item.title}><strong>{index + 1}</strong><i aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></article>
          ))}
        </div>
      </section>

      <section className="ai-projects ai-dark" aria-labelledby="ai-projects-heading">
        <div className="ai-section-heading ai-section-heading--right"><span>ID:14012</span><h2 id="ai-projects-heading">Selected projects</h2></div>
        <CurveSignal className="ai-signal--projects" label="42168" />
        <div className="ai-project-list">
          {[1, 2, 3].map((project) => (
            <article className={`ai-project ai-project--${project}`} key={project}>
              <div><h3>Project title</h3><p>Short project description taking several lines and presents an overview. Short project description taking several lines and presents an overview. Short project description taking several lines and presents an overview.</p></div>
              <Link className="ai-button ai-button--sky" href="#">View details</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-cta" aria-labelledby="ai-cta-heading">
        <div className="ai-cta__panel">
          <div className="ai-cta__copy"><span>ID:12024</span><h2 id="ai-cta-heading">Make us your organization’s technology partner</h2><p>Tell us briefly how you’d like to collaborate. A community member will reach out to explore the next steps with you.</p><Link className="ai-button ai-button--dark" href={sitePath("/#contact")}>Get in touch</Link></div>
          <Image className="ai-cta__globe" src={sitePath("/assets/cta-globe.svg")} alt="" width={402} height={376} />
        </div>
      </section>

      <AiFooter />
    </main>
  );
}
