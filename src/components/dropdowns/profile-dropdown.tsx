import LogoutDialog from '@/dialogs/logout-dialog';
import { LogOut, User } from 'lucide-react';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';

type Props = { children: React.ReactNode };
export default function ProfileDropdown({ children }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <User className="mr-2 size-4" />
            <span>Profile</span>
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>

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
