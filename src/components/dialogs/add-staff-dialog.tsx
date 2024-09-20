import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AutoAnimate from '@/components/utils/auto-animate';
import Avatar from '@/components/utils/avatar';
import { useDebounce } from '@/hooks/use-debounce';
import { useUpdateUser } from '@/mutations/use-update-user';
import { useStaffs } from '@/queries/use-staffs';
import { useUsers } from '@/queries/use-users';
import { useIsMutating } from '@tanstack/react-query';
import React, { useState } from 'react';

export default function AddStaffDialog({ children }: { children: React.ReactNode }) {
  const [searchInput, setSearchInput] = useState('');
  const enabled = useDebounce(searchInput);
  const { data } = useUsers({ search: searchInput, enabled });
  const users = data?.pages.flat(1) || [];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex max-h-full flex-col overflow-hidden md:max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-center">Add new staff</DialogTitle>
        </DialogHeader>

        <section className="flex-grow overflow-y-auto px-2">
          <div>
            <Label id="search">Search users</Label>
            <Input
              id="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
            />
          </div>

          <AutoAnimate className="mt-5 flex h-fit max-h-96 flex-col space-y-2 overflow-y-auto pr-1 scrollbar-thin">
            <span className="text-sm font-semibold">Results:</span>
            {users.slice(0, 7).map((user) => (
              <User key={user.id} user={user} />
            ))}
          </AutoAnimate>
        </section>
      </DialogContent>
    </Dialog>
  );
}

function User({ user }: { user: User }) {
  const { mutate } = useUpdateUser(user.id);
  const { data: staffs } = useStaffs();
  const isAddingStaff = !!useIsMutating({
    mutationKey: ['update-user', user.id]
  });
  const addStaff = () => {
    mutate({ role: 'staff', active: true });
  };

  const isStaffAdded = staffs?.find((staff) => staff.id === user.id);
  if (isStaffAdded) return null;

  return (
    <div className="flex items-center py-1 text-sm">
      <Avatar src={user.image} className="mr-2" variant="sm" />
      <span className="font-semibold">{user.name}</span>
      <Button
        disabled={isAddingStaff}
        loading={isAddingStaff}
        onClick={addStaff}
        className="relative ml-auto"
        size="sm"
      >
        Add staff
      </Button>
    </div>
  );
}
