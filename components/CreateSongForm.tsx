import React, { useState, type FormHTMLAttributes } from 'react';
import cn from 'classnames';
import { MusicNoteIcon, CheckIcon } from '@heroicons/react/solid';
import { saveSong } from '@lib/songs/songs';

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
  <div className="flex flex-1 flex-col gap-2">
    <label htmlFor={label}>{label}</label>
    <input
      className="rounded-md p-2 outline outline-stone-500"
      id={label}
      value={value}
      onChange={onChange}
    />
  </div>
);

export const CreateSongForm = React.forwardRef<
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

  const saveNewSong = (e: React.MouseEvent) => {
    e.preventDefault();

    return saveSong({
      title,
      artist: artist || 'Unknown',
      lyrics,
      genre: genre || 'Unknown',
    })
      .then(() => resetForm())
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  return (
    <form ref={ref} className="flex flex-col gap-6 rounded-md bg-slate-50 p-4">
      <span className="mb-2 flex items-center gap-2">
        <h2 className="font-bold">Add new song</h2>
        <MusicNoteIcon className="h-7 w-7" />
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
            className="rounded-md p-2 outline outline-stone-500"
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
        <textarea
          id="Lyric"
          className="rounded-md p-2 outline outline-stone-500"
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
        />
      </div>
      <button
        className={cn(
          'flex items-center gap-2 self-center rounded-lg bg-stone-500 py-2.5 px-4 font-bold text-white',
          {
            'cursor-not-allowed bg-stone-300': !title,
          }
        )}
        disabled={!title}
        onClick={saveNewSong}
      >
        Save new song
        <CheckIcon className="h-7 w-7" />
      </button>
      {!!error && (
        <span className="text-red-800">
          An error occurred, please try later!
        </span>
      )}
    </form>
  );
});

CreateSongForm.displayName = 'CreateSongForm';
