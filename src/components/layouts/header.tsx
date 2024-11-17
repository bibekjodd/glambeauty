'use client';
import { loginLink } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useProfile } from '@/queries/use-profile';
import { ProgressLink } from '@jodd/next-top-loading-bar';
import { LogIn, MoveRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import SelectAppointmentDialog from '../dialogs/select-appointment-dialog';
import ProfileDropdown from '../dropdowns/profile-dropdown';
import { Button } from '../ui/button';
import Avatar from '../utils/avatar';
import { logo } from '../utils/logo';

export default function Header() {
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const pathname = usePathname();
  return (
    <div
      className={cn(
        'left-0 top-0 z-10 flex h-16 w-full items-center border-b bg-white/70 filter backdrop-blur-2xl',
        {
          fixed: pathname === '/',
          sticky: pathname !== '/'
        }
      )}
    >
      <header className="cont flex items-center justify-between">
        <ProgressLink href="/" className="text-3xl">
          {logo}
        </ProgressLink>

        <nav className="flex items-center space-x-3 font-medium md:space-x-10">
          {profile?.role === 'user' && (
            <SelectAppointmentDialog>
              <Button className="hidden rounded-full px-6 sm:flex" variant="gradient">
                <span>Book an appointment</span>
                <MoveRight className="ml-2 size-4 scale-125 transition group-hover:translate-x-1" />
              </Button>
            </SelectAppointmentDialog>
          )}

          {!profile && !isLoadingProfile && (
            <Button
              onClick={() => window.open(loginLink, '_blank')}
              className="rounded-full px-6"
              variant="gradient"
              Icon={LogIn}
            >
              Login
            </Button>
          )}

          {profile && (
            <div className="flex items-center space-x-1.5 text-sm">
              <div className="hidden sm:inline">
                <span className="mr-1">Welcome, </span>
                <span className="font-bold">{profile.name.split(' ')[0]}</span>
              </div>

              <ProfileDropdown>
                <button>
                  <Avatar src={profile.image} />
                </button>
              </ProfileDropdown>
            </div>
          )}

          {isLoadingProfile && (
            <div className="flex items-center space-x-2">
              <div className="hidden h-6 w-28 animate-pulse rounded-lg bg-neutral-400/30 sm:inline" />
              <div className="size-8 animate-pulse rounded-full bg-neutral-400/30" />
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}
