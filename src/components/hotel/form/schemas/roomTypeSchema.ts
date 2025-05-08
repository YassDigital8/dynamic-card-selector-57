
import * as z from 'zod';

// Schema for seasonal pricing
export const seasonalPriceSchema = z.object({
  id: z.string().optional().default(() => `sp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`),
  seasonName: z.string().min(1, { message: "Season name is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
});

// Schema for room types
export const roomTypeSchema = z.object({
  id: z.string().optional().default(() => `room-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`),
  name: z.string().min(2, { message: "Room type name must be at least 2 characters." }).default(""),
  maxAdults: z.number().min(1, { message: "At least 1 adult required." }).default(2),
  maxChildren: z.number().min(0).default(0),
  description: z.string().optional().default(''),
  price: z.number().min(0).default(0),
  imageUrl: z.string().optional().default(''),
  images: z.array(z.string()).optional().default([]),
  seasonalPrices: z.array(seasonalPriceSchema).optional().default([]),
  // Extra bed fields
  allowExtraBed: z.boolean().optional().default(false),
  maxExtraBeds: z.number().min(1).max(5).optional().default(1),
  extraBedPrice: z.number().min(0).optional().default(0),
});

// Export a function to create a default room type with a unique ID
export const createDefaultRoomType = () => ({
  id: `room-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
  name: "",
  maxAdults: 2,
  maxChildren: 0,
  description: "",
  price: 0,
  imageUrl: "",
  images: [],
  seasonalPrices: [],
  allowExtraBed: false,
  maxExtraBeds: 1,
  extraBedPrice: 0
});
