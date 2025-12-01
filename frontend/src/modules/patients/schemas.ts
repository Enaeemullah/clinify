import { z } from 'zod';

export const patientSchema = z.object({
  fullName: z.string().min(3),
  dateOfBirth: z.string(),
  gender: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  notes: z.string().optional(),
});

export type PatientInput = z.infer<typeof patientSchema>;
