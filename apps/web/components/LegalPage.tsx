import type { ReactNode } from "react";

import { sitePath } from "@/lib/sitePath";

export function LegalPage({ children, title }: { children: ReactNode; title: string }) {
  return (
    <main className="legal-page">
      <a className="legal-page__back" href={sitePath("/")}>← Back to Patio</a>
      <header className="legal-page__header">
        <h1>{title}</h1>
        <p>Effective date: 26 August 2026</p>
      </header>
      <div className="legal-page__content">{children}</div>
      <nav className="legal-page__nav" aria-label="Legal pages">
        <a href={sitePath("/privacy/")}>Privacy Policy</a>
        <a href={sitePath("/terms/")}>Terms &amp; Conditions</a>
        <a href={sitePath("/cookies/")}>Cookie Policy</a>
      </nav>
    </main>
  );
}
