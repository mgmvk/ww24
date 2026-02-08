export type RoomType = "Einzelzimmer" | "Doppelzimmer" | "Mehrbett";
export type BathroomType = "Privates Bad" | "Gemeinschaftsbad";
export type KitchenType = "Private Küche" | "Gemeinschaftsküche";

export interface Request {
  id: string;
  title: string;
  location: string;
  radiusKm: number;
  startDate: string;
  endDate: string;
  bedsNeeded: number;
  roomType: RoomType;
  bathroom: BathroomType;
  kitchen: KitchenType;
  notes: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  roomType: RoomType;
  bathroom: BathroomType;
  kitchen: KitchenType;
  bedsAvailable: number;
  rating: number;
  tags: string[];
}

export interface Offer {
  id: string;
  propertyId: string;
  pricePerNight: number;
  totalPrice: number;
  availability: string;
  instantBook: boolean;
  highlights: string[];
}

export const demandRequest: Request = {
  id: "req-1001",
  title: "Bauprojekt München",
  location: "München, Bayern",
  radiusKm: 25,
  startDate: "01.11.2024",
  endDate: "31.01.2025",
  bedsNeeded: 4,
  roomType: "Einzelzimmer",
  bathroom: "Privates Bad",
  kitchen: "Gemeinschaftsküche",
  notes: "Anreise Montag, wöchentliche Abrechnung, Parkplatz erforderlich.",
};

export const properties: Property[] = [
  {
    id: "prop-1",
    name: "Boardinghouse Isar",
    location: "München Zentrum",
    distanceKm: 8,
    roomType: "Einzelzimmer",
    bathroom: "Privates Bad",
    kitchen: "Gemeinschaftsküche",
    bedsAvailable: 6,
    rating: 4.8,
    tags: ["Parkplatz", "Self-Check-in", "WLAN"],
  },
  {
    id: "prop-2",
    name: "Bauhof Lodges",
    location: "Freising",
    distanceKm: 22,
    roomType: "Doppelzimmer",
    bathroom: "Gemeinschaftsbad",
    kitchen: "Gemeinschaftsküche",
    bedsAvailable: 8,
    rating: 4.5,
    tags: ["Frühstück", "Waschraum", "Werkzeuglager"],
  },
  {
    id: "prop-3",
    name: "CityCrew Apartments",
    location: "Garching",
    distanceKm: 15,
    roomType: "Mehrbett",
    bathroom: "Privates Bad",
    kitchen: "Private Küche",
    bedsAvailable: 10,
    rating: 4.2,
    tags: ["Klimaanlage", "Kantine", "24/7 Support"],
  },
];

export const offers: Offer[] = [
  {
    id: "offer-1",
    propertyId: "prop-1",
    pricePerNight: 38,
    totalPrice: 13870,
    availability: "Sofort verfügbar",
    instantBook: true,
    highlights: ["Flexibel stornierbar", "Zentrale Lage"],
  },
  {
    id: "offer-2",
    propertyId: "prop-2",
    pricePerNight: 29,
    totalPrice: 10580,
    availability: "Verfügbar ab 15.11.",
    instantBook: false,
    highlights: ["Langzeit-Discount", "Shuttle Service"],
  },
  {
    id: "offer-3",
    propertyId: "prop-3",
    pricePerNight: 32,
    totalPrice: 11640,
    availability: "Sofort verfügbar",
    instantBook: true,
    highlights: ["Teamsuite", "Volle Küche"],
  },
];
