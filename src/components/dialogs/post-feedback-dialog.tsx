'use client';
import { postFeedbackSchema, PostFeedbackSchema } from '@/lib/form-schemas';
import { postFeedbackKey, usePostFeedback } from '@/mutations/use-post-feedback';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsMutating } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormInput } from '../forms/form-input';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

const ratings: { value: number; title: string }[] = [
  { value: 1, title: 'Highly dissatisfied' },
  { value: 2, title: 'Dissatisfied' },
  { value: 3, title: 'Neutral' },
  { value: 4, title: 'Satisfied' },
  { value: 5, title: 'Highly Satisfied' }
];

export default function PostFeedbackDialog({ children }: { children: React.ReactNode }) {
  const {
    formState: { errors },
    handleSubmit,
    control,
    register,
    reset
  } = useForm<PostFeedbackSchema>({
    resolver: zodResolver(postFeedbackSchema),
    defaultValues: { rating: 4 }
  });
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isPostingFeedback = !!useIsMutating({ mutationKey: postFeedbackKey });
  const { mutate } = usePostFeedback();
  const onSubmit = async (data: PostFeedbackSchema) => {
    mutate(data, {
      onSuccess() {
        reset();
        closeButtonRef.current?.click();
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-screen">
        <DialogHeader>
          <DialogTitle className="text-center">Provide a Feedback</DialogTitle>
        </DialogHeader>

        <form
          className="max-h-96 space-y-5 overflow-y-auto p-2 scrollbar-thin"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            {...register('title')}
            label="Title"
            id="title"
            placeholder="Feedback title..."
            Icon={null}
            error={errors.title?.message}
          />

          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue="4">
                  <SelectTrigger>
                    <SelectValue placeholder />
                  </SelectTrigger>

                  <SelectContent ref={field.ref}>
                    {ratings.map((rating) => (
                      <SelectItem key={rating.value} value={rating.value.toString()}>
                        {rating.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.rating?.message && (
              <p className="text-sm text-rose-500">{errors.rating.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Remarks</Label>
            <Textarea
              {...register('text')}
              rows={4}
              id="text"
              placeholder="Give us your remarks...."
            />
            {errors.text?.message && <p className="text-sm text-rose-500">{errors.text.message}</p>}
          </div>
        </form>

        <DialogFooter>
          <DialogClose ref={closeButtonRef} asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isPostingFeedback}
            loading={isPostingFeedback}
          >
            Send Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
