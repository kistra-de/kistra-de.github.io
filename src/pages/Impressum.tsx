import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const Impressum = () => {
  const navigate = useNavigate();

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-4xl py-12 px-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-display tracking-wider">BACK TO HOME</span>
        </button>

        <h1 className="font-display text-4xl md:text-5xl tracking-wider text-foreground mb-12">
          IMPRESSUM
        </h1>

        <div className="rounded-[28px] border border-white/10 bg-[#111318]/20 p-8 leading-relaxed text-foreground/90 shadow-2xl shadow-black/25 backdrop-blur-sm md:p-10">
        <div className="space-y-8 font-light">
          <section>
            <p className="mb-4">
              Mathias Conradt<br />
              Obere Burghalde 76/1<br />
              71229 Leonberg
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-accent mb-6">KONTAKT</h2>
            <p className="mb-4">
              Telefon: +49 7152 3834605<br />
              E-Mail: <a href="mailto:info@conradt.de" className="text-accent hover:underline">info@conradt.de</a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-accent mb-6">VERBRAUCHERSTREITBEILEGUNG / UNIVERSALSCHLICHTUNGSSTELLE</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
