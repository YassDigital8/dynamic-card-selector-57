
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { toast } from '@/hooks/use-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://staging.sa3d.online:7183';

/**
 * Fetch all hotels from the API
 */
export const fetchHotels = async (): Promise<Hotel[]> => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    const response = await fetch(`${API_BASE_URL}/Hotel`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Failed to fetch hotels: ${response.status}`);
    }
    
    const hotels = await response.json();
    
    // Transform API response to match our Hotel model
    return hotels.map((hotel: any) => transformApiResponseToHotel(hotel));
  } catch (error) {
    console.error('Error fetching hotels:', error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to fetch hotels",
      variant: "destructive",
    });
    return [];
  }
};

/**
 * Transform API response to match our Hotel model
 */
const transformApiResponseToHotel = (apiHotel: any): Hotel => {
  return {
    id: apiHotel.code || apiHotel.id?.toString(),
    name: apiHotel.name || '',
    country: apiHotel.country || '',
    governorate: apiHotel.governate || '',
    streetAddress: apiHotel.streetAddress || '',
    posKey: apiHotel.pos || '',
    rating: apiHotel.rank || 0,
    logoUrl: apiHotel.logoUrl,
    amenities: {
      airConditioning: apiHotel.hasAirConditioning || false,
      bar: apiHotel.hasBar || false,
      gym: apiHotel.hasGym || false,
      parking: apiHotel.hasParking || false,
      spa: apiHotel.hasSPA || false,
      restaurant: apiHotel.hasRestaurant || false,
      breakfast: false, // Not in API
      wifi: apiHotel.hasWifi || false,
      swimmingPool: apiHotel.hasPool || false,
      petsAllowed: apiHotel.arePetsAllowed || false,
      shuttleBus: false, // Not in API
      extraBed: false, // Not in API
    },
    roomTypes: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    contactDetails: [],
    socialMedia: [{
      id: '1',
      platform: 'website',
      url: apiHotel.url || '',
    }],
  };
};

/**
 * Create a new hotel
 */
export const createHotel = async (hotelData: HotelFormData): Promise<Hotel | null> => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    // Transform our hotel model to match API expectations
    const apiHotel = transformHotelToApiRequest(hotelData);
    
    const response = await fetch(`${API_BASE_URL}/Hotel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(apiHotel)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Failed to create hotel: ${response.status}`);
    }
    
    const hotel = await response.json();
    return transformApiResponseToHotel(hotel);
  } catch (error) {
    console.error('Error creating hotel:', error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to create hotel",
      variant: "destructive",
    });
    return null;
  }
};

/**
 * Update an existing hotel
 */
export const updateHotel = async (id: string, hotelData: HotelFormData): Promise<Hotel | null> => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    // Transform our hotel model to match API expectations
    const apiHotel = transformHotelToApiRequest(hotelData);
    
    const response = await fetch(`${API_BASE_URL}/Hotel/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(apiHotel)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Failed to update hotel: ${response.status}`);
    }
    
    const hotel = await response.json();
    return transformApiResponseToHotel(hotel);
  } catch (error) {
    console.error('Error updating hotel:', error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to update hotel",
      variant: "destructive",
    });
    return null;
  }
};

/**
 * Delete a hotel
 */
export const deleteHotel = async (id: string): Promise<boolean> => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    const response = await fetch(`${API_BASE_URL}/Hotel/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Failed to delete hotel: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting hotel:', error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to delete hotel",
      variant: "destructive",
    });
    return false;
  }
};

/**
 * Transform our hotel model to match API expectations
 */
const transformHotelToApiRequest = (hotel: HotelFormData): any => {
  return {
    name: hotel.name,
    country: hotel.country,
    pos: hotel.posKey,
    governate: hotel.governorate,
    url: hotel.socialMedia?.find(social => social.platform === 'website')?.url || '',
    logoUrl: hotel.logoUrl || '',
    streetAddress: hotel.streetAddress,
    rank: hotel.rating,
    hasAirConditioning: hotel.amenities.airConditioning,
    hasBar: hotel.amenities.bar,
    hasGym: hotel.amenities.gym,
    hasParking: hotel.amenities.parking,
    hasPool: hotel.amenities.swimmingPool,
    hasRestaurant: hotel.amenities.restaurant,
    hasWifi: hotel.amenities.wifi,
    hasSPA: hotel.amenities.spa,
    arePetsAllowed: hotel.amenities.petsAllowed,
  };
};
