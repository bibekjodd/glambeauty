import { backendUrl } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const appointmentKey = (id: string) => ['appointment', id];

export const useAppointment = (id: string) => {
  return useQuery({
    queryKey: appointmentKey(id),
    queryFn: ({ signal }) => fetchAppointment({ id, signal }),
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    enabled: !!id
  });
};

const fetchAppointment = async ({
  id,
  signal
}: {
  id: string;
  signal: AbortSignal;
}): Promise<Appointment> => {
  try {
    const res = await axios.get<{ appointment: Appointment }>(
      `${backendUrl}/api/appointments/${id}`,
      { withCredentials: true, signal }
    );
    return res.data.appointment;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
