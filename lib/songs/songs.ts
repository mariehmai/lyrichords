import {
  collection,
  addDoc,
  query,
  orderBy,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { database } from '@lib/firebase/config';
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
    userId: 'anonymous',
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
      }) as Song
  );

  return { songs, loading, error };
};

export const useSong = (songId: Song['id'] = 'song-id') => {
  const [track, loading, error] = useDocument(doc(dbInstance, songId));

  const song = {
    ...track?.data(),
    id: track?.id,
  } as Song;

  return { song, loading, error };
};

export const updateSong = async (id: string, body: UpdateSong) =>
  setDoc(doc(database, 'tracks', id), body);

export const deleteSong = async (id: string) =>
  deleteDoc(doc(database, 'tracks', id));
