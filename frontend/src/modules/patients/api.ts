import { http } from '@/api/client';
import { Patient } from '@/types';
import { PatientInput } from './schemas';

export const listPatients = async () => {
  const { data } = await http.get<Patient[]>('/patients');
  return data;
};

export const createPatient = async (payload: PatientInput) => {
  const { data } = await http.post<Patient>('/patients', payload);
  return data;
};

export const updatePatient = async (id: string, payload: PatientInput) => {
  const { data } = await http.patch<Patient>(`/patients/${id}`, payload);
  return data;
};

export const deletePatient = async (id: string) => {
  await http.delete(`/patients/${id}`);
};
