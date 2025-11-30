import { useQuery } from '@tanstack/react-query';
import { getDoctorQueue, listDoctors } from './api';

export const useDoctors = () =>
  useQuery({
    queryKey: ['doctors'],
    queryFn: listDoctors,
  });

export const useDoctorQueue = (doctorId: string) =>
  useQuery({
    queryKey: ['doctor', doctorId, 'queue'],
    queryFn: () => getDoctorQueue(doctorId),
    enabled: Boolean(doctorId),
  });
