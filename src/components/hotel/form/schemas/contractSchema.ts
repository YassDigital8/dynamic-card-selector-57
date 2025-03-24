
import * as z from 'zod';

// Schema for contract documents
export const contractDocumentSchema = z.object({
  id: z.string().optional(),
  url: z.string().min(1, { message: "Document URL is required" }),
  fileName: z.string().min(1, { message: "File name is required" }),
  uploadedAt: z.string().optional(),
  description: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
