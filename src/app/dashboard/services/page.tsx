'use client';
import ServiceCard from '@/components/cards/service-card';
import AddServiceDialog from '@/components/dialogs/add-service-dialog';
import { Button } from '@/components/ui/button';
import { useServices } from '@/queries/use-services';
import { PackagePlus } from 'lucide-react';

export default function Page() {
  const { data: services } = useServices();
  return (
    <main>
      <div className="sticky left-0 top-16 z-10 flex items-center justify-between bg-white/80 p-4 filter backdrop-blur-2xl lg:left-60">
        <h3 className="text-xl font-semibold">All Services</h3>
        <AddServiceDialog mode="add">
          <Button Icon={PackagePlus}>Add new Service</Button>
        </AddServiceDialog>
      </div>

      <section className="flex flex-col space-y-10 p-4">
        {services?.map((service) => (
          <ServiceCard key={service.id} service={service} view="admin" />
        ))}
      </section>
    </main>
  );
}
