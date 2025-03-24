
import * as z from 'zod';

// Schema for bank account details
export const bankAccountDetailsSchema = z.object({
  accountName: z.string().min(1, { message: "Account name is required" }),
  accountNumber: z.string().min(1, { message: "Account number is required" }),
  bankName: z.string().min(1, { message: "Bank name is required" }),
  branchName: z.string().optional(),
  swiftCode: z.string().optional(),
  iban: z.string().optional(),
  additionalInfo: z.string().optional(),
});

// Schema for payment methods
export const paymentMethodSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Payment method name is required" }),
  enabled: z.boolean().default(false),
  bankAccountDetails: bankAccountDetailsSchema.optional(),
});
