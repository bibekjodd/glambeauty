'use client';
import { backend_url } from '@/lib/constants';
import { useProfile } from '@/queries/use-profile';
import { LogIn, MoveRight } from 'lucide-react';
import ProfileDropdown from '../dropdowns/profile-dropdown';
import Avatar from '../utils/avatar';
import { logo } from '../utils/logo';
import ProgressLink from '../utils/progress-link';
import { usePathname } from 'next/navigation';
import SelectAppointmentDialog from '../dialogs/select-appointment-dialog';

export default function Header() {
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const pathname = usePathname();
  return (
    <div
      className={`left-0 top-0 z-10 flex h-20 w-full items-center bg-white/70 filter backdrop-blur-2xl ${pathname === '/' ? 'fixed' : 'sticky'}`}
    >
      <header className="cont flex items-center justify-between">
        <ProgressLink href="/" className="text-4xl">
          {logo}
        </ProgressLink>

        <nav className="flex items-center space-x-3 font-medium md:space-x-10">
          {(!profile || profile.role === 'user') && (
            <SelectAppointmentDialog>
              <button className="group hidden h-9 items-center space-x-2 rounded-full bg-gradient-to-tr from-pink-600/90 to-pink-500 px-7 font-normal text-white brightness-110 transition-all hover:brightness-100 active:scale-[0.98] sm:flex">
                <span>Book an appointment</span>
                <MoveRight className="size-4 scale-125 transition group-hover:translate-x-1" />
              </button>
            </SelectAppointmentDialog>
          )}

          {!isLoadingProfile && !profile && (
            <a
              href={`${backend_url}/api/login/google`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 hover:text-pink-600 sm:hidden"
            >
              <span>Login</span>
              <LogIn className="size-5 text-gray-900 group-hover:text-pink-600" />
            </a>
          )}

          {profile && (
            <ProfileDropdown>
              <button>
                <Avatar src={profile.image} />
              </button>
            </ProfileDropdown>
          )}
          {isLoadingProfile && (
            <div className="size-8 animate-pulse rounded-full bg-neutral-400/30" />
          )}
        </nav>
      </header>
    </div>
  );
}
