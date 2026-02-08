import { BadgeCheck, Building2, ShieldCheck, Users2 } from "lucide-react";

export default function LandingPage() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-10 shadow-2xl">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-20 top-8 h-56 w-56 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>
      <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-100">
            <ShieldCheck className="h-4 w-4" />
            Treuhand-abgesichert · B2B-Standard
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl">
            Das Betriebssystem für den B2B-Wohnmarkt.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-300">
            WohnWerk24 verbindet Bauleiter und professionelle Gastgeber in einem sicheren, transparenten Workflow – von der Ausschreibung bis zur Sofortbuchung.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-400">
              Ich suche Unterkunft
            </button>
            <button className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white">
              Ich bin Vermieter
            </button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["STRABAG", "BAM", "BOSCH"].map((logo) => (
              <div
                key={logo}
                className="flex items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm font-semibold text-slate-300"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          {[
            {
              title: "B2B-Matching",
              icon: <Building2 className="h-5 w-5" />,
              text: "Standardisierte Kriterien & Filtersysteme für Teams, Schichten und Projektlaufzeiten.",
            },
            {
              title: "Transaktionsschutz",
              icon: <BadgeCheck className="h-5 w-5" />,
              text: "Treuhand, geprüfte Anbieter und klare SLA-Standards.",
            },
            {
              title: "Skalierbare Kapazitäten",
              icon: <Users2 className="h-5 w-5" />,
              text: "Große Teams kurzfristig anfragen und mit einem Klick buchen.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <div className="flex items-center gap-3 text-sm font-semibold text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/10 text-brand-200">
                  {item.icon}
                </span>
                {item.title}
              </div>
              <p className="mt-3 text-sm text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
