import { backendUrl } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export const appointmentsKey = ['appointments'];

export const useAppointments = () => {
  return useInfiniteQuery({
    queryKey: appointmentsKey,
    queryFn: ({ signal, pageParam }) => fetchAppointments({ signal, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam(lastPage) {
      return lastPage[lastPage.length - 1]?.startsAt;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true
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
    const url = new URL(`${backendUrl}/api/appointments`);
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
