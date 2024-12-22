'use client';

import ServiceCard, { serviceCardSkeleton } from '@/components/cards/service-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { poppins } from '@/lib/fonts';
import { useServices } from '@/queries/use-services';
import clsx from 'clsx';
import { CircleAlertIcon } from 'lucide-react';

export default function Page() {
  const { data: services, isLoading, error } = useServices();

  return (
    <main className="min-h-screen bg-white pb-24">
      <h3
        className={clsx(
          poppins.className,
          'mb-3 text-balance pt-7 text-center text-4xl font-semibold'
        )}
      >
        <span>We have </span>
        <span className="text-pink-500">covered</span> <span>what</span>{' '}
        <span className="text-pink-500">You Like!</span>{' '}
      </h3>
      <div className="cont space-y-7 pt-7">
        {error && (
          <Alert variant="destructive">
            <CircleAlertIcon className="size-4" />
            <AlertTitle>Could not load services</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        {isLoading &&
          new Array(4).fill('nothing').map((_, i) => <div key={i}>{serviceCardSkeleton}</div>)}

        {services?.map((service) => <ServiceCard key={service.id} view={null} service={service} />)}
      </div>
    </main>
  );
}
