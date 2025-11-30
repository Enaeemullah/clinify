import { useMutation, useQuery } from '@tanstack/react-query';
import { listPatients, createPatient, updatePatient, deletePatient } from './api';
import { PatientInput } from './schemas';
import { queryClient } from '@/api/queryClient';

export const usePatients = () =>
  useQuery({
    queryKey: ['patients'],
    queryFn: listPatients,
  });

export const useCreatePatient = () =>
  useMutation({
    mutationFn: (payload: PatientInput) => createPatient(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patients'] }),
  });

export const useUpdatePatient = () =>
  useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: PatientInput }) => updatePatient(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patients'] }),
  });

export const useDeletePatient = () =>
  useMutation({
    mutationFn: (id: string) => deletePatient(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patients'] }),
  });
