import { z } from 'zod';

export const roomSchema = z.object({
  roomType: z.string().trim().min(1, 'Room type is required').max(255, 'Room type is too long'),
  capacity: z.number().positive('Capacity must be a positive number').int('Capacity must be an integer'),
  amenities: z.array(z.string().trim()).optional(),
});
