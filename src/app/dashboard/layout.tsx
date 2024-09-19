'use client';
import DashboardHeader from '@/components/layouts/dashboard-header';
import DashboardSidebar from '@/components/layouts/dashboard-sidebar';
import { useProfile } from '@/queries/use-profile';
import { redirect } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: profile, isLoading, error } = useProfile();
  if (error) redirect('/');
  if (!isLoading && !profile) redirect('/');
  if (!profile) return null;
  if (profile.role !== 'admin') redirect('/');

  return (
    <div className="flex w-full flex-grow items-start bg-white lg:pl-64">
      <div className="fixed left-0 top-0 z-30">
        <DashboardSidebar />
      </div>
      <div className="flex flex-grow flex-col bg-white">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
