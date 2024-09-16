import { FormInput } from '@/components/forms/form-input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { updateProfileSchema, UpdateProfileSchema } from '@/lib/form-schemas';
import { useUpdateProfile } from '@/mutations/use-update-profile';
import { useProfile } from '@/queries/use-profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Phone, User } from 'lucide-react';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

export default function UpdateProfileDialog({ children }: { children: React.ReactNode }) {
  const { data: profile } = useProfile();
  const {
    handleSubmit,
    formState: { errors, isDirty },
    register,
    reset
  } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: profile?.name,
      address: profile?.address || undefined,
      phone: profile?.phone || undefined
    }
  });
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { mutate } = useUpdateProfile();

  const onSubmit = (data: UpdateProfileSchema) => {
    mutate(data, {
      onSuccess() {
        closeButtonRef.current?.click();
        reset();
      }
    });
  };

  return (
    <Dialog onOpenChange={() => reset()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Update Profile</DialogTitle>
        </DialogHeader>

        <section>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
            <FormInput
              Icon={User}
              label="Name"
              placeholder="Ayushma Dhungana..."
              {...register('name')}
              error={errors.name?.message}
            />
            <FormInput
              Icon={MapPin}
              {...register('address')}
              label="Address"
              placeholder="Bharatpur-2, Chitwan..."
              error={errors.address?.message}
            />
            <FormInput
              Icon={Phone}
              {...register('phone')}
              label="Phone"
              type="number"
              placeholder="9845620397..."
              error={errors.phone?.message}
            />
          </form>
        </section>

        <DialogFooter>
          <DialogClose asChild ref={closeButtonRef}>
            <Button variant="outline">Close</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button onClick={handleSubmit(onSubmit)} disabled={!isDirty}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
