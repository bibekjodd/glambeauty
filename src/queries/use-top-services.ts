import { backendUrl } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type KeyOptions = { start: string; end: string };
export const topServicesKey = (options: KeyOptions) => ['top-services', options];

export const useTopServices = ({ start, end }: KeyOptions) => {
  return useQuery({
    queryKey: topServicesKey({ start, end }),
    queryFn: ({ signal }) => fetchServicesStats({ signal, start, end })
  });
};

export type TopService = {
  id: string;
  title: string;
  count: number;
};
type Options = { signal: AbortSignal } & KeyOptions;
const fetchServicesStats = async ({ signal, start, end }: Options): Promise<TopService[]> => {
  try {
    const url = new URL(`${backendUrl}/api/stats/services`);
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
