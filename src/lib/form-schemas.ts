import { z } from 'zod';
export const updateProfileSchema = z.object({
  name: z.string().min(4, 'Too short name').max(40, 'Too long name'),
  address: z.string().min(3, 'Invalid address').max(200, 'Too long address'),
  phone: z
    .preprocess(
      (phone) => parseInt(z.string().parse(phone), 10),
      z.number({ invalid_type_error: 'Invalid phone number' }).positive('Invalid phone number')
    )
    .refine((val) => val.toString().length === 10, 'Invalid phone number')
});
export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
