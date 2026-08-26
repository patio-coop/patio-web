import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms & Conditions | Patio" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions">
      <p>These Terms &amp; Conditions govern your use of Patio&apos;s public website. By using the website, you agree to these terms. If you do not agree, please stop using it.</p>

      <section>
        <h2>1. About Patio and this website</h2>
        <p>Patio is a global network of technology cooperatives. This website provides general information about the network, its members, services, ways of working and membership options. Questions may be sent to <a href="mailto:welcome@patio.coop">welcome@patio.coop</a>.</p>
      </section>

      <section>
        <h2>2. Permitted use</h2>
        <p>You may use the website for lawful, informational purposes. You must not:</p>
        <ul>
          <li>interfere with the website, its security or its availability;</li>
          <li>attempt unauthorised access to systems or data;</li>
          <li>introduce malicious code or use automated tools abusively;</li>
          <li>misrepresent an affiliation with Patio or a member cooperative; or</li>
          <li>use website content in a way that infringes third-party rights.</li>
        </ul>
      </section>

      <section>
        <h2>3. Information, enquiries and agreements</h2>
        <p>Website content is general information and is not professional advice, a binding offer or a guarantee that a cooperative, service or opportunity will be available. Sending an enquiry does not create a client, partnership, employment or membership relationship. Any project, membership or other engagement is subject to a separate agreement with the relevant party.</p>
      </section>

      <section>
        <h2>4. Intellectual property</h2>
        <p>Unless stated otherwise, Patio or its licensors own the website&apos;s design, text and original materials. Cooperative names, logos and trademarks belong to their respective owners. You may view and share links to public pages, but you may not reproduce, modify or commercially exploit protected content without permission or another lawful basis.</p>
      </section>

      <section>
        <h2>5. Third-party websites</h2>
        <p>The website links to member cooperatives and social platforms. Those services are controlled by third parties and have their own terms and privacy practices. A link does not mean that Patio controls or accepts responsibility for the external service.</p>
      </section>

      <section>
        <h2>6. Availability and liability</h2>
        <p>We aim to keep information accurate and the website available, but we cannot promise uninterrupted access or that every item is complete, current or error-free. To the fullest extent permitted by law, Patio is not liable for indirect or consequential loss arising solely from use of, or inability to use, this public website. Nothing in these terms excludes liability that cannot lawfully be excluded or limits your mandatory rights.</p>
      </section>

      <section>
        <h2>7. Changes and applicable law</h2>
        <p>We may update the website and these terms. Changes apply from the effective date shown above. These terms are governed by the law that is mandatorily applicable to the website operator and your use of the service, without depriving you of protections that cannot be waived under the law applicable to you.</p>
      </section>
    </LegalPage>
  );
}
