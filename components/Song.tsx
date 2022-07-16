import Link from 'next/link';
import cn from 'classnames';

function ClickableSong({
  children,
  href,
}: React.PropsWithChildren<{ href: string }>) {
  return <Link href={`/songs/${href}`}>{children}</Link>;
}

type SongProps = {
  disabled?: boolean;
  id: string;
  title: string;
  artist?: string;
  lyrics?: string;
  genre?: string;
};

function Song({ id, artist, genre, title, disabled = false }: SongProps) {
  const SongElement = (
    <li
      className={cn('grid grid-cols-4 items-baseline gap-2 py-2.5', {
        'cursor-pointer hover:bg-stone-50 hover:pl-2 hover:font-semibold':
          !disabled,
        'font-semibold': disabled,
      })}
    >
      <span className="col-span-1 truncate text-sm uppercase text-stone-700">
        {artist}
      </span>
      <span className="col-span-2 truncate text-sm uppercase text-stone-700">
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
  );

  return disabled ? (
    SongElement
  ) : (
    <ClickableSong href={id}>{SongElement}</ClickableSong>
  );
}

export default Song;
