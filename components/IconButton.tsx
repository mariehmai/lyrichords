import cn from 'classnames';
import { type SVGProps } from 'react';
import type { Size } from './types';

type IconButtonProps = {
  size?: Size;
  title?: string;
  onClick: () => void;
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

export const IconButton = ({
  size = 'sm',
  title,
  onClick,
  Icon,
}: IconButtonProps) => (
  <button title={title} onClick={onClick}>
    <Icon
      className={cn('cursor-pointer text-stone-600 hover:opacity-70', {
        'h-5 w-5': size === 'sm',
        'h-7 w-7': size === 'md',
      })}
    />
  </button>
);
