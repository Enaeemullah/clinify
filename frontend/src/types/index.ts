export interface Permission {
  id: string;
  code: string;
  description: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  permissions?: string[];
}

export interface Patient {
  id: string;
  fullName: string;
  dateOfBirth: string;
  gender?: string;
  phone?: string;
  email?: string;
  notes?: string;
}

export interface Doctor {
  id: string;
  fullName: string;
  specialization: string;
  room?: string;
  phone?: string;
}

export interface Appointment {
  id: string;
  patient: Patient;
  doctor: Doctor;
  scheduledAt: string;
  status: string;
  notes?: string;
}

export interface QueueEntry {
  id: string;
  doctor: Doctor;
  patient: Patient;
  status: string;
  position: number;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  patient: Patient;
  total: number;
  status?: string;
  items: InvoiceItem[];
}
