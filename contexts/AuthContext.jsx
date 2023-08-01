/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, { createContext, useContext, useMemo, useState } from 'react';

import { FIREBASE_AUTH } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(true);
  const auth = FIREBASE_AUTH;

  // Function to handle user login
  const loginUser = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        setIsUserAuthenticated(true);
      }
      console.log('response', response);
    } catch (error) {
      throw new Error('Erro ao logar: ' + error.message);
    }
  };

  // Function to handle user logout
  const logoutUser = async () => {
    try {
      const response = await signOut(auth);
      if (response) {
        setIsUserAuthenticated(false);
      }
      console.log('response', response);
    } catch (error) {
      throw new Error('Erro ao fazer logout: ' + error.message);
    }
  };

  const authContextValues = useMemo(() => ({
    isUserAuthenticated,
    loginUser,
    logoutUser,
  }),
  [
    isUserAuthenticated,
    loginUser,
    logoutUser
  ]
  );

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
