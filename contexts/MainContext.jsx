/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import { collection, getDocs } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { FIRESTORE_DB } from '../firebaseConfig';

// import { main, firebase, usersCollectionRef } from '../firebaseConfig';

const MainContext = createContext();

function MainProvider({ children }) {
  const [clients, setClients] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [quotes, setQuotes] = useState([]);

  const fetchClients = async () => {
    try {
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'clientes'));
      const clientsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClients(clientsData);
    } catch (error) {
      throw new Error('Erro ao listar vendas');
    }
  };

  const fetchRefunds = async () => {
    try {
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'reembolsos'));
      const refundsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRefunds(refundsData);
    } catch (error) {
      throw new Error('Erro ao listar reembolsos');
    }
  };

  const fetchQuotes = async () => {
    try {
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'quotes'));
      const quotesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuotes(quotesData);
    } catch (error) {
      throw new Error('Erro ao listar cotações');
    }
  };

  useEffect(() => {
    fetchClients();
    fetchRefunds();
    fetchQuotes();
  }, []);

  // ===============================================================

  const mainContextValues = useMemo(() => ({ clients, fetchClients, refunds, fetchRefunds, fetchQuotes, quotes }), [clients, refunds, quotes]);

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
