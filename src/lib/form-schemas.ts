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

export const addServiceSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(4, 'Too short title')
    .max(200, 'Too long service title'),
  description: z
    .string({ required_error: 'Description is required' })
    .min(10, 'Description is required')
    .max(500, 'Too long description'),
  price: z.preprocess(
    (val) => Number(val) || undefined,
    z
      .number({ required_error: 'Price is required' })
      .min(500, 'Service charge must be minimum Rs. 500')
      .max(100_000, "Service charge can't exceed Rs. 1,00,000")
  ),
  duration: z.preprocess(
    (val) => Number(val) || undefined,
    z
      .number({ required_error: 'Duration is required' })
      .min(0.5, 'Service duration must be at least half hours')
      .max(12, "Service duration can't exceed 12 hours")
      .transform((val) => Math.round(val * 2) / 2)
  )
});
export type AddServiceSchema = z.infer<typeof addServiceSchema>;
export type UpdateServiceSchema = Partial<AddServiceSchema>;
