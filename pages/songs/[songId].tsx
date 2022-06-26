import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { PencilIcon } from '@heroicons/react/solid';
import { fetchSong, type Song } from '@lib/songs/songs';
import { Layout } from '@components/Layout';
import { IconButton } from '@components/IconButton';

const Song = () => {
  const [song, setSong] = useState<Song | undefined>();
  const router = useRouter();
  const songId = router.query.songId as string;

  useEffect(() => {
    if (!songId) return;

    const getSong = async () => {
      setSong(await fetchSong(songId));
    };

    void getSong();
  }, [songId]);

  return (
    <Layout withFooter={false}>
      <div className="flex min-h-[90vh] flex-col gap-12 py-8">
        <div>
          <span className="flex items-center gap-2">
            <h1 className="col-span-2 font-bold text-stone-700">
              {song?.title}
            </h1>
            <IconButton size="md" onClick={() => {}} Icon={PencilIcon} />
          </span>
          <h2 className="col-span-1 text-sm text-stone-700">{song?.artist}</h2>
          <div
            className={cn(
              'mt-2 w-fit rounded-full bg-red-400 px-2 py-0.5 text-sm font-bold text-white',
              {
                'bg-stone-600': !song?.genre,
              }
            )}
          >
            {song?.genre || 'Unknown'}
          </div>
        </div>
        {!!song?.lyrics && (
          <textarea
            rows={10}
            className="rounded-md p-2 outline outline-stone-500"
            defaultValue={decodeURIComponent(song.lyrics)}
          />
        )}
      </div>
    </Layout>
  );
};
export default Song;
