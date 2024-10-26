import { backendUrl } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

type KeyOptions = {
  userId: string | null;
  status: AppointmentStatus | null;
};

export const adminAppointmentsKey = (options: KeyOptions) => ['admin-appointments', options];

export const useAdminAppointments = ({ userId, status }: KeyOptions) => {
  return useInfiniteQuery({
    queryKey: adminAppointmentsKey({ userId, status }),
    queryFn: ({ signal, pageParam }) =>
      fetchAppointments({ signal, cursor: pageParam, userId, status }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam(lastPage) {
      return lastPage[lastPage.length - 1]?.startsAt;
    },
    refetchOnWindowFocus: true
  });
};

type Options = { signal: AbortSignal; cursor: string | undefined } & KeyOptions;
const fetchAppointments = async ({
  signal,
  cursor,
  userId,
  status
}: Options): Promise<Appointment[]> => {
  try {
    const url = new URL(`${backendUrl}/api/appointments/all`);
    cursor && url.searchParams.set('cursor', cursor);
    userId && url.searchParams.set('userId', userId);
    status && url.searchParams.set('status', status);
    const res = await axios.get<{ appointments: Appointment[] }>(url.href, {
      signal,
      withCredentials: true
    });
    return res.data.appointments;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
