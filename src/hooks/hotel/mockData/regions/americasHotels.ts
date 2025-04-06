
import { Hotel } from '@/models/HotelModel';

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
