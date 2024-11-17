import { dummyUserImage } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ProgressLink } from '@jodd/next-top-loading-bar';

type Props = {
  src: string | null;
  className?: string;
  variant?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  isLink?: boolean;
  href?: string;
};

/**
 * `variant` defaults to `md`
 */
export default function Avatar({ src, className, variant, isLink, href }: Props) {
  const image = (
    <div className="inline h-fit w-fit select-none">
      <div
        className={cn(
          {
            'size-4': variant === 'xs',
            'size-6': variant === 'sm',
            'size-8': variant === 'md' || !variant,
            'size-10': variant === 'lg',
            'size-12': variant === 'xl',
            'size-14': variant === '2xl'
          },
          className
        )}
      >
        <img
          src={src || dummyUserImage}
          loading="lazy"
          decoding="async"
          alt="user avatar"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
    </div>
  );
  if (isLink && href) {
    return <ProgressLink href={href}>{image}</ProgressLink>;
  }
  return image;
}
