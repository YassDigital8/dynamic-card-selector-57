
import { Hotel } from '@/models/HotelModel';

export const middleEastHotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Plaza Hotel',
    country: 'United Arab Emirates',
    governorate: 'Dubai',
    streetAddress: '123 Sheikh Zayed Road',
    posKey: 'UAE',
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
    posKey: 'SY',
    rating: 4,
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
      extraBed: true,
      shuttleBus: true
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
    id: '7',
    name: 'Sahara Oasis Resort',
    country: 'Morocco',
    governorate: 'Marrakech',
    streetAddress: '24 Medina Avenue',
    posKey: 'MA',
    rating: 4,
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
      extraBed: true,
      shuttleBus: true
    },
    roomTypes: [
      {
        id: '1',
        name: 'Moroccan Room',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Traditional room with local decor',
        price: 170
      },
      {
        id: '2',
        name: 'Desert View Suite',
        maxAdults: 3,
        maxChildren: 2,
        description: 'Suite with panoramic desert views',
        price: 340
      }
    ],
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-07-22')
  },
  {
    id: '21',
    name: 'Luxor Nile Palace',
    country: 'Egypt',
    governorate: 'Luxor',
    streetAddress: '88 Nile Corniche',
    posKey: 'EG',
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
        name: 'Pharaoh Room',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Elegant room with Nile views',
        price: 210
      },
      {
        id: '2',
        name: 'Royal Pyramid Suite',
        maxAdults: 3,
        maxChildren: 2,
        description: 'Luxurious suite with temple views',
        price: 420
      }
    ],
    createdAt: new Date('2023-02-18'),
    updatedAt: new Date('2023-06-30')
  },
  {
    id: '22',
    name: 'Doha Pearl Hotel',
    country: 'Qatar',
    governorate: 'Doha',
    streetAddress: '35 West Bay Boulevard',
    posKey: 'QA',
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
        name: 'Gulf View Deluxe',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Modern room with gulf views',
        price: 320
      },
      {
        id: '2',
        name: 'Pearl Suite',
        maxAdults: 4,
        maxChildren: 2,
        description: 'Opulent suite with panoramic views',
        price: 580
      }
    ],
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-05-15')
  },
  {
    id: '23',
    name: 'Dead Sea Spa Resort',
    country: 'Jordan',
    governorate: 'Dead Sea',
    streetAddress: '12 Mineral Beach Road',
    posKey: 'JO',
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
        name: 'Salt View Room',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Room with stunning Dead Sea views',
        price: 240
      },
      {
        id: '2',
        name: 'Healing Suite',
        maxAdults: 3,
        maxChildren: 2,
        description: 'Suite with private mineral pool',
        price: 490
      }
    ],
    createdAt: new Date('2023-03-25'),
    updatedAt: new Date('2023-08-18')
  }
];
