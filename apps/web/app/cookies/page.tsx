import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Cookie Policy | Patio" };

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy">
      <p>This policy explains how Patio&apos;s website uses cookies and similar technologies. It should be read together with our Privacy Policy.</p>

      <section>
        <h2>1. What are cookies?</h2>
        <p>Cookies are small text files stored on your device when you visit a website. Session cookies expire when you close your browser; persistent cookies remain until their expiry date or until you delete them. Similar technologies can store or access information on a device in other ways.</p>
      </section>

      <section>
        <h2>2. Cookies used by this website</h2>
        <p>As currently configured, Patio does not intentionally set analytics, advertising, social-media tracking or personalisation cookies on this public website. The application does not use browser local storage or session storage.</p>
        <p>Our hosting or security infrastructure may use short-lived, strictly necessary technologies to deliver requests, balance traffic or protect the service. These technologies are used only where required for the service you request and are not used by Patio for advertising or behavioural profiling.</p>
      </section>

      <section>
        <h2>3. Contact forms and external links</h2>
        <p>The contact form opens your own email application and does not store its contents in a browser cookie. Links to cooperative websites and social platforms take you to third-party services. Those services may set their own cookies after you leave Patio, under their own policies.</p>
      </section>

      <section>
        <h2>4. Managing cookies</h2>
        <p>You can inspect, block or delete cookies through your browser settings. Blocking strictly necessary technologies may prevent parts of a website from operating correctly. Because Patio currently does not use non-essential cookies, no cookie consent banner is displayed.</p>
      </section>

      <section>
        <h2>5. Future changes</h2>
        <p>If we introduce non-essential cookies, we will update this policy and, where required, request your consent before setting them. Questions can be sent to <a href="mailto:welcome@patio.coop">welcome@patio.coop</a>.</p>
      </section>
    </LegalPage>
  );
}
