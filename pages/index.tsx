import Layout from '@components/Layout';
import ChordListing from '@components/ChordListing';
import SongListing from '@components/SongListing';

function HomePage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:py-8">
      <ChordListing />
      <SongListing />
    </div>
  );
}

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
