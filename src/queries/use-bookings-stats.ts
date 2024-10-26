import { backendUrl } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type KeyOptions = { start: string; end: string };
export const bookingsStatsKey = (options: KeyOptions) => ['bookings-stats', options];

export const useBookingsStats = ({ start, end }: KeyOptions) => {
  return useQuery({
    queryKey: bookingsStatsKey({ start, end }),
    queryFn: ({ signal }) => fetchBookings({ signal, start, end })
  });
};

type Options = { signal: AbortSignal } & KeyOptions;
const fetchBookings = async ({ signal, start, end }: Options): Promise<AppointmentStats[]> => {
  try {
    const url = new URL(`${backendUrl}/api/stats/bookings`);
    url.searchParams.set('start', start);
    url.searchParams.set('end', end);
    const res = await axios.get<{ bookings: Appointment[] }>(url.href, {
      withCredentials: true,
      signal
    });
    return res.data.bookings;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
