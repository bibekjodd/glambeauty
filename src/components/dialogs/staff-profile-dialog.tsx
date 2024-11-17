import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import Avatar from '@/components/utils/avatar';
import { cn } from '@/lib/utils';
import { Dot, Mail, MapPin, Phone, User } from 'lucide-react';
import React from 'react';

type Props = { children: React.ReactNode; staff: User };
export default function StaffProfileDialog({ children, staff }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Staff details</DialogTitle>
        </DialogHeader>

        <section>
          <Avatar src={staff.image} variant="xl" />
          <p className="font-semibold">{staff.name}</p>
          <div className="flex items-center">
            <Mail className="mr-2 size-4" /> <span>{staff.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="mr-2 size-4" /> <span>{staff.phone || 'Not specified'}</span>
          </div>
          <div className="flex items-center">
            <User className="mr-2 size-4" />{' '}
            <span>
              <span>Role - </span> {staff.role}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 size-4" /> <span>{staff.address || 'Not specified'}</span>
          </div>
          <div className="flex items-center">
            <Dot
              className={cn('mr-2 size-4 scale-150 animate-pulse', {
                'text-green-600': staff.active,
                'text-amber-600': !staff.active
              })}
            />
            <span
              className={cn('rounded-sm px-2', {
                'bg-green-600/20 text-green-600': staff.active,
                'bg-amber-600/10 text-amber-600': !staff.active
              })}
            >
              {staff.active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
