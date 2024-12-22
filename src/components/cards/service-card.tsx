import { dummyServiceImage } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { CircleDollarSignIcon, ClockIcon, MoveRight } from 'lucide-react';
import Image from 'next/image';
import AddServiceDialog from '../dialogs/add-service-dialog';
import { openImageDialog } from '../dialogs/image-dialog';
import { openSelectAppointmentDialog } from '../dialogs/select-appointment-dialog';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

type Props = {
  service: Service;
  view: 'user' | 'admin' | 'staff' | null;
};

export default function ServiceCard({ service, view }: Props) {
  return (
    <section className="flex flex-col overflow-hidden rounded-lg border shadow-xl shadow-gray-300/20 md:flex-row">
      <button
        onClick={() => openImageDialog(service.image || dummyServiceImage)}
        className="aspect-video w-full md:w-1/2 lg:w-96 lg:min-w-96"
      >
        <Image
          src={service.image || dummyServiceImage}
          alt="service image"
          className="size-full object-contain"
          width={720}
          height={1080}
          quality={100}
        />
      </button>

      <div className="flex w-full flex-col space-y-2 p-4 lg:px-6">
        <h4 className="text-xl font-semibold">{service.title}</h4>
        <div className="flex items-center space-x-1">
          <CircleDollarSignIcon className="size-4" />
          <span>
            Charge: <span className="font-bold">Rs.{service.price}</span>
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <ClockIcon className="size-4" />
          <span>Duration: {service.duration} hours</span>
        </div>

        <p className={cn(view === 'admin' && 'line-clamp-2')}>{service.description}</p>

        {view === 'admin' && (
          <AddServiceDialog mode="update" service={service}>
            <Button>Update Service</Button>
          </AddServiceDialog>
        )}

        {view !== 'admin' && (
          <Button
            onClick={() => openSelectAppointmentDialog(service.id)}
            className="flex w-full rounded-full"
            variant="gradient"
          >
            <span>Book now</span>
            <MoveRight className="ml-2 size-5" />
          </Button>
        )}
      </div>
    </section>
  );
}

export const serviceCardSkeleton = (
  <div className="flex flex-col items-stretch space-y-5 md:flex-row md:space-y-0">
    <Skeleton className="aspect-video max-h-80 w-full md:w-1/2 lg:w-96" />

    <div className="h-full flex-grow space-y-3 md:px-4">
      <Skeleton className="h-8 w-80" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  </div>
);
