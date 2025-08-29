import Link from 'next/link';
import cn from 'classnames';
import type { Size } from './types';

type IconLinkProps = {
  href: string;
  size?: Size;
  title?: string;
  label?: string;
  withBorder?: boolean;
  Icon: React.ElementType;
};

function IconLink({
  href,
  size = 'sm',
  title = '',
  label = '',
  withBorder = false,
  Icon,
}: IconLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex w-fit items-center gap-1 outline-red-400 transition-colors duration-200',
        {
          'rounded-md border-2 border-stone-500 dark:border-stone-600 px-1.5 py-0.5 hover:shadow-sm hover:bg-stone-100 dark:hover:bg-stone-800':
            withBorder,
        }
      )}
      title={title}
    >
      <Icon
        className={cn(
          'cursor-pointer border-0 border-none text-stone-600 dark:text-stone-400',
          {
            'h-5 w-5': size === 'sm',
            'h-7 w-7': size === 'md',
          }
        )}
      />
      {!!label && (
        <span
          className={cn(
            'text-sm text-stone-600 dark:text-stone-400 group-hover:underline'
          )}
        >
          {label}
        </span>
      )}
    </Link>
  );
}

export default IconLink;
