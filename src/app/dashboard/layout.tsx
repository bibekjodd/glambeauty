'use client';
import DashboardHeader from '@/components/layouts/dashboard-header';
import DashboardSidebar from '@/components/layouts/dashboard-sidebar';
import { useProfile } from '@/queries/use-profile';
import { redirect } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: profile, isLoading } = useProfile();
  if (!isLoading && !profile) redirect('/');
  if (!profile) return null;
  if (profile.role !== 'admin') redirect('/');
  return (
    <div className="flex items-start">
      <div className="sticky left-0 top-0">
        <DashboardSidebar />
      </div>
      <div className="flex flex-grow flex-col bg-white">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
