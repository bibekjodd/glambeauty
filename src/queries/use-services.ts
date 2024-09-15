import { backend_url } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
    refetchOnWindowFocus: true
  });
};

const fetchServices = async ({ signal }: { signal: AbortSignal }) => {
  try {
    const res = await axios.get<{ services: Service[] }>(`${backend_url}/api/services`, {
      withCredentials: true,
      signal
    });
    return res.data.services;
  } catch (err) {
    throw new Error(extractErrorMessage(err));
  }
};
