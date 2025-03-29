
import { Event } from '@/models/EventModel';

export const demoEvents: Event[] = [
  {
    id: "1",
    title: "Dubai Shopping Festival",
    description: "Annual event featuring discounts, entertainment, and activities across Dubai.",
    date: "Jan 15 - Feb 29, 2024",
    location: {
      address: "Dubai Mall and various locations",
      city: "Dubai",
      country: "UAE",
    },
    image: "/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png",
    category: "Shopping",
    rating: 4.8,
    featured: true,
    contactDetails: [
      {
        id: "c1",
        type: "phone",
        value: "+971 4 123 4567",
        isPrimary: true
      },
      {
        id: "c2",
        type: "website",
        value: "https://www.visitdubai.com/dsf",
      }
    ],
    ticketInfo: [
      {
        id: "t1",
        name: "Entry Pass",
        price: 0,
        description: "Free entry to shopping areas",
        available: true
      }
    ],
    createdAt: new Date("2023-11-01"),
    updatedAt: new Date("2023-11-01")
  },
  {
    id: "2",
    title: "Syrian Cultural Festival",
    description: "A celebration of Syrian culture, cuisine, music and traditions.",
    date: "Mar 10 - Mar 15, 2024",
    location: {
      address: "Cultural Center",
      city: "Damascus",
      country: "Syria",
    },
    image: "/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png",
    category: "Cultural",
    rating: 4.7,
    contactDetails: [
      {
        id: "c3",
        type: "email",
        value: "info@syrianfestival.org",
        isPrimary: true
      }
    ],
    ticketInfo: [
      {
        id: "t2",
        name: "Standard Entry",
        price: 25,
        description: "Access to all festival areas",
        available: true
      },
      {
        id: "t3",
        name: "VIP Pass",
        price: 75,
        description: "Includes exclusive events and tastings",
        available: true
      }
    ],
    createdAt: new Date("2023-12-15"),
    updatedAt: new Date("2023-12-15")
  },
  {
    id: "3",
    title: "Burj Khalifa Tour",
    description: "Visit the world's tallest building with panoramic views of Dubai.",
    date: "Available daily",
    location: {
      address: "1 Sheikh Mohammed bin Rashid Blvd",
      city: "Dubai",
      country: "UAE",
      coordinates: {
        lat: 25.197197,
        lng: 55.274376
      }
    },
    image: "/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png",
    category: "Attraction",
    rating: 4.9,
    featured: true,
    contactDetails: [
      {
        id: "c4",
        type: "phone",
        value: "+971 4 888 8888",
        isPrimary: true
      },
      {
        id: "c5",
        type: "website",
        value: "https://www.burjkhalifa.ae",
      }
    ],
    ticketInfo: [
      {
        id: "t4",
        name: "General Admission",
        price: 149,
        description: "Access to observation deck on level 124",
        available: true
      },
      {
        id: "t5",
        name: "Premium",
        price: 379,
        description: "Access to levels 124, 125, and 148",
        available: true
      }
    ],
    createdAt: new Date("2023-10-05"),
    updatedAt: new Date("2024-01-10")
  },
  {
    id: "4",
    title: "Desert Safari Adventure",
    description: "Experience dune bashing, camel riding and traditional entertainment.",
    date: "Available daily",
    location: {
      address: "Dubai Desert Conservation Reserve",
      city: "Dubai",
      country: "UAE",
    },
    image: "/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png",
    category: "Adventure",
    rating: 4.6,
    contactDetails: [
      {
        id: "c6",
        type: "phone",
        value: "+971 50 123 4567",
        isPrimary: true
      },
      {
        id: "c7",
        type: "email",
        value: "bookings@desertsafari.com",
      }
    ],
    ticketInfo: [
      {
        id: "t6",
        name: "Standard Safari",
        price: 199,
        description: "6-hour desert adventure including dinner",
        available: true
      },
      {
        id: "t7",
        name: "Overnight Safari",
        price: 499,
        description: "Includes overnight stay in luxury desert camp",
        available: true
      }
    ],
    createdAt: new Date("2023-09-15"),
    updatedAt: new Date("2024-02-01")
  }
];
