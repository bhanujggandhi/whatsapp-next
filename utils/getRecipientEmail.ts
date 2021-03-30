import firebase from "firebase/app";

const getReciepientEmail = (
  users: string[],
  userLoggedIn: firebase.User | null | undefined
) => users?.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0];

export default getReciepientEmail;
