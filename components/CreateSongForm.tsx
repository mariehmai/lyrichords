import * as React from 'react';
import cn from 'classnames';
import { MusicNoteIcon, CheckIcon } from '@heroicons/react/solid';
import { saveSong } from '@lib/songs/songs';
import { genres } from '@lib/songs/genres';
import TextEditor from './editor/TextEditor';

type InputFieldProps = {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({ name, label, value, onChange }: InputFieldProps) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-2">
      <label htmlFor={label}>{label}</label>
      <input
        className="rounded-md p-2 outline outline-2 outline-stone-500 focus:outline-red-400"
        id={label}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

type State = {
  title: string;
  artist?: string;
  genre?: string;
  lyrics?: string;
};

type Action =
  | {
      type: 'update';
      payload: {
        key: string;
        value: string;
      };
    }
  | {
      type: 'reset';
    };

function songReducer(state: State, action: Action) {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case 'reset':
      return initialState;
    default:
      throw new Error(`Unknown action type in songReducer`);
  }
}

const initialState = {
  title: '',
  artist: '',
  genre: '',
  lyrics: '',
};

export default React.forwardRef<
  HTMLFormElement,
  React.PropsWithChildren<React.FormHTMLAttributes<HTMLFormElement>>
>(function CreateSongForm(_, ref) {
  const [state, dispatch] = React.useReducer(songReducer, initialState);
  const [lyrics, setLyrics] = React.useState('');
  const [error, setError] = React.useState(false);

  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'update',
      payload: { key: e.target.name, value: e.target.value },
    });
  };

  const submitNewSong = (e: React.MouseEvent) => {
    e.preventDefault();

    return saveSong({
      ...state,
      lyrics,
      artist: state.artist || 'Unknown',
      genre: state.genre || 'Unknown',
    })
      .then(() => dispatch({ type: 'reset' }))
      .catch(() => {
        setError(true);
      });
  };

  return (
    <form ref={ref} className="flex flex-col gap-2">
      <span className="mb-2 flex items-center gap-2">
        <h1>Add new song</h1>
        <MusicNoteIcon className="h-7 w-7 text-stone-600" />
      </span>
      <div className="flex flex-row flex-wrap gap-4">
        <InputField
          name="title"
          label="Title*"
          value={state.title}
          onChange={updateInput}
        />
        <InputField
          name="artist"
          label="Artist"
          value={state.artist || ''}
          onChange={updateInput}
        />
        <div className="flex-0.5 flex flex-col gap-2">
          <label htmlFor="select-genre">Genre</label>
          <div className="combo min-w-[150px]">
            <select
              id="select-genre"
              className="py-1.75 w-full appearance-none rounded-lg border-2 border-stone-500 p-2 outline-2 focus:outline-red-400"
              onChange={(e) =>
                dispatch({
                  type: 'update',
                  payload: { key: 'genre', value: e.target.value },
                })
              }
            >
              <option key="default" value="">
                --genre--
              </option>
              {genres.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
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
                  'cursor-not-allowed bg-stone-300': !state.title,
                }
              )}
              disabled={!state.title}
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
