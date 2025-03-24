
import * as z from 'zod';

// Schema for geolocation data
export const geolocationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  address: z.string().optional(),
  formattedAddress: z.string().optional(),
});
