/* eslint-disable arrow-body-style */
import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from '@tiptap/react';

export type ChordName = typeof chordNames[number];

export const chordNames = [
  'A,,,',
  'B,,,',
  'C,,,',
  'D,,,',
  'E,,,',
  'F,,,',
  'G,,,',
  'A,m,,',
  'A,,7,',
  'A,maj,7,',
  'A,m,7,',
  'A,,5,',
  'A,dim,7,',
  'A,m,7b5,',
  'A,,6,',
  'A,m,6,',
  'B,m,,',
  'B,,7,',
  'B,maj,7,',
  'B,m,7,',
  'B,,5,',
  'B,dim,7,',
  'B,m,7b5,',
  'B,,6,',
  'B,m,6,',
  'C,m,,',
  'C,,7,',
  'C,maj,7,',
  'C,m,7,',
  'C,,5,',
  'C,dim,7,',
  'C,m,7b5,',
  'C,,6,',
  'C,m,6,',
  'D,m,,',
  'D,,7,',
  'D,maj,7,',
  'D,m,7,',
  'D,,5,',
  'D,dim,7,',
  'D,m,7b5,',
  'D,,6,',
  'D,m,6,',
  'E,m,,',
  'E,,7,',
  'E,maj,7,',
  'E,m,7,',
  'E,,5,',
  'E,dim,7,',
  'E,m,7b5,',
  'E,,6,',
  'E,m,6,',
  'F,m,,',
  'F,,7,',
  'F,maj,7,',
  'F,m,7,',
  'F,,5,',
  'F,dim,7,',
  'F,m,7b5,',
  'F,,6,',
  'F,m,6,',
  'G,m,,',
  'G,,7,',
  'G,maj,7,',
  'G,m,7,',
  'G,,5,',
  'G,dim,7,',
  'G,m,7b5,',
  'G,,6,',
  'G,m,6,',
] as const;

export interface ChordOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    chord: {
      /**
       * Set a chord mark
       */
      setChord: () => ReturnType;
      /**
       * Toggle inline chord
       */
      toggleChord: () => ReturnType;
      /**
       * Unset a chord mark
       */
      unsetChord: () => ReturnType;
      /**
       * Insert a new chord mark
       */
      insertChord: (attributes?: { chord: ChordName }) => ReturnType;
    };
  }
}

export const inputRegex = /(?:^|\s)((?:\[)((?:[^\]]+))(?:\]))$/;
export const pasteRegex = /(?:^|\s)((?:\[)((?:[^\]]+))(?:\]))/g;

export const Chord = Mark.create<ChordOptions>({
  name: 'chord',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      chord: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-chord'),
        renderHTML: (attributes) => {
          return {
            'data-chord': attributes.chord,
            class:
              'cursor-pointer shadow-md border rounded py-0.25 px-0.5 hover:underline bg-stone-100 text-sm text-stone-700',
          };
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: 'span' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  keepOnSplit: false,

  addCommands() {
    return {
      setChord:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleChord:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
      unsetChord:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
      insertChord:
        (attributes) =>
        ({ commands, chain }) => {
          return commands.command(() => {
            return chain()
              .focus()
              .insertContent([
                {
                  type: 'text',
                  text: attributes?.chord.replaceAll(',', ''),
                  marks: [
                    {
                      type: this.name,
                      attrs: { chord: attributes?.chord },
                    },
                  ],
                },
                {
                  type: 'text',
                  text: ' ',
                },
              ])
              .run();
          });
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-c': () => this.editor.commands.toggleChord(),
    };
  },

  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: pasteRegex,
        type: this.type,
      }),
    ];
  },
});
