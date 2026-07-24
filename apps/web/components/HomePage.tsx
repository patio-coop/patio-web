"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { HeroGlobe } from "@/components/HeroGlobe";
import { ScholarshipApplication } from "@/components/ScholarshipApplication";
import {
  communityImages,
  cooperatives,
  industries,
  navItems,
  philosophy,
  processSteps,
  qualificationPaths,
  services,
  stats,
  type Cooperative,
} from "@/data/home";
import { sitePath } from "@/lib/sitePath";

type ModalState =
  | { type: "contact"; title?: string }
  | { type: "members" }
  | { type: "network" }
  | { type: "coop"; cooperative: Cooperative }
  | { type: "lightbox"; index: number }
  | { type: "scholarship" }
  | null;

const regions = ["All", "Europe", "Americas"];

const communityCrosses = [
  [987, 453],
  [1006, 453],
  [987, 808],
  [987, 828],
  [987, 1076],
  [90, 764],
  [90, 784],
  [90, 452],
  [90, 433],
  [90, 152],
  [526, 433],
  [526, 152],
  [526, 453],
  [526, 764],
  [526, 784],
  [545, 828],
  [545, 1076],
  [526, 1076],
  [545, 808],
  [545, 453],
  [1006, 1076],
  [1352, 453],
  [1352, 774],
  [1006, 774],
  [1352, 754],
  [1006, 754],
  [90, 1076],
] as const;

