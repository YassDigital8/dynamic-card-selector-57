
import { Hotel } from '@/models/HotelModel';

export const oceaniaHotels: Hotel[] = [
  {
    id: '4',
    name: 'Serene Beach Resort',
    country: 'Thailand',
    governorate: 'Phuket',
    streetAddress: '15 Patong Beach Road',
    posKey: 'TH',
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
        name: 'Beach View Room',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Room with stunning beach views',
        price: 220
      },
      {
        id: '2',
        name: 'Pool Villa',
        maxAdults: 4,
        maxChildren: 2,
        description: 'Private villa with pool access',
        price: 520
      }
    ],
    createdAt: new Date('2023-02-05'),
    updatedAt: new Date('2023-07-12')
  }
];
