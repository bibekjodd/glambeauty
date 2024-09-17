'use client';
import FullScreenLoader from '@/components/utils/full-screen-loader';
import { backend_url } from '@/lib/constants';
import { useProfile } from '@/queries/use-profile';
import { redirect } from 'next/navigation';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: profile, isLoading } = useProfile();

  if (!profile && !isLoading) {
    window.open(`${backend_url}/api/login/google`, '_blank');
    redirect('/');
  }
  if (!profile) return <FullScreenLoader />;
  if (profile.role !== 'user') redirect('/');

  return <div className="min-h-screen">{children}</div>;
}
