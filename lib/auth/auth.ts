import { useEffect } from 'react';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '@lib/firebase/config';

export const useSignIn = () => {
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!!user?.uid) return;

    const login = async () => signInAnonymously(auth);

    void login();
  }, [signInWithEmailAndPassword, user?.uid]);
};
