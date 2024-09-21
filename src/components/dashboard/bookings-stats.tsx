import { findNextNDaysDate } from '@/lib/utils';
import { useBookingsStats } from '@/queries/use-bookings-stats';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Skeleton } from '../ui/skeleton';
import LineChart from './line-chart';

export default function BookingsStats() {
  const [start] = useState(findNextNDaysDate(0));
  const [end, setEnd] = useState(findNextNDaysDate(-7));
  const { data: stats, isLoading } = useBookingsStats({ start, end });

  return (
    <section className="mt-32">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Bookings Statistics</h3>
        <Select value={end} onValueChange={setEnd}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Past 30 days" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={findNextNDaysDate(-7)}>Past 7 days</SelectItem>
            <SelectItem value={findNextNDaysDate(-30)}>Past 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading && <Skeleton className="h-80" />}
      {!isLoading && <LineChart stats={stats || []} type="booking" />}
    </section>
  );
}
