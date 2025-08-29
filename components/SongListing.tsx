import * as React from 'react';
import {
  EyeIcon,
  EyeSlashIcon,
  PlusIcon,
  MusicalNoteIcon,
} from '@heroicons/react/24/solid';
import { useSongs } from '@lib/songs/songs';
import Divider from './Divider';
import IconButton from './IconButton';
import IconLink from './IconLink';
import Song from './Song';
import SongsPlaceholder from './SongsPlaceholder';

function SongListing() {
  const [showSongs, setShowSongs] = React.useState(true);
  const { songs, loading } = useSongs();

  const onToggleSongsVisible = React.useCallback(() => {
    setShowSongs((prev) => !prev);
  }, []);

  const songsCount = songs?.length ?? 0;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
            Songs
          </h1>
          {songsCount > 0 && (
            <span className="px-3 py-1 text-sm font-medium text-stone-600 dark:text-stone-400 bg-stone-200 dark:bg-stone-700 rounded-full">
              {songsCount} song{songsCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <IconButton
            title={showSongs ? 'Hide songs list' : 'Show songs list'}
            onClick={onToggleSongsVisible}
            Icon={showSongs ? EyeSlashIcon : EyeIcon}
          />
          <IconLink href="/songs/new" title="Add new song" Icon={PlusIcon} />
        </div>
      </div>

      {showSongs && (
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-lg dark:shadow-2xl overflow-hidden">
          <div className="bg-stone-100 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700">
            <Song
              disabled
              id="default"
              artist="Artist"
              title="Title"
              genre="Genre"
            />
          </div>

          <Divider size="md" />

          <div className="min-h-[200px] max-h-[500px] overflow-y-auto">
            {loading ? (
              <div className="p-6">
                <SongsPlaceholder />
              </div>
            ) : songsCount === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 gap-4">
                <MusicalNoteIcon className="w-12 h-12 text-stone-300 dark:text-stone-600" />
                <span className="text-stone-500 dark:text-stone-400 text-center">
                  No songs yet. Create your first song to get started!
                </span>
              </div>
            ) : (
              <ul className="divide-y divide-stone-100 dark:divide-stone-800">
                {songs?.map((song) => (
                  <li
                    key={song.id}
                    className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors duration-150"
                  >
                    <Song {...song} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SongListing;
