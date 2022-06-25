import type { NextPage } from 'next';
import { Grid } from '@components/Grid';
import { CardLink } from '@components/CardLink';
import { Layout, MainContainer } from '@components/Layout';

const Home: NextPage = () => (
  <Layout>
    <MainContainer>
      <h1 className="m-0 text-center text-6xl">Lyrichords</h1>
      <p className="my-16 text-center text-2xl">
        A simple app to gather your favorite songs&apos; lyrics.
      </p>

      <Grid>
        <CardLink href="/songs">
          <h2 className="mb-4 text-2xl font-semibold">View Songs &rarr;</h2>
          <p className="m-0 text-lg">See the full list of songs lyrics</p>
        </CardLink>
      </Grid>
    </MainContainer>
  </Layout>
);

export default Home;
