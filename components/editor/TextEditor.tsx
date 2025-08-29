import * as React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import type { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import cn from 'classnames';
import EditorMenu from './EditorMenu';
import { Chord } from './extensions/chord';

type ElementWithEditor = ({ editor }: { editor: Editor }) => React.JSX.Element;

type EditorProps = {
  editable?: boolean;
  content?: string;
  onUpdate: (content: string) => void;
  Header?: ElementWithEditor;
  Footer?: ElementWithEditor;
};

function TextEditor({
  content = '',
  editable = false,
  onUpdate,
  Header,
  Footer,
}: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Chord],
    content: content ? JSON.parse(content) : '',
    editable,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onUpdate(JSON.stringify(editor.getJSON()));
    },
    editorProps: {
      attributes: {
        class:
          'p-4 outline-none rounded-b-md bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 min-h-[50vh] focus:ring-2 focus:ring-red-400 dark:focus:ring-red-500',
      },
    },
  });

  React.useEffect(() => {
    if (!editor) return;

    editor.setEditable(editable);
  }, [editor, editable]);

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-4">
      {!!Header && <Header editor={editor} />}
      <div className="rounded-lg overflow-hidden">
        {editable && <EditorMenu editor={editor} />}
        <EditorContent
          editor={editor}
          className={cn('rounded-b-lg font-mono focus:ring-0', {
            'border-2 border-stone-500 dark:border-stone-600': editable,
          })}
        />
      </div>
      {!!Footer && <Footer editor={editor} />}
    </div>
  );
}

export default TextEditor;
