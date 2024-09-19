'use client';
import { formatDate } from '@/lib/utils';
import { useAppointment } from '@/queries/use-appointment';
import { CircleAlert } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useRef } from 'react';
import QrCode from 'react-qr-code';
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

export default function AppointmentDetailDrawer() {
  return (
    <Suspense>
      <BaseComponent />
    </Suspense>
  );
}

function BaseComponent() {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('appointment_id');
  const showQrCode = searchParams.get('show_qr_code') === 'true';
  const url = `${typeof location !== 'undefined' ? location : { origin: '' }?.origin}/?appointment_id=${appointmentId}`;

  if (!appointmentId) return null;

  return (
    <Drawer
      defaultOpen={!!appointmentId}
      direction="bottom"
      onOpenChange={(isOpen) => {
        if (!isOpen) router.replace('/');
      }}
    >
      <DrawerTrigger className="hidden">Open</DrawerTrigger>
      <DrawerContent className="h-screen max-h-[600px]">
        <DrawerHeader>
          <DrawerTitle className="text-center">Appointment Details</DrawerTitle>
        </DrawerHeader>

        {showQrCode ? (
          <div className="flex w-full flex-col items-center justify-center p-6">
            <div className="relative mx-auto h-fit w-fit max-w-96 bg-white">
              <QrCode value={url} />
            </div>
            <p className="mt-3 text-lg font-medium">Save this qr code to track your appointment</p>
          </div>
        ) : (
          <AppointmentDetail id={appointmentId} />
        )}

        <DrawerFooter>
          <DrawerClose asChild ref={closeButtonRef}>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function AppointmentDetail({ id }: { id: string }) {
  const { data: appointment, isLoading, error } = useAppointment(id);

  if (isLoading)
    return (
      <div className="flex flex-col space-y-2 border p-4">
        <h4 className="pb-2 text-xl font-semibold">Appointment Details</h4>
        <div className="h-7 w-full max-w-80 animate-pulse rounded-lg bg-gray-300/40" />
        <div className="h-7 w-full max-w-80 animate-pulse rounded-lg bg-gray-300/40" />
        <div className="h-7 w-full max-w-80 animate-pulse rounded-lg bg-gray-300/40" />
        <div className="h-7 w-full max-w-80 animate-pulse rounded-lg bg-gray-300/40" />
        <div className="h-7 w-full max-w-80 animate-pulse rounded-lg bg-gray-300/40" />
      </div>
    );

  if (error) {
    return (
      <div className="m-5 flex items-start rounded-lg bg-rose-500/30 p-4 text-rose-500">
        <CircleAlert className="mr-1 size-5 translate-y-0.5" />
        <span className="text-rose-500">Could not get appointment details! {error.message}</span>
      </div>
    );
  }

  if (!appointment) return null;
  return (
    <div className="p-4">
      <section className="flex flex-col space-y-1 rounded-lg border p-3 text-sm font-medium">
        <h4 className="pb-2 text-xl font-semibold">Appointment Details</h4>
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
    </div>
  );
}
