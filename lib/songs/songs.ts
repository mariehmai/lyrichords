import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { database, auth } from '@lib/firebase/config';
import { toTitleCase } from '@lib/string';

const dbInstance = collection(database, 'tracks');

export type Song = {
  id: string;
  title: string;
  artist?: string;
  genre?: string;
  lyrics: string;
};

export const saveSong = async ({ title, artist, genre, lyrics }: Song) =>
  addDoc(dbInstance, {
    userId: auth.currentUser?.uid,
    title: toTitleCase(title),
    artist,
    genre,
    lyrics,
    createdAt: new Date(),
  });

export const fetchSongs = async (): Promise<Song[]> => {
  const q = query(dbInstance, orderBy('title', 'asc'));
  const songDocs = await getDocs(q);

  return songDocs.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      } as Song)
  );
};
