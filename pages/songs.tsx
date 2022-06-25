import { useState, Fragment } from 'react';
import cn from 'classnames';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { Layout } from '@components/Layout';
import { IconButton } from '@components/IconButton';
import { Divider } from '@components/Divider';
import { songs } from 'lib/songs';

type SongProps = {
  artist: string;
  title: string;
  lyrics: string;
  genre?: string;
};

const Song = ({ artist, genre, title }: SongProps) => (
  <li className="grid grid-cols-4 items-baseline gap-2 overflow-scroll py-2.5">
    <span className="col-span-1 text-sm uppercase text-stone-700">
      {artist}
    </span>
    <span className="col-span-2 text-sm uppercase text-stone-700">{title}</span>
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

const Songs = () => {
  const [showSongs, setShowSongs] = useState(true);

  const toggleSongsVisible = () => setShowSongs(!showSongs);

  return (
    <Layout withFooter={false}>
      <div className="py-8">
        <div className="flex items-center gap-4">
          <h1>Songs</h1>
          <IconButton
            title={showSongs ? 'Hide songs list' : 'Show songs list'}
            onClick={toggleSongsVisible}
            Icon={showSongs ? EyeOffIcon : EyeIcon}
          />
        </div>
        {showSongs && (
          <ul className="mt-8 h-[50vh] overflow-scroll">
            {songs.map((song) => (
              <Fragment key={song.id}>
                <Song key={song.id} {...song} />
                <Divider />
              </Fragment>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default Songs;
