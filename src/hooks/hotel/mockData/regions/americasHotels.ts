
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
  },
  {
    id: '18',
    name: 'Manhattan Skyline Hotel',
    country: 'United States',
    governorate: 'New York',
    streetAddress: '127 Broadway Avenue',
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
      swimmingPool: true,
      petsAllowed: false,
      extraBed: true,
      shuttleBus: true
    },
    roomTypes: [
      {
        id: '1',
        name: 'City View King',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Elegant room with stunning city views',
        price: 350
      },
      {
        id: '2',
        name: 'Central Park Suite',
        maxAdults: 3,
        maxChildren: 2,
        description: 'Luxurious suite overlooking Central Park',
        price: 650
      }
    ],
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-06-22')
  },
  {
    id: '19',
    name: 'Acapulco Beach Resort',
    country: 'Mexico',
    governorate: 'Acapulco',
    streetAddress: '42 Playa Diamante',
    posKey: 'MX',
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
        name: 'Pacific View',
        maxAdults: 2,
        maxChildren: 2,
        description: 'Room with beautiful ocean views',
        price: 220
      },
      {
        id: '2',
        name: 'Sunset Suite',
        maxAdults: 4,
        maxChildren: 2,
        description: 'Luxury suite with private beach access',
        price: 480
      }
    ],
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-08-15')
  },
  {
    id: '20',
    name: 'Andean Mountain Lodge',
    country: 'Peru',
    governorate: 'Cusco',
    streetAddress: '17 Machu Picchu Road',
    posKey: 'PE',
    rating: 4,
    amenities: {
      airConditioning: true,
      bar: true,
      gym: false,
      parking: true,
      spa: true,
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
        name: 'Inca Room',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Rustic room with Andean decor',
        price: 185
      },
      {
        id: '2',
        name: 'Mountain View Suite',
        maxAdults: 3,
        maxChildren: 2,
        description: 'Suite with breathtaking mountain views',
        price: 340
      }
    ],
    createdAt: new Date('2023-04-25'),
    updatedAt: new Date('2023-09-12')
  }
];
