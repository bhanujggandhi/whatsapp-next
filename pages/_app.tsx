import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";

import Login from "./login";
import Loading from "components/Loading.jsx";
import { auth, db } from "../firebase";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.ComponentType;
  pageProps: any;
}) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
