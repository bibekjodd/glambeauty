import { dummyServiceImage, loginLink } from '@/lib/constants';
import { MoveRight } from 'lucide-react';
import AddServiceDialog from '../dialogs/add-service-dialog';
import SelectAppointmentDialog from '../dialogs/select-appointment-dialog';
import { Button } from '../ui/button';
import Image from 'next/image';

type Props = {
  service: Service;
  view: 'user' | 'admin' | 'staff' | null;
};
export default function ServiceCard({ service, view }: Props) {
  return (
    <section className="flex flex-col overflow-hidden rounded-lg border shadow-xl shadow-gray-300/20 md:flex-row">
      <Image
        src={service.image || dummyServiceImage}
        alt="service image"
        className="aspect-video w-full object-contain md:w-1/2 lg:w-96"
        width={720}
        height={1080}
        quality={100}
      />
      <div className="flex w-full flex-col space-y-2 p-4 lg:px-6">
        <h4 className="text-lg font-semibold">{service.title}</h4>
        <p>
          Price <span className="font-bold">Rs.{service.price}</span>
        </p>
        <p>
          Duration: <span>{service.duration} hours</span>
        </p>
        <p className={`${view === 'admin' ? 'line-clamp-2' : ''}`}>{service.description}</p>

        {view === 'admin' && (
          <AddServiceDialog mode="update" service={service}>
            <Button>Update Service</Button>
          </AddServiceDialog>
        )}

        {view === 'user' && (
          <SelectAppointmentDialog referredServiceId={service.id}>
            <Button className="flex w-full rounded-full" variant="gradient">
              <span>Book now</span>
              <MoveRight className="ml-2 size-5" />
            </Button>
          </SelectAppointmentDialog>
        )}

        {!view && (
          <a href={loginLink}>
            <Button className="flex w-full space-x-2 rounded-full">
              <span>Book now</span>
              <MoveRight className="size-5" />
            </Button>
          </a>
        )}
      </div>
    </section>
  );
}
