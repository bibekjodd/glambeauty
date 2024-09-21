'use client';

import AppointmentsStats from '@/components/dashboard/appointments-stats';
import BookingsStats from '@/components/dashboard/bookings-stats';
import TopServices from '@/components/dashboard/top-services';
import TopStaffs from '@/components/dashboard/top-staffs';

export default function Page() {
  return (
    <main className="relative p-4">
      <div className="relative z-10 space-y-32">
        <AppointmentsStats />
        <BookingsStats />
        <TopStaffs />
        <TopServices />

        <div className="fixed left-0 top-0 -z-20 aspect-square w-6/12 rounded-full bg-fuchsia-300/10 mix-blend-multiply blur-3xl filter" />
        <div className="fixed right-0 top-0 -z-20 aspect-square w-6/12 rounded-full bg-pink-300/10 mix-blend-multiply blur-3xl filter" />
      </div>
    </main>
  );
}
