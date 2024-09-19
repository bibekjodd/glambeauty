'use client';
import { poppins } from '@/lib/fonts';
import { useProfile } from '@/queries/use-profile';
import ProfileDropdown from '../dropdowns/profile-dropdown';
import Avatar from '../utils/avatar';
import { logo } from '../utils/logo';
import ProgressLink from '../utils/progress-link';
import { usePathname } from 'next/navigation';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/appointments': 'Appointments',
  '/dashboard/services': 'Services',
  '/dashboard/staffs': 'Manage Staffs',
  '/dashboard/feedbacks': 'Feedbacks'
};

export default function DashboardHeader() {
  const pathname = usePathname();
  const { data: profile } = useProfile();
  if (!profile) return null;
  return (
    <header
      className={`${poppins.className} sticky top-0 z-30 flex items-center justify-between border-b bg-white/60 px-6 py-4 text-sm filter backdrop-blur-xl`}
    >
      <h3 className="hidden text-lg font-semibold lg:block">
        {pageTitles[pathname] || 'Dashboard'}
      </h3>

      <ProgressLink href="/" className="text-3xl sm:text-4xl lg:hidden">
        {logo}{' '}
      </ProgressLink>

      <div className="flex items-center space-x-2">
        <span className="hidden sm:inline">Welcome, </span>
        <span className="hidden font-bold sm:inline">{profile.name.split(' ')[0]}</span>

        <ProfileDropdown>
          <button>
            <Avatar src={profile.image} />
          </button>
        </ProfileDropdown>
      </div>
    </header>
  );
}
