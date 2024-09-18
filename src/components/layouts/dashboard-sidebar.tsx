'use client';
import LogoutDialog from '@/components/dialogs/logout-dialog';
import { poppins } from '@/lib/fonts';
import { BookText, LayoutGrid, Library, LogOut, LucideIcon, UsersRound } from 'lucide-react';
import { usePathname } from 'next/navigation';
import AppointmentsDrawer from '../drawers/appointments-drawer';
import { logo } from '../utils/logo';
import ProgressLink from '../utils/progress-link';

export default function DashboardSidebar() {
  return (
    <aside
      className={`${poppins.className} left-0 top-0 z-50 hidden h-screen min-h-screen w-64 flex-col overflow-y-auto border-r py-3 text-sm font-semibold lg:flex`}
    >
      {bgGraphics}
      <ProgressLink href="/" className="px-6 text-4xl">
        {logo}
      </ProgressLink>

      <nav className="mt-10 flex h-full flex-grow flex-col">
        <NavLink title="Dashboard" href="/dashboard" Icon={LayoutGrid} />
        <AppointmentsDrawer>
          <button
            className={`mb-1 flex h-12 items-center space-x-3 pl-4 hover:bg-pink-600/10 hover:text-pink-600`}
          >
            <BookText className="size-5" />
            <span>Appointments</span>
          </button>
        </AppointmentsDrawer>
        <NavLink title="Services" href="/dashboard/services" Icon={Library} />
        <NavLink title="Manage Staffs" href="/dashboard/staffs" Icon={UsersRound} />

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

function NavLink({ title, href, Icon }: { title: string; href: string; Icon: LucideIcon }) {
  const pathname = usePathname();
  return (
    <ProgressLink
      href={href}
      className={`mb-1 flex h-12 items-center space-x-3 pl-4 hover:bg-pink-600/10 hover:text-pink-600 ${pathname === href ? 'border-l-4 border-pink-500 bg-pink-600/10 text-pink-600' : ''}`}
    >
      <Icon className="size-5" />
      <span>{title}</span>
    </ProgressLink>
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
