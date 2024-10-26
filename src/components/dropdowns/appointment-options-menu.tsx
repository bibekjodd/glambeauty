import { QueryKey } from '@tanstack/react-query';
import React from 'react';
import CancelAppointmentDialog from '../dialogs/cancel-appointment-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';

export default function AppointmentOptionsMenu({
  children,
  appointment,
  queryKey
}: {
  children: React.ReactNode;
  appointment: Appointment;
  queryKey: QueryKey;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Appointment</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <CancelAppointmentDialog id={appointment.id} queryKey={queryKey}>
              <button className="font-medium">Cancel Appointment</button>
            </CancelAppointmentDialog>
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
