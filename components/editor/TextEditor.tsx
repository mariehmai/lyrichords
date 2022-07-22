import * as React from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import cn from 'classnames';
import EditorMenu from './EditorMenu';

type ElementWithEditor = ({ editor }: { editor: Editor }) => JSX.Element;

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
    extensions: [StarterKit],
    content: content ? JSON.parse(content) : '',
    editable,
    onUpdate: ({ editor }) => {
      onUpdate(JSON.stringify(editor.getJSON()));
    },
    editorProps: {
      attributes: {
        class:
          'p-2 outline-none rounded-b-md bg-white min-h-[50vh] focus:border-2 focus:border-red-400',
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
      <div>
        {editable && <EditorMenu editor={editor} />}
        <EditorContent
          editor={editor}
          className={cn('rounded-b-lg', {
            'border-2 border-stone-500 focus:border-none': editable,
          })}
        />
      </div>
      {!!Footer && <Footer editor={editor} />}
    </div>
  );
}

export default TextEditor;
