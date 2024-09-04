import { z } from 'zod';

export const reservationSchema = z.object({
  guestId: z.string().uuid('Invalid guest ID'),
  startDate: z.date().min(new Date(), 'Start date cannot be in the past'), // Minimum date is today
  endDate: z.date(),
});
