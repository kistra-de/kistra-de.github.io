import { CheckCircle2 } from "lucide-react";

const useCases = [
  "Mandats- und Aktenzusammenfassungen vorbereiten",
  "Verträge, Schreiben und Schriftsätze strukturiert entwerfen",
  "Steuerliche und rechtliche Recherche dokumentieren",
  "Kanzleiinterne Vorlagen und Wissensquellen nutzbar machen",
  "Wiederkehrende Prüfschritte und Checklisten unterstützen",
  "KI-Nutzung über klare Richtlinien und Freigaben steuern",
];

export const AboutSection = () => {
  return (
    <section id="about" className="relative px-6 py-24 md:py-32">
      <div className="container mx-auto">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-foreground/10 bg-background/58 p-8 backdrop-blur-md md:p-10">
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.35em] text-accent/90">Warum KISTRA</p>
            <h2 className="mb-8 text-4xl font-black tracking-[-0.05em] text-foreground md:text-6xl">KI braucht Fachlichkeit, Kontext und Vertrauen.</h2>
            <p className="text-lg leading-8 text-foreground/70">
              Steuerberater und Rechtsanwälte arbeiten mit sensiblen Informationen, komplexen Fristen und hoher Verantwortung. KISTRA soll KI so einbetten, dass Kanzleien produktiver werden, ohne Kontrolle oder Nachvollziehbarkeit zu verlieren.
            </p>
            <p className="mt-6 text-lg leading-8 text-foreground/70">
              Der Fokus liegt nicht auf allgemeinem Chat, sondern auf fachnahen Workflows: Dokumente verstehen, Wissen auffinden, Arbeitsschritte vorbereiten und Ergebnisse prüfbar machen.
            </p>
          </div>

          <div className="rounded-[28px] border border-foreground/10 bg-background/45 p-8 backdrop-blur-md md:p-10">
            <h3 className="mb-8 font-mono text-sm uppercase tracking-[0.28em] text-foreground/70">Geplante Einsatzbereiche</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {useCases.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.018] p-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                  <span className="leading-7 text-foreground/75">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-accent/25 bg-accent/10 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Status</p>
              <p className="mt-3 text-foreground/75">
                Die Website ist ein früher Platzhalter für das Projekt KISTRA. Inhalte, Kontaktwege und Produktdetails werden erweitert, sobald die nächste Phase spruchreif ist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
