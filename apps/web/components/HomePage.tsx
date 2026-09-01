"use client";

import Image from "next/image";
import {
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

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

const regions = ["All", "Middle East", "Europe", "South East Asia", "America"];
const membersAreaEnabled = false;
const featuredBentoSlots = [
  { column: 1, row: 1, height: 210 },
  { column: 2, row: 1, height: 120 },
  { column: 3, row: 1, height: 289 },
  { column: 4, row: 1, height: 210 },
  { column: 1, row: 211, height: 212 },
  { column: 2, row: 121, height: 302 },
  { column: 3, row: 290, height: 133 },
  { column: 4, row: 211, height: 212 },
] as const;

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => element.getClientRects().length > 0);
}

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<number | null>(null);
  const [headerHidden, setHeaderHidden] = useState(false);
  const sociocracyRef = useRef<HTMLElement | null>(null);

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
    const root = document.documentElement;
    const lines = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-line]"),
    );

    root.classList.add("motion-ready");

    if (!("IntersectionObserver" in window)) {
      lines.forEach((line) => line.classList.add("is-line-visible"));
      return () => root.classList.remove("motion-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-line-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.2 },
    );

    lines.forEach((line) => observer.observe(line));

    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => {
    const section = sociocracyRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            section.classList.add("sociocracy--in-view");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

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

  const workItems = workTab === "industries" ? industries : services;
  const featuredCoops = (activeRegion === "All"
      ? cooperatives.filter((coop) => coop.logo)
      : cooperatives.filter(
          (coop) => coop.region === activeRegion && coop.logo,
        )
  ).slice(0, 8);
  const activeBentoSlots = featuredBentoSlots.slice(0, featuredCoops.length);
  const featuredGridHeight = activeBentoSlots.reduce(
    (height, slot) => Math.max(height, slot.row - 1 + slot.height),
    0,
  );
  const featuredCrosses = Array.from(
    activeBentoSlots
      .flatMap((slot) => {
        const top = slot.row - 1;
        const bottom = top + slot.height;
        const left = slot.column - 1;
        const right = slot.column;

        return [
          { column: left, top },
          { column: right, top },
          { column: left, top: bottom },
          { column: right, top: bottom },
        ];
      })
      .reduce((crosses, cross) => {
        crosses.set(`${cross.column}-${cross.top}`, cross);
        return crosses;
      }, new Map<string, { column: number; top: number }>()),
  )
    .map(([, cross]) => cross)
    .filter(
      ({ column, top }) =>
        !(column === 4 && top === featuredGridHeight),
    );

  const handleWorkTabKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) => {
    let nextTab: "industries" | "services" | null = null;

    if (event.key === "ArrowLeft" || event.key === "Home") {
      nextTab = "industries";
    } else if (event.key === "ArrowRight" || event.key === "End") {
      nextTab = "services";
    }

    if (!nextTab) {
      return;
    }

    event.preventDefault();
    setWorkTab(nextTab);
    document.getElementById(nextTab)?.focus();
  };

  return (
    <>
      <a className="skip-link" href="#top">
        Skip to content
      </a>
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
      <main id="top" tabIndex={-1}>
        <div className="section-band section-band--dark section-band--hero">
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
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M6 6.4 7.4 5 17 14.6V6h2v12H7v-2h8.6L6 6.4Z" />
                </svg>
              </span>
            </button>
          </div>
          <HeroGlobe />
          <div
            className="stats-grid"
            aria-label="Patio network statistics"
            role="list"
          >
            {stats.map((stat) => (
              <div className="stat-card" key={stat.label} role="listitem">
                <small className="stat-card__index">{stat.index}</small>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
        </div>

        <div className="section-band section-band--light section-band--who">
        <section
          className="section section--light who"
          id="who-we-are"
          aria-labelledby="who-heading"
        >
          <SectionIntro
            eyebrow="ID:90192"
            title="Who we are"
            text="We are a global network of worker cooperatives in digital technology, communication, and design. We collaborate on international projects, scaling remote, interdisciplinary teams to fit each project’s needs."
          />
          <div
            className="who-graphic"
            aria-hidden="true"
            data-scroll-line
          >
            <svg viewBox="0 0 420 320" role="presentation">
              <defs>
                <linearGradient
                  id="whoCurveGradient"
                  x1="340"
                  y1="0"
                  x2="20"
                  y2="290"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#35ff38" />
                  <stop offset="0.55" stopColor="#b8d7e8" />
                  <stop offset="1" stopColor="#96d8fd" />
                </linearGradient>
              </defs>
              <path
                d="M340 0 C340 164 250 290 20 290"
                className="scroll-line__path"
                fill="none"
                pathLength="1"
                stroke="url(#whoCurveGradient)"
                strokeLinecap="round"
                strokeWidth="4"
              />
              <circle
                className="scroll-line__endpoint"
                cx="20"
                cy="290"
                fill="#96d8fd"
                r="7"
              />
            </svg>
            <span>
              USR
              <br />
              43119
            </span>
          </div>
          <div
            className="region-filter"
            aria-label="Filter cooperatives"
            role="group"
          >
            {regions.map((region) => (
              <button
                key={region}
                className={region === activeRegion ? "is-active" : ""}
                aria-pressed={region === activeRegion}
                onClick={() => setActiveRegion(region)}
                type="button"
              >
                {region}
              </button>
            ))}
          </div>
          <div
            className="coop-grid"
            style={
              {
                "--coop-grid-height": `${featuredGridHeight}px`,
              } as CSSProperties
            }
          >
            {featuredCoops.map((coop) => (
              <button
                className="coop-card"
                key={coop.name}
                onClick={() => setModal({ type: "coop", cooperative: coop })}
                type="button"
              >
                {coop.logo ? (
                  <Image
                    src={sitePath(coop.logo.src)}
                    alt={coop.name}
                    width={coop.logo.width}
                    height={coop.logo.height}
                  />
                ) : null}
              </button>
            ))}
            <div className="who-grid-crosses" aria-hidden="true">
              {featuredCrosses.map(({ column, top }) => (
                <span
                  className="who-grid-cross"
                  key={`${column}-${top}`}
                  style={{
                    left: `${column * 25}%`,
                    top: `${top}px`,
                  }}
                />
              ))}
            </div>
          </div>
          <button
            className="button button--small"
            onClick={() => setModal({ type: "network" })}
            type="button"
          >
            View full network
          </button>
        </section>
        </div>

        <div className="section-band section-band--dark section-band--work">
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
          <div
            className="work-graphic"
            aria-hidden="true"
            data-scroll-line
          >
            <svg
              className="scroll-line__graphic"
              viewBox="75 0 328 262"
              role="presentation"
            >
              <defs>
                <linearGradient
                  id="workCurveGradient"
                  x1="174.051"
                  x2="309.299"
                  y1="75.703"
                  y2="181.075"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0800246" stopColor="#bbd7e7" />
                  <stop offset="0.398579" stopColor="#96d8fd" />
                  <stop offset="0.717946" stopColor="#afd4e8" />
                  <stop offset="1" stopColor="#45fa4f" />
                </linearGradient>
              </defs>
              <path
                className="scroll-line__path"
                d="M75 0C75 141.385 217.373 256 393 256"
                fill="none"
                pathLength="1"
                stroke="url(#workCurveGradient)"
                strokeLinecap="round"
                strokeWidth="4"
              />
              <circle
                className="scroll-line__endpoint"
                cx="397"
                cy="256"
                fill="#35ff38"
                r="6"
              />
            </svg>
            <span>
              USR
              <br />
              91241
            </span>
          </div>
          <div
            className="segmented-control"
            role="tablist"
            aria-label="Browse Patio capabilities"
          >
            <button
              id="industries"
              role="tab"
              aria-controls="work-panel"
              aria-selected={workTab === "industries"}
              onClick={() => setWorkTab("industries")}
              onKeyDown={handleWorkTabKeyDown}
              tabIndex={workTab === "industries" ? 0 : -1}
              type="button"
            >
              Industries
            </button>
            <button
              id="services"
              role="tab"
              aria-controls="work-panel"
              aria-selected={workTab === "services"}
              onClick={() => setWorkTab("services")}
              onKeyDown={handleWorkTabKeyDown}
              tabIndex={workTab === "services" ? 0 : -1}
              type="button"
            >
              Services
            </button>
          </div>
          <div
            className="work-grid"
            id="work-panel"
            role="tabpanel"
            aria-labelledby={workTab}
          >
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
            {workItems.length % 4 !== 0 ? (
              <span className="work-card work-card--empty" aria-hidden="true" />
            ) : null}
          </div>
        </section>
        </div>

        <div className="section-band section-band--light section-band--process">
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
          <div
            className="process-curve"
            aria-hidden="true"
            data-scroll-line
          >
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
                className="scroll-line__path"
                d="M229 0 C229 30 235 81 185 130 C132 182 42 226 62 323"
                fill="none"
                pathLength="1"
                stroke="url(#processCurveGradient)"
                strokeLinecap="round"
                strokeWidth="5"
              />
              <circle
                className="scroll-line__endpoint"
                cx="62"
                cy="323"
                fill="#96d8fd"
                r="9"
              />
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
        </div>

        <div className="section-band section-band--soft section-band--membership">
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
                    onClick={() => {
                      if (index === 2) {
                        setModal({ type: "scholarship" });
                        return;
                      }

                      setModal({
                        type: "contact",
                        title: index === 0 ? "Pay now" : "Join for free",
                      });
                    }}
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
        </div>

        <div className="section-band section-band--dark section-band--sociocracy">
        <section
          className="section section--dark sociocracy"
          id="sociocracy"
          aria-labelledby="sociocracy-heading"
          ref={sociocracyRef}
        >
          <div className="sociocracy-frame" aria-hidden="true">
            <span className="sociocracy-frame__guide sociocracy-frame__guide--header" />
            <span className="sociocracy-frame__guide sociocracy-frame__guide--top" />
            <span className="sociocracy-frame__guide sociocracy-frame__guide--bottom" />
            <span className="sociocracy-frame__guide sociocracy-frame__guide--left" />
            <span className="sociocracy-frame__guide sociocracy-frame__guide--right" />
            <span className="sociocracy-frame__guide sociocracy-frame__guide--center-v" />
            <span className="sociocracy-frame__guide sociocracy-frame__guide--center-h" />
            <span className="sociocracy-frame__guide sociocracy-frame__guide--tail" />
            <span className="sociocracy-frame__cross" />
            <span className="sociocracy-frame__cap sociocracy-frame__cap--top" />
            <span className="sociocracy-frame__cap sociocracy-frame__cap--bottom" />
            <div className="sociocracy-signal" data-scroll-line>
              <svg
                className="scroll-line__graphic"
                viewBox="0 0 250 245"
                role="presentation"
              >
                <defs>
                  <linearGradient
                    id="sociocracySignalGradient"
                    x1="136.034"
                    x2="225.027"
                    y1="71.0843"
                    y2="106.647"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.0800246" stopColor="#bbd7e7" />
                    <stop offset="0.398579" stopColor="#96d8fd" />
                    <stop offset="0.717946" stopColor="#afd4e8" />
                    <stop offset="1" stopColor="#45fa4f" />
                  </linearGradient>
                </defs>
                <path
                  className="scroll-line__path"
                  d="M89 -2C75.5 63 96 205.5 240 238"
                  fill="none"
                  pathLength="1"
                  stroke="url(#sociocracySignalGradient)"
                  strokeLinecap="round"
                  strokeWidth="4"
                />
                <circle
                  className="scroll-line__endpoint"
                  cx="238"
                  cy="237"
                  fill="#35ff38"
                  r="6"
                />
              </svg>
              <span>
                USR
                <br />
                91240
              </span>
            </div>
          </div>

          <div className="sociocracy-intro">
            <span>ID:90192</span>
            <h2 id="sociocracy-heading">Sociocracy in action</h2>
            <p>
              We innovate and implement cutting-edge technologies to create
              digital products and services, supported by our global community
              to ensure top-tier results.
            </p>
          </div>

          <div
            className="sociocracy-graphic"
            aria-label="Sociocracy principles"
            role="group"
          >
            <span className="sociocracy-connector sociocracy-connector--feedback-h" />
            <span className="sociocracy-connector sociocracy-connector--feedback-v" />
            <span className="sociocracy-connector sociocracy-connector--feedback-tail" />
            <span className="sociocracy-connector sociocracy-connector--circles" />
            <span className="sociocracy-connector sociocracy-connector--decisions" />
            <span className="sociocracy-connector sociocracy-connector--linking-tail" />
            <span className="sociocracy-connector sociocracy-connector--linking-v" />
            <span className="sociocracy-connector sociocracy-connector--linking-h" />

            <article className="sociocracy-principle sociocracy-principle--feedback">
              <h3>Feedback</h3>
              <p>
                Build in feedback and increase information flow to make
                incremental improvements a habit
              </p>
            </article>

            <article className="sociocracy-principle sociocracy-principle--circles">
              <h3>
                Circles =<br />
                team of peers
              </h3>
              <p>
                Group of 4-8 people work together with a defined purpose (aim)
                and with authority in their domain
              </p>
            </article>

            <article className="sociocracy-principle sociocracy-principle--decisions">
              <h3>
                Decisions =<br />
                consent
              </h3>
              <p>
                Circles set their agreements by consent - if a circle member has
                objection, the proposal needs to be improved
              </p>
            </article>

            <article className="sociocracy-principle sociocracy-principle--linking">
              <h3>
                Linking =<br />
                connectors
              </h3>
              <p>
                Links between circles help align circles, help information flow
                and balance circles with each other
              </p>
            </article>

            <div className="sociocracy-globe" aria-hidden="true">
              <span className="sociocracy-globe__orbit sociocracy-globe__orbit--outer" />
              <span className="sociocracy-globe__orbit sociocracy-globe__orbit--vertical" />
              <span className="sociocracy-globe__orbit sociocracy-globe__orbit--horizontal" />
              <span className="sociocracy-globe__node sociocracy-globe__node--top" />
              <span className="sociocracy-globe__node sociocracy-globe__node--left" />
              <span className="sociocracy-globe__node sociocracy-globe__node--right" />
              <span className="sociocracy-globe__node sociocracy-globe__node--bottom" />
              <span className="sociocracy-globe__label sociocracy-globe__label--share">
                Share
                <br />
                information
              </span>
              <span className="sociocracy-globe__label sociocracy-globe__label--power">
                Decentralize
                <br />
                power
              </span>
            </div>
          </div>
        </section>
        </div>

        <div className="section-band section-band--light section-band--philosophy">
        <section
          className="section section--light philosophy"
          id="philosophy"
          aria-labelledby="philosophy-heading"
        >
          <div
            className="philosophy-signal scroll-line--horizontal"
            aria-hidden="true"
            data-scroll-line
          >
            <svg
              className="scroll-line__graphic"
              viewBox="-1 52 364 30"
              role="presentation"
            >
              <defs>
                <linearGradient
                  id="philosophySignalGradient"
                  x1="240.971"
                  x2="27.9969"
                  y1="282.402"
                  y2="282.402"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0800246" stopColor="#bbd7e7" />
                  <stop offset="0.398579" stopColor="#96d8fd" />
                  <stop offset="0.717946" stopColor="#afd4e8" />
                  <stop offset="1" stopColor="#45fa4f" />
                </linearGradient>
              </defs>
              <path
                className="scroll-line__path"
                d="M-0.999512 67.0015L361.5 67.0017"
                fill="none"
                pathLength="1"
                stroke="url(#philosophySignalGradient)"
                strokeLinecap="round"
                strokeWidth="4"
              />
              <circle
                className="scroll-line__endpoint"
                cx="362"
                cy="67"
                fill="#94c9e7"
                r="6"
              />
            </svg>
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
                bring people together to share knowledge and support each other.
              </p>
              <p>Our goal is simple: help you build a thriving tech co-op.</p>
            </div>
            <button
              className="button button--small"
              onClick={() => setModal({ type: "contact", title: "Join Patio" })}
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
        </div>

        <div className="section-band section-band--dark section-band--community">
        <section
          className="section section--dark community"
          id="community"
          aria-labelledby="community-heading"
        >
          <div className="community-top-cap" aria-hidden="true" />
          <div
            className="community-signal"
            aria-hidden="true"
            data-scroll-line
          >
            <svg
              className="scroll-line__graphic"
              viewBox="686 30 64 315"
              role="presentation"
            >
              <defs>
                <linearGradient
                  id="communitySignalGradient"
                  x1="787"
                  x2="807"
                  y1="98"
                  y2="290.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0800246" stopColor="#bbd7e7" />
                  <stop offset="0.398579" stopColor="#96d8fd" />
                  <stop offset="0.717946" stopColor="#afd4e8" />
                  <stop offset="1" stopColor="#45fa4f" />
                </linearGradient>
              </defs>
              <path
                className="scroll-line__path"
                d="M723.999 30C658.5 174 806 181 724.002 338.5"
                fill="none"
                pathLength="1"
                stroke="url(#communitySignalGradient)"
                strokeLinecap="round"
                strokeWidth="4"
              />
              <circle
                className="scroll-line__endpoint"
                cx="724"
                cy="339"
                fill="#35ff38"
                r="6"
              />
            </svg>
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
                  style={{
                    left: `${(x / 1440) * 100}%`,
                    top: `${(top / 1245) * 100}%`,
                  }}
                />
              ))}
            </span>
          </div>
          <div className="community-gallery">
            {communityImages.map((image, index) => (
              <button
                aria-label={`Open image: ${image.alt}`}
                key={image.src}
                className={`gallery-item gallery-item--${index + 1}`}
                onClick={() => setModal({ type: "lightbox", index })}
                type="button"
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
        </div>

        <div className="section-band section-band--light section-band--cta">
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
        </div>
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
    <div className={`site-header-shell ${hidden ? "site-header-shell--hidden" : ""}`}>
    <header className="site-header">
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
            {item.groups ? (
              <button aria-haspopup="true" type="button">
                <span className="nav-item__content">
                  <span className="nav-item__index">{item.index}</span>
                  <span className="nav-item__label">
                    {item.label}
                    <b aria-hidden="true">⌄</b>
                  </span>
                </span>
              </button>
            ) : (
              <a href={item.href}>
                <span className="nav-item__content">
                  <span className="nav-item__index">{item.index}</span>
                  <span className="nav-item__label">{item.label}</span>
                </span>
              </a>
            )}
            {item.groups ? (
              <div className="nav-dropdown">
                <div className="nav-dropdown__primary">
                  <a className="nav-dropdown__title" href={item.href}>
                    {item.label}
                  </a>
                  {item.groups.map((group) => (
                    <div className="nav-dropdown__group" key={group.label}>
                      <a
                        className="nav-dropdown__group-label"
                        href={group.href}
                      >
                        {group.label}
                        <b aria-hidden="true">›</b>
                      </a>
                      <div className="nav-dropdown__submenu">
                        {group.items.map((entry) => (
                          <a href={sitePath(entry.href)} key={entry.label}>
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
          type="button"
        >
          Get in touch
        </button>
      </div>
      <button
        className="menu-button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-controls={menuOpen ? "mobile-navigation" : undefined}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>
    </header>
    </div>
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
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenuRef = useRef(close);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  closeMenuRef.current = close;

  useEffect(() => {
    if (!open) {
      return;
    }

    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const frame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenuRef.current();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) {
        return;
      }

      const focusable = getFocusableElements(menuRef.current);

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleKeyDown);
      returnFocusRef.current?.focus();
      returnFocusRef.current = null;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const item = panel !== null ? navItems[panel] : null;

  return (
    <div
      aria-label="Navigation menu"
      aria-modal="true"
      className="mobile-menu"
      id="mobile-navigation"
      ref={menuRef}
      role="dialog"
    >
      <div className="mobile-menu__bar">
        {item ? (
          <button
            onClick={() => setPanel(null)}
            aria-label="Back"
            type="button"
          >
            ←
          </button>
        ) : (
          <span />
        )}
        <button
          onClick={close}
          aria-label="Close menu"
          ref={closeButtonRef}
          type="button"
        >
          ×
        </button>
      </div>
      {item?.groups ? (
        <div className="mobile-menu__panel">
          <h2>
            <a href={item.href} onClick={close}>
              {item.label}
            </a>
          </h2>
          {item.groups.map((group) => (
            <div key={group.label}>
              <h3>
                <a href={group.href} onClick={close}>
                  {group.label}
                </a>
              </h3>
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
              <button
                key={navItem.label}
                onClick={() => setPanel(index)}
                type="button"
              >
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
          {membersAreaEnabled ? (
            <button
              onClick={() => {
                close();
                setModal({ type: "members" });
              }}
              type="button"
            >
              Members
            </button>
          ) : null}
          <button
            onClick={() => {
              close();
              setModal({ type: "contact", title: "Get in touch" });
            }}
            type="button"
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

function Footer({ setModal }: { setModal: (modal: ModalState) => void }) {
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
    <div className="section-band section-band--dark section-band--footer">
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
        <a className="footer-menu footer-menu--who" href="#who-we-are">
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

        <a className="footer-menu footer-menu--philosophy" href="#philosophy">
          <span className="footer-menu__index">05</span>
          <h2>Our philosophy</h2>
        </a>

        <a className="footer-menu footer-menu--community" href="#community">
          <span className="footer-menu__index">06</span>
          <h2>Community building</h2>
        </a>

        {membersAreaEnabled ? (
          <button
            className="footer-menu footer-menu--members"
            onClick={() => setModal({ type: "members" })}
            type="button"
          >
            <span className="footer-menu__index">07</span>
            <span className="footer-menu__title">Members</span>
          </button>
        ) : null}
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
            <svg
              aria-hidden="true"
              className="footer-social__icon"
              viewBox="0 0 24 24"
            >
              <path d="M5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065Zm1.782 13.019H3.555V9h3.564v11.452Zm13.328 0h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
            </svg>
          </a>
          <a
            aria-label="Patio on X"
            href="https://twitter.com/patiocoop"
            rel="noreferrer"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              className="footer-social__icon"
              viewBox="0 0 24 24"
            >
              <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993l-9.508-13.838Zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182l-6.327-9.05Z" />
            </svg>
          </a>
          <a
            aria-label="Patio on GitHub"
            href="https://github.com/patio-coop"
            rel="noreferrer"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              className="footer-social__icon"
              viewBox="0 0 24 24"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297Z" />
            </svg>
          </a>
          <a
            aria-label="Patio on Mastodon"
            href="https://social.coop/@patio"
            rel="me noreferrer"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              className="footer-social__icon"
              viewBox="0 0 24 24"
            >
              <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03C7.803 0 6.948.242 6.495.309 3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545ZM19.52 14.508h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12l-.003 6.406Z" />
            </svg>
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
    </div>
  );
}

function Modal({
  modal,
  setModal,
}: {
  modal: ModalState;
  setModal: (modal: ModalState) => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef(modal);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const isOpen = modal !== null;
  const modalType = modal?.type;

  modalRef.current = modal;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const handleKeyDown = (event: KeyboardEvent) => {
      const currentModal = modalRef.current;

      if (event.key === "Escape") {
        event.preventDefault();
        setModal(null);
        return;
      }

      if (currentModal?.type === "lightbox") {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          setModal({
            type: "lightbox",
            index:
              (currentModal.index + communityImages.length - 1) %
              communityImages.length,
          });
          return;
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          setModal({
            type: "lightbox",
            index: (currentModal.index + 1) % communityImages.length,
          });
          return;
        }
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = getFocusableElements(dialogRef.current);

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      returnFocusRef.current?.focus();
      returnFocusRef.current = null;
    };
  }, [isOpen, setModal]);

  useEffect(() => {
    if (!modalType) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [modalType]);

  if (!modal) {
    return null;
  }

  const labelledBy =
    modal.type === "lightbox"
      ? undefined
      : modal.type === "scholarship"
        ? "scholarship-title"
        : `modal-${modal.type}-title`;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={() => setModal(null)}
    >
      <div
        className={`modal modal--${modal.type}`}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={modal.type === "lightbox" ? "Community gallery" : undefined}
        aria-labelledby={labelledBy}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal__close"
          ref={closeButtonRef}
          type="button"
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
  const [messageLength, setMessageLength] = useState(0);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const surname = String(data.get("surname") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const enquiryType = String(data.get("enquiryType") ?? "").trim();
    const messageSubject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = messageSubject || `Patio enquiry: ${title}`;
    const body = [
      `Enquiry: ${enquiryType}`,
      `Name: ${name} ${surname}`,
      `Email: ${email}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:welcome@patio.coop?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="contact-modal">
      <div className="contact-modal__intro">
        <h2 id="modal-contact-title">{title}</h2>
        <p>
          Tell us briefly how you&apos;d like to collaborate. A community member
          will reach out to explore the next steps with you.
        </p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label className="contact-field">
          <span>Subject</span>
          <select name="enquiryType" defaultValue="" required>
            <option value="" disabled>
              Select an option ...
            </option>
            <option value="New project">New project</option>
            <option value="Join the community">Join the community</option>
            <option value="Partnership">Partnership</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <div className="contact-form__name-row">
          <label className="contact-field">
            <span>Name</span>
            <input
              name="name"
              autoComplete="given-name"
              placeholder="Your name ..."
              required
            />
          </label>
          <label className="contact-field">
            <span>Surname</span>
            <input
              name="surname"
              autoComplete="family-name"
              placeholder="Your surname ..."
              required
            />
          </label>
        </div>
        <label className="contact-field">
          <span>Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Your email ..."
            required
          />
        </label>
        <label className="contact-field">
          <span>Subject</span>
          <input name="subject" placeholder="Subject ..." required />
        </label>
        <label className="contact-field contact-field--message">
          <span>Message</span>
          <span className="contact-field__count">{messageLength}/300</span>
          <textarea
            maxLength={300}
            name="message"
            onChange={(event) =>
              setMessageLength(event.currentTarget.value.length)
            }
            placeholder="Your message ..."
            required
          />
        </label>
        <button className="contact-form__submit" type="submit">
          Send message
        </button>
      </form>
    </div>
  );
}

function MembersModal() {
  return (
    <>
      <h2 id="modal-members-title">Members login</h2>
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
    <div className="network-modal">
      <h2 className="sr-only" id="modal-network-title">
        All cooperatives
      </h2>
      <div className="network-grid">
        {cooperatives.map((coop) => (
          <button
            key={coop.name}
            onClick={() => setModal({ type: "coop", cooperative: coop })}
            style={{
              gridColumn: coop.networkLayout.column,
              gridRow: `${coop.networkLayout.row} / span ${coop.networkLayout.height}`,
            }}
            type="button"
          >
            {coop.logo ? (
              <Image
                src={sitePath(coop.logo.src)}
                alt={coop.name}
                width={coop.logo.width}
                height={coop.logo.height}
              />
            ) : (
              <strong>{coop.name}</strong>
            )}
          </button>
        ))}
      </div>
    </div>
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
    <div className="coop-modal">
      <div className="coop-modal__breadcrumb">
        <button onClick={() => setModal({ type: "network" })} type="button">
          All
        </button>
        <span aria-hidden="true">→</span>
        <h2 id="modal-coop-title">{cooperative.name}</h2>
      </div>
      <div className="coop-modal__logo">
        {cooperative.logo ? (
          <Image
            src={sitePath(cooperative.logo.src)}
            alt={cooperative.name}
            width={cooperative.logo.width}
            height={cooperative.logo.height}
          />
        ) : (
          <strong>{cooperative.name}</strong>
        )}
      </div>
      <div className="coop-modal__content">
        <h3>{cooperative.headline}</h3>
        <p>{cooperative.description}</p>
        <div className="coop-modal__tags">
          {cooperative.services.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
      </div>
      <div className="coop-modal__footer">
        <button
          onClick={() =>
            setModal({
              type: "contact",
              title: `Contact ${cooperative.name}`,
            })
          }
          type="button"
        >
          Contact us
        </button>
      </div>
    </div>
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
