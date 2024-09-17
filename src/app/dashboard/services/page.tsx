'use client';
import ServiceCard from '@/components/cards/service-card';
import AddServiceDialog from '@/components/dialogs/add-service-dialog';
import { Button } from '@/components/ui/button';
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
        {services?.map((service) => (
          <ServiceCard key={service.id} service={service} view="admin" />
        ))}
      </section>
    </main>
  );
}
