import { z } from 'zod';

export const guestSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(255, 'Name is too long'),
  email: z.string().email('Invalid email address').trim(),
});
