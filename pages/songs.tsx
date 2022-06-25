import cn from 'classnames';
import { Layout } from '@components/Layout';
import { songs } from 'lib/songs';

type SongProps = {
  artist: string;
  title: string;
  lyrics: string;
  genre?: string;
};

const Divider = () => <div className="h-[1px] border-b border-stone-300"></div>;

const Song = ({ artist, genre, title }: SongProps) => (
  <li className="grid grid-cols-4 items-baseline gap-2 overflow-scroll py-2.5">
    <span className="col-span-1 text-sm uppercase text-stone-700">
      {artist}
    </span>
    <span className="col-span-2 text-sm uppercase text-stone-700">{title}</span>
    <span
      className={cn(
        'w-fit rounded-full bg-red-400 px-2 py-0.5 text-sm font-bold text-white',
        {
          'bg-stone-600': !genre,
        }
      )}
    >
      {genre || 'Unknown'}
    </span>
  </li>
);

const Songs = () => (
  <Layout withFooter={false}>
    <div className="py-8">
      <h1>Songs</h1>
      <ul className="mt-8 h-[50vh] overflow-scroll">
        {songs.map((song) => (
          <>
            <Song key={song.id} {...song} />
            <Divider />
          </>
        ))}
      </ul>
    </div>
  </Layout>
);

export default Songs;
