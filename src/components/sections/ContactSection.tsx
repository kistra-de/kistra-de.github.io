import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="relative px-6 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.35em] text-accent/90">Kontakt</p>
        <h2 className="mb-16 text-4xl font-black tracking-[-0.05em] text-foreground md:text-6xl">Weitere Informationen folgen.</h2>

        <div className="grid gap-8 rounded-[28px] border border-white/10 bg-[#111318]/18 p-8 shadow-2xl shadow-black/25 backdrop-blur-sm md:grid-cols-2 md:p-10 lg:gap-20">
          <div>
            <h3 className="mb-6 font-mono text-sm uppercase tracking-[0.28em] text-accent">
              KISTRA Projektkontakt
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <MapPin className="h-6 w-6 flex-shrink-0 text-accent" />
                <span className="text-lg text-foreground/75">
                  Greater Stuttgart area incl. Leonberg and Gerlingen
                </span>
              </div>

              <a
                href="mailto:info@conradt.io"
                className="group flex items-center gap-4 transition-colors hover:text-accent"
              >
                <Mail className="h-6 w-6 flex-shrink-0 text-accent" />
                <span className="text-lg text-foreground/75 transition-colors group-hover:text-accent">
                  info@conradt.io
                </span>
                <ExternalLink className="h-4 w-4 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
              </a>

              <a
                href="tel:+4971523834605"
                className="group flex items-center gap-4 transition-colors hover:text-accent"
              >
                <Phone className="h-6 w-6 flex-shrink-0 text-accent" />
                <span className="text-lg text-foreground/75 transition-colors group-hover:text-accent">
                  +49 7152 3834605
                </span>
                <ExternalLink className="h-4 w-4 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end">
            <a
              href="mailto:info@conradt.io"
              className="group inline-flex items-center gap-4 rounded-full border border-foreground/10 bg-foreground px-10 py-5 text-lg font-semibold text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground"
            >
              <Mail className="h-6 w-6 transition-transform group-hover:scale-110" />
              Kontakt aufnehmen
            </a>
          </div>
        </div>
      </div>

      <div className="mt-24 border-t border-foreground/10 pt-8">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm text-foreground/45">
            © {new Date().getFullYear()} KISTRA. All rights reserved. <span className="mx-2">|</span> <a href="/impressum" className="transition-colors hover:text-accent">Impressum</a> <span className="mx-2">|</span> <a href="/datenschutz" className="transition-colors hover:text-accent">Datenschutz</a>
          </p>
        </div>
      </div>
    </section>
  );
};
