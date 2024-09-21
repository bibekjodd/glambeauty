import { findNextNDaysDate } from '@/lib/utils';
import { useAppointmentsStats } from '@/queries/use-appointments-stats';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Skeleton } from '../ui/skeleton';
import LineChart from './line-chart';

export default function AppointmentsStats() {
  const [start, setStart] = useState(findNextNDaysDate(8));
  const [end] = useState(findNextNDaysDate(0));
  const { data: stats, isLoading } = useAppointmentsStats({ start, end });

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Upcoming Appointments</h3>
        <Select value={start} onValueChange={setStart}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Next 30 days" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={findNextNDaysDate(8)}>Next 7 days</SelectItem>
            <SelectItem value={findNextNDaysDate(30)}>Next 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading && <Skeleton className="h-80" />}
      {!isLoading && <LineChart stats={stats || []} type="appointment" />}
    </section>
  );
}
