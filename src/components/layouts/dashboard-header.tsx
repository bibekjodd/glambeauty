'use client';
import { poppins } from '@/lib/fonts';
import { useProfile } from '@/queries/use-profile';
import ProfileDropdown from '../dropdowns/profile-dropdown';
import Avatar from '../utils/avatar';
import { logo } from '../utils/logo';
import ProgressLink from '../utils/progress-link';

export default function DashboardHeader() {
  const { data: profile } = useProfile();
  if (!profile) return null;
  return (
    <header
      className={`${poppins.className} sticky top-0 z-30 flex items-center justify-between border-b bg-white/60 px-6 py-4 text-sm filter backdrop-blur-xl`}
    >
      <nav className="hidden space-x-7 font-semibold lg:block">
        <span>Analytics</span>
        <span>Reports</span>
        <span>Settings</span>
      </nav>

      <ProgressLink href="/" className="text-3xl sm:text-4xl lg:hidden">
        {logo}{' '}
      </ProgressLink>

      <div className="flex items-center space-x-2">
        <span>Welcome, </span>
        <span className="font-bold">{profile.name.split(' ')[0]}</span>

        <ProfileDropdown>
          <button>
            <Avatar src={profile.image} />
          </button>
        </ProfileDropdown>
      </div>
    </header>
  );
}
