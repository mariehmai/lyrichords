import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import cn from 'classnames';
import { useEffect } from 'react';

type EditorProps = {
  editable?: boolean;
  content?: string;
  onUpdate: (content: string) => void;
};

const Editor = ({ content = '', editable = false, onUpdate }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content ? JSON.parse(content) : '',
    editable,
    onUpdate: ({ editor }) => {
      void onUpdate(JSON.stringify(editor.getJSON()));
    },
    editorProps: {
      attributes: {
        class: 'p-2 outline-none rounded-md',
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    editor.setEditable(editable);
  }, [editor, editable]);

  if (!editor) return null;

  return (
    <EditorContent
      editor={editor}
      className={cn(
        'max-h-[90vh] min-h-[50vh] overflow-auto rounded-md bg-white focus:outline-red-400',
        {
          'border-2 border-stone-500': editable,
        }
      )}
    />
  );
};

export default Editor;
