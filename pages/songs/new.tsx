import Layout from '@components/Layout';
import CreateSongForm from '@components/CreateSongForm';

function NewSongPage() {
  return <CreateSongForm />;
}

NewSongPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NewSongPage;
