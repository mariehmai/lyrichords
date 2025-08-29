import * as React from 'react';
import {
  EyeIcon,
  EyeSlashIcon,
  PlusIcon,
  MusicalNoteIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/solid';
import { useSongs } from '@lib/songs/songs';
import Divider from './Divider';
import IconButton from './IconButton';
import IconLink from './IconLink';
import Song from './Song';
import SongsPlaceholder from './SongsPlaceholder';

function SongListing() {
  const [showSongs, setShowSongs] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const { songs, loading } = useSongs();

  const onToggleSongsVisible = React.useCallback(() => {
    setShowSongs((prev) => !prev);
  }, []);

  const onSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const filteredSongs = React.useMemo(() => {
    if (!songs || !searchTerm.trim()) return songs;

    const term = searchTerm.toLowerCase().trim();
    return songs.filter(
      (song) =>
        song.title?.toLowerCase().includes(term) ||
        song.artist?.toLowerCase().includes(term) ||
        song.genre?.toLowerCase().includes(term)
    );
  }, [songs, searchTerm]);

  const songsCount = songs?.length ?? 0;
  const filteredCount = filteredSongs?.length ?? 0;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
            Songs
          </h1>
          {songsCount > 0 && (
            <span className="px-3 py-1 text-sm font-medium text-stone-600 dark:text-stone-400 bg-stone-200 dark:bg-stone-700 rounded-full">
              {searchTerm
                ? `${filteredCount} of ${songsCount}`
                : `${songsCount} song${songsCount !== 1 ? 's' : ''}`}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <IconButton
            title={showSongs ? 'Hide songs list' : 'Show songs list'}
            onClick={onToggleSongsVisible}
            Icon={showSongs ? EyeSlashIcon : EyeIcon}
          />
          <IconLink
            href="/songs/new"
            title="Add new song"
            label="Add song"
            size="md"
            Icon={PlusCircleIcon}
          />
        </div>
      </div>

      {showSongs && (
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-lg dark:shadow-2xl overflow-hidden lg:min-w-4xl max-w-full">
          {songsCount > 0 && (
            <div className="p-4 border-b border-stone-200 dark:border-stone-700">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
                <input
                  id="song-search"
                  type="text"
                  placeholder="Search by title, artist, or genre..."
                  value={searchTerm}
                  onChange={onSearchChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 outline-none focus:border-red-400 dark:focus:border-red-400 transition-colors duration-200"
                />
              </div>
            </div>
          )}

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
            ) : filteredCount === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 gap-4">
                <MusicalNoteIcon className="w-12 h-12 text-stone-300 dark:text-stone-600" />
                <span className="text-stone-500 dark:text-stone-400 text-center">
                  {searchTerm
                    ? 'No songs match your search.'
                    : 'No songs yet. Create your first song to get started!'}
                </span>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-red-500 hover:text-red-600 text-sm font-medium"
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              <ul className="divide-y divide-stone-100 dark:divide-stone-800">
                {filteredSongs?.map((song) => (
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
