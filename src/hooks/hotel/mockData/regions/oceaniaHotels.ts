
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
  },
  {
    id: '11',
    name: 'Great Barrier Reef Lodge',
    country: 'Australia',
    governorate: 'Queensland',
    streetAddress: '42 Coral Bay Drive',
    posKey: 'AU',
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
        name: 'Ocean View Suite',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Luxurious suite with panoramic ocean views',
        price: 350
      },
      {
        id: '2',
        name: 'Reef Explorer Room',
        maxAdults: 2,
        maxChildren: 2,
        description: 'Comfortable room with easy reef access',
        price: 275
      }
    ],
    createdAt: new Date('2023-04-15'),
    updatedAt: new Date('2023-09-20')
  },
  {
    id: '12',
    name: 'Auckland Harbor Hotel',
    country: 'New Zealand',
    governorate: 'Auckland',
    streetAddress: '18 Viaduct Basin Road',
    posKey: 'NZ',
    rating: 4,
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
      petsAllowed: false,
      extraBed: true,
      shuttleBus: true
    },
    roomTypes: [
      {
        id: '1',
        name: 'Harbor View Room',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Comfortable room with harbor views',
        price: 240
      },
      {
        id: '2',
        name: 'City Deluxe Suite',
        maxAdults: 3,
        maxChildren: 2,
        description: 'Spacious suite with city skyline views',
        price: 380
      }
    ],
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-08-05')
  }
];
