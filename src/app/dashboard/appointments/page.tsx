'use client';
import AppointmentCard, { apponitmentCardSkeleton } from '@/components/cards/appointment-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import InfiniteScrollObserver from '@/components/utils/infinite-scroll-observer';
import { cn } from '@/lib/utils';
import { adminAppointmentsKey, useAdminAppointments } from '@/queries/use-admin-appointments';
import {
  CheckCircle,
  CircleAlert,
  CircleSlash,
  Clock12,
  ListFilter,
  TextQuote
} from 'lucide-react';
import { useState } from 'react';

const statusOptions = ['all', 'pending', 'completed', 'cancelled'] as const;
export default function Page() {
  const [status, setStatus] = useState<AppointmentStatus | 'all'>('all');
  const { data, isFetching, hasNextPage, fetchNextPage, isLoading, error } = useAdminAppointments({
    userId: null,
    status: status === 'all' ? null : status
  });
  const appointments = data?.pages.flat(1) || [];
  return (
    <main>
      <div className="sticky left-0 top-16 z-10 flex w-full items-center space-x-5 bg-white/80 px-4 py-4 filter backdrop-blur-2xl lg:left-60">
        <div className="flex items-center space-x-2">
          <ListFilter className="size-4" />
          <span className="font-medium">Filter by Status</span>
        </div>

        <Select value={status} onValueChange={(val) => setStatus(val as AppointmentStatus)}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="All" className="capitalize" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status, i) => (
              <SelectItem key={i} value={status}>
                <div
                  className={cn('flex items-center space-x-2 pr-2', {
                    'text-violet-600': status === 'all',
                    'text-green-600': status === 'completed',
                    'text-sky-600': status === 'pending',
                    'text-rose-600': status === 'cancelled'
                  })}
                >
                  <span className="capitalize">{status === 'pending' ? 'Upcoming' : status}</span>
                  {status === 'all' && <TextQuote className="size-4" />}
                  {status === 'pending' && <Clock12 className="size-4" />}
                  {status === 'completed' && <CheckCircle className="size-4" />}
                  {status === 'cancelled' && <CircleSlash className="size-4" />}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col space-y-3 px-4">
        {isLoading &&
          new Array(6).fill('nothing').map((_, i) => <div key={i}>{apponitmentCardSkeleton}</div>)}

        {error && (
          <Alert variant="destructive">
            <CircleAlert className="size-4" />
            <AlertTitle>Could not load appointments</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            queryKey={adminAppointmentsKey({
              userId: null,
              status: status === 'all' ? null : status
            })}
          />
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
