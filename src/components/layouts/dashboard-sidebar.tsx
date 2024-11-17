'use client';
import LogoutDialog from '@/components/dialogs/logout-dialog';
import { poppins } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { ProgressLink } from '@jodd/next-top-loading-bar';
import {
  BookText,
  LayoutGrid,
  Library,
  LogOut,
  LucideIcon,
  MessageSquareText,
  UsersRound
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { logo } from '../utils/logo';

export const dashboardLinks: { title: string; href: string; icon: LucideIcon }[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutGrid
  },
  {
    title: 'Appointments',
    href: '/dashboard/appointments',
    icon: BookText
  },
  {
    title: 'Services',
    href: '/dashboard/services',
    icon: Library
  },
  {
    title: 'Manage Staffs',
    href: '/dashboard/staffs',
    icon: UsersRound
  },
  {
    title: 'Feedbacks',
    href: '/dashboard/feedbacks',
    icon: MessageSquareText
  }
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <aside
      className={cn(
        poppins.className,
        'left-0 top-0 z-50 hidden h-screen min-h-screen w-64 flex-col overflow-y-auto border-r py-3 text-sm font-semibold lg:flex'
      )}
    >
      {bgGraphics}
      <ProgressLink href="/" className="px-6 text-3xl">
        {logo}
      </ProgressLink>

      <nav className="mt-5 flex h-full flex-grow flex-col">
        {dashboardLinks.map((link) => (
          <ProgressLink
            key={link.title}
            href={link.href}
            className={cn(
              'mb-1 flex h-12 items-center space-x-3 pl-4 hover:bg-pink-600/10 hover:text-pink-600',
              {
                'border-l-4 border-pink-500 bg-pink-600/10 text-pink-600': link.href === pathname
              }
            )}
          >
            <link.icon className="size-5" />
            <span>{link.title}</span>
          </ProgressLink>
        ))}

        <LogoutDialog>
          <button className="mb-3 mt-auto flex w-fit items-center space-x-3 px-6 hover:text-rose-500">
            <LogOut className="size-5" />
            <span>Logout</span>
          </button>
        </LogoutDialog>
      </nav>
    </aside>
  );
}

const bgGraphics = (
  <>
    <div className="fixed left-0 top-0 -z-10 hidden aspect-square w-60 rounded-full bg-pink-300/5 mix-blend-multiply blur-3xl filter lg:block" />
    <div className="fixed left-0 top-32 -z-10 hidden aspect-square w-60 rounded-full bg-pink-300/5 mix-blend-multiply blur-3xl filter lg:block" />
    <div className="fixed left-0 top-64 -z-10 hidden aspect-square w-60 rounded-full bg-pink-300/5 mix-blend-multiply blur-3xl filter lg:block" />
    <div className="fixed left-0 top-96 -z-10 hidden aspect-square w-60 rounded-full bg-pink-300/5 mix-blend-multiply blur-3xl filter lg:block" />
  </>
);
