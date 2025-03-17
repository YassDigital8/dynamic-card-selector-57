
import { Hotel } from '@/models/HotelModel';

// Mock data for demonstration
export const defaultHotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Plaza Hotel',
    country: 'United Arab Emirates',
    governorate: 'Dubai',
    streetAddress: '123 Sheikh Zayed Road',
    posKey: 'UAE',
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
      extraBed: true
    },
    roomTypes: [
      {
        id: '1',
        name: 'Deluxe Room',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Spacious room with city view',
        price: 250
      },
      {
        id: '2',
        name: 'Executive Suite',
        maxAdults: 3,
        maxChildren: 2,
        description: 'Luxury suite with separate living area',
        price: 450
      }
    ],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-04-10')
  },
  {
    id: '2',
    name: 'Royal Garden Resort',
    country: 'Syria',
    governorate: 'Damascus',
    streetAddress: '45 Al-Mutanabbi Street',
    posKey: 'sy',
    amenities: {
      airConditioning: true,
      bar: false,
      gym: true,
      parking: true,
      spa: true,
      restaurant: true,
      breakfast: true,
      wifi: true,
      swimmingPool: true,
      petsAllowed: false,
      extraBed: true
    },
    roomTypes: [
      {
        id: '1',
        name: 'Standard Room',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Comfortable room with garden view',
        price: 150
      },
      {
        id: '2',
        name: 'Family Suite',
        maxAdults: 4,
        maxChildren: 3,
        description: 'Perfect for families, with connecting rooms',
        price: 300
      }
    ],
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-05-22')
  },
  {
    id: '3',
    name: 'Britannia Hotel',
    country: 'United Kingdom',
    governorate: 'London',
    streetAddress: '78 Baker Street',
    posKey: 'uk',
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
      extraBed: true
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
  }
];
