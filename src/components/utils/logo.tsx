import { poppins } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export const logo = (
  <span
    className={cn(
      poppins.className,
      'bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text font-bold text-transparent'
    )}
  >
    Glambeauty
  </span>
);
