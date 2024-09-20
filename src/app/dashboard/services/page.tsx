'use client';
import ServiceCard, { serviceCardSkeleton } from '@/components/cards/service-card';
import AddServiceDialog from '@/components/dialogs/add-service-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useServices } from '@/queries/use-services';
import { CircleAlert, PackagePlus } from 'lucide-react';

export default function Page() {
  const { data: services, isLoading, error } = useServices();
  return (
    <main>
      <div className="sticky left-0 top-16 z-10 flex items-center justify-between bg-white/80 p-4 filter backdrop-blur-2xl lg:left-60">
        <h3 className="text-xl font-semibold">All Services</h3>
        <AddServiceDialog mode="add">
          <Button Icon={PackagePlus}>Add new Service</Button>
        </AddServiceDialog>
      </div>

      <section className="flex flex-col space-y-10 px-4">
        {error && (
          <Alert variant="destructive">
            <CircleAlert className="size-4" />
            <AlertTitle>Could not load services</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        {isLoading &&
          new Array(4).fill('nothing').map((_, i) => <div key={i}>{serviceCardSkeleton}</div>)}

        {services?.map((service) => (
          <ServiceCard key={service.id} service={service} view="admin" />
        ))}
      </section>
    </main>
  );
}
