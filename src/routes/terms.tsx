import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/landing/Closing";

export const Route = createFileRoute("/terms")({
  component: TermsConditions,
});

function TermsConditions() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <div className="mx-auto max-w-4xl px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-12 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Zurück zur Startseite
        </Link>
        
        <h1 className="text-4xl leading-tight tracking-tight sm:text-5xl mb-6">Allgemeine Geschäftsbedingungen</h1>
        <p className="text-muted-foreground mb-12">Zuletzt aktualisiert: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-invert max-w-none text-foreground/80 space-y-8">
          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">1. Annahme & Berechtigung</h2>
            <p>Durch den Zugriff auf oder die Nutzung unserer Dienste erklären Sie sich mit diesen Bedingungen einverstanden. Unsere Dienste richten sich ausschließlich an Personen, die mindestens 18 Jahre alt sind und die regulatorischen Kriterien für unsere Anlagemandate in ihren jeweiligen Gerichtsbarkeiten erfüllen.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">2. Zweck der Website</h2>
            <p>Der Inhalt dieser Website dient nur zu Informationszwecken. Er stellt weder ein Angebot noch eine Aufforderung zum Kauf oder Verkauf von digitalen Vermögenswerten, Wertpapieren oder Finanzinstrumenten dar.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">3. Offenlegung des Kryptowährungsrisikos</h2>
            <p>Die Investition in digitale Vermögenswerte ist mit einem hohen Risiko verbunden, einschließlich des Risikos eines vollständigen Kapitalverlusts. Kryptowährungsmärkte sind sehr volatil und plötzlichen, erheblichen Preisbewegungen ausgesetzt. Die Wertentwicklung der Vergangenheit ist kein Indikator für zukünftige Ergebnisse.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">4. Keine Finanzberatung</h2>
            <p>Nichts auf dieser Website stellt eine Finanz-, Anlage-, Rechts- oder Steuerberatung dar. Sie sollten sich vor Anlageentscheidungen an unabhängige Fachleute wenden.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">5. Keine garantierten Renditen</h2>
            <p>Wir garantieren keine spezifischen Anlagerenditen oder -ergebnisse. Alle Anlagen unterliegen Marktrisiken, und der Wert Ihres Portfolios kann schwanken.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">6. Verantwortlichkeiten des Nutzers & zulässige Nutzung</h2>
            <p>Sie erklären sich damit einverstanden, unsere Dienste nur für rechtmäßige Zwecke zu nutzen. Sie sind allein verantwortlich für die Wahrung der Vertraulichkeit Ihrer Kontodaten und für alle Aktivitäten, die unter Ihrem Konto stattfinden.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">7. Geistiges Eigentum</h2>
            <p>Der gesamte Inhalt dieser Website, einschließlich Texte, Grafiken, Logos und Software, ist Eigentum des Unternehmens oder seinen Lizenzgebern und durch geistige Eigentumsrechte geschützt.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">8. Haftungsbeschränkung</h2>
            <p>Soweit gesetzlich zulässig, haften wir nicht für indirekte, zufällige, besondere, Folge- oder Strafschäden, die sich aus oder im Zusammenhang mit Ihrer Nutzung unserer Dienste ergeben.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">9. Datenschutzhinweis</h2>
            <p>Ihre Nutzung unserer Dienste unterliegt auch unserer Datenschutzrichtlinie, die darlegt, wie wir Ihre personenbezogenen Daten erfassen, verwenden und schützen.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">10. Geltendes Recht & Streitigkeiten</h2>
            <p>Diese Bedingungen unterliegen den Gesetzen der Gerichtsbarkeit, in der das Unternehmen tätig ist, und werden in Übereinstimmung mit diesen ausgelegt. Alle Streitigkeiten, die sich aus diesen Bedingungen ergeben, unterliegen der ausschließlichen Zuständigkeit der zuständigen Gerichte.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">11. Kontakt</h2>
            <p>Wenn Sie Fragen zu diesen Bedingungen haben, kontaktieren Sie uns bitte.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
