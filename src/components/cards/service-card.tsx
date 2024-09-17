import { backend_url, dummyServiceImage } from '@/lib/constants';
import { MoveRight } from 'lucide-react';
import AddServiceDialog from '../dialogs/add-service-dialog';
import SelectAppointmentDialog from '../dialogs/select-appointment-dialog';
import { Button } from '../ui/button';

type Props = {
  service: Service;
  view: 'user' | 'admin' | 'staff' | null;
};
export default function ServiceCard({ service, view }: Props) {
  return (
    <section className="flex flex-col overflow-hidden rounded-lg border shadow-xl shadow-gray-300/20 md:flex-row">
      <img
        src={service.image || dummyServiceImage}
        alt="service image"
        className="aspect-video w-full object-contain md:w-1/2 lg:w-96"
      />
      <div className="flex flex-col space-y-2 p-4">
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
            <Button
              className="flex w-full items-center justify-center space-x-2 rounded-full"
              variant="gradient"
            >
              <span>Book now</span>
              <MoveRight className="size-5" />
            </Button>
          </SelectAppointmentDialog>
        )}

        {!view && (
          <a href={`${backend_url}/api/login/google`}>
            <Button className="flex w-full items-center justify-center space-x-2 rounded-full">
              <span>Book now</span>
              <MoveRight className="size-5" />
            </Button>
          </a>
        )}
      </div>
    </section>
  );
}
