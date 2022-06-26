import cn from 'classnames';
import type { Size } from './types';

type DividerProps = {
  size?: Size;
};

export const Divider = ({ size = 'sm' }: DividerProps) => (
  <div
    className={cn('h-[1px] border-stone-300', {
      'border-b': size === 'sm',
      'border-b-2 border-stone-600': size === 'md',
    })}
  ></div>
);
