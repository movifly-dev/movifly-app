/* eslint-disable no-unused-vars */
import {
  AuthNavigation,
  AuthCodeConfirmation,
} from './navigation/AuthNavigation';

import { MainNavigation } from './navigation/MainNavigation';

import { useAuth } from './contexts/AuthContext';
import { MainProvider } from './contexts/MainContext';

export default function Main() {
  const { user } = useAuth();

  // if (
  //   isClient === null ||
  //   isClient === undefined ||
  //   isUserVerified === "loading"
  // ) {
  //   return <Loading />;
  // }

  return (
    <>
      {!user ? (
        <AuthNavigation />
      ) : (
        <MainProvider>
          <MainNavigation />
        </MainProvider>
      )}
    </>
  );
}
