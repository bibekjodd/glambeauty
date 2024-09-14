'use client';
import React from 'react';
import ProgressLink from './utils/progress-link';
import { concertOne } from '@/lib/fonts';
import { User } from 'lucide-react';
import { backend_url } from '@/lib/constants';
import { useProfile } from '@/queries/use-profile';

export default function Header() {
  const { data: profile } = useProfile();
  return (
    <div className="flex h-16 items-center">
      <header className="cont flex items-center justify-between">
        <ProgressLink
          href="/"
          className={`${concertOne.className} bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-4xl text-transparent`}
        >
          Glambeauty
        </ProgressLink>

        <nav className="flex items-center">
          <a href={`${backend_url}/api/login/google`} target="_blank" rel="noopener noreferrer">
            <User className="size-6" />
          </a>
          <p>{profile?.name}</p>
        </nav>
      </header>
    </div>
  );
}
