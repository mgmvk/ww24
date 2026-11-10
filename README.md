# WohnWerk24 - MVP Frontend Click Dummy

Ein High-Fidelity Click Dummy (MVP Frontend) für die B2B-Plattform **WohnWerk24** zur Vermittlung von Monteurunterkünften.

## Übersicht

WohnWerk24 ist ein innovativer B2B-Marktplatz mit hybrider Funktionalität:
- **Demand-Side**: Bauleiter & Projektmanager suchen schnell nach Unterkunft
- **Supply-Side**: Vermieter erhalten Anfragen und können direkt bieten
- **Hybrid-Modell**: Kombination aus "Sofort-Buchung" und "ReverseAuction" (Ausschreibung)

## Features

### 1. **Landing Page** (`LandingPage.tsx`)
- Hero-Section mit Value Proposition
- Zwei klare Einstiege (Demand vs. Supply)
- Trust-Elemente (Zertifizierungen, Partner-Logos)

### 2. **Demand-Side: Such-Interface** (`DemandSide.tsx`)
- **Step 1**: Geolocation (Stadt), Radius, Zeitraum
- **Step 2**: Kapazität (Personen, Betten)
- **Step 3**: Detaillierte Filter
  - Zimmertyp (Einzelzimmer, Doppelzimmer, Mehrbett)
  - Bad (Privat, Gemeinschaftlich)
  - Küche (Privat, Gemeinschaftlich)
- **Results**: Gefilterte Listenansicht mit CTA "Ausschreibung starten"

### 3. **Supply-Side: Bid Dashboard** (`SupplyDashboard.tsx`)
- Anfrage-Karte mit allen Anfrage-Details
- **Provisions-Rechner** (WICHTIGSTE FEATURE)
  - Echtzeit-Berechnung des Netto-Erlös
  - Display: Angebotspreis → -Commission → Auszahlungsbetrag
  - Preis-Modelle: "pro Nacht" oder "Gesamtpreis"
- "Verbindliches Angebot senden" Button
- Treuhand-Sicherheit Badge

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Installation & Setup

### 1. Abhängigkeiten installieren
```bash
npm install
```

### 2. Entwicklungsserver starten
```bash
npm run dev
```
Die App öffnet sich unter `http://localhost:5173`

### 3. Build für Production
```bash
npm run build
```

## Projektstruktur

```
src/
├── main.tsx              # React Entry Point
├── App.tsx               # Haupt-App mit View-Routing
├── index.css             # Tailwind & Custom Styles
├── types.ts              # TypeScript Interfaces & Types
├── mockData.ts           # Mock-Daten für Demo
└── components/
    ├── LandingPage.tsx   # View 1: Landing Page
    ├── DemandSide.tsx    # View 2: Such-Interface
    └── SupplyDashboard.tsx # View 3: Bid Dashboard
```

## Mock Data

Die App nutzt fest codierte Mock-Daten (`mockData.ts`):

### Properties
- 5 vordefinierte Unterkünfte mit verschiedenen Ausstattungen
- Realistische Preise und Standorte

### Demand Requests
- 1 Example-Anfrage vom Bauleiter (München, 4 Personen)

### Filtering & Search
- Intelligente Filter-Logik basierend auf Raumtyp, Bad, Küche
- `calculateNetPayout()`: Berechnet den Netto-Erlös nach Provision

## Wichtigste Funktionalitäten

### Provisions-Rechner
```typescript
// In SupplyDashboard.tsx
const netPayout = calculateNetPayout(offerPrice, commission);
// Beispiel: 1000€ Angebot - 10% Commission = 900€ Auszahlungsbetrag
```

### Filter-Logik
```typescript
// In mockData.ts
filterPropertiesByDemand(properties, demandRequest): Property[]
```

### View-Navigation
```typescript
// In App.tsx
- "landing" → LandingPage
- "demand" → DemandSide (Such-Interface)
- "supply" → SupplyDashboard (Bid Dashboard)
```

## User Journeys

### Journey 1: Bauleiter sucht Unterkunft
1. Landing Page → "Ich suche Unterkunft"
2. Step 1: Ort + Zeitraum eingeben
3. Step 2: Kapazität (Personen/Betten)
4. Step 3: Filter (Zimmer/Bad/Küche)
5. Results: Gefilterte Angebote + CTA für Ausschreibung

### Journey 2: Vermieter antwortet auf Anfrage
1. Landing Page → "Ich bin Vermieter"
2. Anfrage-Card anzeigen
3. Preis eingeben
4. Provisions-Rechner zeigt Netto-Erlös
5. "Angebot senden"

## Erweiterungsmöglichkeiten

- [ ] Backend-Integration (REST/GraphQL)
- [ ] User Authentication & Profil-Management
- [ ] Echte Google Maps Integration
- [ ] Chat/Messaging zwischen Nutzern
- [ ] Zahlungs-Gateway Integration
- [ ] Review- & Rating-System
- [ ] Admin-Dashboard

## Browser-Kompatibilität

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)

## Lizenz

© 2026 WohnWerk24 GmbH

---

**Viel Spaß mit der Demo!** 🚀
