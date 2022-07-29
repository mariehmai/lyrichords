import * as React from 'react';
import cn from 'classnames';
import type { Editor } from '@tiptap/react';
import {
  BackspaceIcon,
  ClipboardCheckIcon,
  ClipboardCopyIcon,
  ClipboardIcon,
} from '@heroicons/react/outline';
import IconButton from '../IconButton';
import AdaptiveSeparator from '@components/AdaptiveSeparator';
import { chordNames } from '@lib/chords/chords';
import type { ChordName } from '@lib/chords/chords';

type CopyingStatus = 'saving' | 'done' | 'default';

function getCopyingIcon(status: CopyingStatus) {
  switch (status) {
    case 'saving':
      return ClipboardCopyIcon;
    case 'done':
      return ClipboardCheckIcon;
    default:
      return ClipboardIcon;
  }
}

type EditorMenuProps = {
  editor: Editor;
};

function EditorMenu({ editor }: EditorMenuProps) {
  const [copying, setCopying] = React.useState<CopyingStatus>('default');

  React.useEffect(() => {
    if (copying === 'done') {
      setTimeout(() => {
        setCopying('default');
      }, 750);
    }
  }, [copying]);

  const selectText = async () => {
    setCopying('saving');
    editor.chain().focus().selectAll().run();
    await navigator.clipboard.writeText(editor.getText());
    setCopying('done');
  };

  const clearText = () => {
    editor.commands.clearContent();
  };

  const insertChord = (chord: ChordName) => {
    editor.chain().insertChord({ chord }).run();
  };

  return (
    <div className="flex flex-row flex-wrap items-end justify-start gap-2 rounded-t-lg border-2 border-b-0 border-stone-500 px-2 py-2">
      <div className="-mt-2">
        <label htmlFor="basic-editing" className="text-sm font-extralight">
          Edit
        </label>
        <div id="basic-editing" className="flew-row flex flex-wrap gap-2">
          <IconButton
            label="Copy"
            withBorder
            disabled={copying !== 'default' || editor.isEmpty}
            onClick={selectText}
            Icon={getCopyingIcon(copying)}
          />
          <IconButton
            label="Clear all"
            withBorder
            disabled={editor.isEmpty}
            onClick={clearText}
            Icon={BackspaceIcon}
          />
        </div>
      </div>
      <AdaptiveSeparator />
      <div className="-mt-2">
        <label htmlFor="select-chord" className="text-sm font-extralight">
          Insert chord
        </label>
        <div className="flex flex-wrap gap-1.5">
          {chordNames.map((chord) => {
            const [root, quality, tension, bass] = chord.split(',');

            return (
              <button
                key={chord}
                className={cn(
                  'rounded-md border-2 border-stone-500 px-1.5 py-0.5 text-sm text-stone-600 outline-red-400',
                  'hover:shadow-sm',
                  'focus:border-red-400 focus:font-bold focus:text-red-600',
                  'active:shadow-inner'
                )}
                onClick={(e) => {
                  e.preventDefault();
                  insertChord(chord);
                }}
              >
                <span>{root}</span>
                {quality && <sup>{quality}</sup>}
                {tension && <sup>{tension}</sup>}
                {bass && <span>{bass}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default EditorMenu;
