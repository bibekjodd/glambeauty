import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { AppointmentsChartData } from '@/lib/utils';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

const chartConfig = {
  appointments: {
    label: 'Appointments'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'hsl(var(--chart-1))'
  },
  pending: {
    label: 'Pending',
    color: 'hsl(var(--chart-2))'
  },
  completed: {
    label: 'Completed',
    color: 'hsl(var(--chart-3))'
  }
} satisfies ChartConfig;

export default function DashboardAreaChart({ data }: { data: AppointmentsChartData[] }) {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-60 w-full md:h-80">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="fillCancelled" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-cancelled)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-cancelled)" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <defs>
          <linearGradient id="fillPending" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-pending)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-pending)" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <defs>
          <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-completed)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-completed)" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            });
          }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
              indicator="dot"
            />
          }
        />

        <Area
          dataKey="cancelled"
          type="natural"
          fill="url(#fillCancelled)"
          stroke="var(--color-cancelled)"
          stackId="a"
        />

        <Area
          dataKey="pending"
          type="natural"
          fill="url(#fillPending)"
          stroke="var(--color-pending)"
          stackId="a"
        />
        <Area
          dataKey="completed"
          type="natural"
          fill="url(#fillCompleted)"
          stroke="var(--color-completed)"
          stackId="a"
        />

        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}
