import * as React from 'react';
import cn from 'classnames';
import { CheckIcon, MusicalNoteIcon } from '@heroicons/react/24/solid';
import { saveSong } from '@lib/songs/songs';
import { genres } from '@lib/songs/genres';
import TextEditor from './editor/TextEditor';

type InputFieldProps = {
  name: string;
  label: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({
  name,
  label,
  value,
  required = false,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-stone-700 dark:text-stone-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        className="px-3 py-2.5 rounded-lg border-2 border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:border-red-400 dark:focus:border-red-400 transition-colors duration-200"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
}

interface State {
  title: string;
  artist: string;
  genre: string;
}

type Action =
  | {
      type: 'update';
      payload: {
        key: keyof State;
        value: string;
      };
    }
  | {
      type: 'reset';
    };

function songReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

const initialState: State = {
  title: '',
  artist: '',
  genre: '',
};

interface CreateSongFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {}

const CreateSongForm = React.forwardRef<HTMLFormElement, CreateSongFormProps>(
  function CreateSongForm(props, ref) {
    const [state, dispatch] = React.useReducer(songReducer, initialState);
    const [lyrics, setLyrics] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: 'update',
        payload: { key: e.target.name as keyof State, value: e.target.value },
      });
    };

    const onLyricsUpdate = React.useCallback((content: string) => {
      setLyrics(content);
    }, []);

    const submitNewSong = React.useCallback(
      async (e: React.MouseEvent) => {
        e.preventDefault();

        if (!state.title.trim()) {
          setError('Title is required');
          return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
          await saveSong({
            ...state,
            lyrics,
            artist: state.artist || 'Unknown',
            genre: state.genre || 'Unknown',
          });

          dispatch({ type: 'reset' });
          setLyrics('');
        } catch {
          setError('Failed to save song. Please try again.');
        } finally {
          setIsSubmitting(false);
        }
      },
      [state, lyrics]
    );

    const isFormValid = state.title.trim().length > 0;

    return (
      <div className="max-w-4xl mx-auto">
        <form
          ref={ref}
          className="flex flex-col gap-8 bg-white dark:bg-stone-900 p-8 rounded-xl border border-stone-200 dark:border-stone-700 shadow-lg dark:shadow-2xl"
          {...props}
        >
          <div className="flex items-center gap-3 pb-2 border-b border-stone-200 dark:border-stone-700">
            <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
              Add New Song
            </h1>
            <MusicalNoteIcon className="w-7 h-7 text-stone-500 dark:text-stone-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <InputField
                name="title"
                label="Title"
                value={state.title}
                required
                onChange={updateInput}
              />
            </div>
            <InputField
              name="artist"
              label="Artist"
              value={state.artist}
              onChange={updateInput}
            />
            <div className="md:col-span-1">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="genre"
                  className="text-sm font-medium text-stone-700 dark:text-stone-300"
                >
                  Genre
                </label>
                <select
                  id="genre"
                  className="px-3 py-2.5 rounded-lg border-2 border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:border-red-400 dark:focus:border-red-400 transition-colors duration-200"
                  value={state.genre}
                  onChange={(e) =>
                    dispatch({
                      type: 'update',
                      payload: { key: 'genre', value: e.target.value },
                    })
                  }
                >
                  <option value="">Select genre</option>
                  {genres.map(({ name }) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Lyrics
            </label>
            <div className="border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden bg-white dark:bg-stone-800">
              <TextEditor
                onUpdate={onLyricsUpdate}
                editable
                Footer={({ editor }) => (
                  <div className="flex flex-col items-center gap-4 p-4 bg-stone-50 dark:bg-stone-800 border-t border-stone-200 dark:border-stone-700">
                    {error && (
                      <div
                        className="text-red-600 dark:text-red-400 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg border border-red-200 dark:border-red-800"
                        role="alert"
                      >
                        {error}
                      </div>
                    )}
                    <button
                      type="button"
                      className={cn(
                        'flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 outline-none focus:ring-4',
                        {
                          'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-red-200 dark:focus:ring-red-800':
                            isFormValid && !isSubmitting,
                          'bg-stone-300 dark:bg-stone-600 text-stone-500 dark:text-stone-400 cursor-not-allowed':
                            !isFormValid || isSubmitting,
                        }
                      )}
                      disabled={!isFormValid || isSubmitting}
                      onClick={async (e) => {
                        await submitNewSong(e);
                        editor?.commands.clearContent();
                      }}
                    >
                      {isSubmitting ? 'Saving...' : 'Save Song'}
                      <CheckIcon className="w-5 h-5" />
                    </button>
                  </div>
                )}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default CreateSongForm;
