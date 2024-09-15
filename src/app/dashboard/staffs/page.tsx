'use client';
import StaffOptionsDropdown from '@/components/dropdowns/staff-options-dropdown';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Avatar from '@/components/utils/avatar';
import AddStaffDialog from '@/dialogs/add-staff-dialog';
import StaffProfileDialog from '@/dialogs/staff-profile-dialog';
import { useStaffs } from '@/queries/use-staffs';
import { useIsMutating } from '@tanstack/react-query';
import {
  CircleUser,
  Dot,
  EllipsisVertical,
  Loader2,
  ShieldCheck,
  UserRoundPlus
} from 'lucide-react';

export default function Page() {
  const { data: staffs } = useStaffs();

  return (
    <main className="px-5">
      <section className="mt-7 flex justify-between">
        <h3 className="text-lg font-semibold">All Staffs</h3>

        <AddStaffDialog>
          <Button className="flex items-center space-x-2">
            <span>Add new staff</span>
            <UserRoundPlus className="size-4" />
          </Button>
        </AddStaffDialog>
      </section>

      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>Staff</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>
              <span>Status</span>
              <Dot className="inline-block size-6 -translate-x-1 scale-150 animate-pulse text-green-500" />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="font-medium">
          {staffs?.map((staff) => <Staff staff={staff} key={staff.id} />)}
        </TableBody>
      </Table>
    </main>
  );
}

function Staff({ staff }: { staff: User }) {
  const isUpdatingStaff = !!useIsMutating({ mutationKey: ['update-user', staff.id] });
  return (
    <TableRow key={staff.id}>
      <TableCell>
        <StaffProfileDialog staff={staff}>
          <button className="flex items-center space-x-3">
            <Avatar src={staff.image} />
            <span className="text-base font-semibold">{staff.name}</span>
          </button>
        </StaffProfileDialog>
      </TableCell>
      <TableCell className="capitalize">
        <div className="flex items-center space-x-1">
          {staff.role === 'admin' ? (
            <ShieldCheck className="size-5 fill-green-600 text-white" />
          ) : (
            <CircleUser className="size-5 fill-sky-600 text-white" />
          )}
          <span>{staff.role}</span>
        </div>
      </TableCell>
      <TableCell>
        {staff.active ? (
          <span className="rounded-full bg-green-600/20 px-2 py-0.5 text-green-600">Active</span>
        ) : (
          <span className="rounded-full bg-amber-600/10 px-2 py-0.5 text-amber-600">Inactive</span>
        )}
      </TableCell>
      <TableCell>
        <StaffOptionsDropdown staff={staff}>
          <button className="">
            {isUpdatingStaff ? (
              <Loader2 className="size-5 animate-spin text-gray-900" />
            ) : (
              <button>
                <EllipsisVertical className="size-5 text-gray-900" />
              </button>
            )}
          </button>
        </StaffOptionsDropdown>
      </TableCell>
    </TableRow>
  );
}
