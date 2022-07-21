import * as React from 'react';
import Link from 'next/link';
import {
  EyeOffIcon,
  EyeIcon,
  InformationCircleIcon,
  ExternalLinkIcon,
} from '@heroicons/react/solid';
import IconButton from './IconButton';
import Chord from './Chord';
import { initialChords } from 'pages/chords';

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
          Icon={showChords ? EyeOffIcon : EyeIcon}
        />
        <IconButton
          title="Chords fetched from https://api.uberchord.com/"
          Icon={InformationCircleIcon}
        />
        <Link href="/chords">
          <IconButton title="See all chords" Icon={ExternalLinkIcon} />
        </Link>
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
