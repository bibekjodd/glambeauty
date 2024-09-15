import { backend_url } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useUsers = ({ search, enabled }: { search: string; enabled: boolean }) => {
  return useInfiniteQuery({
    queryKey: ['users', search],
    queryFn: ({ signal, pageParam }) => fetchUsers({ search, signal, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages, lastPageParam) {
      if (lastPage.length) return lastPageParam + 1;
      return undefined;
    },
    enabled
  });
};

const fetchUsers = async ({
  search,
  signal,
  page
}: {
  search: string;
  signal: AbortSignal;
  page: number;
}) => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set('q', search);
    searchParams.set('page', page.toString());
    const url = `${backend_url}/api/users?${searchParams.toString()}`;
    const res = await axios.get<{ users: User[] }>(url, { signal });
    return res.data.users;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
