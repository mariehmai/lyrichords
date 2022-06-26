import {
  collection,
  addDoc,
  getDoc,
  query,
  orderBy,
  doc,
  setDoc,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
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

export const useSongs = () => {
  const q = query(dbInstance, orderBy('title', 'asc'));
  const [tracks, loading, error] = useCollection(q);

  const songs = tracks?.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      } as Song)
  );

  return { songs, loading, error };
};

export const fetchSong = async (id: string): Promise<Song> => {
  const docRef = doc(database, 'tracks', id);

  const songDoc = await getDoc(docRef);

  return {
    ...songDoc.data(),
    id: songDoc.id,
  } as Song;
};

export const updateSong = async (id: string, body: UpdateSong) =>
  setDoc(doc(database, 'tracks', id), body);
