import React, { useState } from "react";
import {
  Building2,
  MapPin,
  Users,
  Calendar,
  EuroIcon,
  TrendingUp,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Send,
} from "lucide-react";
import { mockSupplyOffers, calculateNetPayout } from "../mockData";
import { SupplyOffer } from "../types";

interface SupplyDashboardProps {
  onBack: () => void;
}

export const SupplyDashboard: React.FC<SupplyDashboardProps> = ({ onBack }) => {
  const [selectedOffer, setSelectedOffer] = useState<SupplyOffer | null>(
    mockSupplyOffers[0]
  );
  const [offerPrice, setOfferPrice] = useState<number>(3400); // 100€ per night * 34 nights (approx)
  const [priceType, setPriceType] = useState<"total" | "per_night">("per_night");
  const [bidSent, setBidSent] = useState(false);
  const [bidPrice, setBidPrice] = useState<number>(0);

  if (!selectedOffer) return null;

  const commission = selectedOffer.commission;
  const netPayout = calculateNetPayout(offerPrice, commission);
  const commissionAmount = offerPrice - netPayout;

  // Calculate night count for reference
  const startDate = new Date(selectedOffer.request.startDate);
  const endDate = new Date(selectedOffer.request.endDate);
  const nightCount = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const totalPrice =
    priceType === "per_night" ? offerPrice * nightCount : offerPrice;
  const totalNetPayout =
    priceType === "per_night"
      ? calculateNetPayout(offerPrice * nightCount, commission)
      : calculateNetPayout(offerPrice, commission);

  const handleSendBid = () => {
    setBidPrice(offerPrice);
    setBidSent(true);
    // In a real app, this would send to backend
    setTimeout(() => setBidSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
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
              Anfrage-Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Eingehende Anfrage • Neue Bidding-Möglichkeit
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Request Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* REQUEST CARD */}
            <div className="card p-8 border-2 border-primary-200 bg-primary-50">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary-600 rounded-lg">
                  <Building2 className="text-white" size={32} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedOffer.request.projectName}
                  </h2>
                  <p className="text-gray-600">
                    {selectedOffer.request.city}, {selectedOffer.request.country}
                  </p>
                </div>
              </div>

              {/* Request Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Personen</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {selectedOffer.request.peopleCount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Betten</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {selectedOffer.request.bedsRequired}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">
                    <Calendar size={16} className="inline mr-1" />
                    Dauer
                  </p>
                  <p className="text-2xl font-bold text-primary-600">
                    {nightCount} Nächte
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Radius</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {selectedOffer.request.radiusKm} km
                  </p>
                </div>
              </div>

              {/* Required Attributes */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Geforderte Ausstattung:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedOffer.request.roomRequirements.types.map((type) => (
                    <span key={type} className="badge bg-primary-200 text-primary-900">
                      {type === "single"
                        ? "Einzelzimmer"
                        : type === "double"
                          ? "Doppelzimmer"
                          : "Mehrbett"}
                    </span>
                  ))}
                  {selectedOffer.request.roomRequirements.bathType.map((type) => (
                    <span key={`bath-${type}`} className="badge bg-blue-200 text-blue-900">
                      {type === "private" ? "Privates Bad" : "Gemeinschaftsbad"}
                    </span>
                  ))}
                  {selectedOffer.request.roomRequirements.kitchenType.map(
                    (type) => (
                      <span
                        key={`kitchen-${type}`}
                        className="badge bg-green-200 text-green-900"
                      >
                        {type === "private"
                          ? "Private Küche"
                          : "Gemeinschaftsküche"}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* INFO BOX: Your Property Matching */}
            <div className="card p-6 border-l-4 border-success-600 bg-green-50">
              <div className="flex gap-3">
                <CheckCircle2 className="text-success-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">
                    Deine Unterkunft erfüllt alle Anforderungen!
                  </h4>
                  <p className="text-sm text-gray-700 mt-1">
                    {selectedOffer.property.name} passt perfekt zu dieser Anfrage.
                  </p>
                </div>
              </div>
            </div>

            {/* BID INPUT SECTION */}
            <div className="card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Dein verbindliches Angebot
              </h3>

              <div className="space-y-6">
                {/* Price Type Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Preismodell
                  </label>
                  <div className="flex gap-4">
                    {["per_night", "total"].map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="priceType"
                          value={type}
                          checked={priceType === type}
                          onChange={(e) =>
                            setPriceType(e.target.value as "total" | "per_night")
                          }
                          className="w-4 h-4 accent-primary-600"
                        />
                        <span className="font-medium text-gray-700">
                          {type === "per_night" ? "€ pro Nacht" : "€ Gesamtpreis"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Angebotspreis ({priceType === "per_night" ? "pro Nacht" : "Gesamtpreis"})
                  </label>
                  <div className="relative">
                    <EuroIcon
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={20}
                    />
                    <input
                      type="number"
                      value={offerPrice}
                      onChange={(e) =>
                        setOfferPrice(Math.max(0, parseInt(e.target.value) || 0))
                      }
                      className="input-field pl-10"
                      placeholder="0"
                    />
                  </div>
                  {priceType === "per_night" && (
                    <p className="text-xs text-gray-500 mt-2">
                      × {nightCount} Nächte = €
                      {(offerPrice * nightCount).toLocaleString("de-DE")}
                      &#32;Gesamtpreis
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Fee Calculator */}
          <div className="lg:col-span-1">
            {/* CALCULATOR CARD */}
            <div className="card p-8 sticky top-24 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <TrendingUp className="text-primary-600" size={24} />
                Provisions-Rechner
              </h3>
              <p className="text-sm text-gray-600 mb-6 pb-6 border-b">
                Sieh deinen Netto-Erlös in Echtzeit
              </p>

              {/* Calculation Details */}
              <div className="space-y-4 mb-6 pb-6 border-b">
                {/* Offered Price */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">
                    {priceType === "per_night"
                      ? `Angebotspreis (×${nightCount})`
                      : "Angebotspreis"}
                  </span>
                  <span className="font-semibold text-gray-900">
                    €{totalPrice.toLocaleString("de-DE")}
                  </span>
                </div>

                {/* Commission */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">
                    Servicegebühr WW24{" "}
                    <span className="text-xs text-gray-500">({commission}%)</span>
                  </span>
                  <span className="font-semibold text-red-600">
                    -€{Math.floor(commissionAmount * (priceType === "per_night" ? nightCount : 1)).toLocaleString("de-DE")}
                  </span>
                </div>
              </div>

              {/* Net Payout - HIGHLIGHTED */}
              <div className="bg-gradient-to-r from-success-600 to-green-500 rounded-lg p-4 mb-6 text-white">
                <p className="text-sm font-semibold opacity-90 mb-1">
                  Dein Auszahlungsbetrag
                </p>
                <p className="text-3xl font-bold">
                  €{Math.floor(totalNetPayout).toLocaleString("de-DE")}
                </p>
                <p className="text-xs opacity-75 mt-2">
                  Netto nach Provision
                </p>
              </div>

              {/* Fee Breakdown Info */}
              <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mb-6">
                <p className="text-xs text-blue-900 font-semibold mb-1">
                  ℹ️ Wie funktioniert's?
                </p>
                <p className="text-xs text-blue-800">
                  WohnWerk24 behält {commission}% als Servicegebühr für Vermittlung,
                  Zahlungsabwicklung & Treuhand-Sicherheit.
                </p>
              </div>

              {/* Send Bid Button */}
              <button
                onClick={handleSendBid}
                className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  bidSent
                    ? "btn-primary bg-success-600 hover:bg-success-700"
                    : "btn-primary"
                }`}
              >
                {bidSent ? (
                  <>
                    <CheckCircle2 size={20} />
                    Angebot gesendet!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Angebot senden
                  </>
                )}
              </button>

              {/* Trust Badge */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span>Treuhand-abgesichert</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 card p-6 text-sm text-gray-600">
              <AlertCircle size={16} className="inline mr-2 text-primary-600" />
              <p>
                Nach Angebotssendung können Bauleiter dein Angebot akzeptieren
                oder ablehnen.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
