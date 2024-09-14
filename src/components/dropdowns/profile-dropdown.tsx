import LogoutDialog from '@/dialogs/logout-dialog';
import ProfileDialog from '@/dialogs/profile-dialog';
import { useProfile } from '@/queries/use-profile';
import { BookText, LayoutGrid, LogOut, User } from 'lucide-react';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import ProgressButton from '../utils/progress-button';

type Props = { children: React.ReactNode };
export default function ProfileDropdown({ children }: Props) {
  const { data: profile } = useProfile();
  if (!profile) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ProfileDialog>
              <button className="flex">
                <User className="mr-2 size-4" />
                <span>Profile</span>
              </button>
            </ProfileDialog>
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>

        {profile?.role === 'user' && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <button className="flex items-center">
                <BookText className="mr-2 size-4" />
                <span>Appointments</span>
              </button>
            </DropdownMenuSubTrigger>
          </DropdownMenuSub>
        )}

        {profile?.role !== 'user' && (
          <DropdownMenuItem>
            <ProgressButton href="/dashboard" className="flex items-center space-x-2">
              <LayoutGrid className="size-4" />
              <span>Dashboard</span>
            </ProgressButton>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <LogoutDialog>
              <button className="flex">
                <LogOut className="mr-2 size-4" />
                <span>Logout</span>
              </button>
            </LogoutDialog>
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
