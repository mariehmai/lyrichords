import Layout from '@components/Layout';
import CreateSongForm from '@components/CreateSongForm';

function NewSongPage() {
  return (
    <div className="flex flex-col gap-4 rounded-md py-4 md:py-8">
      <CreateSongForm />
    </div>
  );
}

NewSongPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NewSongPage;
