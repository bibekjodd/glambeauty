import { findNextNDaysDate } from '@/lib/utils';
import { useTopStaffs } from '@/queries/use-top-staffs';
import { useState } from 'react';
import StaffProfileDialog from '../dialogs/staff-profile-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import Avatar from '../utils/avatar';

export default function TopStaffs() {
  const [start] = useState(findNextNDaysDate(-1));
  const [end, setEnd] = useState(findNextNDaysDate(-8));
  const { data: staffs } = useTopStaffs({ start, end });

  return (
    <section className="mt-32">
      <div className="flex justify-between">
        <h3 className="mb-5 text-xl font-semibold">Top Staffs</h3>
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

      <div className="grid w-full space-y-10 lg:grid-cols-2 lg:space-y-0">
        <div className="relative">
          <div className="absolute left-0 aspect-square size-96 rounded-full bg-fuchsia-600/5 mix-blend-multiply blur-3xl filter" />
          <div className="absolute right-0 aspect-square size-96 rounded-full bg-pink-600/5 mix-blend-multiply blur-3xl filter" />

          <Table className="border border-neutral-300">
            <TableHeader>
              <TableRow className="border-neutral-300">
                <TableHead>Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>No. of appointments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffs?.map((staff, i) => (
                <TableRow key={staff.id} className="border-neutral-300">
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">
                    <StaffProfileDialog staff={staff}>
                      <button className="flex items-center space-x-3">
                        <Avatar src={staff.image} variant="sm" />
                        <span>{staff.name}</span>
                      </button>
                    </StaffProfileDialog>
                  </TableCell>
                  <TableCell>{staff.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
