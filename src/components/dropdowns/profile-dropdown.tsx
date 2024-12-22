import { useProfile } from '@/queries/use-profile';
import { ProgressButton } from '@jodd/next-top-loading-bar';
import {
  BellIcon,
  BookTextIcon,
  LayoutGridIcon,
  LogOutIcon,
  NotebookPenIcon,
  UserIcon
} from 'lucide-react';
import React from 'react';
import { openLogoutDialog } from '../dialogs/logout-dialog';
import { openProfileDialog } from '../dialogs/profile-dialog';
import { openSelectAppointmentDialog } from '../dialogs/select-appointment-dialog';
import { openApppointmentsDrawer } from '../drawers/appointments-drawer';
import { openNotificationsDrawer } from '../drawers/notifications-drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';

type Props = { children: React.ReactNode };
export default function ProfileDropdown({ children }: Props) {
  const { data: profile } = useProfile();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-44 [&_svg]:mr-2 [&_svg]:size-4">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={openProfileDialog}>
          <UserIcon />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={openNotificationsDrawer}>
          <BellIcon />
          <span>Notifications</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={openApppointmentsDrawer}>
          <BookTextIcon />
          <span>Appointments</span>
        </DropdownMenuItem>

        {profile?.role === 'user' && (
          <DropdownMenuItem
            onClick={() => openSelectAppointmentDialog()}
            className="flex w-full items-center px-2 py-1.5"
          >
            <NotebookPenIcon />
            <span>Book an appointment</span>
          </DropdownMenuItem>
        )}

        {profile?.role === 'admin' && (
          <DropdownMenuItem>
            <ProgressButton href="/dashboard" className="flex items-center">
              <LayoutGridIcon className="size-4" />
              <span>Dashboard</span>
            </ProgressButton>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={openLogoutDialog}>
          <LogOutIcon />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
