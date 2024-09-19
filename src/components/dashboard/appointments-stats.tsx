import {
  AppointmentsChartData,
  findNextNDaysDate,
  prepareAppointmentsChartData
} from '@/lib/utils';
import { useAppointmentsStats } from '@/queries/use-appointments-stats';
import { useMemo, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import DashboardAreaChart from './dashboard-area-chart';

export default function AppointmentsStats() {
  const [start, setStart] = useState(findNextNDaysDate(8));
  const [end] = useState(findNextNDaysDate(0));

  const { data: stats } = useAppointmentsStats({ start, end });
  const chartData: AppointmentsChartData[] = useMemo(() => {
    return prepareAppointmentsChartData(stats || []);
  }, [stats]);

  return (
    <section>
      <div className="flex items-center justify-between">
        <h3 className="mb-5 text-xl font-semibold">Upcoming Appointments</h3>
        <Select value={start} onValueChange={setStart}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Next 30 days" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={findNextNDaysDate(8)}>Next 7 days</SelectItem>
            <SelectItem value={findNextNDaysDate(31)}>Next 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DashboardAreaChart data={chartData} />
    </section>
  );
}
