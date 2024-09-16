'use client';
import AddServiceDialog from '@/components/dialogs/add-service-dialog';
import { Button } from '@/components/ui/button';
import { dummyServiceImage } from '@/lib/constants';
import { useServices } from '@/queries/use-services';

export default function Page() {
  const { data: services } = useServices();
  return (
    <main className="px-5">
      <div className="mt-7 flex items-center justify-between">
        <h3 className="text-xl font-semibold">All Services</h3>
        <AddServiceDialog mode="add">
          <Button>
            <span>Add new Service</span>
          </Button>
        </AddServiceDialog>
      </div>

      <section className="mt-5 flex flex-col space-y-10">
        {services?.map((service) => <Service key={service.id} service={service} />)}
      </section>
    </main>
  );
}

function Service({ service }: { service: Service }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border shadow-xl shadow-gray-300/20 md:flex-row">
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
        <p className="line-clamp-2">{service.description}</p>
        <AddServiceDialog mode="update" service={service}>
          <Button>Update Service</Button>
        </AddServiceDialog>
      </div>
    </div>
  );
}
