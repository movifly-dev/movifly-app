/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, { createContext, useContext, useMemo, useState } from "react";

// import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from "@react-navigation/native";

// import { auth, firebase, usersCollectionRef } from '../firebaseConfig';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigation = useNavigation();

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  // ===============================================================

  const authContextValues = useMemo(() => ({ isUserAuthenticated }), []);

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
