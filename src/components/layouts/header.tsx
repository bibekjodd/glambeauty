'use client';
import { backend_url } from '@/lib/constants';
import { useProfile } from '@/queries/use-profile';
import { MoveRight, User } from 'lucide-react';
import ProfileDropdown from '../dropdowns/profile-dropdown';
import Avatar from '../utils/avatar';
import { logo } from '../utils/logo';
import ProgressLink from '../utils/progress-link';

const links = [
  { title: 'About', href: '#about' },
  { title: 'Services', href: '#services' }
];

export default function Header() {
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  return (
    <div className="fixed left-0 top-0 z-10 flex h-20 w-full items-center bg-white/70 filter backdrop-blur-2xl">
      <header className="cont flex items-center justify-between">
        <ProgressLink href="/" className="text-4xl">
          {logo}
        </ProgressLink>

        <nav className="flex items-center space-x-10 font-medium">
          {links.map((link) => (
            <ProgressLink key={link.title} href={link.href} className="hover:text-pink-500">
              {link.title}
            </ProgressLink>
          ))}

          <button
            onClick={() => {
              if (!profile) window.open(`${backend_url}/api/login/google`, '_blank');
            }}
            className="group flex h-8 items-center space-x-2 rounded-full bg-gradient-to-tr from-pink-600/90 to-pink-500 px-7 font-normal text-white brightness-110 transition-all hover:brightness-100 active:scale-[0.98]"
          >
            <span>Book an appointment</span>
            <MoveRight className="size-4 scale-125 transition group-hover:translate-x-1" />
          </button>

          {!isLoadingProfile && !profile && (
            <a href={`${backend_url}/api/login/google`} target="_blank" rel="noopener noreferrer">
              <User className="size-6" />
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
