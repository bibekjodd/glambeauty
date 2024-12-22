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
import Avatar from '@/components/utils/avatar';
import { useProfile } from '@/queries/use-profile';
import { createStore } from '@jodd/snap';
import { Mail, MapPin, Phone, User } from 'lucide-react';
import { openUpdateProfileDialog } from './update-profile-dialog';

const useProfileDialog = createStore<{ isOpen: boolean }>(() => ({ isOpen: false }));
const onOpenChange = (isOpen: boolean) => useProfileDialog.setState({ isOpen });
export const openProfileDialog = () => onOpenChange(true);
export const closeProfileDialog = () => onOpenChange(false);

export default function ProfileDialog() {
  const { data: profile } = useProfile();
  const { isOpen } = useProfileDialog();
  if (!profile) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent onKeyDown={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="text-center">Your Profile</DialogTitle>
        </DialogHeader>

        <DialogDescription className="hidden" />

        <section>
          <Avatar src={profile.image} variant="xl" />
          <div className="flex flex-col space-y-0.5">
            <p className="mt-1 text-lg font-semibold">{profile.name}</p>
            <div className="flex items-center">
              <Mail className="mr-2 size-4" /> <span>{profile.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 size-4" /> <span>{profile.phone || 'Not specified'}</span>
            </div>
            <div className="flex items-center">
              <User className="mr-2 size-4" />{' '}
              <span>
                <span>Role - </span> {profile.role}
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 size-4" /> <span>{profile.address || 'Not specified'}</span>
            </div>
          </div>
        </section>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="text">Close</Button>
          </DialogClose>

          <Button onClick={openUpdateProfileDialog}>Update Profile</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
