'use client';

import { formatDate } from '@/lib/utils';
import { useAppointment } from '@/queries/use-appointment';
import { createStore } from '@jodd/snap';
import { CircleAlertIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Skeleton } from '../ui/skeleton';
import Avatar from '../utils/avatar';

const useAppointmentDetailsDialog = createStore<{ isOpen: boolean }>(() => ({ isOpen: false }));
const onOpenChange = (isOpen: boolean) => useAppointmentDetailsDialog.setState({ isOpen });
const openAppointmentDetailsDialog = () => onOpenChange(true);
const closeAppointmentDetailsDialog = () => onOpenChange(false);

export default function AppointmentDetailsDialog() {
  return (
    <Suspense>
      <BaseComponent />
    </Suspense>
  );
}

function BaseComponent() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('appointment_id');
  const { isOpen } = useAppointmentDetailsDialog();

  useEffect(() => {
    if (appointmentId) openAppointmentDetailsDialog();
    else closeAppointmentDetailsDialog();
  }, [appointmentId]);

  if (!appointmentId) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">Appointment Details</DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden" />

        <AppointmentDetails id={appointmentId} />
      </DialogContent>
    </Dialog>
  );
}

function AppointmentDetails({ id }: { id: string }) {
  const { data: appointment, isLoading, error } = useAppointment(id);
  const { isOpen } = useAppointmentDetailsDialog();
  const router = useRouter();
  useEffect(() => {
    if (!isOpen) router.replace('/');
  }, [isOpen, router]);

  if (isLoading)
    return (
      <div className="flex flex-col space-y-2 border">
        <h4 className="pb-2 text-xl font-semibold">Appointment Details</h4>
        <Skeleton className="h-7 w-full max-w-80" />
        <Skeleton className="h-7 w-full max-w-80" />
        <Skeleton className="h-7 w-full max-w-80" />
        <Skeleton className="h-7 w-full max-w-80" />
        <Skeleton className="h-7 w-full max-w-80" />
      </div>
    );

  if (error) {
    return (
      <div className="flex items-start rounded-lg bg-rose-500/30 p-4 text-rose-500">
        <CircleAlertIcon className="mr-1 size-5 translate-y-0.5" />
        <span className="text-rose-500">Could not get appointment details! {error.message}</span>
      </div>
    );
  }

  if (!appointment) return null;
  return (
    <section className="-mx-3 flex flex-col space-y-1 rounded-lg border px-3 py-4 text-sm font-medium">
      <div className="flex items-center">
        <span className="mr-2">Staff:</span>
        <Avatar src={appointment.staff.image || null} variant="sm" className="mr-1" />
        <span>{appointment.staff.name}</span>
      </div>
      <div>
        <span>Time: {formatDate(appointment.startsAt)}</span>
      </div>

      <div>
        <span>Service: </span>
        <span>{appointment.service.title}</span>
      </div>
      <div>
        <span>Cost: </span>
        <span>Rs. {appointment.service.price}</span>
      </div>
      <div>
        <span>Duration: </span>
        <span>{appointment.service.duration} hours</span>
      </div>
    </section>
  );
}
