import { z } from 'zod';

export const appointmentSchema = z.object({
  patientId: z.string().uuid(),
  doctorId: z.string().uuid(),
  scheduledAt: z.string(),
  notes: z.string().optional(),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
