import { useQuery } from '@tanstack/react-query';
import { listPatients } from '@/modules/patients/api';
import { listDoctors } from '@/modules/doctors/api';

export const usePatientsOptions = () => {
  const { data } = useQuery({
    queryKey: ['patients', 'options'],
    queryFn: listPatients,
  });
  return (data ?? []).map(patient => ({ label: patient.fullName, value: patient.id }));
};

export const useDoctorsOptions = () => {
  const { data } = useQuery({
    queryKey: ['doctors', 'options'],
    queryFn: listDoctors,
  });
  return (data ?? []).map(doctor => ({ label: doctor.fullName, value: doctor.id }));
};
