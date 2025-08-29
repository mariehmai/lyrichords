/* eslint-disable arrow-body-style */
import { mergeAttributes, Node } from '@tiptap/react';
import type { ChordName } from '@lib/chords/chords';
import { chordNames } from '@lib/chords/chords';

export interface ChordOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>;
  chords: readonly ChordName[];
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    chord: {
      insertChord: (attributes: { chord: ChordName }) => ReturnType;
    };
  }
}

export const inputRegex = /(?:^|\s)((?:\[)((?:[^\]]+))(?:\]))$/;
export const pasteRegex = /(?:^|\s)((?:\[)((?:[^\]]+))(?:\]))/g;

export const Chord = Node.create<ChordOptions>({
  name: 'chord',

  addOptions() {
    return {
      HTMLAttributes: {},
      chords: chordNames,
    };
  },

  group: 'inline',

  inline: true,

  selectable: true,

  atom: true,

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
    return [
      {
        tag: `span[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(
        { 'data-type': this.name },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      node.attrs.chord.replaceAll(',', ''),
    ];
  },

  addCommands() {
    return {
      insertChord:
        (attributes) =>
        ({ chain }) => {
          if (!this.options.chords.includes(attributes.chord)) {
            return false;
          }

          return chain()
            .focus()
            .insertContent([
              {
                type: this.name,
                attrs: { chord: attributes.chord },
              },
              {
                type: 'text',
                text: ' ',
              },
            ])
            .run();
        },
    };
  },
});
