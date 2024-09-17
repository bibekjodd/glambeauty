import { backend_url } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useAppointments = () => {
  return useInfiniteQuery({
    queryKey: ['appointments'],
    queryFn: ({ signal, pageParam }) => fetchAppointments({ signal, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam(lastPage) {
      return lastPage[lastPage.length - 1]?.starts_at;
    }
  });
};

const fetchAppointments = async ({
  signal,
  cursor
}: {
  signal: AbortSignal;
  cursor: string | undefined;
}): Promise<Appointment[]> => {
  try {
    const url = new URL(`${backend_url}/api/appointments`);
    cursor && url.searchParams.set('cursor', cursor);
    const res = await axios.get<{ appointments: Appointment[] }>(url.href, {
      signal,
      withCredentials: true
    });
    return res.data.appointments;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
