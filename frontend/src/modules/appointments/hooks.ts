import { useMutation, useQuery } from '@tanstack/react-query';
import { createAppointment, listAppointments } from './api';
import { AppointmentInput } from './schemas';
import { queryClient } from '@/api/queryClient';

export const useAppointments = () =>
  useQuery({
    queryKey: ['appointments'],
    queryFn: listAppointments,
  });

export const useCreateAppointment = () =>
  useMutation({
    mutationFn: (payload: AppointmentInput) => createAppointment(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['appointments'] }),
  });
