
import * as z from 'zod';

const amenityImageSchema = z.object({
  url: z.string(),
  description: z.string().optional(),
  title: z.string().optional(),
  caption: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

const contactDetailSchema = z.object({
  id: z.string().optional(),
  type: z.enum(['phone', 'email', 'address', 'fax', 'other']),
  value: z.string().min(1, { message: "Contact value is required" }),
  label: z.string().optional(),
  isPrimary: z.boolean().optional(),
});

const socialMediaSchema = z.object({
  id: z.string().optional(),
  platform: z.enum(['website', 'facebook', 'instagram', 'twitter', 'linkedin', 'other']),
  url: z.string().min(1, { message: "URL is required" }),
  label: z.string().optional(),
});

export const formSchema = z.object({
  name: z.string().min(2, { message: "Hotel name must be at least 2 characters." }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }),
  governorate: z.string().min(2, { message: "Governorate must be at least 2 characters." }),
  streetAddress: z.string().min(5, { message: "Street address must be at least 5 characters." }),
  posKey: z.string().default(''),
  rating: z.number().min(0).max(5).optional(),
  amenities: z.object({
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
    extraBed: z.boolean().default(false),
    // Add image arrays for amenities that can have images
    barImages: z.array(amenityImageSchema).optional(),
    gymImages: z.array(amenityImageSchema).optional(),
    spaImages: z.array(amenityImageSchema).optional(),
    restaurantImages: z.array(amenityImageSchema).optional(),
    breakfastImages: z.array(amenityImageSchema).optional(),
    swimmingPoolImages: z.array(amenityImageSchema).optional(),
  }),
  roomTypes: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().min(2, { message: "Room type name must be at least 2 characters." }),
      maxAdults: z.number().min(1, { message: "At least 1 adult required." }),
      maxChildren: z.number().min(0),
      description: z.string().optional(),
      price: z.number().optional(),
      imageUrl: z.string().optional(),
      images: z.array(z.string()).optional().default([]),
    })
  ).default([]),
  contactDetails: z.array(contactDetailSchema).optional().default([]),
  socialMedia: z.array(socialMediaSchema).optional().default([]),
});

export type FormValues = z.infer<typeof formSchema>;
