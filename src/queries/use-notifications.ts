import { backendUrl } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export const notificationsKey = ['notifications'];

export const useNotifications = () => {
  return useInfiniteQuery({
    queryKey: notificationsKey,
    queryFn: ({ signal, pageParam }) => fetchNotifications({ signal, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam(lastPage) {
      return lastPage[lastPage.length - 1]?.receivedAt;
    }
  });
};

const fetchNotifications = async ({
  signal,
  cursor
}: {
  signal: AbortSignal;
  cursor: string | undefined;
}): Promise<NotificationResult[]> => {
  try {
    const url = new URL(`${backendUrl}/api/notifications`);
    cursor && url.searchParams.set('cursor', cursor);
    const res = await axios.get<{ notifications: NotificationResult[] }>(url.href, {
      withCredentials: true,
      signal
    });
    return res.data.notifications;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
