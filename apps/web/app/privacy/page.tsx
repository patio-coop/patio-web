import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy | Patio" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>This Privacy Policy explains how Patio, a global network of technology cooperatives, handles personal data when you visit this website or contact us.</p>

      <section>
        <h2>1. Who is responsible for your data?</h2>
        <p>Patio is responsible for the processing described in this policy. For privacy questions or to exercise your rights, email <a href="mailto:welcome@patio.coop">welcome@patio.coop</a>.</p>
      </section>

      <section>
        <h2>2. Data we collect</h2>
        <p>Depending on how you interact with us, we may process:</p>
        <ul>
          <li>Contact details and message content, such as your name, surname, email address, enquiry type, subject and message.</li>
          <li>Membership or application information that you voluntarily provide when asking to join Patio or applying for a membership path.</li>
          <li>Basic technical information that may be recorded by our hosting infrastructure, such as IP address, browser type, request time and requested page, for security and reliable delivery of the website.</li>
        </ul>
        <p>When you submit a contact or membership application form, the information is transmitted through our website and stored by our hosting and form-processing provider, Netlify, so that Patio can receive and review it.</p>
      </section>

      <section>
        <h2>3. Why we process data</h2>
        <p>We use personal data to respond to enquiries, discuss potential projects, manage membership and partnership requests, operate and protect the website, comply with legal obligations and resolve disputes.</p>
        <p>Our legal bases are taking steps at your request before entering into an agreement, performing an agreement, our legitimate interests in communicating with our community and securing the website, and legal obligations where applicable. If we rely on consent, you may withdraw it at any time without affecting earlier processing.</p>
      </section>

      <section>
        <h2>4. Sharing and international access</h2>
        <p>We disclose personal data only when needed to Patio community members handling your request, service providers supporting email or website hosting and form processing (including Netlify), professional advisers, or public authorities where legally required. Because Patio is a global network, an enquiry may be handled by a cooperative outside your country. Where legally required, we use appropriate safeguards for international transfers.</p>
        <p>We do not sell personal data.</p>
      </section>

      <section>
        <h2>5. Retention</h2>
        <p>We keep enquiry data while handling your request and afterwards only for as long as reasonably necessary for follow-up, record-keeping, legal or dispute-resolution purposes. Membership records may be kept for the duration of the relationship and any legally required period. Security logs are retained only for the period needed to protect and maintain the service.</p>
      </section>

      <section>
        <h2>6. Your rights</h2>
        <p>Subject to applicable law, you may request access, correction, deletion, restriction or portability of your personal data, or object to processing based on legitimate interests. You may also lodge a complaint with the data protection authority in the country where you live, work or believe an infringement occurred.</p>
        <p>To make a request, contact <a href="mailto:welcome@patio.coop">welcome@patio.coop</a>. We may need to verify your identity before responding.</p>
      </section>

      <section>
        <h2>7. Security, children and changes</h2>
        <p>We use reasonable organisational and technical measures to protect personal data. This website is intended for professional and organisational audiences and is not directed to children. We may update this policy when our services or legal obligations change; the effective date above shows the latest revision.</p>
      </section>
    </LegalPage>
  );
}
