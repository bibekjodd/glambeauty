import { backend_url } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useAppointmentsStats = ({ start, end }: { start: string; end: string }) => {
  return useQuery({
    queryKey: ['appointments-stats', { start, end }],
    queryFn: ({ signal }) => fetchAppointments({ signal, start, end })
  });
};

const fetchAppointments = async ({
  signal,
  start,
  end
}: {
  signal: AbortSignal;
  start: string;
  end: string;
}): Promise<AppointmentStats[]> => {
  try {
    const url = new URL(`${backend_url}/api/stats/appointments`);
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
