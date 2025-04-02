
import { z } from 'zod';
import { categoryNames } from '@/data/eventCategoriesData';

export const eventFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  date: z.object({
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    displayValue: z.string(),
  }),
  hasTime: z.boolean().default(false),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  location: z.object({
    address: z.string().min(3, { message: "Address is required" }),
    city: z.string().min(2, { message: "City is required" }),
    country: z.string().min(2, { message: "Country is required" }),
  }),
  image: z.string().min(5, { message: "Image URL is required" }),
  images: z.array(z.object({
    url: z.string(),
    description: z.string().optional(),
    id: z.string().optional(),
    metadata: z.object({
      title: z.string().optional(),
      altText: z.string().optional(),
      caption: z.string().optional(),
    }).optional(),
  })).optional(),
  category: z.string().min(2, { message: "Category is required" }),
  eventType: z.string().optional(),
  rating: z.number().min(0).max(5),
  featured: z.boolean().optional(),
});

export type EventFormSchema = z.infer<typeof eventFormSchema>;

// Common categories data
export const categories = categoryNames;

export const DEFAULT_EVENT_IMAGE = "/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png";
