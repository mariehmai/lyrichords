import Link from 'next/link';
import cn from 'classnames';

const ClickableSong = ({
  children,
  href,
}: React.PropsWithChildren<{ href: string }>) => (
  <Link href={`/songs/${href}`}>{children}</Link>
);

type SongProps = {
  disabled?: boolean;
  id: string;
  title: string;
  artist?: string;
  lyrics?: string;
  genre?: string;
};

export const Song = ({
  id,
  artist,
  genre,
  title,
  disabled = false,
}: SongProps) => (
  <ClickableSong href={id}>
    <li
      className={cn(
        'grid grid-cols-4 items-baseline gap-2 overflow-scroll py-2.5',
        {
          'cursor-pointer hover:bg-stone-50 hover:pl-2 hover:font-bold':
            !disabled,
        }
      )}
    >
      <span className="col-span-1 text-sm uppercase text-stone-700">
        {artist}
      </span>
      <span className="col-span-2 text-sm uppercase text-stone-700">
        {title}
      </span>
      <span
        className={cn(
          'w-fit rounded-full bg-red-400 px-2 py-0.5 text-sm font-bold text-white',
          {
            'bg-stone-600': !genre,
          }
        )}
      >
        {genre || 'Unknown'}
      </span>
    </li>
  </ClickableSong>
);
