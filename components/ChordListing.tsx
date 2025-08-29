import * as React from 'react';
import {
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import IconButton from './IconButton';
import IconLink from './IconLink';
import Chord from './Chord';

export const initialChords = [
  { chordName: 'A,,,', strings: 'X 0 2 2 2 0', fingering: 'X X 2 3 4 X' },
  { chordName: 'B,,,', strings: 'X 2 4 4 4 2', fingering: 'X 1 2 3 4 1' },
  { chordName: 'C,,,', strings: 'X 3 2 0 1 0', fingering: 'X 3 2 X 1 X' },
  { chordName: 'D,,,', strings: 'X X 0 2 3 2', fingering: 'X X X 1 3 2' },
  { chordName: 'E,,,', strings: '0 2 2 1 0 0', fingering: 'X 2 3 1 X X' },
  { chordName: 'F,,,', strings: '1 3 3 2 1 1', fingering: '1 3 4 2 1 1' },
  { chordName: 'G,,,', strings: '3 2 0 0 3 3', fingering: '2 1 X X 3 4' },
];

function ChordListing() {
  const [showChords, setShowChords] = React.useState(true);

  const toggleSongsVisible = () => setShowChords(!showChords);

  return (
    <>
      <div className="flex items-center gap-4">
        <h1>Chords</h1>
        <IconButton
          title={showChords ? 'Hide chords list' : 'Show chords list'}
          onClick={toggleSongsVisible}
          Icon={showChords ? EyeSlashIcon : EyeIcon}
        />
        <IconButton
          title="Chords fetched from https://api.uberchord.com/"
          Icon={InformationCircleIcon}
        />
        <IconLink href="/chords" title="See all chords" Icon={BookOpenIcon} />
      </div>
      {showChords && (
        <div className="flex flex-wrap gap-2">
          {initialChords.map((chord) => (
            <Chord key={chord.chordName} {...chord} />
          ))}
        </div>
      )}
    </>
  );
}

export default ChordListing;
