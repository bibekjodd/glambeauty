'use client';

import { adminAppointmentsKey, useAdminAppointments } from '@/queries/use-admin-appointments';
import { appointmentsKey, useAppointments } from '@/queries/use-appointments';
import { useProfile } from '@/queries/use-profile';
import { createStore } from '@jodd/snap';
import { CircleAlertIcon } from 'lucide-react';
import AppointmentCard, { apponitmentCardSkeleton } from '../cards/appointment-card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '../ui/drawer';
import { ScrollArea } from '../ui/scroll-area';
import InfiniteScrollObserver from '../utils/infinite-scroll-observer';

const useAppointmentsDrawer = createStore<{ isOpen: boolean }>(() => ({ isOpen: false }));

const onOpenChange = (isOpen: boolean) => useAppointmentsDrawer.setState({ isOpen });

export const openApppointmentsDrawer = () => onOpenChange(true);

export const closeApppointmentsDrawer = () => onOpenChange(false);

export default function AppointmentsDrawer() {
  const { data: profile } = useProfile();

  const { isOpen } = useAppointmentsDrawer();

  if (!profile) return null;
  return (
    <Drawer direction="right" open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="ml-auto flex h-screen w-full max-w-screen-sm flex-col rounded-none sm:rounded-l-lg">
        <DrawerHeader>
          <DrawerTitle className="text-center">
            {profile.role === 'user' ? 'Appointments History' : ''}
            {profile.role === 'staff' ? 'All Appointments' : ''}
            {profile.role === 'admin' ? 'Manage Appointments' : ''}
          </DrawerTitle>
        </DrawerHeader>

        <ScrollArea className="h-full">
          {profile.role === 'admin' ? <AdminAppointments /> : <CustomerAndStaffAppointments />}
        </ScrollArea>

        <DrawerFooter className="md:hidden">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function CustomerAndStaffAppointments() {
  const { data, isFetching, fetchNextPage, hasNextPage, isLoading, error } = useAppointments();
  const appointments = data?.pages.flat(1) || [];
  const { data: profile } = useProfile();
  return (
    <div className="space-y-3 px-4">
      {!isLoading && appointments.length === 0 && (
        <p className="px-4 font-medium">
          {profile?.role === 'user'
            ? 'You have not previously made any appointments!'
            : 'No customers has made any appointments with you yet!'}
        </p>
      )}

      {isLoading &&
        new Array(6).fill('nothing').map((_, i) => <div key={i}>{apponitmentCardSkeleton}</div>)}

      {error && (
        <Alert variant="destructive">
          <CircleAlertIcon className="size-4" />
          <AlertTitle>Could not load appointments</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          queryKey={appointmentsKey}
        />
      ))}
      <InfiniteScrollObserver
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        showLoader
      />
    </div>
  );
}

function AdminAppointments() {
  const { data, isFetching, fetchNextPage, hasNextPage, isLoading, error } = useAdminAppointments({
    userId: null,
    status: null
  });
  const appointments = data?.pages.flat(1) || [];

  return (
    <div className="space-y-3 px-4">
      {!isLoading && appointments.length === 0 && (
        <p className="px-4 font-medium">'No customers has made any appointments yet!'</p>
      )}

      {isLoading &&
        new Array(6).fill('nothing').map((_, i) => <div key={i}>{apponitmentCardSkeleton}</div>)}

      {error && (
        <Alert variant="destructive">
          <CircleAlertIcon className="size-4" />
          <AlertTitle>Could not load appointments</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          queryKey={adminAppointmentsKey({ status: null, userId: null })}
        />
      ))}
      <InfiniteScrollObserver
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        showLoader
      />
    </div>
  );
}
