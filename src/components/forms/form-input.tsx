import AutoAnimate from '@/components/utils/auto-animate';
import { LucideIcon } from 'lucide-react';
import { InputHTMLAttributes, forwardRef } from 'react';
import { Label } from '../ui/label';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  Icon: LucideIcon;
  error: string | undefined;
  IconRight?: LucideIcon;
  IconRightOnClick?: () => void;
};

export const FormInput = forwardRef<HTMLInputElement, Props>(function Component(
  { Icon, label, error, className, IconRight, IconRightOnClick, ...props },
  ref
) {
  return (
    <AutoAnimate className={`${className ? className : 'py-2'}`}>
      <Label htmlFor={props.id}>{label}</Label>
      <div className="group flex h-11 items-center space-x-3 rounded-md border-2 border-gray-700 border-input px-2.5 font-medium focus-within:ring-1 focus-within:ring-ring">
        <Icon className="h-5 w-5 text-gray-900" />
        <input
          {...props}
          ref={ref}
          className="flex-1 outline-none placeholder:text-gray-500 focus:outline-none"
        />
        {IconRight && (
          <button onClick={IconRightOnClick} type="button">
            <IconRight className="h-5 w-5 text-gray-500" />
          </button>
        )}
      </div>
      {error && <p className="text-sm text-rose-500">{error}</p>}
    </AutoAnimate>
  );
});
