/* eslint-disable arrow-body-style */
import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from '@tiptap/react';

type ChordName = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

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
      setChord: (attributes?: { chord: ChordName }) => ReturnType;
      /**
       * Toggle inline chord
       */
      toggleChord: (attributes?: { chord: ChordName }) => ReturnType;
      /**
       * Unset a chord mark
       */
      unsetChord: () => ReturnType;
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
            style: `cursor: pointer; text-decoration: underline;`,
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
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      toggleChord:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes);
        },
      unsetChord:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
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
