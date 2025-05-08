
import * as z from 'zod';

// Schema for seasonal pricing
export const seasonalPriceSchema = z.object({
  id: z.string().optional(),
  seasonName: z.string().min(1, { message: "Season name is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
});

// Schema for room types
export const roomTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Room type name must be at least 2 characters." }),
  maxAdults: z.number().min(1, { message: "At least 1 adult required." }),
  maxChildren: z.number().min(0),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  imageUrl: z.string().optional(),
  images: z.array(z.string()).optional().default([]),
  seasonalPrices: z.array(seasonalPriceSchema).optional().default([]),
  // Extra bed fields
  allowExtraBed: z.boolean().optional().default(false),
  maxExtraBeds: z.number().min(1).max(5).optional().default(1),
  extraBedPrice: z.number().min(0).optional().default(0),
});
