import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/landing/Closing";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <div className="mx-auto max-w-4xl px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-12 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Zurück zur Startseite
        </Link>
        
        <h1 className="text-4xl leading-tight tracking-tight sm:text-5xl mb-6">Datenschutzrichtlinie</h1>
        <p className="text-muted-foreground mb-12">Zuletzt aktualisiert: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-invert max-w-none text-foreground/80 space-y-8">
          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">1. Informationserfassung</h2>
            <p>Wir erfassen Informationen, die Sie uns direkt zur Verfügung stellen, z. B. wenn Sie Ihr Konto erstellen oder ändern, On-Demand-Dienste anfordern, den Kundensupport kontaktieren oder auf andere Weise mit uns kommunizieren. Zu diesen Informationen können gehören: Name, E-Mail, Telefonnummer, Land und Anlagedetails.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">2. Datennutzung</h2>
            <p>Wir verwenden die über Sie erfassten Informationen, um unsere Dienste bereitzustellen, aufrechtzuerhalten und zu verbessern, einschließlich der Verarbeitung von Transaktionen, der Bereitstellung von Kundensupport und der Kommunikation mit Ihnen über Produkte, Dienstleistungen, Angebote und Werbeaktionen.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">3. CRM-Verarbeitung</h2>
            <p>Ihre Kontaktinformationen und Anfragen werden zu Verarbeitungs- und Kommunikationszwecken sicher an unser internes Customer Relationship Management (CRM)-System übertragen. Unsere CRM-Infrastruktur hält sich an strenge Sicherheitsprotokolle, um sicherzustellen, dass Ihre Daten geschützt sind.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">4. Cookies und Tracking</h2>
            <p>Wir verwenden Cookies und ähnliche Technologien, um die Aktivitäten in unserem Service zu verfolgen und bestimmte Informationen zu speichern. Sie können Ihren Browser so einstellen, dass er alle Cookies ablehnt oder anzeigt, wenn ein Cookie gesendet wird.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">5. Sicherheit</h2>
            <p>Wir schätzen Ihr Vertrauen, uns Ihre persönlichen Daten zur Verfügung zu stellen, daher bemühen wir uns, kommerziell akzeptable Mittel zu deren Schutz einzusetzen. Wir verwenden Verschlüsselung und Zugriffskontrollen auf institutionellem Niveau.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">6. Datenaufbewahrung</h2>
            <p>Wir bewahren Ihre personenbezogenen Daten nur so lange auf, wie es für die in dieser Datenschutzrichtlinie dargelegten Zwecke erforderlich ist oder wie es von den Aufsichtsbehörden verlangt wird.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">7. Nutzerrechte</h2>
            <p>Sie haben das Recht, Zugang zu, Berichtigung oder Löschung Ihrer personenbezogenen Daten zu verlangen. Sie können auch der Verarbeitung Ihrer personenbezogenen Daten widersprechen oder deren Einschränkung verlangen.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">8. Marketing & Dritte</h2>
            <p>Wir verkaufen Ihre personenbezogenen Daten nicht an Dritte. Wir können Ihre Daten an vertrauenswürdige Partner weitergeben, jedoch ausschließlich zu dem Zweck, unser Geschäft zu betreiben und Ihnen Dienstleistungen bereitzustellen.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">9. Internationale Übermittlungen</h2>
            <p>Ihre Informationen, einschließlich personenbezogener Daten, können auf Computer übertragen und dort aufbewahrt werden, die sich außerhalb Ihres Staates, Ihrer Provinz, Ihres Landes oder einer anderen staatlichen Gerichtsbarkeit befinden, in der die Datenschutzgesetze abweichen können.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">10. Kontakt</h2>
            <p>Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns bitte.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
