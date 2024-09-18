import { backend_url } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useTopStaffs = ({ start, end }: { start: string; end: string }) => {
  return useQuery({
    queryKey: ['top-staffs', { start, end }],
    queryFn: ({ signal }) => fetchTopStaffs({ signal, start, end })
  });
};

type Result = User & { count: number };
const fetchTopStaffs = async ({
  signal,
  start,
  end
}: {
  signal: AbortSignal;
  start: string;
  end: string;
}): Promise<Result[]> => {
  try {
    const url = new URL(`${backend_url}/api/stats/staffs`);
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
