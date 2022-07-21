import * as React from 'react';
import {
  EyeOffIcon,
  EyeIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid';
import IconButton from './IconButton';
import Chord from './Chord';

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
          onClick={() => {}}
          Icon={InformationCircleIcon}
        />
      </div>
      {showChords && (
        <div className="flex max-h-48 flex-wrap overflow-scroll md:max-h-56">
          <Chord name="A,,," strings="X 0 2 2 2 0" fingering="X X 2 3 4 X" />
          <Chord name="B,,," strings="X 2 4 4 4 2" fingering="X 1 2 3 4 1" />
          <Chord name="C,,," strings="X 3 2 0 1 0" fingering="X 3 2 X 1 X" />
          <Chord name="D,,," strings="X X 0 2 3 2" fingering="X X X 1 3 2" />
          <Chord name="E,,," strings="0 2 2 1 0 0" fingering="X 2 3 1 X X" />
          <Chord name="F,,," strings="1 3 3 2 1 1" fingering="1 3 4 2 1 1" />
          <Chord name="G,,," strings="3 2 0 0 3 3" fingering="2 1 X X 3 4" />
        </div>
      )}
    </>
  );
}

export default ChordListing;
