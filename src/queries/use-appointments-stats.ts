import { backendUrl } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type KeyOptions = { start: string; end: string };
export const appointmentsStatsKey = (options: KeyOptions) => ['appointments-stats', options];

export const useAppointmentsStats = ({ start, end }: KeyOptions) => {
  return useQuery({
    queryKey: appointmentsStatsKey({ start, end }),
    queryFn: ({ signal }) => fetchAppointments({ signal, start, end })
  });
};

type Options = { signal: AbortSignal } & KeyOptions;
const fetchAppointments = async ({ signal, start, end }: Options): Promise<AppointmentStats[]> => {
  try {
    const url = new URL(`${backendUrl}/api/stats/appointments`);
    url.searchParams.set('start', start);
    url.searchParams.set('end', end);
    const res = await axios.get<{ appointments: Appointment[] }>(url.href, {
      withCredentials: true,
      signal
    });
    return res.data.appointments;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
