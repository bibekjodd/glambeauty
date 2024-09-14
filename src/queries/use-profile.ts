import { backend_url } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useProfile = () => {
  const query = useQuery({
    queryKey: ['profile'],
    queryFn: ({ signal }) => fetchProfile({ signal }),
    refetchOnWindowFocus: true
  });
  return query;
};

export const fetchProfile = async ({ signal }: { signal: AbortSignal }): Promise<User> => {
  try {
    const url = `${backend_url}/api/profile`;
    const { data } = await axios.get(url, { withCredentials: true, signal });
    return data.user;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
