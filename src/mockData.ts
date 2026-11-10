import { Property, DemandRequest, SupplyOffer } from "./types";

// Mock Properties
export const mockProperties: Property[] = [
  {
    id: "p1",
    name: "Moderne Monteurunterkünfte München",
    city: "München",
    country: "Deutschland",
    rooms: 12,
    roomTypes: ["single", "double"],
    bathType: "private",
    kitchenType: "shared",
    pricePerNight: 85,
    available: true,
    owner: {
      name: "Anna Schmidt",
      email: "anna.schmidt@monteur-homes.de",
    },
  },
  {
    id: "p2",
    name: "Bauleiter-Apartments Stuttgart",
    city: "Stuttgart",
    country: "Deutschland",
    rooms: 8,
    roomTypes: ["single", "double", "multi"],
    bathType: "shared",
    kitchenType: "private",
    pricePerNight: 72,
    available: true,
    owner: {
      name: "Klaus Weber",
      email: "klaus.weber@bauunterkunft.de",
    },
  },
  {
    id: "p3",
    name: "Comfort Housing Frankfurt",
    city: "Frankfurt",
    country: "Deutschland",
    rooms: 15,
    roomTypes: ["single", "double"],
    bathType: "private",
    kitchenType: "private",
    pricePerNight: 95,
    available: true,
    owner: {
      name: "Maria Rossi",
      email: "maria.rossi@comfort-housing.de",
    },
  },
  {
    id: "p4",
    name: "Budget Hostel Berlin",
    city: "Berlin",
    country: "Deutschland",
    rooms: 20,
    roomTypes: ["multi"],
    bathType: "shared",
    kitchenType: "shared",
    pricePerNight: 55,
    available: true,
    owner: {
      name: "Thomas König",
      email: "thomas.koenig@budget-hostel.de",
    },
  },
  {
    id: "p5",
    name: "Premium Monteur Suites Köln",
    city: "Köln",
    country: "Deutschland",
    rooms: 10,
    roomTypes: ["single", "double"],
    bathType: "private",
    kitchenType: "shared",
    pricePerNight: 110,
    available: true,
    owner: {
      name: "Sophie Müller",
      email: "sophie.mueller@premium-suites.de",
    },
  },
];

// Mock Demand Requests
export const mockDemandRequest: DemandRequest = {
  id: "req-001",
  projectName: "Baustelle Olympiastadion München",
  city: "München",
  country: "Deutschland",
  radiusKm: 15,
  startDate: "2026-03-01",
  endDate: "2026-05-31",
  peopleCount: 4,
  bedsRequired: 4,
  roomRequirements: {
    types: ["single"],
    bathType: ["private"],
    kitchenType: ["shared"],
  },
  createdAt: "2026-02-08T10:00:00Z",
};

// Mock Supply Offers for the landlord dashboard
export const mockSupplyOffers: SupplyOffer[] = [
  {
    bid: {
      id: "bid-001",
      requestId: "req-001",
      propertyId: "p1",
      offeredPrice: 340,
      priceType: "per_night",
      status: "pending",
      createdAt: "2026-02-08T11:00:00Z",
    },
    property: mockProperties[0],
    request: mockDemandRequest,
    commission: 10,
  },
];

// Mock filtered results for demand-side search
export const mockFilteredResults: Property[] = [
  mockProperties[0],
  mockProperties[2],
  mockProperties[4],
];

// Function to calculate net payout for a bid
export const calculateNetPayout = (
  offeredPrice: number,
  commissionPercent: number
): number => {
  const commission = offeredPrice * (commissionPercent / 100);
  return offeredPrice - commission;
};

// Function to filter properties based on demand
export const filterPropertiesByDemand = (
  properties: Property[],
  demand: DemandRequest
): Property[] => {
  return properties.filter((property) => {
    const hasSufficientRooms =
      property.rooms * 2 >= demand.bedsRequired; // rough estimate
    const hasRequiredRoomTypes = demand.roomRequirements.types.some((type) =>
      property.roomTypes.includes(type)
    );
    const hasRequiredBath =
      demand.roomRequirements.bathType.includes(property.bathType);
    const hasRequiredKitchen =
      demand.roomRequirements.kitchenType.includes(property.kitchenType);

    return (
      property.available &&
      hasSufficientRooms &&
      hasRequiredRoomTypes &&
      hasRequiredBath &&
      hasRequiredKitchen
    );
  });
};
