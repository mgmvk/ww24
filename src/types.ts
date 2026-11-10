// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type RoomType = "single" | "double" | "multi";
export type BathType = "private" | "shared";
export type KitchenType = "private" | "shared";

export interface RoomRequirements {
  types: RoomType[];
  bathType: BathType[];
  kitchenType: KitchenType[];
}

export interface Property {
  id: string;
  name: string;
  city: string;
  country: string;
  rooms: number;
  roomTypes: RoomType[];
  bathType: BathType;
  kitchenType: KitchenType;
  pricePerNight: number;
  available: boolean;
  owner: {
    name: string;
    email: string;
  };
}

export interface DemandRequest {
  id: string;
  projectName: string;
  city: string;
  country: string;
  radiusKm: number;
  startDate: string;
  endDate: string;
  peopleCount: number;
  bedsRequired: number;
  roomRequirements: RoomRequirements;
  createdAt: string;
}

export interface Bid {
  id: string;
  requestId: string;
  propertyId: string;
  offeredPrice: number;
  priceType: "total" | "per_night";
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface SupplyOffer {
  bid: Bid;
  property: Property;
  request: DemandRequest;
  commission: number; // in percent
}
