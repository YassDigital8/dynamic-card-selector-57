
import { Hotel } from '@/models/HotelModel';

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
