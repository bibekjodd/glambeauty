import { useNotifications } from '@/queries/use-notifications';
import { Bell, BookText, CircleAlert, ShieldCheck, ShieldEllipsis, User } from 'lucide-react';
import moment from 'moment';
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '../ui/drawer';
import { Skeleton } from '../ui/skeleton';
import InfiniteScrollObserver from '../utils/infinite-scroll-observer';

export default function NotificationsDrawer({ children }: { children: React.ReactNode }) {
  const { data, isFetching, fetchNextPage, hasNextPage, error, isLoading } = useNotifications();
  const notifications = data?.pages.flat(1) || [];
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="ml-auto h-screen w-full max-w-screen-sm rounded-none sm:max-w-[500px] sm:rounded-l-lg">
        <DrawerHeader>
          <DrawerTitle className="text-center">Notifications</DrawerTitle>
        </DrawerHeader>

        <div className="h-full space-y-3 overflow-y-auto scrollbar-thin">
          {error && (
            <div className="p-4">
              <Alert className="" variant="destructive">
                <CircleAlert className="size-4" />
                <AlertTitle>Could not load notifications!</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            </div>
          )}

          {isLoading && new Array(4).fill('nothing').map((_, i) => <div key={i}>{skeleton}</div>)}

          {notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}

          <InfiniteScrollObserver
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
            showLoader
          />
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="block w-full">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function NotificationCard({ notification }: { notification: NotificationResult }) {
  const { entity, params } = notification;
  return (
    <section className="group relative flex items-start overflow-hidden rounded-md p-4">
      <div className="mr-4 translate-y-1 rounded-full bg-pink-400 p-2 text-white">
        {entity === 'role' && (
          <>
            {params === 'user' && <User className="size-5" />}
            {params === 'staff' && <ShieldEllipsis className="size-5" />}
            {params === 'admin' && <ShieldCheck className="size-5" />}
          </>
        )}

        {entity === 'appointments' && <BookText className="size-5" />}
        {!(entity === 'appointments' || entity === 'role') && <Bell className="size-5" />}
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{notification.title}</h4>
        <p className="mb-1 mt-0.5 text-sm text-gray-600">{notification.description}</p>
        <p className="text-sm text-gray-500">{moment(notification.receivedAt).fromNow()}</p>
      </div>
      <div className="absolute left-0 top-0 -z-10 h-full w-1/2 rounded-full bg-pink-400 bg-opacity-10 mix-blend-multiply blur-3xl filter group-hover:bg-opacity-15" />
      <div className="absolute right-0 top-0 -z-10 h-full w-1/2 rounded-full bg-fuchsia-400 bg-opacity-10 mix-blend-multiply blur-3xl filter group-hover:bg-opacity-15" />
    </section>
  );
}

const skeleton = (
  <div className="flex items-start rounded-md p-4">
    <div>
      <Skeleton className="mr-4 size-9 rounded-full" />
    </div>
    <div className="w-full space-y-2">
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-6 w-full" />
    </div>
  </div>
);
