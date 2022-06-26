import { useEffect } from 'react';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { auth } from '@lib/firebase/config';

export const useSignIn = () => {
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!!user?.uid) return;

    const login = async () =>
      signInWithEmailAndPassword(
        process.env.NEXT_PUBLIC_FIREBASE_USER_EMAIL!,
        process.env.NEXT_PUBLIC_FIREBASE_USER_PASSWORD!
      );

    void login();
  }, [signInWithEmailAndPassword, user?.uid]);
};
