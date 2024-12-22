'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { updateProfileSchema, UpdateProfileSchema } from '@/lib/form-schemas';
import { useUpdateProfile } from '@/mutations/use-update-profile';
import { useProfile } from '@/queries/use-profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { createStore } from '@jodd/snap';
import { MapPin, Phone, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';

const useUpdateProfileDialog = createStore<{ isOpen: boolean }>(() => ({ isOpen: false }));

const onOpenChange = (isOpen: boolean) => useUpdateProfileDialog.setState({ isOpen });
export const openUpdateProfileDialog = () => onOpenChange(true);
export const closeUpdateProfileDialog = () => onOpenChange(false);

export default function UpdateProfileDialog() {
  const { data: profile } = useProfile();
  if (!profile) return;

  return <BaseDialog />;
}

function BaseDialog() {
  const { data: profile } = useProfile();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset
  } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: profile?.name || '',
      address: profile?.address || '',
      phone: profile?.phone || undefined
    }
  });
  const { mutate, isPending } = useUpdateProfile();

  const onSubmit = (data: UpdateProfileSchema) => {
    if (isPending) return;
    mutate(data, {
      onSuccess() {
        closeUpdateProfileDialog();
        reset();
      }
    });
  };

  const { isOpen } = useUpdateProfileDialog();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Update Profile</DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden" />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
          <Input
            IconLeft={User}
            id="name"
            label="Name"
            placeholder="Ayushma Dhungana..."
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            IconLeft={MapPin}
            id="address"
            {...register('address')}
            label="Address"
            placeholder="Bharatpur-2, Chitwan..."
            error={errors.address?.message}
          />
          <Input
            IconLeft={Phone}
            id="phone"
            {...register('phone')}
            label="Phone"
            type="number"
            placeholder="9845620397..."
            error={errors.phone?.message}
          />
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="text">Cancel</Button>
          </DialogClose>

          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
            loading={isPending}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
