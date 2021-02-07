import { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';

const authContext = createContext();

function useProviderAuth() {
  const [user, setUser] = useState(null);

  const getAuth = () => firebase.auth();

  const signIn = (email, password) =>
    getAuth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setUser(user);
        return user;
      });

  const signUp = (email, password) =>
    getAuth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setUser(user);
        return user;
      });

  const signInWithGithub = () =>
    getAuth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(({ user }) => {
        setUser(user);
        return user;
      });

  const signOut = () =>
    firebase
      .auth()
      .signOut()
      .then(() => setUser(null));

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      return () => unsubscribe();
    });
  }, []);

  return {
    signOut,
    signInWithGithub,
    signIn,
    signUp,
    user
  };
}

export function ProviderAuth({ children }) {
  const auth = useProviderAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
