import { backend_url } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useBookingsStats = ({ start, end }: { start: string; end: string }) => {
  return useQuery({
    queryKey: ['bookings-stats', { start, end }],
    queryFn: ({ signal }) => fetchBookings({ signal, start, end })
  });
};

const fetchBookings = async ({
  signal,
  start,
  end
}: {
  signal: AbortSignal;
  start: string;
  end: string;
}): Promise<AppointmentStats[]> => {
  try {
    const url = new URL(`${backend_url}/api/stats/bookings`);
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
