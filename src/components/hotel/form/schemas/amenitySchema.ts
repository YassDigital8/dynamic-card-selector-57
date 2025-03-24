
import * as z from 'zod';

// Schema for amenity images
export const amenityImageSchema = z.object({
  url: z.string(),
  description: z.string().optional(),
  title: z.string().optional(),
  caption: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

// Schema for extra bed policy
export const extraBedPolicySchema = z.object({
  pricePerNight: z.number().min(0, { message: "Price must be a positive number" }),
  availableForRoomTypes: z.array(z.string()).default([]),
  maxExtraBedsPerRoom: z.number().min(0).max(5, { message: "Maximum 5 extra beds allowed" }),
  notes: z.string().optional(),
});

// Schema for hotel amenities
export const amenitiesSchema = z.object({
  airConditioning: z.boolean().default(false),
  bar: z.boolean().default(false),
  gym: z.boolean().default(false),
  parking: z.boolean().default(false),
  spa: z.boolean().default(false),
  restaurant: z.boolean().default(false),
  breakfast: z.boolean().default(false),
  wifi: z.boolean().default(false),
  swimmingPool: z.boolean().default(false),
  petsAllowed: z.boolean().default(false),
  shuttleBus: z.boolean().default(false),
  extraBed: z.boolean().default(false),
  barImages: z.array(amenityImageSchema).optional(),
  gymImages: z.array(amenityImageSchema).optional(),
  spaImages: z.array(amenityImageSchema).optional(),
  restaurantImages: z.array(amenityImageSchema).optional(),
  breakfastImages: z.array(amenityImageSchema).optional(),
  swimmingPoolImages: z.array(amenityImageSchema).optional(),
});
