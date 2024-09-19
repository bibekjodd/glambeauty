import { useNotifications } from '@/queries/use-notifications';
import moment from 'moment';
import React from 'react';
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
import InfiniteScrollObserver from '../utils/infinite-scroll-observer';

export default function NotificationsDrawer({ children }: { children: React.ReactNode }) {
  const { data, isFetching, fetchNextPage, hasNextPage } = useNotifications();
  const notifications = data?.pages.flat(1) || [];
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="ml-auto h-screen w-full max-w-96">
        <DrawerHeader>
          <DrawerTitle className="text-center">Notifications</DrawerTitle>
        </DrawerHeader>

        <div className="h-full space-y-2 overflow-y-auto scrollbar-thin">
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}

          <InfiniteScrollObserver
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
          />
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="gradient" className="block w-full">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function NotificationCard({ notification }: { notification: NotificationResult }) {
  return (
    <section className="group relative cursor-pointer overflow-hidden rounded-md p-4">
      <h4 className="font-medium text-gray-900">{notification.title}</h4>
      <p className="mb-1 mt-0.5 text-gray-600">{notification.description}</p>
      <p className="text-sm text-gray-500">{moment(notification.receivedAt).fromNow()}</p>
      <div className="absolute left-0 top-0 -z-10 h-full w-1/2 rounded-full bg-pink-300 bg-opacity-15 mix-blend-multiply blur-3xl filter group-hover:bg-opacity-20" />
      <div className="absolute right-0 top-0 -z-10 h-full w-1/2 rounded-full bg-fuchsia-300 bg-opacity-15 mix-blend-multiply blur-3xl filter group-hover:bg-opacity-20" />
    </section>
  );
}
