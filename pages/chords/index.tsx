import * as React from 'react';
import cn from 'classnames';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Layout from '@components/Layout';
import IconLink from '@components/IconLink';
import Chord from '@components/Chord';
import { initialChords } from '@components/ChordListing';

type ChordFilter = 'Base' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

const chordFilters = ['Base', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];

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
        <IconLink label="Back to home" href="/" Icon={ArrowLeftIcon} />
        <nav className="flex flex-row items-baseline gap-4 md:justify-center md:gap-6">
          <span className="shrink-0 text-stone-700">Search by:</span>
          <div className="flex gap-6 overflow-auto p-1 pb-3">
            {chordFilters.map((filter) => (
              <button
                key={filter}
                className={cn(
                  'text-lg text-stone-700 underline outline-offset-1 outline-yellow-600 hover:font-bold hover:text-yellow-600 md:text-2xl',
                  {
                    'font-bold text-yellow-600': filter === selectedFilter,
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
