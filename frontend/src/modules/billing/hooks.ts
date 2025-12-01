import { useMutation, useQuery } from '@tanstack/react-query';
import { createInvoice, getInvoice, InvoicePayload } from './api';

export const useCreateInvoice = () =>
  useMutation({
    mutationFn: (payload: InvoicePayload) => createInvoice(payload),
  });

export const useInvoice = (id: string | null) =>
  useQuery({
    queryKey: ['invoice', id],
    queryFn: () => getInvoice(id as string),
    enabled: Boolean(id),
  });
