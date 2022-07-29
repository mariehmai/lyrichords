export type GuitarString = typeof guitarStrings[number];

export const guitarStrings = [
  {
    position: 0,
    stringLabel: 'E2',
  },
  {
    position: 1,
    stringLabel: 'B',
  },
  {
    position: 2,
    stringLabel: 'G',
  },
  {
    position: 3,
    stringLabel: 'D',
  },
  {
    position: 4,
    stringLabel: 'A',
  },
  {
    position: 5,
    stringLabel: 'E',
  },
] as const;
