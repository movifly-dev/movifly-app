import {
  AuthNavigation,
  AuthCodeConfirmation,
} from "./navigation/AuthNavigation";

import { MainNavigation } from "./navigation/MainNavigation";

import { useAuth } from "./contexts/AuthContext";
import { MainProvider } from "./contexts/MainContext";

import { Loading } from "./components";

export default function Main() {
  const { isUserAuthenticated } = useAuth();

  // if (
  //   isClient === null ||
  //   isClient === undefined ||
  //   isUserVerified === "loading"
  // ) {
  //   return <Loading />;
  // }

  return (
    <>
      {!isUserAuthenticated ? (
        <AuthNavigation />
      ) : (
        <MainProvider>
          <MainNavigation />
        </MainProvider>
      )}
    </>
  );
}
