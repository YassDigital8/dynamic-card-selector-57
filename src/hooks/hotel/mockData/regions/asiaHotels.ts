
import { Hotel } from '@/models/HotelModel';

export const asiaHotels: Hotel[] = [
  {
    id: '6',
    name: 'Golden Dragon Hotel',
    country: 'China',
    governorate: 'Shanghai',
    streetAddress: '88 Nanjing Road',
    posKey: 'CN',
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
        name: 'Business Room',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Modern room with business amenities',
        price: 210
      },
      {
        id: '2',
        name: 'Imperial Suite',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Luxurious suite with traditional Chinese elements',
        price: 490
      }
    ],
    createdAt: new Date('2023-01-25'),
    updatedAt: new Date('2023-06-05')
  },
  {
    id: '10',
    name: 'Sakura Ryokan',
    country: 'Japan',
    governorate: 'Kyoto',
    streetAddress: '72 Gion District',
    posKey: 'JP',
    rating: 4.5,
    amenities: {
      airConditioning: true,
      bar: false,
      gym: false,
      parking: true,
      spa: true,
      restaurant: true,
      breakfast: true,
      wifi: true,
      swimmingPool: false,
      petsAllowed: false,
      extraBed: false,
      shuttleBus: true
    },
    roomTypes: [
      {
        id: '1',
        name: 'Traditional Room',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Authentic tatami room with garden view',
        price: 280
      },
      {
        id: '2',
        name: 'Zen Suite',
        maxAdults: 3,
        maxChildren: 1,
        description: 'Spacious suite with private onsen bath',
        price: 520
      }
    ],
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-06-25')
  },
  {
    id: '13',
    name: 'Seoul City Tower',
    country: 'South Korea',
    governorate: 'Seoul',
    streetAddress: '25 Gangnam Boulevard',
    posKey: 'KR',
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
        name: 'K-Style Deluxe',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Modern room with Korean design elements',
        price: 245
      },
      {
        id: '2',
        name: 'Panorama Suite',
        maxAdults: 3,
        maxChildren: 2,
        description: 'Luxurious suite with city views',
        price: 420
      }
    ],
    createdAt: new Date('2023-05-12'),
    updatedAt: new Date('2023-10-08')
  },
  {
    id: '14',
    name: 'Mumbai Taj Palace',
    country: 'India',
    governorate: 'Mumbai',
    streetAddress: '45 Marine Drive',
    posKey: 'IN',
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
        name: 'Maharaja Room',
        maxAdults: 2,
        maxChildren: 1,
        description: 'Elegant room with traditional Indian decor',
        price: 280
      },
      {
        id: '2',
        name: 'Royal Suite',
        maxAdults: 4,
        maxChildren: 2,
        description: 'Opulent suite with sea views',
        price: 550
      }
    ],
    createdAt: new Date('2023-02-28'),
    updatedAt: new Date('2023-07-15')
  }
];
