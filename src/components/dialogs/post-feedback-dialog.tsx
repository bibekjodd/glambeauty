'use client';

import { postFeedbackSchema, PostFeedbackSchema } from '@/lib/form-schemas';
import { usePostFeedback } from '@/mutations/use-post-feedback';
import { useProfile } from '@/queries/use-profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { createStore } from '@jodd/snap';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { openRequireLoginDialog } from './require-login-dialog';

const usePostFeedbackDialog = createStore<{ isOpen: boolean }>(() => ({ isOpen: false }));

const onOpenChange = (isOpen: boolean) => usePostFeedbackDialog.setState({ isOpen });

export const openPostFeedbackDialog = () => onOpenChange(true);

export const closePostFeedbackDialog = () => onOpenChange(false);

const ratings: { value: number; title: string }[] = [
  { value: 1, title: 'Highly dissatisfied' },
  { value: 2, title: 'Dissatisfied' },
  { value: 3, title: 'Neutral' },
  { value: 4, title: 'Satisfied' },
  { value: 5, title: 'Highly Satisfied' }
];

export default function PostFeedbackDialog() {
  const { data: profile } = useProfile();
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
  const { mutate, isPending } = usePostFeedback();
  const onSubmit = async (data: PostFeedbackSchema) => {
    if (!profile) return openRequireLoginDialog();
    if (isPending) return;
    mutate(data, {
      onSuccess() {
        reset();
      }
    });
  };

  const { isOpen } = usePostFeedbackDialog();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-screen">
        <DialogHeader>
          <DialogTitle className="text-center">Provide a Feedback</DialogTitle>
        </DialogHeader>

        <form
          className="max-h-96 space-y-5 overflow-y-auto p-2 scrollbar-thin"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            {...register('title')}
            label="Title"
            id="title"
            placeholder="Feedback title..."
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
          <DialogClose asChild>
            <Button variant="text">Cancel</Button>
          </DialogClose>

          <Button onClick={handleSubmit(onSubmit)} disabled={isPending} loading={isPending}>
            Send Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
