import { backendUrl } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const staffsKey = ['staffs'];

export const useStaffs = () => {
  return useQuery({
    queryKey: staffsKey,
    queryFn: fetchStaffs,
    refetchOnWindowFocus: true
  });
};

const fetchStaffs = async ({ signal }: { signal: AbortSignal }) => {
  try {
    const res = await axios.get<{ staffs: User[] }>(`${backendUrl}/api/staffs`, {
      withCredentials: true,
      signal
    });
    return res.data.staffs;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
