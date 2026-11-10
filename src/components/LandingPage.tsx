import React from "react";
import { Building2, Users, Shield, ArrowRight } from "lucide-react";

interface LandingPageProps {
  onNavigate: (view: "landing" | "demand" | "supply") => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="text-primary-600" size={32} />
            <h1 className="text-2xl font-bold text-primary-900">WohnWerk24</h1>
          </div>
          <p className="text-gray-600 text-sm hidden md:block">
            Das Betriebssystem für den B2B-Wohnmarkt
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-primary-900 mb-6 leading-tight">
            Das Betriebssystem für den B2B-Wohnmarkt
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Sichere und standardisierte Monteurunterkünfte – direkt buchbar oder
            per Ausschreibung
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
            <button
              onClick={() => onNavigate("demand")}
              className="btn-primary text-lg px-8 py-4 flex items-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all"
            >
              <Users size={24} />
              Ich suche Unterkunft
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => onNavigate("supply")}
              className="btn-secondary text-lg px-8 py-4 flex items-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all"
            >
              <Building2 size={24} />
              Ich bin Vermieter
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Trust Section */}
        <div className="bg-white rounded-xl shadow-md p-12 mb-16">
          <h3 className="text-center text-2xl font-bold text-gray-900 mb-12">
            Warum WohnWerk24?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Shield className="text-primary-600" size={32} />
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">
                Treuhand-gesichert
              </h4>
              <p className="text-gray-600">
                Alle Transaktionen sind durch Treuhand-Sicherheit geschützt
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-success-600 bg-opacity-20 rounded-full mb-4">
                <Building2 className="text-success-600" size={32} />
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">
                Standardisiert & Verifiziert
              </h4>
              <p className="text-gray-600">
                Alle Unterkünfte erfüllen B2B-Standards und wurden verifiziert
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Users className="text-blue-600" size={32} />
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">
                Für Profis
              </h4>
              <p className="text-gray-600">
                Speziell für Baumeister, Projektmanager und Bauleiter
              </p>
            </div>
          </div>
        </div>

        {/* Partner Logos Section */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl p-12 text-center">
          <h4 className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-8">
            Vertraut von führenden Bauunternehmen
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              "BAUKONZERN AG",
              "Hochbau GmbH",
              "Tiefbau Pro",
              "Sanierung & Co.",
            ].map((partner, i) => (
              <div
                key={i}
                className="px-6 py-3 bg-white rounded-lg border border-gray-300 font-semibold text-gray-600"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            © 2026 WohnWerk24 GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition">
              Impressum
            </a>
            <a href="#" className="hover:text-white transition">
              Datenschutz
            </a>
            <a href="#" className="hover:text-white transition">
              AGB
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
