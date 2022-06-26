import React, { useState, Fragment, useEffect, useRef } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { EyeIcon, EyeOffIcon, DocumentAddIcon } from '@heroicons/react/solid';
import { Layout } from '@components/Layout';
import { IconButton } from '@components/IconButton';
import { Divider } from '@components/Divider';
import { fetchSongs, type Song } from '@lib/songs/songs';
import { CreateSongForm } from '@components/CreateSongForm';

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

const Song = ({ id, artist, genre, title, disabled = false }: SongProps) => (
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

const Songs = () => {
  const [showSongs, setShowSongs] = useState(true);
  const [songs, setSongs] = useState<Song[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const getSongs = async () => {
      setSongs(await fetchSongs());
    };

    void getSongs();
  }, []);

  const toggleSongsVisible = () => setShowSongs(!showSongs);

  const addNewSong = () => {
    formRef.current?.scrollIntoView();
  };

  return (
    <Layout withFooter={false}>
      <div className="flex flex-col gap-4 py-8">
        <div className="flex items-center gap-4">
          <h1>Songs</h1>
          <IconButton
            title={showSongs ? 'Hide songs list' : 'Show songs list'}
            onClick={toggleSongsVisible}
            Icon={showSongs ? EyeOffIcon : EyeIcon}
          />
          <IconButton
            title="Add new song"
            onClick={addNewSong}
            Icon={DocumentAddIcon}
          />
        </div>
        {showSongs && (
          <ul className="mt-8 h-[50vh] overflow-scroll">
            <Song
              disabled
              id="default"
              artist="Artist"
              title="Title"
              genre="Genre"
            />
            <Divider size="md" />
            {songs.map((song) => (
              <Fragment key={song.id}>
                <Song {...song} />
                <Divider />
              </Fragment>
            ))}
          </ul>
        )}
        <CreateSongForm ref={formRef} />
      </div>
    </Layout>
  );
};

export default Songs;
