
import { z } from 'zod';

export const jobFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  department: z.string().min(1, 'Department is required'),
  location: z.string().min(1, 'Location is required'),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship']),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  requirements: z.array(z.string()).min(1, 'At least one requirement is needed'),
  responsibilities: z.array(z.string()).min(1, 'At least one responsibility is needed'),
  salary: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
    currency: z.string().min(1)
  }).optional(),
  closingDate: z.date(),
  status: z.enum(['Open', 'Closed', 'Draft']),
  contactEmail: z.string().email().optional(),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
