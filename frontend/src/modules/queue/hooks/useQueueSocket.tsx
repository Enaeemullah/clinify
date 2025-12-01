import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { QueueEntry } from '@/types';
import { http } from '@/api/client';

type QueueSnapshot = Record<string, QueueEntry[]>;

export function useQueueSocket() {
  const [entries, setEntries] = useState<QueueSnapshot>({});

  useEffect(() => {
    http.get<Record<string, QueueEntry[]>>('/queue/public').then(({ data }) => setEntries(data));

    const baseUrl = import.meta.env.VITE_WS_BASE_URL ?? 'http://localhost:3000';
    const socket: Socket = io(`${baseUrl}/queue`, {
      transports: ['websocket'],
    });

    socket.on('queue.update', (payload: { doctorId: string; entries: QueueEntry[] }) => {
      setEntries(prev => ({ ...prev, [payload.doctorId]: payload.entries }));
    });

    socket.on('queue.next', ({ doctorId, entry }) => {
      setEntries(prev => ({ ...prev, [doctorId]: [entry, ...(prev[doctorId] ?? [])] }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const flattened = Object.entries(entries).map(([doctorId, queue]) => ({
    doctorId,
    doctorName: queue[0]?.doctor.fullName ?? 'Doctor',
    currentPatient: queue.find(entry => entry.status === 'serving')?.patient.fullName,
    nextPatient: queue.find(entry => entry.status === 'waiting')?.patient.fullName,
  }));

  return { entries: flattened };
}
