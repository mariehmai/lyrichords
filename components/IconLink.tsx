import Link from 'next/link';
import cn from 'classnames';
import type { Size } from './types';

type IconButtonProps = {
  href: string;
  size?: Size;
  title?: string;
  label?: string;
  withBorder?: boolean;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

function IconLink({
  href,
  size = 'sm',
  title = '',
  label = '',
  withBorder = false,
  Icon,
}: IconButtonProps) {
  return (
    <Link href={href}>
      <a
        className={cn('group flex w-fit items-center gap-1 outline-red-400', {
          'rounded-md border-2 border-stone-500 px-1.5 py-0.5 hover:shadow-sm':
            withBorder,
        })}
        title={title}
      >
        <Icon
          className={cn('cursor-pointer border-0 border-none text-stone-600', {
            'h-5 w-5': size === 'sm',
            'h-7 w-7': size === 'md',
          })}
        />
        {!!label && (
          <span className={cn('text-sm text-stone-600 group-hover:underline')}>
            {label}
          </span>
        )}
      </a>
    </Link>
  );
}

export default IconLink;
