'use client';
import AddStaffDialog from '@/components/dialogs/add-staff-dialog';
import StaffProfileDialog from '@/components/dialogs/staff-profile-dialog';
import StaffOptionsDropdown from '@/components/dropdowns/staff-options-dropdown';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Avatar from '@/components/utils/avatar';
import { updateUserKey } from '@/mutations/use-update-user';
import { useProfile } from '@/queries/use-profile';
import { useStaffs } from '@/queries/use-staffs';
import { useIsMutating } from '@tanstack/react-query';
import {
  AlertCircle,
  CircleUser,
  Dot,
  EllipsisVertical,
  Loader2,
  ShieldCheck,
  UserRoundPlus
} from 'lucide-react';

export default function Page() {
  const { data: staffs, isLoading, error } = useStaffs();

  return (
    <main className="w-full flex-1 overflow-x-auto p-4">
      <section className="flex justify-between">
        <h3 className="text-lg font-semibold">All Staffs</h3>

        <AddStaffDialog>
          <Button Icon={UserRoundPlus} className="flex items-center space-x-2">
            Add new Staff
          </Button>
        </AddStaffDialog>
      </section>

      <div className="w-full max-w-full overflow-x-auto scrollbar-thin">
        {error && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="size-4" />
            <AlertTitle>Could not load staffs!</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <Table>
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

        {isLoading && <Skeleton className="mt-2 h-80 w-full" />}
      </div>
    </main>
  );
}

function Staff({ staff }: { staff: User }) {
  const { data: profile } = useProfile();
  const isUpdatingStaff = !!useIsMutating({
    mutationKey: updateUserKey(staff.id)
  });
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
        {profile?.id !== staff.id && (
          <StaffOptionsDropdown staff={staff}>
            <button className="">
              {isUpdatingStaff ? (
                <Loader2 className="size-4 animate-spin text-gray-900" />
              ) : (
                <EllipsisVertical className="size-4 text-gray-900" />
              )}
            </button>
          </StaffOptionsDropdown>
        )}
      </TableCell>
    </TableRow>
  );
}
