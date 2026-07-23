export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" />;
}

function LegalPage({ title }: { title: string }) {
  return (
    <main className="legal-page">
      <h1>{title}</h1>
      <p>Legal content placeholder for Patio.</p>
    </main>
  );
}
