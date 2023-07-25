/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, { createContext, useContext, useMemo } from "react";

// import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from "@react-navigation/native";

// import { main, firebase, usersCollectionRef } from '../firebaseConfig';

const MainContext = createContext();

function MainProvider({ children }) {
  const navigation = useNavigation();

  // ===============================================================

  const mainContextValues = useMemo(() => ({}), []);

  return (
    <MainContext.Provider value={mainContextValues}>
      {children}
    </MainContext.Provider>
  );
}

function useMain() {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error("useMain must be used within a MainProvider");
  }

  return context;
}

export { MainProvider, useMain };
