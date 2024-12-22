import { cn } from '@/lib/utils';
import { MailIcon, PhoneIcon } from 'lucide-react';
import React, { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import Avatar from '../utils/avatar';

export default function UserHoverCard({
  user,
  children,
  popover
}: {
  user: User;
  children: React.ReactNode;
  popover?: boolean;
}) {
  const [isMobile] = useState(() => window.innerWidth < 1024);

  if (isMobile || popover)
    return (
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="w-fit cursor-default text-sm">
          <BaseContent user={user} />
        </PopoverContent>
      </Popover>
    );

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent
        className="w-fit cursor-default text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <BaseContent user={user} />
      </HoverCardContent>
    </HoverCard>
  );
}

function BaseContent({ user }: { user: User }) {
  return (
    <div className="flex items-start space-x-4 text-indigo-100">
      <Avatar src={user.image} variant="lg" />
      <div>
        <div className="mt-1 flex items-center space-x-2">
          <MailIcon className="size-3.5" />
          <span>{user.email}</span>
        </div>

        <div className="mt-1 flex items-center space-x-2">
          <PhoneIcon className="size-3.5" />
          <span className={cn({ italic: !user.phone })}>{user.phone || 'Not specified'}</span>
        </div>
      </div>
    </div>
  );
}