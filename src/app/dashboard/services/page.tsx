'use client';
import { Button } from '@/components/ui/button';
import AddServiceDialog from '@/dialogs/add-service-dialog';
import { useServices } from '@/queries/use-services';

export default function Page() {
  const { data: services } = useServices();
  return (
    <main className="px-5">
      <div className="item-scenter mt-7 flex justify-between">
        <h3 className="ext-lg font-semibold">All Services</h3>
        <AddServiceDialog mode="add">
          <Button>
            <span>Add new Service</span>
          </Button>
        </AddServiceDialog>
      </div>

      <section className="flex flex-col">
        {services?.map((service) => <Service key={service.id} service={service} />)}
      </section>
    </main>
  );
}

function Service({ service }: { service: Service }) {
  return <div></div>;
}
