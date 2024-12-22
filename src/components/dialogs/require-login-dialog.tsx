'use client';

import { openLoginLink } from '@/lib/utils';
import { createStore } from '@jodd/snap';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';

const useRequireLoginDialog = createStore<{ isOpen: boolean }>(() => ({ isOpen: false }));
const onOpenChange = (isOpen: boolean) => useRequireLoginDialog.setState({ isOpen });
export const openRequireLoginDialog = () => onOpenChange(true);
export const closeRequireLoginDialog = () => onOpenChange(false);

export default function RequireLoginDialog() {
  const { isOpen } = useRequireLoginDialog();
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Login to continue</DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden" />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="text">Cancel</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button onClick={openLoginLink}>Login</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
