/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, { createContext, useContext, useMemo, useState } from 'react';

// import { main, firebase, usersCollectionRef } from '../firebaseConfig';

const MainContext = createContext();

function MainProvider({ children }) {
  const [teste, setTeste] = useState('É um teste');

  // ===============================================================

  const mainContextValues = useMemo(() => ({ teste }), []);

  return (
    <MainContext.Provider value={mainContextValues}>
      {children}
    </MainContext.Provider>
  );
}

function useMain() {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error('useMain must be used within a MainProvider');
  }

  return context;
}

export { MainProvider, useMain };
