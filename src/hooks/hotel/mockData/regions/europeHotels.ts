
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
  },
  {
    id: '15',
    name: 'Parisian Elegance',
    country: 'France',
    governorate: 'Paris',
    streetAddress: '35 Champs-Élysées',
    posKey: 'FR',
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
        name: 'Parisian Classic',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Elegant room with Eiffel Tower views',
        price: 320
      },
      {
        id: '2',
        name: 'Seine Suite',
        maxAdults: 3,
        maxChildren: 2,
        description: 'Luxurious suite with river views',
        price: 580
      }
    ],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-05-28')
  },
  {
    id: '16',
    name: 'Venetian Palazzo',
    country: 'Italy',
    governorate: 'Venice',
    streetAddress: '22 Grand Canal Boulevard',
    posKey: 'IT',
    rating: 4.5,
    amenities: {
      airConditioning: true,
      bar: true,
      gym: false,
      parking: false,
      spa: true,
      restaurant: true,
      breakfast: true,
      wifi: true,
      swimmingPool: false,
      petsAllowed: false,
      extraBed: true,
      shuttleBus: false
    },
    roomTypes: [
      {
        id: '1',
        name: 'Canal View Room',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Charming room overlooking the canals',
        price: 290
      },
      {
        id: '2',
        name: 'Doge Suite',
        maxAdults: 2,
        maxChildren: 2,
        description: 'Opulent suite with Venetian decor',
        price: 450
      }
    ],
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-06-15')
  },
  {
    id: '17',
    name: 'Barcelona Beachfront',
    country: 'Spain',
    governorate: 'Barcelona',
    streetAddress: '56 Barceloneta Beach',
    posKey: 'ES',
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
      swimmingPool: true,
      petsAllowed: false,
      extraBed: true,
      shuttleBus: true
    },
    roomTypes: [
      {
        id: '1',
        name: 'Mediterranean View',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Vibrant room with sea views',
        price: 220
      },
      {
        id: '2',
        name: 'Gaudi Suite',
        maxAdults: 3,
        maxChildren: 2,
        description: 'Artistic suite inspired by Gaudi',
        price: 380
      }
    ],
    createdAt: new Date('2023-03-18'),
    updatedAt: new Date('2023-07-25')
  }
];
