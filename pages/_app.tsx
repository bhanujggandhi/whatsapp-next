import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import "firebase/firestore";

import Login from "./login";
import Loading from "components/Loading";
import { auth, db } from "../firebase";

import "../styles/globals.css";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.ComponentType;
  pageProps: any;
}) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user?.uid).set(
        {
          email: user?.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user?.photoURL,
          name: user.displayName,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) return <Loading />;

  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
