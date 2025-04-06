
import { Hotel } from '@/models/HotelModel';
import { 
  asiaHotels,
  europeHotels,
  oceaniaHotels,
  americasHotels,
  middleEastHotels
} from './regions';

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
