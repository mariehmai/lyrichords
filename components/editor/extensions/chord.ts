/* eslint-disable arrow-body-style */
import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from '@tiptap/react';

export type ChordName = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export const chordNames: ChordName[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

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
        parseHTML: (element) =>
          element.getAttribute('data-chord') || element.style.textDecoration,
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
              .insertContent([
                {
                  type: 'text',
                  text: attributes?.chord,
                  marks: [{ type: this.name }],
                },
                {
                  type: 'text',
                  text: ' ',
                },
              ])
              .focus()
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
