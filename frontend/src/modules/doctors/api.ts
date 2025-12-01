import { http } from '@/api/client';
import { Doctor, QueueEntry } from '@/types';

export const listDoctors = async () => {
  const { data } = await http.get<Doctor[]>('/doctors');
  return data;
};

export const getDoctorQueue = async (doctorId: string) => {
  const { data } = await http.get<QueueEntry[]>(`/doctors/${doctorId}/queue`);
  return data;
};
