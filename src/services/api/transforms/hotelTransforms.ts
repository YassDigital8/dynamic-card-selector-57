
import { Hotel, HotelFormData, ContactDetail, SocialMedia, RoomType } from '@/models/HotelModel';

/**
 * Transform API response to match our Hotel model
 */
export const transformApiResponseToHotel = (apiHotel: any): Hotel => {
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
      breakfast: apiHotel.hasBreakfast || false,
      wifi: apiHotel.hasWifi || false,
      swimmingPool: apiHotel.hasPool || false,
      petsAllowed: apiHotel.arePetsAllowed || false,
      shuttleBus: apiHotel.hasShuttle || false,
      extraBed: apiHotel.hasExtraBed || false,
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
    extraBedPolicy: apiHotel.hasExtraBed && apiHotel.extraBedPrice ? {
      pricePerNight: apiHotel.extraBedPrice,
      availableForRoomTypes: [],
      maxExtraBedsPerRoom: 1
    } : undefined
  };
};

/**
 * Transform contact details for API request
 */
export const transformContactDetails = (
  hotelContacts: ContactDetail[] = [], 
  socialMedia: SocialMedia[] = []
): any[] => {
  // Transform standard contact information
  const contactInfo = hotelContacts.map((contact, index) => {
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
      displayLabel: contact.isPrimary ? 'Primary Contact' : `Contact ${index + 1}`
    };
    
    // Set the appropriate field based on contact type
    if (contact.type === 'phone' || contact.type === 'whatsapp' || contact.type === 'fax') {
      contactInfo.phoneNumber = contact.value;
    }
    
    return contactInfo;
  });
  
  // Add social media as contacts
  const socialContacts = socialMedia.map((social, index) => {
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
  
  // Combine both contact types
  return [...contactInfo, ...socialContacts];
};

/**
 * Transform room types for API request
 */
export const transformRoomTypes = (roomTypes: RoomType[] = []): any[] => {
  return roomTypes.map(room => ({
    hotelId: 1, // This will be assigned by the server
    roomTypeName: room.name,
    description: room.description || '',
    numberOfAdults: room.maxAdults || 2,
    numberOfChildren: room.maxChildren || 0,
    price: room.price || 0
  }));
};

/**
 * Transform our hotel model to match API expectations
 */
export const transformHotelToApiRequest = (hotel: HotelFormData): any => {
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
    contactInfo: transformContactDetails(hotel.contactDetails, hotel.socialMedia),
    rooms: transformRoomTypes(hotel.roomTypes)
  };
  
  console.log('Transformed hotel data:', hotelRequest);
  
  return hotelRequest;
};
