
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
    eventType: "Local Food and Craft Festivals",
    rating: 4.8,
    featured: true,
    price: 0,
    totalInventory: 5000,
    remainingInventory: 2350,
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
        available: true,
        totalInventory: 5000,
        remainingInventory: 2350
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
    eventType: "Cultural Heritage Festivals",
    rating: 4.7,
    price: 25,
    totalInventory: 2000,
    remainingInventory: 450,
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
        available: true,
        totalInventory: 1500,
        remainingInventory: 350
      },
      {
        id: "t3",
        name: "VIP Pass",
        price: 75,
        description: "Includes exclusive events and tastings",
        available: true,
        totalInventory: 500,
        remainingInventory: 100
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
    eventType: "Historic Site Tours",
    rating: 4.9,
    featured: true,
    price: 149,
    totalInventory: 1000,
    remainingInventory: 78,
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
        available: true,
        totalInventory: 750,
        remainingInventory: 45
      },
      {
        id: "t5",
        name: "Premium",
        price: 379,
        description: "Access to levels 124, 125, and 148",
        available: true,
        totalInventory: 250,
        remainingInventory: 33
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
    eventType: "4x4 Desert Tours near Palmyra",
    rating: 4.6,
    price: 199,
    totalInventory: 500,
    remainingInventory: 0, // Sold out
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
        available: false,
        totalInventory: 300,
        remainingInventory: 0
      },
      {
        id: "t7",
        name: "Overnight Safari",
        price: 499,
        description: "Includes overnight stay in luxury desert camp",
        available: false,
        totalInventory: 200,
        remainingInventory: 0
      }
    ],
    createdAt: new Date("2023-09-15"),
    updatedAt: new Date("2024-02-01")
  },
  {
    id: "5",
    title: "Dubai Opera: La Traviata",
    description: "Experience Verdi's masterpiece performed by the Royal Opera House company.",
    date: "Apr 15 - Apr 20, 2024",
    location: {
      address: "Dubai Opera, Downtown Dubai",
      city: "Dubai",
      country: "UAE",
    },
    image: "/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png",
    category: "Cultural",
    eventType: "Cultural Film Screenings",
    rating: 4.9,
    featured: true,
    price: 350,
    totalInventory: 2400,
    remainingInventory: 895,
    contactDetails: [
      {
        id: "c8",
        type: "phone",
        value: "+971 4 440 8888",
        isPrimary: true
      },
      {
        id: "c9",
        type: "website",
        value: "https://www.dubaiopera.com",
      }
    ],
    ticketInfo: [
      {
        id: "t8",
        name: "Orchestra",
        price: 750,
        description: "Best seats in the house",
        available: true,
        totalInventory: 1000,
        remainingInventory: 215
      },
      {
        id: "t9",
        name: "Balcony",
        price: 350,
        description: "Upper level seating",
        available: true,
        totalInventory: 1400,
        remainingInventory: 680
      }
    ],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10")
  },
  {
    id: "6",
    title: "Coldplay World Tour: Dubai",
    description: "Coldplay brings their Music of the Spheres World Tour to Dubai for an unforgettable experience.",
    date: "May 5 - May 6, 2024",
    location: {
      address: "Coca-Cola Arena",
      city: "Dubai",
      country: "UAE",
    },
    image: "/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png",
    category: "Music",
    eventType: "Live Music Nights at Cafés or Cultural Hubs",
    rating: 4.8,
    featured: true,
    price: 595,
    totalInventory: 20000,
    remainingInventory: 2145,
    contactDetails: [
      {
        id: "c10",
        type: "website",
        value: "https://www.coca-cola-arena.com",
        isPrimary: true
      }
    ],
    ticketInfo: [
      {
        id: "t10",
        name: "Golden Circle",
        price: 1200,
        description: "Front stage standing",
        available: false,
        totalInventory: 5000,
        remainingInventory: 0
      },
      {
        id: "t11",
        name: "Regular Standing",
        price: 595,
        description: "General admission",
        available: true,
        totalInventory: 15000,
        remainingInventory: 2145
      }
    ],
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-15")
  }
];
