import { backendUrl } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type KeyOptions = {
  date: string | null;
  serviceId: string | null;
};
export const availableStaffsKey = (options: KeyOptions) => ['available-staffs', options];

export const useAvailableStaffs = ({ date, serviceId }: KeyOptions) => {
  return useQuery({
    queryKey: availableStaffsKey({ date, serviceId }),
    queryFn: ({ signal }) => fetchAvailableStaffs({ signal, date: date!, serviceId: serviceId! }),
    enabled: !!(date && serviceId),
    gcTime: 30_000,
    refetchOnMount: true
  });
};

type Staff = User & { activeAppointments: number };
type Options = { signal: AbortSignal } & KeyOptions;
const fetchAvailableStaffs = async ({ signal, date, serviceId }: Options) => {
  try {
    const res = await axios.get<{ staffs: Staff[] }>(
      `${backendUrl}/api/staffs/available?date=${date}&service_id=${serviceId}`,
      { withCredentials: true, signal }
    );
    return res.data.staffs;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
