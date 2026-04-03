import { Banknote, CheckCircle2, ClipboardList } from "lucide-react";
import { useMemo, useState } from "react";
import { demandRequest } from "../data/mockData";

const SERVICE_FEE = 0.1;

export default function SupplyDashboardView() {
  const [offerPrice, setOfferPrice] = useState(1000);

  const { fee, payout } = useMemo(() => {
    const calculatedFee = offerPrice * SERVICE_FEE;
    return {
      fee: calculatedFee,
      payout: offerPrice - calculatedFee,
    };
  }, [offerPrice]);

  return (
    <section className="grid gap-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
      <header>
        <p className="text-sm font-semibold text-emerald-200">Supply-Dashboard</p>
        <h2 className="text-2xl font-semibold text-white">Neue Anfrage eingegangen</h2>
        <p className="mt-2 text-sm text-slate-300">
          Reagiere schnell mit einem verbindlichen Angebot – die Plattform kalkuliert deine Auszahlung sofort.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
            <ClipboardList className="h-4 w-4 text-emerald-200" />
            Anfrage-Details
          </div>
          <h3 className="mt-4 text-xl font-semibold text-white">{demandRequest.title}</h3>
          <p className="mt-2 text-sm text-slate-400">
            {demandRequest.location} · {demandRequest.bedsNeeded} Personen · {demandRequest.startDate} bis {demandRequest.endDate}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
            {[demandRequest.roomType, demandRequest.bathroom, demandRequest.kitchen].map((tag) => (
              <span key={tag} className="rounded-full border border-slate-700 px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">Hinweis: {demandRequest.notes}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
            <Banknote className="h-4 w-4 text-emerald-200" />
            Biet-Interface
          </div>
          <div className="mt-4">
            <label className="text-xs font-semibold text-slate-400">Angebotspreis (Gesamt)</label>
            <input
              type="number"
              min={0}
              value={offerPrice}
              onChange={(event) => setOfferPrice(Number(event.target.value))}
              className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none"
            />
          </div>
          <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">
            <div className="flex items-center justify-between">
              <span>Servicegebühr WohnWerk24 (10%)</span>
              <span>- €{fee.toFixed(0)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-base font-semibold">
              <span>Ihr Auszahlungsbetrag</span>
              <span>€{payout.toFixed(0)}</span>
            </div>
          </div>
          <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            Verbindliches Angebot senden
          </button>
        </div>
      </div>
    </section>
  );
}
