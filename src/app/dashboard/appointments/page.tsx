'use client';
import AppointmentCard from '@/components/cards/appointment-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import InfiniteScrollObserver from '@/components/utils/infinite-scroll-observer';
import { useAdminAppointments } from '@/queries/use-admin-appointments';
import { CheckCircle, CircleSlash, Clock12, ListFilter, TextQuote } from 'lucide-react';
import { useState } from 'react';

const statusOptions = ['all', 'pending', 'completed', 'cancelled'] as const;
export default function Page() {
  const [status, setStatus] = useState<AppointmentStatus | 'all'>('all');
  const { data, isFetching, hasNextPage, fetchNextPage } = useAdminAppointments({
    userId: null,
    status: status === 'all' ? null : status
  });
  const appointments = data?.pages.flat(1) || [];
  return (
    <main>
      <div className="sticky left-0 top-16 z-10 mb-4 flex w-full items-center space-x-5 bg-white/80 px-4 py-4 filter backdrop-blur-2xl lg:left-60">
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
                  className={`flex items-center space-x-2 pr-2 ${status === 'all' ? 'text-violet-600' : ''} ${status === 'completed' ? 'text-green-600' : ''} ${status === 'pending' ? 'text-sky-600' : ''} ${status === 'cancelled' ? 'text-rose-600' : ''} `}
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
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            queryKey={[
              'admin-appointments',
              { userId: null, status: status === 'all' ? null : status }
            ]}
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
