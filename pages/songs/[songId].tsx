import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import {
  ArrowSmLeftIcon,
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XIcon,
} from '@heroicons/react/solid';
import type { Editor } from '@tiptap/react';
import { updateSong, deleteSong, useSong, type Song } from '@lib/songs/songs';
import Layout from '@components/Layout';
import IconButton from '@components/IconButton';
import TextEditor from '@components/TextEditor';
import SongLyricsPlaceholder from '@components/SongLyricsPlaceholder';

type SongEditorProps = {
  goBack: () => void;
  editor?: Editor;
  editable: boolean;
  song: Song;
  submitEditedSong: () => void;
  toggleEditable: (editable: boolean) => void;
};

const SongHeader = ({
  goBack,
  editor,
  editable,
  song,
  submitEditedSong,
  toggleEditable,
}: SongEditorProps) => {
  const [showDelete, setShowDelete] = useState(false);

  const cancelChanges = () => {
    editor?.commands.setContent(JSON.parse(song.lyrics));
    toggleEditable(false);
  };

  const removeSong = async () => {
    await deleteSong(song.id);

    goBack();
  };

  return (
    <div>
      {showDelete && (
        <dialog className="rounded-lg shadow-md" open={showDelete}>
          <h1>Are you sure you want to delete the song?</h1>
          <h4 className="text-stone-500">This operation is irreversible.</h4>
          <div className="flew-row mt-2 flex justify-end space-x-2">
            <button
              className="rounded bg-stone-200 px-3 py-1 text-sm"
              onClick={() => setShowDelete(false)}
            >
              Cancel
            </button>
            <button
              className="rounded bg-red-200 px-3 py-1 text-sm"
              onClick={removeSong}
            >
              Confirm
            </button>
          </div>
        </dialog>
      )}
      <span className="flex items-center gap-2">
        <h1 className="font-bold text-stone-700">{song?.title}</h1>
        {editable ? (
          <>
            <IconButton
              title="Cancel changes"
              size="md"
              onClick={cancelChanges}
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
          <>
            <IconButton
              title="Edit song"
              size="md"
              onClick={() => toggleEditable(true)}
              Icon={PencilIcon}
            />
            <IconButton
              title="Delete song"
              size="md"
              onClick={() => setShowDelete(!showDelete)}
              Icon={TrashIcon}
            />
          </>
        )}
      </span>
      <h2 className="text-sm text-stone-700">{song?.artist}</h2>
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
  );
};

const Song = () => {
  const [editable, setEditable] = useState<boolean>(false);
  const router = useRouter();
  const songId = router.query.songId as string;
  const { song, loading } = useSong(songId);
  const [lyrics, setLyrics] = useState<string>('');

  useEffect(() => {
    if (!loading) {
      setLyrics(song.lyrics);
    }
  }, [loading, song.lyrics]);

  const toggleEditable = (editable: boolean) => {
    setEditable(editable);
  };

  const submitEditedSong = async () => {
    if (lyrics !== song.lyrics) {
      await updateSong(song!.id, {
        ...song,
        lyrics: lyrics || song?.lyrics,
      });
    }

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
        {loading && <SongLyricsPlaceholder />}
        {!song.lyrics && (
          <SongHeader
            goBack={router.back}
            editable={editable}
            song={song}
            submitEditedSong={submitEditedSong}
            toggleEditable={toggleEditable}
          />
        )}
        {!!song.lyrics && (
          <TextEditor
            editable={editable}
            content={song.lyrics}
            onUpdate={(content) => setLyrics(content)}
            Header={({ editor }) => (
              <SongHeader
                goBack={router.back}
                editor={editor}
                editable={editable}
                song={song}
                submitEditedSong={submitEditedSong}
                toggleEditable={toggleEditable}
              />
            )}
          />
        )}
      </div>
    </Layout>
  );
};

export default Song;
