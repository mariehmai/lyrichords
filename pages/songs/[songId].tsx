import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import {
  ArrowSmLeftIcon,
  CheckIcon,
  PencilIcon,
  XIcon,
} from '@heroicons/react/solid';
import { fetchSong, updateSong, type Song } from '@lib/songs/songs';
import { Layout } from '@components/Layout';
import { IconButton } from '@components/IconButton';
import Editor from '@components/Editor';

const Song = () => {
  const [song, setSong] = useState<Song | undefined>();
  const [lyrics, setLyrics] = useState<string>('');
  const [editable, setEditable] = useState<boolean>(false);
  const router = useRouter();
  const songId = router.query.songId as string;

  useEffect(() => {
    if (!songId) return;

    const getSong = async () => {
      const s = await fetchSong(songId);
      setSong(s);
      setLyrics(s?.lyrics || '');
    };

    void getSong();
  }, [songId]);

  const toggleEditable = (editable: boolean) => {
    setEditable(editable);
  };

  const cancelEdit = () => {
    setLyrics(song?.lyrics || '');
    toggleEditable(false);
  };

  const submitEditedSong = async () => {
    await updateSong(song!.id, {
      ...song,
      lyrics: lyrics || song?.lyrics,
    });

    toggleEditable(false);
  };

  return (
    <Layout withFooter={false}>
      <div className="flex min-h-[90vh] flex-col gap-12 py-8">
        <IconButton
          label="Back to songs"
          onClick={router.back}
          Icon={ArrowSmLeftIcon}
        />
        <div>
          <span className="flex items-center gap-2">
            <h1 className="col-span-2 font-bold text-stone-700">
              {song?.title}
            </h1>
            {editable ? (
              <>
                <IconButton
                  title="Cancel changes"
                  size="md"
                  onClick={cancelEdit}
                  Icon={XIcon}
                />
                <IconButton
                  title="Confirm changes"
                  size="md"
                  onClick={submitEditedSong}
                  Icon={CheckIcon}
                />
              </>
            ) : (
              <IconButton
                title="Edit song"
                size="md"
                onClick={() => toggleEditable(true)}
                Icon={PencilIcon}
              />
            )}
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
        {!!lyrics && (
          <Editor
            editable={editable}
            content={lyrics}
            onUpdate={(content) => setLyrics(content)}
          />
        )}
      </div>
    </Layout>
  );
};
export default Song;
