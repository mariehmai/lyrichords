import * as React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { ArrowSmLeftIcon } from '@heroicons/react/solid';
import Layout from '@components/Layout';
import IconButton from '@components/IconButton';
import Chord from '@components/Chord';

type ChordFilter = 'Base' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

const chordFilters = ['Base', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];

export const initialChords = [
  { chordName: 'A,,,', strings: 'X 0 2 2 2 0', fingering: 'X X 2 3 4 X' },
  { chordName: 'B,,,', strings: 'X 2 4 4 4 2', fingering: 'X 1 2 3 4 1' },
  { chordName: 'C,,,', strings: 'X 3 2 0 1 0', fingering: 'X 3 2 X 1 X' },
  { chordName: 'D,,,', strings: 'X X 0 2 3 2', fingering: 'X X X 1 3 2' },
  { chordName: 'E,,,', strings: '0 2 2 1 0 0', fingering: 'X 2 3 1 X X' },
  { chordName: 'F,,,', strings: '1 3 3 2 1 1', fingering: '1 3 4 2 1 1' },
  { chordName: 'G,,,', strings: '3 2 0 0 3 3', fingering: '2 1 X X 3 4' },
];

const Chords = () => {
  const [chords, setChords] = React.useState(initialChords);
  const [selectedFilter, setSelectedFilter] =
    React.useState<ChordFilter>('Base');

  React.useEffect(() => {
    if (selectedFilter === 'Base') {
      setChords(initialChords);
      return;
    }

    async function fetchChords() {
      const data = await fetch(
        `https://api.uberchord.com/v1/chords?nameLike=${selectedFilter}`
      );
      setChords(await data.json());
    }

    void fetchChords();
  }, [selectedFilter]);

  return (
    <Layout withFooter={false}>
      <div className="flex flex-col gap-4 py-8">
        <Link href="/">
          <IconButton label="Back to home" Icon={ArrowSmLeftIcon} />
        </Link>
        <nav className="flex flex-row items-baseline gap-4 md:justify-center md:gap-6">
          <span className="shrink-0 text-stone-700">Search by:</span>
          <div className="flex gap-6 overflow-auto pb-2">
            {chordFilters.map((filter) => (
              <button
                key={filter}
                className={cn(
                  'text-lg text-stone-700 underline hover:font-bold hover:text-teal-600 md:text-2xl',
                  {
                    'font-bold text-teal-600': filter === selectedFilter,
                  }
                )}
                onClick={(e) => {
                  setSelectedFilter(e.currentTarget.textContent as ChordFilter);
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </nav>
        <div className="mt-4 flex flex-wrap gap-2">
          {chords.map((chord) => (
            <Chord key={chord.chordName} {...chord} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Chords;
