import React, { useState, Fragment, useRef } from 'react';
import { EyeIcon, EyeOffIcon, DocumentAddIcon } from '@heroicons/react/solid';
import { Layout } from '@components/Layout';
import { IconButton } from '@components/IconButton';
import { Divider } from '@components/Divider';
import { useSongs } from '@lib/songs/songs';
import { CreateSongForm } from '@components/CreateSongForm';
import { Song } from '@components/Song';
import { SongsPlaceholder } from '@components/SongsPlaceholder';

const Songs = () => {
  const [showSongs, setShowSongs] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);
  const { songs, loading } = useSongs();

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
            {loading ? (
              <SongsPlaceholder />
            ) : songs?.length === 0 ? (
              <span className="my-4 flex justify-center text-sm text-stone-500">
                No songs to display
              </span>
            ) : (
              songs?.map((song) => (
                <Fragment key={song.id}>
                  <Song {...song} />
                  <Divider />
                </Fragment>
              ))
            )}
          </ul>
        )}
        <CreateSongForm ref={formRef} />
      </div>
    </Layout>
  );
};

export default Songs;
