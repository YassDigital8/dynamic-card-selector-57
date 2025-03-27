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
    
    console.log('Sending hotel data to API:', apiHotel);
    
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
  // Start with standard hotel properties
  const hotelRequest = {
    name: hotel.name,
    pos: hotel.posKey,
    country: hotel.country,
    governate: hotel.governorate,
    streetAddress: hotel.streetAddress,
    url: hotel.socialMedia?.find(social => social.platform === 'website')?.url || '',
    logoUrl: hotel.logoUrl || '',
    status: 'open', // Default status
    rank: hotel.rating,
    
    // Amenities
    hasAirConditioning: hotel.amenities.airConditioning,
    hasBar: hotel.amenities.bar,
    hasGym: hotel.amenities.gym,
    hasParking: hotel.amenities.parking,
    hasPool: hotel.amenities.swimmingPool,
    hasRestaurant: hotel.amenities.restaurant,
    hasWifi: hotel.amenities.wifi,
    hasSPA: hotel.amenities.spa,
    arePetsAllowed: hotel.amenities.petsAllowed,
    hasShuttle: hotel.amenities.shuttleBus,
    hasBreakfast: hotel.amenities.breakfast,
    hasExtraBed: hotel.amenities.extraBed,
    extraBedPrice: hotel.extraBedPolicy?.pricePerNight || 0,
    
    // Default payment methods (can be updated when we have actual payment data)
    cash: true,
    creditCard: true,
    debitCard: true,
    bankTransfer: true,
    payPal: false,
    mobilePayment: false,
    cryptoCurrency: false,
    
    // Bank account details - empty for now
    accountName: '',
    accountNumber: '',
    bankName: '',
    branchName: '',
    swiftCode: '',
    iban: '',
    
    // Additional info
    additionalInfo: '',
    
    // Initialize empty arrays for gallery, contact info, and rooms
    hotelGallery: [],
    contactInfo: [],
    rooms: []
  };
  
  // Add contact information if available
  if (hotel.contactDetails && hotel.contactDetails.length > 0) {
    hotelRequest.contactInfo = hotel.contactDetails.map((contact, index) => {
      // Create a base contact info object
      const contactInfo: any = {
        hotelId: 1, // This will be assigned by the server
        category: 'contact',
        contactType: contact.type,
        isPrimary: index === 0, // First contact is primary
        phoneNumber: '',
        email: '',
        url: '',
        responsiblePerson: contact.personName || '',
        responsiblePersonRole: contact.personRole || '',
        displayLabel: `Contact ${index + 1}`
      };
      
      // Set the appropriate field based on contact type
      if (contact.type === 'phone' || contact.type === 'whatsapp') {
        contactInfo.phoneNumber = contact.value;
      } else if (contact.type === 'fax') {
        contactInfo.phoneNumber = contact.value; // Using phoneNumber for fax as well
      }
      
      return contactInfo;
    });
  }
  
  // Add social media as contacts if available
  if (hotel.socialMedia && hotel.socialMedia.length > 0) {
    const socialContacts = hotel.socialMedia.map((social, index) => {
      const contactInfo: any = {
        hotelId: 1,
        category: 'socialMedia',
        contactType: social.platform,
        isPrimary: false,
        phoneNumber: '',
        email: '',
        url: '',
        responsiblePerson: '',
        responsiblePersonRole: '',
        displayLabel: social.label || `${social.platform} ${index + 1}`
      };
      
      // Set the appropriate field based on platform
      if (social.platform === 'email') {
        contactInfo.email = social.url;
      } else {
        contactInfo.url = social.url;
      }
      
      return contactInfo;
    });
    
    // Add social media contacts to contactInfo array
    hotelRequest.contactInfo = [...hotelRequest.contactInfo, ...socialContacts];
  }
  
  // Add room types if available
  if (hotel.roomTypes && hotel.roomTypes.length > 0) {
    hotelRequest.rooms = hotel.roomTypes.map(room => ({
      hotelId: 1, // This will be assigned by the server
      category: 'single', // Default to single since our model doesn't have category
      roomTypeName: room.name,
      description: room.description || '',
      numberOfAdults: room.maxAdults || 2,
      numberOfChildren: room.maxChildren || 0,
      price: room.price || 0
    }));
  }
  
  console.log('Transformed hotel data:', hotelRequest);
  
  return hotelRequest;
};
