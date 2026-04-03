import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { BathroomType, KitchenType, RoomType, demandRequest, offers, properties } from "../data/mockData";

const roomTypes: RoomType[] = ["Einzelzimmer", "Doppelzimmer", "Mehrbett"];
const bathroomTypes: BathroomType[] = ["Privates Bad", "Gemeinschaftsbad"];
const kitchenTypes: KitchenType[] = ["Private Küche", "Gemeinschaftsküche"];

export default function DemandSearchView() {
  const [location, setLocation] = useState(demandRequest.location);
  const [radius, setRadius] = useState(demandRequest.radiusKm);
  const [dateRange, setDateRange] = useState(`${demandRequest.startDate} - ${demandRequest.endDate}`);
  const [beds, setBeds] = useState(demandRequest.bedsNeeded);
  const [roomType, setRoomType] = useState<RoomType>(demandRequest.roomType);
  const [bathroom, setBathroom] = useState<BathroomType>(demandRequest.bathroom);
  const [kitchen, setKitchen] = useState<KitchenType>(demandRequest.kitchen);

  const offerCards = useMemo(() => {
    return offers.map((offer) => {
      const property = properties.find((item) => item.id === offer.propertyId);
      return {
        offer,
        property,
      };
    });
  }, []);

  return (
    <section className="grid gap-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-brand-200">Demand-Side Wizard</p>
          <h2 className="text-2xl font-semibold text-white">Monteurunterkünfte suchen</h2>
          <p className="mt-2 text-sm text-slate-300">
            Schrittweises B2B-Matching mit standardisierten Filtern und Live-Angeboten.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500">
          <SlidersHorizontal className="h-4 w-4" />
          Filter speichern
        </button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="grid gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-200">1. Geografie & Zeit</p>
              <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs text-brand-200">Step 1</span>
            </div>
            <div className="mt-4 grid gap-4">
              <label className="text-xs font-semibold text-slate-400">Standort (Maps Autocomplete)</label>
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
                <MapPin className="h-4 w-4 text-brand-200" />
                <input
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className="w-full bg-transparent text-sm text-white outline-none"
                  placeholder="Stadt, PLZ oder Projekt" 
                />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Radius</span>
                  <span className="text-brand-200">{radius} km</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={80}
                  value={radius}
                  onChange={(event) => setRadius(Number(event.target.value))}
                  className="mt-2 w-full accent-brand-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400">Zeitraum</label>
                <input
                  value={dateRange}
                  onChange={(event) => setDateRange(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-200">2. Kapazität</p>
              <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs text-brand-200">Step 2</span>
            </div>
            <div className="mt-4">
              <label className="text-xs font-semibold text-slate-400">Benötigte Betten</label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  value={beds}
                  onChange={(event) => setBeds(Number(event.target.value))}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none"
                />
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-300">
                  Personen
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-200">3. Detaillierte Filter</p>
              <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs text-brand-200">Step 3</span>
            </div>
            <div className="mt-4 grid gap-5">
              <div>
                <p className="text-xs font-semibold text-slate-400">Zimmertyp</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {roomTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setRoomType(type)}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                        roomType === type
                          ? "border-brand-400 bg-brand-500/20 text-brand-100"
                          : "border-slate-700 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Bad</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {bathroomTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setBathroom(type)}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                        bathroom === type
                          ? "border-brand-400 bg-brand-500/20 text-brand-100"
                          : "border-slate-700 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Küche</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {kitchenTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setKitchen(type)}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                        kitchen === type
                          ? "border-brand-400 bg-brand-500/20 text-brand-100"
                          : "border-slate-700 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-brand-500/40 bg-brand-500/10 p-5">
            <div className="flex items-center gap-3 text-sm font-semibold text-brand-100">
              <Search className="h-4 w-4" />
              Live-Ergebnisse
            </div>
            <p className="mt-2 text-xs text-brand-100/70">
              {location} · {radius} km · {beds} Betten · {roomType}
            </p>
          </div>
          {offerCards.map(({ offer, property }) => (
            <div key={offer.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{property?.name}</h3>
                  <p className="text-sm text-slate-400">{property?.location} · {property?.distanceKm} km</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    offer.instantBook
                      ? "bg-emerald-500/20 text-emerald-200"
                      : "bg-amber-500/20 text-amber-200"
                  }`}
                >
                  {offer.instantBook ? "Sofort buchbar" : "Ausschreibung"}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                {[property?.roomType, property?.bathroom, property?.kitchen]
                  .filter(Boolean)
                  .map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-700 px-3 py-1">
                      {tag}
                    </span>
                  ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-400">{offer.availability}</p>
                  <p className="text-lg font-semibold text-white">€{offer.totalPrice.toLocaleString()} Gesamt</p>
                  <p className="text-xs text-slate-500">€{offer.pricePerNight} pro Nacht</p>
                </div>
                <button className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20">
                  Angebot ansehen
                </button>
              </div>
            </div>
          ))}
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 p-5 text-center">
            <p className="text-sm font-semibold text-slate-200">Kein passendes Angebot?</p>
            <p className="mt-2 text-xs text-slate-400">Starten Sie eine Ausschreibung und lassen Sie Vermieter bieten.</p>
            <button className="mt-4 rounded-full bg-brand-500 px-4 py-2 text-xs font-semibold text-white">
              Jetzt Ausschreibung starten
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
