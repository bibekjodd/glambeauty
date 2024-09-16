'use client';
import ProfileDialog from '@/components/dialogs/profile-dialog';
import { poppins } from '@/lib/fonts';
import { useProfile } from '@/queries/use-profile';
import Avatar from '../utils/avatar';

export default function DashboardHeader() {
  const { data: profile } = useProfile();
  if (!profile) return null;
  return (
    <header
      className={`${poppins.className} sticky top-0 flex items-center justify-between bg-white/80 px-6 py-4 text-sm filter backdrop-blur-2xl`}
    >
      <nav className="space-x-7 font-semibold">
        <span>Analytics</span>
        <span>Reports</span>
        <span>Settings</span>
      </nav>
      <div className="flex items-center space-x-2">
        <span>Welcome, </span>
        <span className="font-bold">{profile.name.split(' ')[0]}</span>
        <ProfileDialog>
          <button>
            <Avatar src={profile.image} />
          </button>
        </ProfileDialog>
      </div>
    </header>
  );
}
