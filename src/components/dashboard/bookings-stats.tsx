import {
  AppointmentsChartData,
  findNextNDaysDate,
  prepareAppointmentsChartData
} from '@/lib/utils';
import { useBookingsStats } from '@/queries/use-bookings-stats';
import { useMemo, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import DashboardAreaChart from './dashboard-area-chart';

export default function BookingsStats() {
  const [start] = useState(findNextNDaysDate(-1));
  const [end, setEnd] = useState(findNextNDaysDate(-8));

  const { data: stats } = useBookingsStats({ start, end });
  const chartData: AppointmentsChartData[] = useMemo(() => {
    return prepareAppointmentsChartData(stats || []);
  }, [stats]);

  return (
    <section className="mt-32">
      <div className="flex items-center justify-between">
        <h3 className="mb-5 text-xl font-semibold">Bookings Statistics</h3>
        <Select value={end} onValueChange={setEnd}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Past 30 days" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={findNextNDaysDate(-8)}>Past 7 days</SelectItem>
            <SelectItem value={findNextNDaysDate(-31)}>Past 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DashboardAreaChart data={chartData} />
    </section>
  );
}
