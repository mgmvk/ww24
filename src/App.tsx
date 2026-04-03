import DemandSearchView from "./components/DemandSearchView";
import LandingPage from "./components/LandingPage";
import SupplyDashboardView from "./components/SupplyDashboardView";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12">
        <LandingPage />

        <section className="grid gap-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-200">User Journey</p>
          <h2 className="text-3xl font-semibold text-white">Von der Suche bis zum Angebot</h2>
          <p className="text-sm text-slate-400">
            Click-Dummy für Investoren – fokussiert auf UX, UI-Flow und den Kern-Workflow der Plattform.
          </p>
        </section>

        <DemandSearchView />
        <SupplyDashboardView />
      </div>
    </div>
  );
}
