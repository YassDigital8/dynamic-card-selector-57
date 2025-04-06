
import { Hotel } from '@/models/HotelModel';
import { asiaHotels } from './regions/asiaHotels';
import { europeHotels } from './regions/europeHotels';
import { oceaniaHotels } from './regions/oceaniaHotels';

// Create a middleEastHotels array (since it's being imported but doesn't exist)
export const middleEastHotels: Hotel[] = [
  {
    id: '5',
    name: 'Burj Al Arab',
    country: 'United Arab Emirates',
    governorate: 'Dubai',
    streetAddress: '1 Jumeirah Beach Road',
    posKey: 'AE',
    rating: 5,
    amenities: {
      airConditioning: true,
      bar: true,
      gym: true,
      parking: true,
      spa: true,
      restaurant: true,
      breakfast: true,
      wifi: true,
      swimmingPool: true,
      petsAllowed: false,
      extraBed: true,
      shuttleBus: true
    },
    roomTypes: [
      {
        id: '1',
        name: 'Deluxe Suite',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Luxurious suite with ocean view',
        price: 1500
      },
      {
        id: '2',
        name: 'Royal Suite',
        maxAdults: 4,
        maxChildren: 2,
        description: 'Ultimate luxury with panoramic views',
        price: 5000
      }
    ],
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-06-20')
  }
];

// Create an americasHotels array (since it's being imported but doesn't exist)
export const americasHotels: Hotel[] = [
  {
    id: '7',
    name: 'The Plaza',
    country: 'United States',
    governorate: 'New York',
    streetAddress: '768 Fifth Avenue',
    posKey: 'US',
    rating: 5,
    amenities: {
      airConditioning: true,
      bar: true,
      gym: true,
      parking: true,
      spa: true,
      restaurant: true,
      breakfast: true,
      wifi: true,
      swimmingPool: false,
      petsAllowed: true,
      extraBed: true,
      shuttleBus: true
    },
    roomTypes: [
      {
        id: '1',
        name: 'Edwardian Suite',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Classic suite with Central Park views',
        price: 750
      },
      {
        id: '2',
        name: 'Royal Plaza Suite',
        maxAdults: 4,
        maxChildren: 2,
        description: 'Luxurious suite with butler service',
        price: 2500
      }
    ],
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-07-10')
  }
];

// Combine all regional hotel collections into a single array
export const defaultHotels: Hotel[] = [
  ...middleEastHotels,
  ...europeHotels,
  ...americasHotels,
  ...asiaHotels,
  ...oceaniaHotels
];

// Export regional collections for specific use cases
export {
  asiaHotels,
  europeHotels,
  americasHotels,
  middleEastHotels,
  oceaniaHotels
};

// Filter helpers
export const getHotelsByRegion = (region: 'asia' | 'europe' | 'americas' | 'middleEast' | 'oceania'): Hotel[] => {
  switch (region) {
    case 'asia':
      return asiaHotels;
    case 'europe':
      return europeHotels;
    case 'americas':
      return americasHotels;
    case 'middleEast':
      return middleEastHotels;
    case 'oceania':
      return oceaniaHotels;
    default:
      return [];
  }
};

export const getHotelsByCountry = (country: string): Hotel[] => {
  return defaultHotels.filter(hotel => hotel.country === country);
};

export const getHotelsByRating = (minRating: number): Hotel[] => {
  return defaultHotels.filter(hotel => hotel.rating >= minRating);
};

// Export specific hotels by ID for testing
export const getHotelById = (id: string): Hotel | undefined => {
  return defaultHotels.find(hotel => hotel.id === id);
};
