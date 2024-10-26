import { deleteServiceKey, useDeleteService } from '@/mutations/use-delete-service';
import { useIsMutating } from '@tanstack/react-query';
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

type Props = { children: React.ReactNode; id: string };
export default function DeleteServiceDialog({ children, id }: Props) {
  const { mutate } = useDeleteService(id);
  const isDeletingService = !!useIsMutating({ mutationKey: deleteServiceKey(id) });
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const deleteService = () => {
    mutate(undefined, {
      onSuccess() {
        closeButtonRef.current?.click();
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This is will delete the service permanently from the system!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild ref={closeButtonRef}>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={deleteService} loading={isDeletingService} disabled={isDeletingService}>
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
