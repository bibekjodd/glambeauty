import { inter, poppins } from '@/lib/fonts';
import { useAppointments } from '@/queries/use-appointments';
import { useProfile } from '@/queries/use-profile';
import { CircleCheck, CircleSlash, Clock12, EllipsisVertical } from 'lucide-react';
import React from 'react';
import AppointmentOptionsMenu from '../dropdowns/appointment-options-menu';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '../ui/drawer';
import Avatar from '../utils/avatar';
import InfiniteScrollObserver from '../utils/infinite-scroll-observer';

export default function AppointmentsDrawer({ children }: { children: React.ReactNode }) {
  const { data, isFetching, fetchNextPage, hasNextPage, isLoading } = useAppointments();
  const appointments = data?.pages.flat(1) || [];
  const { data: profile } = useProfile();
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="ml-5 h-full w-full max-w-screen-sm sm:ml-auto sm:rounded-r-none">
        <DrawerHeader>
          <DrawerTitle className="text-center">Appointments history</DrawerTitle>
        </DrawerHeader>

        <div className="h-full space-y-3 overflow-y-auto px-4 scrollbar-thin">
          {!isLoading && appointments.length === 0 && (
            <p className="font-medium">
              {profile?.role === 'user'
                ? 'You have not previously made any appointments!'
                : 'No customers has made any appointments with you yet!'}
            </p>
          )}
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
          <InfiniteScrollObserver
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
          />
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const date = new Date(appointment.starts_at);
  if (new Date().toISOString() > appointment.status) appointment.status = 'completed';
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const completionDate = new Date(date.getTime() + appointment.service.duration * 60 * 60 * 1000);
  const completionMonth = completionDate.toLocaleString('default', { month: 'long' });
  const completionHours = completionDate.getHours();
  const completionMinutes = completionDate.getMinutes();
  return (
    <section
      className={`${poppins.className} flex items-start justify-between rounded-lg border px-4 py-3 font-medium ${appointment.status === 'pending' ? 'bg-sky-600/20' : ''} ${appointment.status === 'completed' ? 'bg-emerald-600/20' : ''} ${appointment.status === 'cancelled' ? 'bg-rose-600/20' : ''}`}
    >
      <div className="flex flex-col">
        <div
          className={`flex w-fit items-center space-x-1 rounded-full px-2 py-0.5 text-sm font-normal ${appointment.status === 'pending' ? 'bg-sky-600/30 text-sky-500' : ''} ${appointment.status === 'completed' ? 'bg-green-600/30 text-green-500' : ''} ${appointment.status === 'cancelled' ? 'bg-rose-600/30 text-rose-500' : ''}`}
        >
          <span className="capitalize">
            {appointment.status === 'pending' ? 'Upcoming' : appointment.status}
          </span>
          {appointment.status === 'pending' && <Clock12 className="size-4" />}
          {appointment.status === 'completed' && <CircleCheck className="size-4" />}
          {appointment.status === 'cancelled' && <CircleSlash className="size-4" />}
        </div>

        <h3 className="mt-1 text-lg font-semibold text-pink-500">{appointment.service.title}</h3>
        <div className="mt-1 flex items-center space-x-2">
          <p>Stylist:</p>
          <Avatar src={appointment.staff.image} variant="sm" />
          <p>{appointment.staff.name}</p>
        </div>
        <p className="mt-1">Charge: Rs. {appointment.service.price}</p>
        <p className="mt-1 text-sm italic text-gray-600">
          Date: {month} {day}, {hours % 12 || 12}
          {minutes !== 0 ? `:${minutes}` : ''}
          {hours >= 12 ? 'pm' : 'am'} - {month !== completionMonth ? ` ${completionMonth},` : ''}{' '}
          {completionHours % 12 || 12}
          {completionMinutes !== 0 ? `:${completionMinutes}` : ''}
          {completionHours >= 12 ? 'pm' : 'am'}
        </p>

        {appointment.cancelReason && (
          <div className={`mt-3 text-gray-800 ${inter.className}`}>
            <span>Cancel Reason:</span> <span>{appointment.cancelReason}</span>
          </div>
        )}
      </div>

      {appointment.status === 'pending' && (
        <AppointmentOptionsMenu appointment={appointment}>
          <button>
            <EllipsisVertical className="size-4 text-gray-700" />
          </button>
        </AppointmentOptionsMenu>
      )}
    </section>
  );
}
