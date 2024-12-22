import { formatDate } from '@/lib/utils';
import { useBookAppointment } from '@/mutations/use-book-appointment';
import { useProfile } from '@/queries/use-profile';
import { CheckCheckIcon } from 'lucide-react';
import React, { useRef } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import Avatar from '../utils/avatar';
import { openRequireLoginDialog } from './require-login-dialog';

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
  const { data: profile } = useProfile();
  const { mutate, isPending } = useBookAppointment();
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

        <DialogDescription className="hidden" />

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
            <Button variant="text">Cancel</Button>
          </DialogClose>

          <Button
            loading={isPending}
            onClick={profile ? bookAppointment : openRequireLoginDialog}
            className="relative"
            disabled={isPending}
            Icon={CheckCheckIcon}
          >
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
