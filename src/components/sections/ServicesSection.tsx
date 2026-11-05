import { useEffect, useState } from "react";
import { Bot, FileSearch, KeyRound, LibraryBig, ShieldCheck, Workflow } from "lucide-react";

const focusAreas = [
  {
    id: "assistenz",
    label: "KI-Assistenz",
    icon: Bot,
    headline: "Assistenz für wiederkehrende Kanzleiaufgaben.",
    copy: "KISTRA soll Teams bei Entwürfen, Zusammenfassungen, Recherchevorbereitung und strukturierter Mandatskommunikation unterstützen — immer mit fachlicher Kontrolle durch Menschen.",
    points: ["Entwürfe", "Zusammenfassungen", "Prüfschritte"],
  },
  {
    id: "wissen",
    label: "Kanzleiwissen",
    icon: LibraryBig,
    headline: "Wissen nutzbar machen, ohne Kontext zu verlieren.",
    copy: "Interne Vorlagen, Aktenlogik, Dokumente und Quellen sollen auffindbar, zitierbar und nachvollziehbar in KI-gestützte Arbeitsabläufe eingebunden werden.",
    points: ["Dokumentenbezug", "Quellenklarheit", "Vorlagenlogik"],
  },
  {
    id: "schutz",
    label: "Sicherheit",
    icon: ShieldCheck,
    headline: "Vertraulichkeit als Produktanforderung.",
    copy: "Für Steuer- und Rechtsberatung zählen Mandatsgeheimnis, Datenschutz und belastbare Prozesse. KISTRA wird mit diesen Anforderungen im Zentrum konzipiert.",
    points: ["DSGVO", "Mandatsgeheimnis", "Governance"],
  },
] as const;

const principles = [
  { icon: FileSearch, title: "Nachvollziehbar", text: "Antworten sollen auf Quellen, Dokumente und konkrete Arbeitsschritte zurückführbar bleiben." },
  { icon: Workflow, title: "Prozessnah", text: "KI wird nicht als Spielerei, sondern als Baustein bestehender Kanzleiprozesse verstanden." },
  { icon: KeyRound, title: "Kontrollierbar", text: "Fachliche Verantwortung, Freigaben und sensible Daten bleiben unter Kontrolle der Kanzlei." },
];

export const ServicesSection = () => {
  const [activeId, setActiveId] = useState<(typeof focusAreas)[number]["id"]>("assistenz");

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = focusAreas.findIndex((area) => area.id === currentId);
        return focusAreas[(currentIndex + 1) % focusAreas.length].id;
      });
    }, 10_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const active = focusAreas.find((area) => area.id === activeId) ?? focusAreas[0];
  const ActiveIcon = active.icon;

  return (
    <section id="services" className="relative px-6 py-24 md:py-32">
      <div className="container mx-auto">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.35em] text-accent/90">Fokus</p>
            <h2 className="text-4xl font-black tracking-[-0.05em] text-foreground md:text-6xl">KI, die in Kanzleiarbeit passt.</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-foreground/65">
            KISTRA verbindet moderne KI-Funktionen mit den praktischen Anforderungen von Steuerberatern und Rechtsanwälten: Sorgfalt, Quellen, Vertraulichkeit und Effizienz.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-[28px] border border-foreground/10 bg-background/58 p-4 backdrop-blur-md">
            {focusAreas.map((area) => {
              const Icon = area.icon;
              const isActive = area.id === activeId;
              return (
                <button
                  key={area.id}
                  onClick={() => setActiveId(area.id)}
                  className={`mb-3 flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition ${
                    isActive ? "border-accent/60 bg-accent/10 text-foreground shadow-[0_0_30px_hsl(var(--accent)/0.14)]" : "border-foreground/10 bg-foreground/[0.018] text-foreground/60 hover:border-foreground/25 hover:text-foreground"
                  }`}
                >
                  <Icon className={`h-6 w-6 ${isActive ? "text-accent" : "text-foreground/40"}`} />
                  <span className="font-mono text-sm uppercase tracking-[0.25em]">{area.label}</span>
                </button>
              );
            })}
          </div>

          <div className="rounded-[28px] border border-foreground/10 bg-background/58 p-8 backdrop-blur-md md:p-10">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
              <ActiveIcon className="h-8 w-8" />
            </div>
            <h3 className="mb-5 text-3xl font-black tracking-[-0.04em] text-foreground md:text-5xl">{active.headline}</h3>
            <p className="max-w-3xl text-lg leading-8 text-foreground/70">{active.copy}</p>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {active.points.map((point) => (
                <div key={point} className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4 font-mono text-xs uppercase tracking-[0.18em] text-foreground/70">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {principles.map((item) => (
            <div key={item.title} className="rounded-[24px] border border-foreground/10 bg-background/50 p-6 backdrop-blur-md transition hover:border-accent/40 hover:bg-background/70">
              <item.icon className="mb-5 h-7 w-7 text-accent" />
              <h3 className="mb-3 font-mono text-sm uppercase tracking-[0.22em] text-foreground">{item.title}</h3>
              <p className="leading-7 text-foreground/60">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
