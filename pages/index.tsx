import React, { useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { EyeIcon, EyeOffIcon, DocumentAddIcon } from '@heroicons/react/solid';
import { Layout } from '@components/Layout';
import { IconButton } from '@components/IconButton';
import { Divider } from '@components/Divider';
import { useSongs } from '@lib/songs/songs';
import { Song } from '@components/Song';
import { SongsPlaceholder } from '@components/SongsPlaceholder';

const Songs = () => {
  const [showSongs, setShowSongs] = useState(true);
  const router = useRouter();
  const { songs, loading } = useSongs();

  const toggleSongsVisible = () => setShowSongs(!showSongs);

  const addNewSong = () => router.push(`/songs/new`);

  return (
    <Layout>
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
          <div>
            <Song
              disabled
              id="default"
              artist="Artist"
              title="Title"
              genre="Genre"
            />
            <Divider size="md" />
            <ul className="h-[50vh] overflow-scroll">
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
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Songs;
