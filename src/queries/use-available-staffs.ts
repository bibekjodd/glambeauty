import { backend_url } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useAvailableStaffs = ({
  date,
  serviceId
}: {
  date: string | null;
  serviceId: string | null;
}) => {
  return useQuery({
    queryKey: ['available-staffs', date, serviceId],
    queryFn: ({ signal }) => fetchAvailableStaffs({ signal, date: date!, serviceId: serviceId! }),
    enabled: !!(date && serviceId),
    gcTime: 30_000,
    staleTime: 30_000
  });
};

type Staff = User & { activeAppointments: number };
const fetchAvailableStaffs = async ({
  signal,
  date,
  serviceId
}: {
  signal: AbortSignal;
  date: string;
  serviceId: string;
}) => {
  try {
    const res = await axios.get<{ staffs: Staff[] }>(
      `${backend_url}/api/staffs/available?date=${date}&service_id=${serviceId}`,
      { withCredentials: true, signal }
    );
    return res.data.staffs;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
