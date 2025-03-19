
export interface RoomType {
  id: string;
  name: string;
  maxAdults: number;
  maxChildren: number;
  description?: string;
  price?: number;
}

export interface HotelAmenities {
  airConditioning: boolean;
  bar: boolean;
  gym: boolean;
  parking: boolean;
  spa: boolean;
  restaurant: boolean;
  breakfast: boolean;
  wifi: boolean;
  swimmingPool: boolean;
  petsAllowed: boolean;
  extraBed: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  country: string;
  governorate: string;
  streetAddress: string;
  posKey: string; // POS key
  amenities: HotelAmenities;
  roomTypes: RoomType[];
  rating: number; // Star rating (0-5) - Changed from optional to required
  createdAt: Date;
  updatedAt: Date;
}

export type HotelFormData = Omit<Hotel, 'id' | 'createdAt' | 'updatedAt'>;
