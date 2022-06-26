import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  doc,
  setDoc,
} from 'firebase/firestore';
import { database, auth } from '@lib/firebase/config';
import { toTitleCase } from '@lib/string';
import { login } from '@lib/auth/auth';

const dbInstance = collection(database, 'tracks');

export type Song = {
  id: string;
  title: string;
  artist?: string;
  genre?: string;
  lyrics: string;
};

export type CreateSong = Omit<Song, 'id'>;
export type UpdateSong = Partial<Omit<Song, 'id'>>;

export const saveSong = async ({ title, artist, genre, lyrics }: CreateSong) =>
  addDoc(dbInstance, {
    userId: auth.currentUser?.uid,
    title: toTitleCase(title),
    artist,
    genre,
    lyrics,
    createdAt: new Date(),
  });

export const fetchSongs = async (): Promise<Song[]> => {
  await login();

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

export const fetchSong = async (id: string): Promise<Song> => {
  await login();

  const docRef = doc(database, 'tracks', id);

  const songDoc = await getDoc(docRef);

  return {
    ...songDoc.data(),
    id: songDoc.id,
  } as Song;
};

export const updateSong = async (id: string, body: UpdateSong) => {
  await login();

  return await setDoc(doc(database, 'tracks', id), body);
};
