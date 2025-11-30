import { http } from '@/api/client';

export const nextQueue = (doctorId: string) => http.post('/queue/next', { doctorId });
export const skipQueue = (doctorId: string) => http.post('/queue/skip', { doctorId });
export const recallQueue = (doctorId: string) => http.post('/queue/recall', { doctorId });
