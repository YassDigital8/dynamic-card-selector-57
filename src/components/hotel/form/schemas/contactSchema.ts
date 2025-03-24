
import * as z from 'zod';
import { validateEmail, validatePhone } from './validation';

// Type-safe access to parent in refinement
export type ContactType = 'phone' | 'fax' | 'whatsapp';

// Schema for contact details
export const contactDetailSchema = z.object({
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

// Schema for social media
export const socialMediaSchema = z.object({
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
