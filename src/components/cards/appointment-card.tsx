import { inter } from '@/lib/fonts';
import { getQueryClient } from '@/lib/query-client';
import { cn, formatDate } from '@/lib/utils';
import { profileKey } from '@/queries/use-profile';
import { QueryKey } from '@tanstack/react-query';
import { CheckCircle, CircleSlash, Clock12, EllipsisVertical } from 'lucide-react';
import AppointmentOptionsMenu from '../dropdowns/appointment-options-menu';
import { Skeleton } from '../ui/skeleton';
import Avatar from '../utils/avatar';

type Props = { appointment: Appointment; queryKey: QueryKey };
export default function AppointmentCard({ appointment, queryKey }: Props) {
  const date = new Date(appointment.startsAt);
  if (new Date().toISOString() > appointment.status) appointment.status = 'completed';
  const month = date.toLocaleString('default', { month: 'long' });
  const completionDate = new Date(date.getTime() + appointment.service.duration * 60 * 60 * 1000);
  const completionMonth = completionDate.toLocaleString('default', { month: 'long' });
  const completionHours = completionDate.getHours();
  const completionMinutes = completionDate.getMinutes();
  const queryClient = getQueryClient();
  const profile = queryClient.getQueryData<User>(profileKey);
  if (!profile) return;

  return (
    <section
      className={`relative flex items-start justify-between overflow-hidden rounded-lg border border-fuchsia-200/60 px-4 py-3 font-medium`}
    >
      {/* color bg graphics */}
      <div className="absolute left-0 top-0 -z-10 aspect-square h-full scale-x-150 scale-y-125 rounded-full mix-blend-multiply blur-2xl filter sm:bg-pink-300/5" />
      <div className="absolute left-1/4 top-0 -z-10 aspect-square h-full scale-x-150 scale-y-125 rounded-full mix-blend-multiply blur-2xl filter sm:bg-fuchsia-300/5" />
      <div className="absolute left-1/2 top-0 -z-10 aspect-square h-full scale-x-150 scale-y-125 rounded-full mix-blend-multiply blur-2xl filter sm:bg-purple-300/5" />
      <div className="absolute right-0 top-0 -z-10 aspect-square h-full scale-x-150 scale-y-125 rounded-full mix-blend-multiply blur-2xl filter sm:bg-pink-300/5" />

      <div className="flex flex-col">
        <div
          className={cn(
            'flex w-fit items-center space-x-1 rounded-full px-2 py-0.5 text-sm font-normal',
            {
              'bg-sky-600/30 text-sky-500': appointment.status === 'pending',
              'bg-green-600/30 text-green-500': appointment.status === 'completed',
              'bg-rose-500/30 text-rose-500': appointment.status === 'cancelled'
            }
          )}
        >
          <span className="capitalize">
            {appointment.status === 'pending' ? 'Upcoming' : appointment.status}
          </span>
          {appointment.status === 'pending' && <Clock12 className="size-4" />}
          {appointment.status === 'completed' && <CheckCircle className="size-4" />}
          {appointment.status === 'cancelled' && <CircleSlash className="size-4" />}
        </div>

        <h3 className="mt-1 text-lg font-semibold">{appointment.service.title}</h3>
        {profile.role !== 'staff' && (
          <div className="mt-1 flex items-center space-x-2">
            <p>Stylist:</p>
            <Avatar src={appointment.staff.image} variant="sm" />
            <p>{appointment.staff.name}</p>
          </div>
        )}
        {profile.role !== 'user' && (
          <div className="mt-1 flex items-center space-x-2">
            <p>Customer:</p>
            <Avatar src={appointment.customer.image} variant="sm" />
            <p>{appointment.customer.name}</p>
          </div>
        )}
        <p className="mt-1">Charge: Rs. {appointment.service.price}</p>
        <p className="mt-1 text-sm italic text-gray-600">
          Date: {formatDate(date)} - {month !== completionMonth ? ` ${completionMonth},` : ''}{' '}
          {completionHours % 12 || 12}
          {completionMinutes !== 0 ? `:${completionMinutes}` : ''}
          {completionHours >= 12 ? 'pm' : 'am'}
        </p>

        {appointment.cancelReason && (
          <div className={cn(inter.className, 'mt-3 text-gray-800')}>
            <span>Cancel Reason:</span> <span>{appointment.cancelReason}</span>
          </div>
        )}
      </div>

      {appointment.status === 'pending' && profile?.role !== 'staff' && (
        <AppointmentOptionsMenu appointment={appointment} queryKey={queryKey}>
          <button>
            <EllipsisVertical className="size-4 text-gray-700" />
          </button>
        </AppointmentOptionsMenu>
      )}
    </section>
  );
}

export const apponitmentCardSkeleton = (
  <div className="space-y-2 rounded-lg border border-fuchsia-200/60 bg-gray-50 p-4">
    <Skeleton className="h-6 w-24 rounded-full" />
    <Skeleton className="h-6 w-44" />
    <Skeleton className="h-6 w-36" />
    <Skeleton className="h-6 w-24" />
    <Skeleton className="h-6 w-44" />
  </div>
);
