'use client';
import ServiceCard from '@/components/cards/service-card';
import { poppins } from '@/lib/fonts';
import { useProfile } from '@/queries/use-profile';
import { useServices } from '@/queries/use-services';

export default function Page() {
  const { data: services } = useServices();
  const { data: profile } = useProfile();
  return (
    <main className="min-h-screen bg-white pb-24">
      <h3
        className={`${poppins.className} mb-3 text-balance pt-7 text-center text-4xl font-semibold`}
      >
        <span>We have </span>
        <span className="text-pink-500">covered</span> <span>what</span>{' '}
        <span className="text-pink-500">You Like!</span>{' '}
      </h3>
      <div className="cont space-y-7 pt-7">
        {services?.map((service) => (
          <ServiceCard key={service.id} view={profile?.role || null} service={service} />
        ))}
      </div>
    </main>
  );
}
