import { backend_url } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useTopServices = ({ start, end }: { start: string; end: string }) => {
  return useQuery({
    queryKey: ['top-services', { start, end }],
    queryFn: ({ signal }) => fetchServicesStats({ signal, start, end })
  });
};

export type TopService = {
  id: string;
  title: string;
  count: number;
};
const fetchServicesStats = async ({
  signal,
  start,
  end
}: {
  signal: AbortSignal;
  start: string;
  end: string;
}): Promise<TopService[]> => {
  try {
    const url = new URL(`${backend_url}/api/stats/services`);
    url.searchParams.set('start', start);
    url.searchParams.set('end', end);

    const res = await axios.get<{ services: TopService[] }>(url.href, {
      withCredentials: true,
      signal
    });

    return res.data.services;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
