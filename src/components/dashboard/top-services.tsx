import { colors, findNextNDaysDate, prepareTopServicesData } from '@/lib/utils';
import { useTopServices } from '@/queries/use-top-services';
import { useMemo, useState } from 'react';
import { Pie, PieChart } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Skeleton } from '../ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

export default function TopServices() {
  const [start] = useState(findNextNDaysDate(-1));
  const [end, setEnd] = useState(findNextNDaysDate(-8));
  const { data: services, isLoading } = useTopServices({ start, end });

  const chartData = prepareTopServicesData(services || []);

  const chartConfig: ChartConfig = useMemo(() => {
    const config: ChartConfig = {
      services: {
        label: 'Services'
      }
    };

    for (let i = 0; i < chartData.length; i++) {
      const data = chartData[i];
      config[`${data.title.toLowerCase()}`] = { label: data.title, color: `${colors[i]}` };
    }
    return config;
  }, [chartData]);

  return (
    <section className="w-full">
      <div className="flex justify-between">
        <h3 className="mb-3 text-xl font-semibold">Top Services</h3>
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

      <div className="grid w-full max-w-full space-y-10 overflow-x-auto scrollbar-thin lg:grid-cols-2 lg:space-y-0">
        <div>
          <Table className="border border-neutral-300">
            <TableHeader>
              <TableRow className="border-neutral-300">
                <TableHead>Rank</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>No. of appointments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services?.map((service, i) => (
                <TableRow key={service.id} className="border-neutral-300">
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell>{service.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isLoading && <Skeleton className="h-60 rounded-none" />}
        </div>

        <div className="grid w-full place-items-center">
          {!isLoading && (
            <ChartContainer config={chartConfig} className="w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={chartData} dataKey="count" label nameKey="title" />
              </PieChart>
            </ChartContainer>
          )}

          {isLoading && <Skeleton className="aspect-square w-1/2 rounded-full" />}
        </div>
      </div>
    </section>
  );
}
