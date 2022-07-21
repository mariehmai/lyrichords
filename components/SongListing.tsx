import * as React from 'react';
import { EyeOffIcon, EyeIcon, DocumentAddIcon } from '@heroicons/react/solid';
import { useSongs } from '@lib/songs/songs';
import Divider from './Divider';
import IconButton from './IconButton';
import IconLink from './IconLink';
import Song from './Song';
import SongsPlaceholder from './SongsPlaceholder';

function SongListing() {
  const [showSongs, setShowSongs] = React.useState(true);
  const { songs, loading } = useSongs();

  const toggleSongsVisible = () => setShowSongs(!showSongs);

  return (
    <>
      <div className="flex items-center gap-4">
        <h1>Songs</h1>
        <IconButton
          title={showSongs ? 'Hide songs list' : 'Show songs list'}
          onClick={toggleSongsVisible}
          Icon={showSongs ? EyeOffIcon : EyeIcon}
        />
        <IconLink
          href="/songs/new"
          title="Add new song"
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
          <ul className="h-80 overflow-scroll">
            {loading ? (
              <SongsPlaceholder />
            ) : songs?.length === 0 ? (
              <span className="my-4 flex justify-center text-sm text-stone-500">
                No songs to display
              </span>
            ) : (
              songs?.map((song) => (
                <React.Fragment key={song.id}>
                  <Song {...song} />
                  <Divider />
                </React.Fragment>
              ))
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default SongListing;
