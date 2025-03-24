
import { Hotel } from '@/models/HotelModel';

export const americasHotels: Hotel[] = [
  {
    id: '5',
    name: 'Maple Leaf Inn',
    country: 'Canada',
    governorate: 'Toronto',
    streetAddress: '33 Young Street',
    posKey: 'CA',
    rating: 3.5,
    amenities: {
      airConditioning: true,
      bar: true,
      gym: true,
      parking: true,
      spa: false,
      restaurant: true,
      breakfast: true,
      wifi: true,
      swimmingPool: false,
      petsAllowed: true,
      extraBed: true,
      shuttleBus: false
    },
    roomTypes: [
      {
        id: '1',
        name: 'City Room',
        maxAdults: 2,
        maxChildren: 0,
        description: 'Comfortable room with city views',
        price: 190
      },
      {
        id: '2',
        name: 'Maple Suite',
        maxAdults: 3,
        maxChildren: 2,
        description: 'Spacious suite with separate living area',
        price: 380
      }
    ],
    createdAt: new Date('2023-04-18'),
    updatedAt: new Date('2023-08-20')
  },
  {
    id: '8',
    name: 'Tropical Paradise Hotel',
    country: 'Brazil',
    governorate: 'Rio de Janeiro',
    streetAddress: '56 Copacabana Boulevard',
    posKey: 'BR',
    rating: 4.5,
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
        name: 'Ocean View Room',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Room with stunning views of the Atlantic',
        price: 230
      },
      {
        id: '2',
        name: 'Carnival Suite',
        maxAdults: 4,
        maxChildren: 2,
        description: 'Vibrant suite with balcony and beach views',
        price: 410
      }
    ],
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-05-28')
  }
];
