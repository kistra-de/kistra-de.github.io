import { Scale } from "lucide-react";

export const HomeSection = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24"
    >
      <div className="container relative z-10 mx-auto px-6">
        <div className="rounded-[28px] border border-white/10 bg-[#111318]/18 p-7 shadow-2xl shadow-black/25 backdrop-blur-sm md:p-12 lg:p-16">
          <div className="mb-14 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 font-mono text-xs uppercase tracking-[0.28em] text-foreground/64">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_hsl(var(--accent)/0.85)]" />
              Stuttgart · Deutschland
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm text-foreground/75">
              <Scale className="h-4 w-4 text-accent" />
              Steuerberatung · Rechtsberatung · DSGVO-konform
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <p className="mb-6 font-mono text-sm uppercase tracking-[0.4em] text-accent/90">KISTRA</p>
              <h1 className="group max-w-4xl text-[clamp(3rem,8vw,6.75rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-foreground">
                <span className="transition-colors duration-300 group-hover:text-accent">KI</span> für{" "}
                <span className="transition-colors duration-300 group-hover:text-accent">St</span>euerberater und{" "}
                <span className="transition-colors duration-300 group-hover:text-accent">R</span>echts
                <span className="transition-colors duration-300 group-hover:text-accent">a</span>nwälte
              </h1>
              <p className="mt-10 max-w-3xl text-lg leading-8 text-foreground/72 md:text-xl">
                KISTRA entsteht für den sicheren, nachvollziehbaren Einsatz von KI in Kanzleien.
              </p>
              <div className="mt-8 inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-foreground/62">
                <span>Diese Website befindet sich im Aufbau</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
