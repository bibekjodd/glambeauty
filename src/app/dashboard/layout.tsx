'use client';
import { useProfile } from '@/queries/use-profile';
import { redirect } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: profile, isLoading } = useProfile();
  if (!isLoading && !profile) redirect('/');
  if (!profile) return null;
  if (profile.role === 'user') redirect('/');
  return children;
}
