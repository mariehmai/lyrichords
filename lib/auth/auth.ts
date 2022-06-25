import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@lib/firebase/config';

export const login = async () =>
  signInWithEmailAndPassword(
    auth,
    process.env.NEXT_PUBLIC_FIREBASE_USER_EMAIL!,
    process.env.NEXT_PUBLIC_FIREBASE_USER_PASSWORD!
  );
