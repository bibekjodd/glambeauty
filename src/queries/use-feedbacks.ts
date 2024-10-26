import { backendUrl } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export const feedbacksKey = (rating?: number) => ['feedbacks', rating];

export const useFeedbacks = (rating?: number) => {
  return useInfiniteQuery({
    queryKey: feedbacksKey(rating),
    queryFn: ({ signal, pageParam }) => fetchFeedbacks({ signal, cursor: pageParam, rating }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam(lastPage) {
      return lastPage[lastPage.length - 1]?.receivedAt;
    }
  });
};

const fetchFeedbacks = async ({
  cursor,
  rating,
  signal
}: {
  signal: AbortSignal;
  cursor: string | undefined;
  rating: number | undefined;
}): Promise<Feedback[]> => {
  try {
    const url = new URL(`${backendUrl}/api/feedbacks`);
    cursor && url.searchParams.set('cursor', cursor);
    rating && url.searchParams.set('rating', rating.toString());
    const res = await axios.get<{ feedbacks: Feedback[] }>(url.href, {
      withCredentials: true,
      signal
    });
    return res.data.feedbacks;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
