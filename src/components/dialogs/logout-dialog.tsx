'use client';

import { useLogout } from '@/mutations/use-logout';
import { Button } from '@/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/ui/dialog';
import { createStore } from '@jodd/snap';

const useLogoutDialog = createStore<{ isOpen: boolean }>(() => ({ isOpen: false }));
const onOpenChange = (isOpen: boolean) => useLogoutDialog.setState({ isOpen });
export const openLogoutDialog = () => onOpenChange(true);
export const closeLogoutDialog = () => onOpenChange(false);

export default function LogoutDialog() {
  const { mutate, isPending } = useLogout();
  const logout = () => {
    if (isPending) return;
    mutate();
  };

  const { isOpen } = useLogoutDialog();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You will need to log in again to access your account.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="text">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button disabled={isPending} loading={isPending} onClick={() => logout()}>
              Logout
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
