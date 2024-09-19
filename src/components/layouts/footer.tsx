'use client';
import { loginLink, socialLinks } from '@/lib/constants';
import { Mail, MapPin, Phone, Scissors } from 'lucide-react';
import Image from 'next/image';
import PostFeedbackDialog from '../dialogs/post-feedback-dialog';
import { logo } from '../utils/logo';
import { useProfile } from '@/queries/use-profile';

export default function Footer() {
  const { data: profile } = useProfile();
  return (
    <div className="bg-neutral-900 py-10 font-normal text-gray-100">
      <footer className="cont grid space-y-10 lg:grid-cols-3 lg:space-y-0">
        <div>
          <h3 className="text-4xl">{logo}</h3>
          <p className="mt-2">Providing the best beauty services</p>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="pb-1 text-xl">Contact</h3>
          <div className="flex items-center space-x-2">
            <Phone className="size-5" />
            <p>+977 9825148037</p>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="size-5" />
            <p>glambeautynepal@gmail.com</p>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="size-5" />
            <p>Bharatpur-2, Chitwan</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl">Social Links</h3>
          <div className="mb-10 mt-3 flex items-center space-x-6">
            {socialLinks.map((link) => (
              <Image
                key={link.title}
                className="size-6"
                height={128}
                width={128}
                src={link.image}
                alt={`${link.title} logo`}
                quality={100}
              />
            ))}
          </div>
          {!profile && (
            <button
              onClick={() => window.open(loginLink, '_blank')}
              className="relative z-10 flex items-center space-x-2 rounded-md border border-pink-400 px-4 py-2 text-sm"
            >
              <span>Provide us a Feedback</span>
              <Scissors className="size-4" />
              <div className="absolute left-0 -z-10 h-full w-1/3 bg-pink-500/60 mix-blend-multiply blur-3xl filter" />
              <div className="absolute right-0 -z-10 h-full w-1/3 bg-fuchsia-500/60 mix-blend-multiply blur-3xl filter" />
            </button>
          )}

          {profile && (
            <PostFeedbackDialog>
              <button className="relative z-10 flex items-center space-x-2 rounded-md border border-pink-400 px-4 py-2 text-sm">
                <span>Provide us a Feedback</span>
                <Scissors className="size-4" />
                <div className="absolute left-0 -z-10 h-full w-1/3 bg-pink-500/60 mix-blend-multiply blur-3xl filter" />
                <div className="absolute right-0 -z-10 h-full w-1/3 bg-fuchsia-500/60 mix-blend-multiply blur-3xl filter" />
              </button>
            </PostFeedbackDialog>
          )}
        </div>
      </footer>

      <p className="mx-auto mt-10 w-fit px-4 text-center">
        <span className="mr-1 text-lg font-light">&copy;</span>
        {new Date().getFullYear()} Glambeauty appointment services. All rights reserved.
      </p>
    </div>
  );
}
