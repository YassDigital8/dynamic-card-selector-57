
import * as z from 'zod';

const amenityImageSchema = z.object({
  url: z.string(),
  description: z.string().optional(),
  title: z.string().optional(),
  caption: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

// Custom validation functions
const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string) => {
  return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone);
};

// Type-safe access to parent in refinement
type ContactType = 'phone' | 'fax' | 'whatsapp';

const contactDetailSchema = z.object({
  id: z.string().optional(),
  type: z.enum(['phone', 'fax', 'whatsapp']),
  value: z.string()
    .min(1, { message: "Contact value is required" })
    .superRefine((val, ctx) => {
      // Get the parent object via ctx.path
      const parentType = (ctx as any).data?.type as ContactType | undefined;
      
      if (parentType === 'phone' && !validatePhone(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid phone number format",
        });
      }
      
      if (parentType === 'fax' && !validatePhone(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid fax number format",
        });
      }
      
      if (parentType === 'whatsapp' && !validatePhone(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid WhatsApp number format",
        });
      }
    }),
  personName: z.string().optional(),
  personRole: z.string().optional(),
  isPrimary: z.boolean().optional(),
});

const socialMediaSchema = z.object({
  id: z.string().optional(),
  platform: z.enum(['website', 'facebook', 'instagram', 'twitter', 'linkedin', 'email', 'other']),
  url: z.string()
    .min(1, { message: "URL is required" })
    .superRefine((val, ctx) => {
      // Get the parent platform type
      const platform = (ctx as any).data?.platform;
      
      if (platform === 'email') {
        // For email platform, validate as email instead of URL
        if (!validateEmail(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid email format",
          });
        }
        return; // Skip URL validation for email
      }
      
      try {
        // Basic URL validation for non-email platforms
        if (!val.startsWith('http://') && !val.startsWith('https://')) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "URL must start with http:// or https://",
          });
          return;
        }
        new URL(val);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid URL format",
        });
      }
    }),
  label: z.string().optional(),
});

const contractDocumentSchema = z.object({
  id: z.string().optional(),
  url: z.string().min(1, { message: "Document URL is required" }),
  fileName: z.string().min(1, { message: "File name is required" }),
  uploadedAt: z.string().optional(),
  description: z.string().optional(),
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
  contractDocuments: z.array(contractDocumentSchema).optional().default([]),
});

export type FormValues = z.infer<typeof formSchema>;
