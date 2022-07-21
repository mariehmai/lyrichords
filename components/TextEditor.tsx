import * as React from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import cn from 'classnames';
import {
  ClipboardCheckIcon,
  ClipboardCopyIcon,
  ClipboardIcon,
} from '@heroicons/react/outline';
import IconButton from './IconButton';

type ElementWithEditor = ({ editor }: { editor: Editor }) => JSX.Element;

type CopyingStatus = 'saving' | 'done' | 'default';

type EditorProps = {
  editable?: boolean;
  content?: string;
  onUpdate: (content: string) => void;
  Header?: ElementWithEditor;
  Footer?: ElementWithEditor;
};

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

function TextEditor({
  content = '',
  editable = false,
  onUpdate,
  Header,
  Footer,
}: EditorProps) {
  const [copying, setCopying] = React.useState<CopyingStatus>('default');
  const editor = useEditor({
    extensions: [StarterKit],
    content: content ? JSON.parse(content) : '',
    editable,
    onUpdate: ({ editor }) => {
      onUpdate(JSON.stringify(editor.getJSON()));
    },
    editorProps: {
      attributes: {
        class:
          'p-2 outline-none rounded-md bg-white min-h-[50vh] focus:outline-2 focus:outline-red-400',
      },
    },
  });

  React.useEffect(() => {
    if (!editor) return;

    editor.setEditable(editable);
  }, [editor, editable]);

  React.useEffect(() => {
    if (copying === 'done') {
      setTimeout(() => {
        setCopying('default');
      }, 750);
    }
  }, [copying]);

  if (!editor) return null;

  const selectText = async () => {
    setCopying('saving');
    await navigator.clipboard.writeText(editor.getText());
    setCopying('done');
  };

  return (
    <>
      {!!Header && <Header editor={editor} />}
      <IconButton
        label="Copy"
        withBorder
        disabled={copying !== 'default'}
        onClick={selectText}
        Icon={getCopyingIcon(copying)}
      />
      <EditorContent
        editor={editor}
        className={cn('rounded-lg', {
          'border-2 border-stone-500 focus:border-none': editable,
        })}
      />
      {!!Footer && <Footer editor={editor} />}
    </>
  );
}

export default TextEditor;
