
export interface RoomType {
  id: string;
  name: string;
  maxAdults: number;
  maxChildren: number;
  description?: string;
  price?: number;
  imageUrl?: string; // Keep for backward compatibility
  images?: string[]; // Add this new field for multiple room images
  seasonalPrices?: {
    id: string;
    seasonName: string;
    startDate: string;
    endDate: string;
    price: number;
  }[];
}

export interface AmenityImage {
  url: string;
  description?: string;
  title?: string;
  caption?: string;
  id?: string; // Add id property for tracking images
  metadata?: {
    title?: string;
    altText?: string;
    caption?: string;
    description?: string;
    [key: string]: any;
  };
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

export interface ContactDetail {
  id: string;
  type: 'phone' | 'fax' | 'whatsapp';
  value: string;
  personName?: string;
  personRole?: string; // New field for person's role in the hotel
  isPrimary?: boolean;
}

export interface SocialMedia {
  id: string;
  platform: 'website' | 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'email' | 'other';
  url: string;
  label?: string;
}

export interface ContractDocument {
  id: string;
  url: string;
  fileName: string;
  uploadedAt: string;
  description?: string;
  startDate?: string; // New field for contract start date
  endDate?: string;   // New field for contract end date
}

export interface GeoLocation {
  lat: number;
  lng: number;
  address?: string;
  formattedAddress?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  enabled: boolean;
}

export interface ExtraBedPolicy {
  pricePerNight: number;
  availableForRoomTypes: string[]; // IDs of room types
  maxExtraBedsPerRoom: number;
  notes?: string;
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
  logoUrl?: string; // New field for custom hotel logo
  contactDetails?: ContactDetail[]; // New field for contact information
  socialMedia?: SocialMedia[]; // New field for social media links
  contractDocuments?: ContractDocument[]; // New field for contract documents
  geolocation?: GeoLocation; // New field for precise location data
  paymentMethods?: PaymentMethod[]; // New field for payment methods
  extraBedPolicy?: ExtraBedPolicy; // New field for extra bed pricing and policy
}

export type HotelFormData = Omit<Hotel, 'id' | 'createdAt' | 'updatedAt'>;
