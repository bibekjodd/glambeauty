'use client';
import { backend_url } from '@/lib/constants';
import { concertOne } from '@/lib/fonts';
import { useProfile } from '@/queries/use-profile';
import { MoveRight, User } from 'lucide-react';
import ProfileDropdown from './dropdowns/profile-dropdown';
import Avatar from './utils/avatar';
import ProgressLink from './utils/progress-link';

export default function Header() {
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  return (
    <div className="fixed left-0 top-0 z-10 flex h-20 w-full items-center bg-white/70 filter backdrop-blur-2xl">
      <header className="cont flex items-center justify-between">
        <ProgressLink
          href="/"
          className={`${concertOne.className} bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-4xl font-bold text-transparent`}
        >
          Glambeauty
        </ProgressLink>

        <nav className="flex items-center space-x-7">
          <button
            onClick={() => {
              if (!profile) window.open(`${backend_url}/api/login/google`, '_blank');
            }}
            className="group flex items-center space-x-2 rounded-full bg-gradient-to-tr from-pink-600/90 to-pink-500 px-6 py-2 text-white brightness-110 transition-all hover:px-[25px] hover:brightness-100 active:scale-[0.98]"
          >
            <span>Book an appointment</span>
            <MoveRight className="size-4 transition group-hover:translate-x-0.5 group-hover:scale-125" />
          </button>

          {!isLoadingProfile && !profile && (
            <a href={`${backend_url}/api/login/google`} target="_blank" rel="noopener noreferrer">
              <User className="size-6" />
            </a>
          )}

          {profile && (
            <ProfileDropdown>
              <button>
                <Avatar src={profile.image} variant="lg" />
              </button>
            </ProfileDropdown>
          )}
          {isLoadingProfile && (
            <div className="size-10 animate-pulse rounded-full bg-neutral-400/30" />
          )}
        </nav>
      </header>
    </div>
  );
}
