import * as React from 'react';
import { type Editor } from '@tiptap/react';
import {
  ClipboardCheckIcon,
  ClipboardCopyIcon,
  ClipboardIcon,
} from '@heroicons/react/outline';
import IconButton from '../IconButton';

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
    await navigator.clipboard.writeText(editor.getText());
    setCopying('done');
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
            disabled={copying !== 'default'}
            onClick={selectText}
            Icon={getCopyingIcon(copying)}
          />
        </div>
      </div>
    </div>
  );
}

export default EditorMenu;
