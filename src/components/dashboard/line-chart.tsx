import { prepareAppointmentsChartData } from '@/lib/utils';
import { Info } from 'lucide-react';
import { useMemo } from 'react';
import { AxisOptions, Chart } from 'react-charts';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

type Data = {
  count: number;
  date: Date;
};

type Series = {
  label: AppointmentStatus;
  data: Data[];
};

export default function LineChart({
  stats,
  type
}: {
  stats: AppointmentStats[];
  type: 'appointment' | 'booking';
}) {
  const data: Series[] = useMemo((): Series[] => {
    if (!stats || stats.length === 0)
      return [
        { data: [{ count: 0, date: new Date() }], label: 'pending' },
        { data: [{ count: 0, date: new Date() }], label: 'completed' },
        { data: [{ count: 0, date: new Date() }], label: 'cancelled' }
      ];
    const allData = prepareAppointmentsChartData({ stats, type });

    const pendingData: Data[] = allData.map((item) => ({
      count: item.pending,
      date: new Date(item.date)
    }));

    const completedData: Data[] = allData.map((item) => ({
      count: item.completed,
      date: new Date(item.date)
    }));

    const cancelledData: Data[] = allData.map((item) => ({
      count: item.cancelled,
      date: new Date(item.date)
    }));

    return [
      { data: pendingData, label: 'pending' },
      { data: completedData, label: 'completed' },
      { data: cancelledData, label: 'cancelled' }
    ];
  }, [stats, type]);

  const primaryAxis: AxisOptions<Data> = { getValue: (data) => new Date(data.date) };
  const secondaryAxes: AxisOptions<Data>[] = [{ getValue: (data) => data.count }];

  const chartColors = {
    pending: '#0ea5e9',
    completed: '#22c55e',
    cancelled: '#f43f5e'
  } as const;

  if (stats.length === 0)
    return (
      <Alert className="bg-transparent" variant={'destructive'}>
        <Info className="size-4" />
        <AlertTitle>No data to show curently!</AlertTitle>
        <AlertDescription>No {type} has been made on the given date</AlertDescription>
      </Alert>
    );

  return (
    <div className="relative h-80 w-full">
      <Chart
        options={{
          data: data,
          primaryAxis,
          secondaryAxes,
          getSeriesStyle(series) {
            return {
              color: chartColors[series.id as keyof typeof chartColors]
            };
          }
        }}
      />
    </div>
  );
}
