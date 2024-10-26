import { backendUrl } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type KeyOptions = { start: string; end: string };
export const topStaffsKey = (options: KeyOptions) => ['top-staffs', options];

export const useTopStaffs = ({ start, end }: KeyOptions) => {
  return useQuery({
    queryKey: topStaffsKey({ start, end }),
    queryFn: ({ signal }) => fetchTopStaffs({ signal, start, end })
  });
};

type Result = User & { count: number };
type Options = { signal: AbortSignal } & KeyOptions;
const fetchTopStaffs = async ({ signal, start, end }: Options): Promise<Result[]> => {
  try {
    const url = new URL(`${backendUrl}/api/stats/staffs`);
    url.searchParams.set('start', start);
    url.searchParams.set('end', end);

    const res = await axios.get<{ staffs: Result[] }>(url.href, {
      withCredentials: true,
      signal
    });

    return res.data.staffs;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
