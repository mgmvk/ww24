import React, { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { DemandSide } from "./components/DemandSide";
import { SupplyDashboard } from "./components/SupplyDashboard";

type AppView = "landing" | "demand" | "supply";

function App() {
  const [currentView, setCurrentView] = useState<AppView>("landing");

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
  };

  const handleBack = () => {
    setCurrentView("landing");
  };

  return (
    <div className="min-h-screen bg-white">
      {currentView === "landing" && (
        <LandingPage onNavigate={handleNavigate} />
      )}
      {currentView === "demand" && <DemandSide onBack={handleBack} />}
      {currentView === "supply" && <SupplyDashboard onBack={handleBack} />}
    </div>
  );
}

export default App;
