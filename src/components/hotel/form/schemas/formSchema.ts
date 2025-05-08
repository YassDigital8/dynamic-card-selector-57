
import * as z from 'zod';
import { amenitiesSchema, extraBedPolicySchema } from './amenitySchema';
import { contactDetailSchema, socialMediaSchema } from './contactSchema';
import { contractDocumentSchema } from './contractSchema';
import { geolocationSchema } from './locationSchema';
import { paymentMethodSchema } from './paymentSchema';
import { roomTypeSchema } from './roomTypeSchema';

// Main form schema that combines all the other schemas
export const formSchema = z.object({
  name: z.string().min(2, { message: "Hotel name must be at least 2 characters." }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }),
  governorate: z.string().min(2, { message: "Governorate must be at least 2 characters." }),
  streetAddress: z.string().min(5, { message: "Street address must be at least 5 characters." }),
  posKey: z.string().default(''),
  rating: z.number().min(0).max(5).default(0),
  amenities: amenitiesSchema,
  roomTypes: z.array(roomTypeSchema).default([]), // Properly define default empty array
  contactDetails: z.array(contactDetailSchema).optional().default([]),
  socialMedia: z.array(socialMediaSchema).optional().default([]),
  contractDocuments: z.array(contractDocumentSchema).optional().default([]),
  newContractDescription: z.string().optional(),
  newContractStartDate: z.string().optional(),
  newContractEndDate: z.string().optional(),
  geolocation: geolocationSchema.optional(),
  paymentMethods: z.array(paymentMethodSchema).optional().default([]),
  extraBedPolicy: extraBedPolicySchema.optional(),
});

export type FormValues = z.infer<typeof formSchema>;
