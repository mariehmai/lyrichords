import React, { useState, type FormHTMLAttributes } from 'react';
import cn from 'classnames';
import { MusicNoteIcon, CheckIcon } from '@heroicons/react/solid';
import { saveSong } from '@lib/songs/songs';
import TextEditor from './TextEditor';

type Genre =
  | 'Pop'
  | 'Reggaeton'
  | 'Rock'
  | 'Pop Rock'
  | 'Latino'
  | 'Vallenato'
  | 'Merengue';

const genres: Record<string, Genre> = {
  Pop: 'Pop',
  Reggaeton: 'Reggaeton',
  Rock: 'Rock',
  PopRock: 'Pop Rock',
  Latino: 'Latino',
  Vallenato: 'Vallenato',
  Merengue: 'Merengue',
};

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({ label, value, onChange }: InputFieldProps) => (
  <div className="flex flex-1 flex-col justify-center gap-2">
    <label htmlFor={label}>{label}</label>
    <input
      className="rounded-md p-2 outline outline-stone-500 focus:outline-2 focus:outline-red-400"
      id={label}
      value={value}
      onChange={onChange}
    />
  </div>
);

const CreateSongForm = React.forwardRef<
  HTMLFormElement,
  React.PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>
>(({}, ref) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setArtist('');
    setGenre('');
    setLyrics('');
  };

  const submitNewSong = (e: React.MouseEvent) => {
    e.preventDefault();

    return saveSong({
      title,
      artist: artist || 'Unknown',
      lyrics,
      genre: genre || 'Unknown',
    })
      .then(() => resetForm())
      .catch(() => {
        setError(true);
      });
  };

  return (
    <form ref={ref} className="flex flex-col gap-6 rounded-md py-8">
      <span className="mb-2 flex items-center gap-2">
        <h1>Add new song</h1>
        <MusicNoteIcon className="h-7 w-7 text-stone-600" />
      </span>
      <div className="flex flex-row flex-wrap gap-4">
        <InputField
          label="Title*"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputField
          label="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <div className="flex-0.5 flex flex-col gap-2">
          <label htmlFor="genre-select">Genre</label>
          <select
            id="Genre"
            className="appearance-none rounded-md border-2 border-stone-500 p-2 py-2.5 outline-2 focus:outline-red-400"
          >
            <option value="">--Choose a genre--</option>
            {Object.keys(genres).map((genre) => (
              <option
                key={genre}
                value={genres[genre]}
                onChange={() => setGenre(genre)}
              >
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="Lyrics">Lyrics</label>
        <TextEditor
          onUpdate={(content) => setLyrics(content)}
          editable
          Footer={({ editor }) => (
            <button
              className={cn(
                'flex items-center gap-2 self-center rounded-lg bg-stone-600 py-2.5 px-4 font-bold text-white outline-red-400',
                {
                  'cursor-not-allowed bg-stone-300': !title,
                }
              )}
              disabled={!title}
              onClick={async (e) => {
                await submitNewSong(e);
                editor.commands.clearContent();
              }}
            >
              Save new song
              <CheckIcon className="h-7 w-7" />
            </button>
          )}
        />
      </div>

      {!!error && (
        <span className="text-red-800">
          An error occurred, please try later!
        </span>
      )}
    </form>
  );
});

CreateSongForm.displayName = 'CreateSongForm';

export default CreateSongForm;
