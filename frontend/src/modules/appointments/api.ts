import { http } from '@/api/client';
import { Appointment } from '@/types';
import { AppointmentInput } from './schemas';

export const listAppointments = async () => {
  const { data } = await http.get<Appointment[]>('/appointments');
  return data;
};

export const createAppointment = async (payload: AppointmentInput) => {
  const { data } = await http.post<Appointment>('/appointments', payload);
  return data;
};
