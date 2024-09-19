import StaffProfileDialog from '@/components/dialogs/staff-profile-dialog';
import { useUpdateUser } from '@/mutations/use-update-user';
import { CircleUser, Dot, ShieldCheck, User } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';

type Props = {
  staff: User;
  children: React.ReactNode;
};
export default function StaffOptionsDropdown({ staff, children }: Props) {
  const { mutate } = useUpdateUser(staff.id);

  const updateStaff = (options: { role?: 'staff' | 'admin' | 'user'; active?: boolean }) => {
    mutate(options, {
      onError(err) {
        toast.dismiss();
        toast.error(`Could not update user! ${err.message}`);
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>{staff.name}</DropdownMenuLabel>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <StaffProfileDialog staff={staff}>
              <button className="flex w-full items-center">
                <User className="mr-2 size-4" />
                <span>See profile</span>
              </button>
            </StaffProfileDialog>
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>

        {staff.active && (
          <DropdownMenuItem>
            <button
              onClick={() => updateStaff({ active: false })}
              className="flex items-center text-amber-600"
            >
              <Dot className="mr-2 size-4 scale-150" />
              <span>Set as inactive</span>
            </button>
          </DropdownMenuItem>
        )}

        {!staff.active && (
          <DropdownMenuItem>
            <button
              onClick={() => updateStaff({ active: true })}
              className="flex items-center text-green-600"
            >
              <Dot className="mr-2 size-4 scale-150" />
              <span>Set as active</span>
            </button>
          </DropdownMenuItem>
        )}

        {staff.role !== 'admin' && (
          <DropdownMenuItem className="bg-green-600/10">
            <button onClick={() => updateStaff({ role: 'admin' })} className="flex items-center">
              <ShieldCheck className="mr-2 size-4 fill-green-600 text-white" />
              <span>Promote to admin</span>
            </button>
          </DropdownMenuItem>
        )}

        {staff.role !== 'staff' && (
          <DropdownMenuItem className="bg-sky-600/10">
            <button onClick={() => updateStaff({ role: 'staff' })} className="flex items-center">
              <CircleUser className="mr-2 size-4 fill-sky-600 text-white" />
              <span>Promote to staff</span>
            </button>
          </DropdownMenuItem>
        )}

        {staff.role !== 'user' && (
          <DropdownMenuItem className="bg-fuchsia-600/10">
            <button onClick={() => updateStaff({ role: 'user' })} className="flex items-center">
              <ShieldCheck className="mr-2 size-4 fill-fuchsia-600 text-white" />
              <span>Demote to user</span>
            </button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
