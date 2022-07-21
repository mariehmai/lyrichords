import Link from 'next/link';
import cn from 'classnames';
import type { Size } from './types';

type IconButtonProps = {
  href: string;
  size?: Size;
  title?: string;
  label?: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

function IconButton({
  href,
  size = 'sm',
  title = '',
  label = '',
  Icon,
}: IconButtonProps) {
  return (
    <Link href={href}>
      <a
        className="group flex items-center gap-1 outline-red-400"
        title={title}
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
      </a>
    </Link>
  );
}

export default IconButton;
