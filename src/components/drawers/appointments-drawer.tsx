import { useAppointments } from '@/queries/use-appointments';
import { useProfile } from '@/queries/use-profile';
import React from 'react';
import AppointmentCard from '../cards/appointment-card';
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
import InfiniteScrollObserver from '../utils/infinite-scroll-observer';

export default function AppointmentsDrawer({ children }: { children: React.ReactNode }) {
  const { data, isFetching, fetchNextPage, hasNextPage, isLoading } = useAppointments();
  const appointments = data?.pages.flat(1) || [];
  const { data: profile } = useProfile();
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="ml-5 h-screen w-full max-w-screen-sm sm:ml-auto sm:rounded-r-none">
        <DrawerHeader>
          <DrawerTitle className="text-center">Appointments history</DrawerTitle>
        </DrawerHeader>

        {!isLoading && appointments.length === 0 && (
          <p className="px-4 font-medium">
            {profile?.role === 'user'
              ? 'You have not previously made any appointments!'
              : 'No customers has made any appointments with you yet!'}
          </p>
        )}
        <div className="h-full space-y-3 overflow-y-auto px-4 scrollbar-thin">
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
