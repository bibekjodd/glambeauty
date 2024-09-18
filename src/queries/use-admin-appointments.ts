import { backend_url } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useAdminAppointments = (userId: string | null) => {
  return useInfiniteQuery({
    queryKey: ['admin-appointments', userId],
    queryFn: ({ signal, pageParam }) => fetchAppointments({ signal, cursor: pageParam, userId }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam(lastPage) {
      return lastPage[lastPage.length - 1]?.startsAt;
    },
    refetchOnWindowFocus: true
  });
};

const fetchAppointments = async ({
  signal,
  cursor,
  userId
}: {
  signal: AbortSignal;
  cursor: string | undefined;
  userId: string | null;
}): Promise<Appointment[]> => {
  try {
    const url = new URL(`${backend_url}/api/appointments/all`);
    cursor && url.searchParams.set('cursor', cursor);
    userId && url.searchParams.set('user_id', userId);
    const res = await axios.get<{ appointments: Appointment[] }>(url.href, {
      signal,
      withCredentials: true
    });
    return res.data.appointments;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
