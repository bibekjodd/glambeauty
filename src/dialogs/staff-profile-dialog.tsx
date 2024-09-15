import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import Avatar from '@/components/utils/avatar';
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
              className={`mr-2 size-4 scale-150 animate-pulse ${staff.active ? 'text-green-600' : 'text-amber-600'}`}
            />
            <span
              className={`rounded-sm px-2 ${staff.active ? 'bg-green-600/20 text-green-600' : 'bg-amber-600/10 text-amber-600'}`}
            >
              {staff.active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
