/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { FIREBASE_AUTH } from '../firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      // Store user data in AsyncStorage when authenticated
      if (user) {
        AsyncStorage.setItem('userData', JSON.stringify(user));
      } else {
        AsyncStorage.removeItem('userData'); // Clear user data on logout
      }
    });

    // Retrieve user data from AsyncStorage on app start
    AsyncStorage.getItem('userData')
      .then((userData) => {
        if (userData) {
          setUser(JSON.parse(userData));
        }
      })
      .catch((error) => {
        console.error('Error retrieving user data:', error);
      });

    return () => unsubscribe();
  }, []);

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
        AsyncStorage.removeItem('userData'); // Clear user data on logout
      }
      console.log('response', response);
    } catch (error) {
      throw new Error('Erro ao fazer logout: ' + error.message);
    }
  };

  const authContextValues = useMemo(() => ({
    user,
    isUserAuthenticated,
    loginUser,
    logoutUser,
  }),
  [
    user,
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
