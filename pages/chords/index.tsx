import { useRouter } from 'next/router';
import { ArrowSmLeftIcon } from '@heroicons/react/solid';

import Layout from '@components/Layout';
import IconButton from '@components/IconButton';
import Chord from '@components/Chord';

const Chords = () => {
  const router = useRouter();

  return (
    <Layout withFooter={false}>
      <div className="flex flex-col gap-12 py-8">
        <IconButton
          label="Back to home"
          onClick={router.back}
          Icon={ArrowSmLeftIcon}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Chord name="A,,," strings="X 0 2 2 2 0" fingering="X X 2 3 4 X" />
        <Chord name="B,,," strings="X 2 4 4 4 2" fingering="X 1 2 3 4 1" />
        <Chord name="C,,," strings="X 3 2 0 1 0" fingering="X 3 2 X 1 X" />
        <Chord name="D,,," strings="X X 0 2 3 2" fingering="X X X 1 3 2" />
        <Chord name="E,,," strings="0 2 2 1 0 0" fingering="X 2 3 1 X X" />
        <Chord name="F,,," strings="1 3 3 2 1 1" fingering="1 3 4 2 1 1" />
        <Chord name="G,,," strings="3 2 0 0 3 3" fingering="2 1 X X 3 4" />
      </div>
    </Layout>
  );
};

export default Chords;
