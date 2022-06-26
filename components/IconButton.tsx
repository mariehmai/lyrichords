import cn from 'classnames';
import { type SVGProps } from 'react';
import type { Size } from './types';

type IconButtonProps = {
  size?: Size;
  title?: string;
  label?: string;
  onClick: () => void;
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

export const IconButton = ({
  size = 'sm',
  title = '',
  label = '',
  onClick,
  Icon,
}: IconButtonProps) => (
  <button
    className="group flex items-center gap-1 outline-red-600"
    title={title}
    onClick={onClick}
  >
    <Icon
      className={cn(
        'cursor-pointer border-0 border-none text-stone-600 hover:opacity-70',
        {
          'h-5 w-5': size === 'sm',
          'h-7 w-7': size === 'md',
        }
      )}
    />
    {!!label && (
      <span className={cn('text-sm text-stone-600 group-hover:underline')}>
        {label}
      </span>
    )}
  </button>
);
