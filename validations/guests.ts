import { z } from 'zod';

export const guestSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(255, 'Name is too long'),
  email: z.string().email('Invalid email address').trim(),
  password: z.string()
    .min(6, { message: "Le mot de passe doit faire au moins 6 caractères" })
    .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/)
});
