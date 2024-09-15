'use client';
import { useServices } from '@/queries/use-services';

export default function Page() {
  const { data: services } = useServices();
  return (
    <main className="px-5">
      <h3 className="text-lg font-semibold">All Services</h3>
    </main>
  );
}
