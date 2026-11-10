import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Bed,
  ChevronDown,
  ChevronUp,
  Search,
  Plus,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { DemandRequest, RoomType, BathType, KitchenType } from "../types";
import { mockFilteredResults, mockProperties } from "../mockData";
import { Property } from "../types";

interface DemandSideProps {
  onBack: () => void;
}

type WizardStep = "step1" | "step2" | "step3" | "results";

export const DemandSide: React.FC<DemandSideProps> = ({ onBack }) => {
  const [step, setStep] = useState<WizardStep>("step1");

  // Form State
  const [location, setLocation] = useState("München");
  const [radius, setRadius] = useState(15);
  const [startDate, setStartDate] = useState("2026-03-01");
  const [endDate, setEndDate] = useState("2026-05-31");
  const [peopleCount, setPeopleCount] = useState(4);
  const [bedsRequired, setBedsRequired] = useState(4);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>(["single"]);
  const [bathTypes, setBathTypes] = useState<BathType[]>(["private"]);
  const [kitchenTypes, setKitchenTypes] = useState<KitchenType[]>(["shared"]);
  const [results, setResults] = useState<Property[]>([]);

  // Toggle functions for multi-select
  const toggleRoomType = (type: RoomType) => {
    setRoomTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleBathType = (type: BathType) => {
    setBathTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleKitchenType = (type: KitchenType) => {
    setKitchenTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Handler for search filters
  const handleFilterAndSearch = () => {
    // Simulated filtering logic (in real app, backend would do this)
    const filtered = mockFilteredResults.filter((property) => {
      const hasRequiredBath = bathTypes.includes(property.bathType);
      const hasRequiredKitchen = kitchenTypes.includes(property.kitchenType);
      const hasRequiredRoom = roomTypes.some((type) =>
        property.roomTypes.includes(type)
      );
      return hasRequiredBath && hasRequiredKitchen && hasRequiredRoom;
    });
    setResults(filtered.length > 0 ? filtered : mockFilteredResults);
    setStep("results");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Unterkunft finden
            </h1>
            <p className="text-sm text-gray-500">
              Schritt {step === "results" ? "4" : step === "step3" ? "3" : step === "step2" ? "2" : "1"} von 4
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* STEP 1: Location & Time */}
        {step === "step1" && (
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Wo und wann benötigst du Unterkunft?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Location & Radius */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline mr-2" size={18} />
                  Standort
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Stadt eingeben"
                  className="input-field mb-4"
                />
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Umkreis: {radius} km
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={radius}
                    onChange={(e) => setRadius(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 km</span>
                    <span>100 km</span>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline mr-2" size={18} />
                  Start-Datum
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="input-field mb-4"
                />
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline mr-2" size={18} />
                  End-Datum
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setStep("step2")}
                className="btn-primary flex-1 py-3"
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Capacity */}
        {step === "step2" && (
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Wie viele Personen und wie viele Betten?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* People Count */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  <Users className="inline mr-2" size={18} />
                  Anzahl Personen
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      setPeopleCount(Math.max(1, peopleCount - 1))
                    }
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="text-3xl font-bold text-primary-600 w-16 text-center">
                    {peopleCount}
                  </span>
                  <button
                    onClick={() => setPeopleCount(peopleCount + 1)}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Beds Required */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  <Bed className="inline mr-2" size={18} />
                  Anzahl Betten
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      setBedsRequired(Math.max(1, bedsRequired - 1))
                    }
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="text-3xl font-bold text-primary-600 w-16 text-center">
                    {bedsRequired}
                  </span>
                  <button
                    onClick={() => setBedsRequired(bedsRequired + 1)}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setStep("step1")}
                className="btn-secondary flex-1 py-3"
              >
                Zurück
              </button>
              <button
                onClick={() => setStep("step3")}
                className="btn-primary flex-1 py-3"
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Detailed Filters */}
        {step === "step3" && (
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Welche Ausstattung brauchst du?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Room Types */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Zimmertyp</h3>
                <div className="space-y-3">
                  {(["single", "double", "multi"] as RoomType[]).map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={roomTypes.includes(type)}
                        onChange={() => toggleRoomType(type)}
                        className="w-5 h-5 rounded accent-primary-600"
                      />
                      <span className="font-medium text-gray-700">
                        {type === "single"
                          ? "Einzelzimmer"
                          : type === "double"
                            ? "Doppelzimmer"
                            : "Mehrbett"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bath Types */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Bad</h3>
                <div className="space-y-3">
                  {(["private", "shared"] as BathType[]).map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={bathTypes.includes(type)}
                        onChange={() => toggleBathType(type)}
                        className="w-5 h-5 rounded accent-primary-600"
                      />
                      <span className="font-medium text-gray-700">
                        {type === "private" ? "Privates Bad" : "Gemeinschaftsbad"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Kitchen Types */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Küche</h3>
                <div className="space-y-3">
                  {(["private", "shared"] as KitchenType[]).map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={kitchenTypes.includes(type)}
                        onChange={() => toggleKitchenType(type)}
                        className="w-5 h-5 rounded accent-primary-600"
                      />
                      <span className="font-medium text-gray-700">
                        {type === "private"
                          ? "Private Küche"
                          : "Gemeinschaftsküche"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setStep("step2")}
                className="btn-secondary flex-1 py-3"
              >
                Zurück
              </button>
              <button
                onClick={handleFilterAndSearch}
                className="btn-primary flex-1 py-3 flex items-center justify-center gap-2"
              >
                <Search size={20} />
                Suchen
              </button>
            </div>
          </div>
        )}

        {/* RESULTS */}
        {step === "results" && (
          <div>
            <div className="mb-8">
              <button
                onClick={() => setStep("step3")}
                className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
              >
                ← Filter anpassen
              </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {results.length} Angebot{results.length !== 1 ? "e" : ""} gefunden
            </h2>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {results.map((property) => (
                <div key={property.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-r from-primary-600 to-primary-700 h-32 flex items-center justify-center">
                    <Bed className="text-white" size={48} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {property.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      <MapPin className="inline mr-1" size={16} />
                      {property.city}
                    </p>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-700">
                        <strong>{property.rooms}</strong> Zimmer •{" "}
                        <strong>{property.roomTypes.join(", ")}</strong>
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="badge">
                          {property.bathType === "private"
                            ? "Privates Bad"
                            : "Gemeinschaftsbad"}
                        </span>
                        <span className="badge">
                          {property.kitchenType === "private"
                            ? "Private Küche"
                            : "Gemeinschaftsküche"}
                        </span>
                      </div>
                    </div>

                    <div className="border-t pt-4 flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-600">
                        €{property.pricePerNight}
                      </span>
                      <span className="text-sm text-gray-500">/Nacht</span>
                    </div>

                    <button className="btn-primary w-full mt-4">
                      Sofort buchen
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA for no matching offers */}
            <div className="card p-8 bg-gradient-to-r from-blue-50 to-primary-50 border-2 border-primary-200">
              <div className="flex gap-4 items-start">
                <AlertCircle className="text-primary-600 flex-shrink-0 mt-1" size={24} />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    Kein passendes Angebot?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Starte jetzt eine Ausschreibung und lass Vermieter dir ihre
                    besten Angebote senden!
                  </p>
                  <button className="btn-primary inline-flex items-center gap-2">
                    <Plus size={20} />
                    Ausschreibung starten
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
