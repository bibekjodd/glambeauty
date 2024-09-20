'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import Avatar from '@/components/utils/avatar';
import InfiniteScrollObserver from '@/components/utils/infinite-scroll-observer';
import { useFeedbacks } from '@/queries/use-feedbacks';
import { CircleAlert, ListFilter, Star } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';

export default function Page() {
  const [rating, setRating] = useState<string>('all');
  const { data, isFetching, hasNextPage, fetchNextPage, isLoading, error } = useFeedbacks(
    rating === 'all' ? undefined : Number(rating) || undefined
  );
  const feedbacks = data?.pages.flat(1) || [];
  return (
    <main>
      <div className="sticky left-0 top-16 z-10 bg-white/80 px-4 py-4 filter backdrop-blur-2xl lg:left-60">
        <h3 className="mb-2 text-xl font-semibold lg:hidden">User Feedbacks</h3>
        <div className="flex items-center space-x-5 bg-white/80">
          <div className="flex items-center space-x-2">
            <ListFilter className="size-4" />
            <span className="font-medium">Filter by Ratings</span>
          </div>

          <Select value={rating} onValueChange={setRating}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="All" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {new Array(5).fill('nothing').map((val, i) => (
                <SelectItem key={i} value={(i + 1).toString()}>
                  {i + 1} stars
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col space-y-3 px-4">
        {error && (
          <Alert variant="destructive">
            <CircleAlert className="size-4" />
            <AlertTitle>Could not load feedbacks</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        {isLoading && new Array(6).fill('nothing').map((_, i) => <div key={i}>{skeleton}</div>)}

        {feedbacks.map((feedback) => (
          <FeedbackCard key={feedback.id} feedback={feedback} />
        ))}
        <InfiniteScrollObserver
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          showLoader
        />
      </div>
    </main>
  );
}

function FeedbackCard({ feedback }: { feedback: Feedback }) {
  return (
    <section className="rounded-lg border bg-gray-100/40 p-4">
      <div className="flex items-center space-x-3">
        <Avatar src={feedback.user.image} />
        <div className="flex flex-col -space-y-1.5">
          <span className="font-semibold">{feedback.user.name}</span>
          <div>
            {new Array(Math.round(feedback.rating)).fill('nothing').map((val, i) => (
              <Star key={i} className="inline size-3.5 fill-amber-500 text-amber-500" />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2">
        <h3 className="font-medium">{feedback.title}</h3>
        <p className="text-sm text-gray-600">{feedback.text}</p>
      </div>

      <p className="mt-0.5 text-sm text-gray-500">
        posted: {moment(feedback.receivedAt).fromNow()}
      </p>
    </section>
  );
}

const skeleton = (
  <div className="space-y-1.5 rounded-lg border bg-gray-50 p-4">
    <div className="mb-4 flex space-x-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-7 w-full max-w-72" />
        <Skeleton className="h-6 w-36" />
      </div>
    </div>
    <Skeleton className="h-6 w-60" />
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-6 w-60" />
  </div>
);
