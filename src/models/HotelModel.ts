
export interface RoomType {
  id: string;
  name: string;
  maxAdults: number;
  maxChildren: number;
  description?: string;
  price?: number;
  imageUrl?: string; // Keep for backward compatibility
  images?: string[]; // Add this new field for multiple room images
}

export interface AmenityImage {
  url: string;
  description?: string;
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
  // Add image fields for the specified amenities
  barImages?: AmenityImage[];
  gymImages?: AmenityImage[];
  spaImages?: AmenityImage[];
  restaurantImages?: AmenityImage[];
  breakfastImages?: AmenityImage[];
  swimmingPoolImages?: AmenityImage[];
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