export function HomePage() {
  const [modal, setModal] = useState<ModalState>(null);
  const [activeRegion, setActiveRegion] = useState("All");
  const [workTab, setWorkTab] = useState<"industries" | "services">(
    "industries",
  );
  const [featuredCoops, setFeaturedCoops] = useState<Cooperative[]>(
    cooperatives.slice(0, 6),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<number | null>(null);
  const [headerHidden, setHeaderHidden] = useState(false);

  useEffect(() => {
    let previousY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      setHeaderHidden(currentY > 140 && currentY > previousY);
      previousY = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modal || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal, menuOpen]);

  useEffect(() => {
    const selectWorkTabFromHash = () => {
      if (window.location.hash === "#services") {
        setWorkTab("services");
      } else if (window.location.hash === "#industries") {
        setWorkTab("industries");
      }
    };

    selectWorkTabFromHash();
    window.addEventListener("hashchange", selectWorkTabFromHash);
    return () =>
      window.removeEventListener("hashchange", selectWorkTabFromHash);
  }, []);

  useEffect(() => {
    const filtered =
      activeRegion === "All"
        ? cooperatives
        : cooperatives.filter((coop) => coop.region === activeRegion);
    setFeaturedCoops(
      filtered
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, 6),
    );
  }, [activeRegion]);

  const workItems = workTab === "industries" ? industries : services;

  return (
    <>
      <Header
        hidden={headerHidden}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setModal={setModal}
      />
      <MobileMenu
        open={menuOpen}
        panel={mobilePanel}
        setPanel={setMobilePanel}
        close={() => {
          setMenuOpen(false);
          setMobilePanel(null);
        }}
        setModal={setModal}
      />
      <main id="top">
        <section className="section hero" aria-labelledby="hero-heading">
          <div className="hero__content">
            <h1 id="hero-heading">
              <span>A global</span>
              <span>network of tech</span>
              <span>cooperatives</span>
            </h1>
            <p className="hero__lead">
              Bringing the latest technology in collaboration with you
            </p>
            <button
              className="button button--primary button--quote"
              onClick={() =>
                setModal({ type: "contact", title: "Get a quote" })
              }
            >
              Get a quote{" "}
              <span className="button__arrow" aria-hidden="true">
                ↘
              </span>
            </button>
          </div>
          <HeroGlobe />
          <div className="stats-grid" aria-label="Patio network statistics">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          className="section section--light who"
          id="who-we-are"
          aria-labelledby="who-heading"
        >
          <SectionIntro
            eyebrow="01"
            title="Who we are"
            text="We are a global network of tech cooperatives bringing deep technical knowledge, community, and cooperation into ambitious digital work."
          />
          <div className="region-filter" aria-label="Filter cooperatives">
            {regions.map((region) => (
              <button
                key={region}
                className={region === activeRegion ? "is-active" : ""}
                onClick={() => setActiveRegion(region)}
              >
                {region}
              </button>
            ))}
          </div>
          <div className="coop-grid">
            {featuredCoops.map((coop) => (
              <button
                className="coop-card"
                key={coop.name}
                onClick={() => setModal({ type: "coop", cooperative: coop })}
              >
                {coop.name === "Camplight" ? (
                  <Image
                    src={sitePath("/assets/figma/Camplight.svg")}
                    alt="Camplight"
                    width={180}
                    height={36}
                  />
                ) : (
                  <span>{coop.name}</span>
                )}
              </button>
            ))}
          </div>
          <button
            className="button button--small"
            onClick={() => setModal({ type: "network" })}
          >
            View full network
          </button>
        </section>

        <section
          className="section section--dark"
          id="what-we-do"
          aria-labelledby="what-heading"
        >
          <SectionIntro
            eyebrow="ID:90192"
            title="What we do"
            text="We innovate and implement cutting-edge technologies to create digital products and services, supported by our global community to ensure top-tier results."
            inverted
          />
          <div className="work-graphic" aria-hidden="true">
            <Image
              src={sitePath("/assets/what-we-do-curve.svg")}
              alt=""
              width={328}
              height={262}
            />
            <span>
              USR
              <br />
              91241
            </span>
          </div>
          <div className="segmented-control" role="tablist">
            <button
              id="industries"
              role="tab"
              aria-selected={workTab === "industries"}
              onClick={() => setWorkTab("industries")}
            >
              Industries
            </button>
            <button
              id="services"
              role="tab"
              aria-selected={workTab === "services"}
              onClick={() => setWorkTab("services")}
            >
              Services
            </button>
          </div>
          <div className="work-grid">
            {workItems.map((item, index) => (
              <a
                className="work-card"
                key={item}
                href={
                  workTab === "industries" && index === 0
                    ? sitePath("/ai-product-development/")
                    : workTab === "industries"
                      ? "#industries"
                      : "#services"
                }
              >
                <span className="work-card__title">{item}</span>
                <Image
                  className="work-card__arrow"
                  src={sitePath("/assets/arrow-outward.svg")}
                  alt=""
                  width={24}
                  height={24}
                />
              </a>
            ))}
            <span className="work-card work-card--empty" aria-hidden="true" />
          </div>
        </section>

        <section
          className="section section--light process"
          id="how-we-work"
          aria-labelledby="process-heading"
        >
          <SectionIntro
            eyebrow="ID:90192"
            title="How we work"
            text="Our collaboration process is transparent and tailored to your needs. Here's how we guide you from the first conversation to project kickoff, ensuring clarity and confidence every step of the way:"
          />
          <div className="process-curve" aria-hidden="true">
            <svg viewBox="0 0 260 360" role="presentation">
              <defs>
                <linearGradient
                  id="processCurveGradient"
                  x1="59"
                  y1="323"
                  x2="227"
                  y2="0"
                >
                  <stop offset="0" stopColor="#96d8fd" />
                  <stop offset="0.62" stopColor="#96d8fd" />
                  <stop offset="1" stopColor="#35ff38" />
                </linearGradient>
              </defs>
              <path
                d="M62 323 C42 226 132 182 185 130 C235 81 229 30 229 0"
                fill="none"
                stroke="url(#processCurveGradient)"
                strokeLinecap="round"
                strokeWidth="5"
              />
              <circle cx="62" cy="323" fill="#96d8fd" r="9" />
            </svg>
            <span>
              USR
              <br />
              12421
            </span>
          </div>
          <div className="process-grid">
            {processSteps.map((step) => (
              <article className="process-card" key={step.number}>
                <strong>{step.number}</strong>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <button
            className="button button--small"
            onClick={() =>
              setModal({ type: "contact", title: "Let's start a project" })
            }
          >
            Let&apos;s start a project
          </button>
        </section>

        <section className="section membership" id="membership">
          <SectionIntro
            eyebrow="ID: 91201"
            title="Membership model"
            text="Be part of a global network where tech cooperatives collaborate, share work, and grow together. Join for free - or contribute and unlock full access to opportunities."
          />
          <div className="membership-model">
            <article className="membership-card membership-card--dark">
              <span>Full Patio</span>
              <strong>
                €500<span>/ year</span>
              </strong>
              <em>or qualify via contribution</em>
              <ul>
                <li>Access to jobs & client opportunities</li>
                <li>Voting rights & governance participation</li>
                <li>Collaboration on projects & proposals</li>
                <li>Member-only content & events</li>
                <li>Access to paid projects</li>
              </ul>
              <p>
                Per cooperative, per year. Full access to Patio opportunities,
                internal support, and collaborative network activity.
              </p>
              <button
                className="button button--small"
                onClick={() =>
                  setModal({ type: "contact", title: "Become a full member" })
                }
              >
                Become a full member
              </button>
            </article>
            <article className="membership-card">
              <span>Free Patio</span>
              <strong>€0</strong>
              <em>no fee required</em>
              <ul>
                <li>Basic coop profile</li>
                <li>Access to workshops & knowledge sharing</li>
                <li>Local network & mentorship</li>
                <li>Advocacy opportunities</li>
              </ul>
              <p>
                A first access path for cooperatives exploring Patio,
                mentorship, and open collaboration.
              </p>
              <button
                className="button button--small button--pale"
                onClick={() =>
                  setModal({ type: "contact", title: "Join for free" })
                }
              >
                Join for free
              </button>
            </article>
          </div>
          <div className="qualification" id="qualification">
            <div className="qualification-crosses" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <SectionIntro
              eyebrow=""
              title="Ways to qualify for full membership"
              text=""
            />
            <div className="qualification-grid">
              {qualificationPaths.map((path, index) => (
                <article key={path.title}>
                  <span>Path 0{index + 1}</span>
                  <h3>{path.title}</h3>
                  <p>{path.text}</p>
                  <button
                    className="button button--small button--pale"
                    onClick={() =>
                      index === 2
                        ? setModal({ type: "scholarship" })
                        : setModal({
                            type: "contact",
                            title:
                              index === 0
                                ? "Pay annual membership"
                                : "Join through contribution",
                          })
                    }
                  >
                    {index === 0
                      ? "Pay now"
                      : index === 1
                        ? "Join for free"
                        : "Submit application"}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--dark sociocracy">
          <SectionIntro
            eyebrow="05"
            title="Sociocracy in action"
            text="We organize collaboration through transparent circles, feedback loops, decisions by consent, and linking roles."
            inverted
          />
          <div className="sociocracy-diagram" aria-label="Sociocracy diagram">
            <div className="orbit orbit--outer" />
            <div className="orbit orbit--inner" />
            <div className="node node--top" />
            <div className="node node--right" />
            <div className="node node--bottom" />
            <div className="node node--left" />
            <div className="diagram-center">Patio circles</div>
            <span className="diagram-label diagram-label--feedback">
              Feedback
            </span>
            <span className="diagram-label diagram-label--circles">
              Circles / team of peers
            </span>
            <span className="diagram-label diagram-label--decisions">
              Decisions by consent
            </span>
            <span className="diagram-label diagram-label--links">
              Linking & connection
            </span>
          </div>
        </section>

        <section
          className="section section--light philosophy"
          id="philosophy"
          aria-labelledby="philosophy-heading"
        >
          <div className="philosophy-signal" aria-hidden="true">
            <Image
              src={sitePath("/assets/philosophy-signal.svg")}
              alt=""
              width={364}
              height={30}
            />
            <span>
              USR
              <br />
              11491
            </span>
          </div>
          <div className="philosophy-copy">
            <span className="philosophy-copy__index">ID:14042</span>
            <h2 id="philosophy-heading">Our philosophy</h2>
            <div className="philosophy-copy__body">
              <p>
                Patio is a community helping people build worker-owned tech
                companies.
              </p>
              <p>
                Whether you&apos;re part of a co-op or just starting out, we
                bring people together to share knowledge and support each
                other.
              </p>
              <p>Our goal is simple: help you build a thriving tech co-op.</p>
            </div>
            <button
              className="button button--small"
              onClick={() =>
                setModal({ type: "contact", title: "Join Patio" })
              }
            >
              Join us
            </button>
          </div>
          <div className="philosophy-list">
            {philosophy.map((item) => (
              <div key={item.title}>
                <span>{item.title}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="section section--dark community"
          id="community"
          aria-labelledby="community-heading"
        >
          <div className="community-top-cap" aria-hidden="true" />
          <div className="community-signal" aria-hidden="true">
            <Image
              src={sitePath("/assets/community-signal.svg")}
              alt=""
              width={64}
              height={315}
            />
            <span>
              USR
              <br />
              22194
            </span>
          </div>
          <div className="community-copy">
            <span className="community-copy__index">ID:42019</span>
            <h2 id="community-heading">Community building</h2>
            <p>
              Connecting local communities to foster collaboration, share
              resources, and drive regional innovation. We provide tools, best
              practices, and a supportive community, all guided by democratic
              principles, equality and sociocracy.
            </p>
          </div>
          <div className="community-guides" aria-hidden="true">
            <span className="community-guide community-guide--v community-guide--v-1" />
            <span className="community-guide community-guide--v community-guide--v-2" />
            <span className="community-guide community-guide--v community-guide--v-3" />
            <span className="community-guide community-guide--v community-guide--v-4" />
            <span className="community-guide community-guide--v community-guide--v-5" />
            <span className="community-guide community-guide--v community-guide--v-6" />
            <span className="community-guide community-guide--h community-guide--h-1" />
            <span className="community-guide community-guide--h community-guide--h-2" />
            <span className="community-guide community-guide--h community-guide--h-3" />
            <span className="community-guide community-guide--h community-guide--h-4" />
            <span className="community-guide community-guide--h community-guide--h-5" />
            <span className="community-guide community-guide--h community-guide--h-6" />
            <span className="community-guide community-guide--h community-guide--h-7" />
            <span className="community-guide community-guide--h community-guide--h-8" />
            <span className="community-guide community-guide--h community-guide--h-9" />
            <span className="community-guide community-guide--h community-guide--h-10" />
            <span className="community-crosses">
              {communityCrosses.map(([x, top]) => (
                <span
                  className="community-cross"
                  key={`${x}-${top}`}
                  style={{ left: `${(x / 1440) * 100}%`, top }}
                />
              ))}
            </span>
          </div>
          <div className="community-gallery">
            {communityImages.map((image, index) => (
              <button
                key={image.src}
                className={`gallery-item gallery-item--${index + 1}`}
                onClick={() => setModal({ type: "lightbox", index })}
              >
                <Image
                  src={sitePath(image.src)}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1100px) 320px, 620px"
                />
              </button>
            ))}
          </div>
          <button
            className="button button--small"
            onClick={() =>
              setModal({ type: "contact", title: "Join the community" })
            }
          >
            Let&apos;s talk
          </button>
        </section>

        <section className="section cta" aria-labelledby="cta-heading">
          <div className="cta-panel" aria-hidden="true">
            <span className="cta-panel__line cta-panel__line--v-1" />
            <span className="cta-panel__line cta-panel__line--v-2" />
            <span className="cta-panel__line cta-panel__line--v-3" />
            <span className="cta-panel__line cta-panel__line--v-4" />
            <span className="cta-panel__line cta-panel__line--v-5" />
            <span className="cta-panel__line cta-panel__line--h-1" />
            <span className="cta-panel__line cta-panel__line--h-2" />
            <span className="cta-panel__line cta-panel__line--h-3" />
            <span className="cta-panel__line cta-panel__line--h-4" />
          </div>
          <div className="cta-frame" aria-hidden="true">
            <span className="cta-frame__cap cta-frame__cap--top-blue" />
            <span className="cta-frame__cap cta-frame__cap--top-white" />
            <span className="cta-frame__cap cta-frame__cap--bottom-white" />
            <span className="cta-frame__cap cta-frame__cap--bottom-blue" />
            <span className="cta-frame__line cta-frame__line--top-left" />
            <span className="cta-frame__line cta-frame__line--top-right" />
            <span className="cta-frame__line cta-frame__line--bottom-left" />
            <span className="cta-frame__line cta-frame__line--bottom-right" />
            <span className="cta-frame__line cta-frame__line--left" />
            <span className="cta-frame__line cta-frame__line--right" />
            <span className="cta-frame__line cta-frame__line--upper" />
            <span className="cta-frame__line cta-frame__line--left-light" />
          </div>
          <div className="cta-copy">
            <p className="cta-copy__index">ID:12024</p>
            <h2 id="cta-heading">
              Make us your organization&rsquo;s technology partner
            </h2>
            <p>
              Tell us briefly how you&rsquo;d like to collaborate. A community
              member will reach out to explore the next steps with you.
            </p>
            <button
              className="button button--dark"
              onClick={() =>
                setModal({ type: "contact", title: "Get in touch" })
              }
            >
              Get in touch
            </button>
          </div>
          <div className="cta-globe" aria-hidden="true">
            <Image
              src={sitePath("/assets/cta-globe.svg")}
              alt=""
              width={402}
              height={376}
            />
          </div>
        </section>
      </main>
      <Footer setModal={setModal} />
      <Modal modal={modal} setModal={setModal} />
    </>
  );
}

function Header({
  hidden,
  menuOpen,
  setMenuOpen,
  setModal,
}: {
  hidden: boolean;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  setModal: (modal: ModalState) => void;
}) {
  return (
    <header className={`site-header ${hidden ? "site-header--hidden" : ""}`}>
      <a className="brand" href="#top" aria-label="Patio home">
        <Image
          className="brand-logo"
          src={sitePath("/assets/patio-logo.svg")}
          alt=""
          width={107}
          height={27}
        />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <div className="nav-item" key={item.label}>
            <a href={item.href}>
              <span className="nav-item__content">
                <span className="nav-item__index">{item.index}</span>
                <span className="nav-item__label">
                  {item.label}
                  {item.groups ? <b aria-hidden="true">⌄</b> : null}
                </span>
              </span>
            </a>
            {item.groups ? (
              <div className="nav-dropdown">
                <div className="nav-dropdown__primary">
                  <h3>{item.label}</h3>
                  {item.groups.map((group) => (
                    <div
                      className="nav-dropdown__group"
                      key={group.label}
                      tabIndex={0}
                    >
                      <span className="nav-dropdown__group-label">
                        {group.label}
                        <b aria-hidden="true">›</b>
                      </span>
                      <div className="nav-dropdown__submenu">
                        {group.items.map((entry) => (
                          <a
                            href={sitePath(entry.href)}
                            key={entry.label}
                          >
                            {entry.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </nav>
      <div className="header-actions">
        <button
          onClick={() => setModal({ type: "contact", title: "Get in touch" })}
        >
          Get in touch
        </button>
      </div>
      <button
        className="menu-button"
        aria-label="Open menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}

function MobileMenu({
  open,
  panel,
  setPanel,
  close,
  setModal,
}: {
  open: boolean;
  panel: number | null;
  setPanel: (panel: number | null) => void;
  close: () => void;
  setModal: (modal: ModalState) => void;
}) {
  if (!open) {
    return null;
  }

  const item = panel !== null ? navItems[panel] : null;

  return (
    <div className="mobile-menu">
      <div className="mobile-menu__bar">
        {item ? (
          <button onClick={() => setPanel(null)} aria-label="Back">
            ←
          </button>
        ) : (
          <span />
        )}
        <button onClick={close} aria-label="Close menu">
          ×
        </button>
      </div>
      {item?.groups ? (
        <div className="mobile-menu__panel">
          <h2>{item.label}</h2>
          {item.groups.map((group) => (
            <div key={group.label}>
              <h3>{group.label}</h3>
              {group.items.map((entry) => (
                <a
                  href={sitePath(entry.href)}
                  key={entry.label}
                  onClick={close}
                >
                  {entry.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="mobile-menu__panel">
          {navItems.map((navItem, index) =>
            navItem.groups ? (
              <button key={navItem.label} onClick={() => setPanel(index)}>
                <span>{navItem.index}</span>
                {navItem.label}
                <b>→</b>
              </button>
            ) : (
              <a href={navItem.href} key={navItem.label} onClick={close}>
                <span>{navItem.index}</span>
                {navItem.label}
              </a>
            ),
          )}
          <button
            onClick={() => {
              close();
              setModal({ type: "members" });
            }}
          >
            Members
          </button>
          <button
            onClick={() => {
              close();
              setModal({ type: "contact", title: "Get in touch" });
            }}
          >
            Get in touch
          </button>
        </div>
      )}
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text,
  inverted = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  inverted?: boolean;
}) {
  return (
    <div
      className={`section-intro ${inverted ? "section-intro--inverted" : ""}`}
    >
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function Footer({
  setModal,
}: {
  setModal: (modal: ModalState) => void;
}) {
  const footerIndustries = [
    { label: "AI Product Dev", href: sitePath("/ai-product-development/") },
    { label: "GovTech", href: "#industries" },
    { label: "Web 3", href: "#industries" },
    { label: "CyberSecurity", href: "#industries" },
    { label: "HealthTech", href: "#industries" },
    { label: "EdTech", href: "#industries" },
    { label: "FinTech", href: "#industries" },
  ];
  const footerServices = [
    "Full-Stack Development",
    "UI/UX Design & Animation",
    "Branding & Creative",
    "Mobile Development",
    "IoT",
    "DevOps",
    "Blockchain",
    "Machine Learning",
  ];

  return (
    <footer className="site-footer">
      <div className="footer-guides" aria-hidden="true">
        <span className="footer-guide footer-guide--top" />
        <span className="footer-guide footer-guide--bottom" />
        <span className="footer-guide footer-guide--outer-left" />
        <span className="footer-guide footer-guide--outer-right" />
        <span className="footer-guide footer-guide--column-1" />
        <span className="footer-guide footer-guide--column-2" />
        <span className="footer-guide footer-guide--column-3" />
        <span className="footer-guide footer-guide--column-4" />
        <span className="footer-guide footer-guide--row-1" />
        <span className="footer-guide footer-guide--row-2" />
        <span className="footer-guide footer-guide--row-3" />
        <span className="footer-guide footer-guide--row-4" />
        <span className="footer-guide footer-guide--bottom-column" />
        <span className="footer-cross footer-cross--left" />
        <span className="footer-cross footer-cross--center" />
        <span className="footer-cross footer-cross--right" />
      </div>

      <a className="footer-logo" href="#top" aria-label="Back to top">
        <Image
          src={sitePath("/assets/patio-logo.svg")}
          alt="Patio"
          width={136}
          height={35}
        />
      </a>

      <nav className="footer-navigation" aria-label="Footer">
        <a
          className="footer-menu footer-menu--who"
          href="#who-we-are"
        >
          <span className="footer-menu__index">01</span>
          <h2>Who we are</h2>
        </a>

        <div className="footer-menu footer-menu--industries">
          <a className="footer-menu__heading" href="#industries">
            <span className="footer-menu__index">02</span>
            <h2>Industries</h2>
          </a>
          <div className="footer-menu__items">
            {footerIndustries.map((item) => (
              <a href={item.href} key={item.label}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-menu footer-menu--services">
          <a className="footer-menu__heading" href="#services">
            <span className="footer-menu__index">03</span>
            <h2>Services</h2>
          </a>
          <div className="footer-menu__items">
            {footerServices.map((item) => (
              <a href="#services" key={item}>
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-menu footer-menu--work">
          <a className="footer-menu__heading" href="#how-we-work">
            <span className="footer-menu__index">04</span>
            <h2>How we work</h2>
          </a>
          <div className="footer-menu__items">
            <a href="#membership">Membership Model</a>
            <a href="#qualification">Ways to Qualify</a>
          </div>
        </div>

        <a
          className="footer-menu footer-menu--philosophy"
          href="#philosophy"
        >
          <span className="footer-menu__index">05</span>
          <h2>Our philosophy</h2>
        </a>

        <a
          className="footer-menu footer-menu--community"
          href="#community"
        >
          <span className="footer-menu__index">06</span>
          <h2>Community building</h2>
        </a>

        <button
          className="footer-menu footer-menu--members"
          onClick={() => setModal({ type: "members" })}
          type="button"
        >
          <span className="footer-menu__index">07</span>
          <span className="footer-menu__title">Members</span>
        </button>
      </nav>

      <div className="footer-social">
        <h2>Stay connected</h2>
        <div className="footer-social__links">
          <a
            aria-label="Patio on LinkedIn"
            href="https://www.linkedin.com/company/94212705"
            rel="noreferrer"
            target="_blank"
          >
            <span className="footer-social__icon footer-social__icon--linkedin">
              in
            </span>
          </a>
          <span
            aria-label="Instagram"
            className="footer-social__icon footer-social__icon--instagram"
            role="img"
          >
            <i />
          </span>
          <a
            aria-label="Patio on X"
            href="https://twitter.com/patiocoop"
            rel="noreferrer"
            target="_blank"
          >
            <span className="footer-social__icon footer-social__icon--x">
              X
            </span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Patio.coop. All rights reserved.</span>
        <div className="footer-legal">
          <a href={sitePath("/privacy/")}>Privacy Policy</a>
          <a href={sitePath("/terms/")}>Terms &amp; Conditions</a>
          <a href={sitePath("/cookies/")}>Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

function Modal({
  modal,
  setModal,
}: {
  modal: ModalState;
  setModal: (modal: ModalState) => void;
}) {
  if (!modal) {
    return null;
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={() => setModal(null)}
    >
      <div
        className={`modal modal--${modal.type}`}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal__close"
          onClick={() => setModal(null)}
          aria-label="Close"
        >
          ×
        </button>
        {modal.type === "contact" ? (
          <ContactModal title={modal.title ?? "Contact Patio"} />
        ) : null}
        {modal.type === "members" ? <MembersModal /> : null}
        {modal.type === "network" ? <NetworkModal setModal={setModal} /> : null}
        {modal.type === "coop" ? (
          <CoopModal cooperative={modal.cooperative} setModal={setModal} />
        ) : null}
        {modal.type === "lightbox" ? (
          <Lightbox index={modal.index} setModal={setModal} />
        ) : null}
        {modal.type === "scholarship" ? <ScholarshipApplication /> : null}
      </div>
    </div>
  );
}

function ContactModal({ title }: { title: string }) {
  return (
    <>
      <h2>{title}</h2>
      <p>
        Tell us what you want to build. This form is wired as a front-end shell
        and can later post to the CMS/backoffice.
      </p>
      <form className="modal-form">
        <label>
          Name
          <input name="name" placeholder="Your name" />
        </label>
        <label>
          Email
          <input name="email" type="email" placeholder="you@example.com" />
        </label>
        <label>
          Project
          <textarea
            name="message"
            placeholder="What would you like to explore?"
          />
        </label>
        <button className="button button--primary" type="button">
          Send request
        </button>
      </form>
    </>
  );
}

function MembersModal() {
  return (
    <>
      <h2>Members login</h2>
      <p>
        The future member area will let cooperatives manage profiles, members,
        services, and visibility.
      </p>
      <form className="modal-form">
        <label>
          Email
          <input name="email" type="email" placeholder="member@coop.org" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button className="button button--primary" type="button">
          Continue
        </button>
      </form>
    </>
  );
}

function NetworkModal({ setModal }: { setModal: (modal: ModalState) => void }) {
  return (
    <>
      <h2>Full network</h2>
      <div className="network-list">
        {cooperatives.map((coop) => (
          <button
            key={coop.name}
            onClick={() => setModal({ type: "coop", cooperative: coop })}
          >
            <strong>{coop.name}</strong>
            <span>
              {coop.country} · {coop.members} members
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

function CoopModal({
  cooperative,
  setModal,
}: {
  cooperative: Cooperative;
  setModal: (modal: ModalState) => void;
}) {
  return (
    <>
      <h2>{cooperative.name}</h2>
      <p>{cooperative.description}</p>
      <dl className="coop-details">
        <div>
          <dt>Location</dt>
          <dd>{cooperative.country}</dd>
        </div>
        <div>
          <dt>Members</dt>
          <dd>{cooperative.members}</dd>
        </div>
      </dl>
      <div className="tags">
        {cooperative.services.map((service) => (
          <span key={service}>{service}</span>
        ))}
      </div>
      <div className="modal-actions">
        <button
          className="button button--primary"
          onClick={() => setModal({ type: "contact", title: "Send email" })}
        >
          Send email
        </button>
        <a className="button button--pale" href={cooperative.website}>
          Open website
        </a>
      </div>
    </>
  );
}

function Lightbox({
  index,
  setModal,
}: {
  index: number;
  setModal: (modal: ModalState) => void;
}) {
  const image = communityImages[index];
  const previous =
    (index + communityImages.length - 1) % communityImages.length;
  const next = (index + 1) % communityImages.length;

  return (
    <div className="lightbox">
      <Image src={sitePath(image.src)} alt={image.alt} fill sizes="90vw" />
      <button
        className="lightbox__prev"
        onClick={() => setModal({ type: "lightbox", index: previous })}
        aria-label="Previous image"
      >
        ←
      </button>
      <button
        className="lightbox__next"
        onClick={() => setModal({ type: "lightbox", index: next })}
        aria-label="Next image"
      >
        →
      </button>
    </div>
  );
}
