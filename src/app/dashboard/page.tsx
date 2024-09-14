'use client';
import { useProfile } from '@/queries/use-profile';

export default function Page() {
  const { data: profile } = useProfile();
  return <div>page</div>;
}
