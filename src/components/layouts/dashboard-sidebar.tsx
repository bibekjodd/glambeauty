'use client';
import LogoutDialog from '@/components/dialogs/logout-dialog';
import { poppins } from '@/lib/fonts';
import { BookText, LayoutGrid, Library, LogOut, UsersRound } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { logo } from '../utils/logo';
import ProgressLink from '../utils/progress-link';

const links = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { title: 'Appointments', href: '/dashboard/appointments', icon: BookText },
  { title: 'Services', href: '/dashboard/services', icon: Library },
  { title: 'Manage Staffs', href: '/dashboard/staffs', icon: UsersRound }
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <aside
      className={`${poppins.className} hidden h-screen min-h-screen w-64 flex-col overflow-y-auto border-r py-3 text-sm font-semibold lg:flex`}
    >
      <ProgressLink href="/" className="px-6 text-4xl">
        {logo}
      </ProgressLink>

      <nav className="mt-10 flex h-full flex-grow flex-col">
        {links.map((link) => (
          <ProgressLink
            key={link.href}
            href={link.href}
            className={`mb-1 flex h-12 items-center space-x-3 pl-4 hover:bg-pink-600/10 hover:text-pink-600 ${pathname === link.href ? 'border-l-4 border-pink-500 bg-pink-600/10 text-pink-600' : ''}`}
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
