import { http } from '@/api/client';
import { Invoice } from '@/types';

export interface InvoicePayload {
  patientId: string;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
}

export const createInvoice = async (payload: InvoicePayload) => {
  const { data } = await http.post<Invoice>('/billing/invoice', payload);
  return data;
};

export const getInvoice = async (id: string) => {
  const { data } = await http.get<Invoice>(`/billing/invoice/${id}`);
  return data;
};
