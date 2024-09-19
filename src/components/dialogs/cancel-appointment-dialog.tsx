import { useCancelAppointment } from '@/mutations/use-cancel-appointment';
import { QueryKey } from '@tanstack/react-query';
import React, { useState } from 'react';
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
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export default function CancelAppointmentDialog({
  children,
  id,
  queryKey
}: {
  children: React.ReactNode;
  id: string;
  queryKey: QueryKey;
}) {
  const [cancelReason, setCancelReason] = useState('');
  const { mutate } = useCancelAppointment(id);

  const cancelAppointment = () => {
    mutate({ cancelReason: cancelReason.trim() || undefined, queryKey });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onKeyDown={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="text-center">Are you sure to cancel appointment?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="cancel-reason">Remarks</Label>
          <Textarea
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            id="cancel-reason"
            rows={4}
            placeholder="Reason..."
          ></Textarea>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={cancelAppointment}>Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
