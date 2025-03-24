
import { Hotel } from '@/models/HotelModel';

export const europeHotels: Hotel[] = [
  {
    id: '3',
    name: 'Britannia Hotel',
    country: 'United Kingdom',
    governorate: 'London',
    streetAddress: '78 Baker Street',
    posKey: 'UK',
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
      swimmingPool: false,
      petsAllowed: true,
      extraBed: true,
      shuttleBus: true
    },
    roomTypes: [
      {
        id: '1',
        name: 'Classic Room',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Traditional British décor',
        price: 180
      },
      {
        id: '2',
        name: 'Royal Suite',
        maxAdults: 2,
        maxChildren: 2,
        description: 'Luxurious suite with city views',
        price: 350
      }
    ],
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2023-06-15')
  },
  {
    id: '9',
    name: 'Nordic Lights Lodge',
    country: 'Norway',
    governorate: 'Tromsø',
    streetAddress: '12 Aurora Street',
    posKey: 'NO',
    rating: 4,
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
      shuttleBus: false
    },
    roomTypes: [
      {
        id: '1',
        name: 'Northern Lights Room',
        maxAdults: 2,
        maxChildren: 0,
        description: 'Room with skylight for aurora viewing',
        price: 320
      },
      {
        id: '2',
        name: 'Fjord Suite',
        maxAdults: 2,
        maxChildren: 2,
        description: 'Suite with panoramic mountain and fjord views',
        price: 550
      }
    ],
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2023-08-10')
  }
];
