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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { addServiceSchema, AddServiceSchema, UpdateServiceSchema } from '@/lib/form-schemas';
import { cn, imageToDataUri } from '@/lib/utils';
import { addServiceKey, useAddService } from '@/mutations/use-add-service';
import { updateServiceKey, useUpdateService } from '@/mutations/use-update-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { AutoAnimate } from '@jodd/auto-animate';
import { useIsMutating } from '@tanstack/react-query';
import { Image as ImageIcon, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import DeleteServiceDialog from './delete-service-dialog';

type Props =
  | { children: React.ReactNode; mode: 'add'; service?: undefined }
  | { children: React.ReactNode; mode: 'update'; service: Service };
export default function AddServiceDialog({ children, mode, service }: Props) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [image, setImage] = useState<string | undefined>(service?.image || undefined);
  const imagePickerRef = useRef<HTMLInputElement>(null);

  const onPickImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined;
    if (!file) return;

    const imageDataUri = await imageToDataUri(file);
    setImage(imageDataUri);
  };

  const unPickImage = () => {
    if (!imagePickerRef.current) return;
    imagePickerRef.current.value = '';
    setImage(undefined);
  };

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors }
  } = useForm<AddServiceSchema>({
    resolver: zodResolver(addServiceSchema),
    defaultValues: {
      title: service?.title,
      price: service?.price,
      description: service?.description,
      duration: service?.duration || 0.5
    }
  });

  const { mutate: addService } = useAddService();
  const { mutate: updateService } = useUpdateService(service?.id || '');
  const isAddingService = !!useIsMutating({ mutationKey: addServiceKey });
  const isUpdatingService = !!useIsMutating({
    mutationKey: updateServiceKey(service?.id!)
  });

  const disabled = mode === 'add' ? isAddingService : isUpdatingService;

  const onSubmit = async (data: AddServiceSchema) => {
    if (disabled) return;
    const imageFile = imagePickerRef.current?.files ? imagePickerRef.current.files[0] : undefined;

    const onSuccess = () => {
      reset();
      closeButtonRef.current?.click();
      unPickImage();
    };

    if (mode === 'add') {
      addService({ ...data, image: imageFile }, { onSuccess });
    } else {
      const dataToUpdate: UpdateServiceSchema = { ...data };
      for (const [key, value] of Object.entries(service)) {
        // @ts-expect-error ...
        if (dataToUpdate[key] === value) dataToUpdate[key] = undefined;
      }
      updateService({ ...data, image: imageFile }, { onSuccess });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex max-h-screen flex-col">
        <DialogHeader>
          <DialogTitle className="text-center">
            {mode === 'add' ? 'Add new Service' : 'Update Service'}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-grow flex-col space-y-2 overflow-y-auto px-2 scrollbar-thin"
        >
          <div className="flex flex-grow flex-col space-y-5">
            <FormInput
              id="title"
              Icon={null}
              error={errors.title?.message}
              label="Title"
              placeholder="Service title..."
              {...register('title')}
            />
            <FormInput
              id="price"
              Icon={null}
              error={errors.price?.message}
              label="Price"
              type="number"
              {...register('price')}
              placeholder="Service charge..."
            />

            <div className="flex flex-col space-y-3 py-4">
              <p className="text-sm font-medium">Duration {watch('duration')} hours</p>
              {/* @ts-expect-error ... */}
              <Slider min={0.5} max={12} id="duration" step={0.5} {...register('duration')} />
              {errors.duration?.message && (
                <p className="text-sm text-rose-500">{errors.duration?.message}</p>
              )}
            </div>

            <div className="relative w-full space-y-2 pb-3">
              {image && (
                <button
                  className="absolute right-1 top-3 size-6 rounded-full bg-white"
                  onClick={unPickImage}
                >
                  <X className="h-5" />
                </button>
              )}
              <Label htmlFor="image">Pick an image</Label>
              {image && (
                <img
                  src={image}
                  alt="selected image"
                  className="aspect-video w-full rounded-md object-contain"
                />
              )}
              {!image && (
                <div className="border-2 p-2">
                  <Label htmlFor="image">
                    <div className="grid aspect-video w-full place-items-center border-border">
                      <ImageIcon className="size-8 text-gray-700" />
                    </div>
                  </Label>
                </div>
              )}
              <Input
                id="image"
                type="file"
                hidden
                className="hidden"
                ref={imagePickerRef}
                onChange={onPickImage}
              />
            </div>

            <AutoAnimate className="flex flex-col space-y-2 py-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Service description..."
                className="scrollbar-thin focus:ring-2"
                rows={6}
              />
              {errors.description?.message && (
                <p className="text-sm text-rose-500">{errors.description?.message}</p>
              )}
            </AutoAnimate>
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild ref={closeButtonRef}>
            <Button type="button" variant="outline" className="">
              Close
            </Button>
          </DialogClose>

          {service && (
            <DeleteServiceDialog id={service.id}>
              <Button type="button" variant="outline">
                Delete Service
              </Button>
            </DeleteServiceDialog>
          )}

          <Button
            disabled={disabled || isUpdatingService}
            onClick={handleSubmit(onSubmit)}
            type="submit"
            loading={disabled}
            className="relative"
          >
            <span className={cn({ 'opacity-0': disabled })}>
              {mode === 'add' ? 'Add Service' : 'Update'} Service
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
