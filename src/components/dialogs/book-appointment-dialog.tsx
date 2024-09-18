import { formatDate } from '@/lib/utils';
import { useBookAppointment } from '@/mutations/use-book-appointment';
import { useIsMutating } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import React, { useRef } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import Avatar from '../utils/avatar';

type Props = {
  children: React.ReactNode;
  service: Service;
  staff: User;
  date: string;
  refetchAvailableStaffs: () => unknown;
  clearValues: () => unknown;
};

export default function BookAppointmentDialog({
  children,
  service,
  staff,
  date,
  refetchAvailableStaffs,
  clearValues
}: Props) {
  const { mutate } = useBookAppointment();
  const isBookingAppointment = !!useIsMutating({ mutationKey: ['book-appointment'] });
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const fullDate = new Date(date);

  const bookAppointment = () => {
    mutate(
      { date, serviceId: service.id, staffId: staff.id },
      {
        onSuccess() {
          clearValues();
          closeButtonRef.current?.click();
        },
        onSettled() {
          refetchAvailableStaffs();
        }
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Confirm Appointment</DialogTitle>
        </DialogHeader>

        <section className="flex flex-col space-y-1 rounded-lg border p-3 text-sm font-medium">
          <h4 className="pb-2 text-xl font-semibold">Appointment Details</h4>
          <div className="flex items-center">
            <span className="mr-2">Staff:</span>
            <Avatar src={staff.image || null} variant="sm" className="mr-1" />
            <span>{staff.name}</span>
          </div>
          <div>
            <span>Time: {formatDate(fullDate)}</span>
          </div>

          <div>
            <span>Service: </span>
            <span>{service.title}</span>
          </div>
          <div>
            <span>Cost: </span>
            <span>Rs. {service.price}</span>
          </div>
          <div>
            <span>Duration: </span>
            <span>{service.duration} hours</span>
          </div>
        </section>

        <DialogFooter>
          <DialogClose asChild ref={closeButtonRef}>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={bookAppointment} className="relative" disabled={isBookingAppointment}>
            <span className={`${isBookingAppointment ? 'opacity-0' : ''}`}>Confirm Booking</span>
            {isBookingAppointment && (
              <span className="absolute grid place-items-center">
                <Loader2 className="size-4 animate-spin" />
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
