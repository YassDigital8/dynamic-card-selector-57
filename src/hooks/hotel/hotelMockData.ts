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
    rating: 5, // Added explicit rating
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
    rating: 4, // Added explicit rating
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
    id: '3',
    name: 'Britannia Hotel',
    country: 'United Kingdom',
    governorate: 'London',
    streetAddress: '78 Baker Street',
    posKey: 'UK',
    rating: 4.5, // Added explicit rating
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
    id: '4',
    name: 'Serene Beach Resort',
    country: 'Thailand',
    governorate: 'Phuket',
    streetAddress: '15 Patong Beach Road',
    posKey: 'TH',
    rating: 5, // Added explicit rating
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
    id: '5',
    name: 'Maple Leaf Inn',
    country: 'Canada',
    governorate: 'Toronto',
    streetAddress: '33 Young Street',
    posKey: 'CA',
    rating: 3.5, // Added explicit rating
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
      shuttleBus: true
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
    id: '6',
    name: 'Golden Dragon Hotel',
    country: 'China',
    governorate: 'Shanghai',
    streetAddress: '88 Nanjing Road',
    posKey: 'CN',
    rating: 5, // Added explicit rating
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
    id: '7',
    name: 'Sahara Oasis Resort',
    country: 'Morocco',
    governorate: 'Marrakech',
    streetAddress: '24 Medina Avenue',
    posKey: 'MA',
    rating: 4, // Added explicit rating
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
    id: '8',
    name: 'Tropical Paradise Hotel',
    country: 'Brazil',
    governorate: 'Rio de Janeiro',
    streetAddress: '56 Copacabana Boulevard',
    posKey: 'BR',
    rating: 4.5, // Added explicit rating
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
    id: '9',
    name: 'Nordic Lights Lodge',
    country: 'Norway',
    governorate: 'Tromsø',
    streetAddress: '12 Aurora Street',
    posKey: 'NO',
    rating: 4, // Added explicit rating
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
    id: '10',
    name: 'Sakura Ryokan',
    country: 'Japan',
    governorate: 'Kyoto',
    streetAddress: '72 Gion District',
    posKey: 'JP',
    rating: 4.5, // Added explicit rating
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
  }
];
