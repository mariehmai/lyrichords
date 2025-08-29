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
    <div
      className={cn(
        'grid grid-cols-4 items-baseline gap-2 py-2.5 px-4 transition-colors duration-200',
        {
          'cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50':
            !disabled,
          'font-semibold bg-stone-100 dark:bg-stone-800': disabled,
        }
      )}
    >
      <span className="col-span-1 truncate text-sm uppercase text-stone-700 dark:text-stone-300">
        {artist}
      </span>
      <span className="col-span-2 truncate text-sm uppercase text-stone-700 dark:text-stone-300">
        {title}
      </span>
      <span
        className={cn(
          'w-fit rounded-full bg-red-400 dark:bg-red-500 px-3 py-1 text-sm font-bold text-white',
          {
            'bg-stone-600 dark:bg-stone-500': !genre,
          }
        )}
      >
        {genre || 'Unknown'}
      </span>
    </div>
  );

  return disabled ? (
    SongElement
  ) : (
    <ClickableSong href={id}>{SongElement}</ClickableSong>
  );
}

export default Song;
