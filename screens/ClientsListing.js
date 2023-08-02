/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

function ClientsListingView() {
  const [clients, setClients] = useState([]);
  const [numClientsToLoad, setNumClientsToLoad] = useState(10);
  const navigation = useNavigation();

  const reviewLabels = {
    dataVenda: 'Data da Venda',
    companhiaAerea: 'Companhia Aérea',
    localizador: 'Localizador',
    nomePassageiro: 'Nome do Passageiro',
    nomeComprador: 'Nome do Comprador',
    nomeVendedor: 'Nome do Vendedor',
    contatoVendedor: 'Contato do Vendedor',
    valorCompra: 'Valor da Compra',
    valorVenda: 'Valor da Venda',
    lucro: 'Lucro',
    formaPagamento: 'Forma de Pagamento',
    checklistPago: 'Checklist Pago',
    emailCliente: 'E-mail do Cliente',
    cpf: 'CPF',
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'clientes'));
    const clientsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setClients(clientsData);
  };

  const handleLoadMore = () => {
    setNumClientsToLoad((prevNumClientsToLoad) => prevNumClientsToLoad + 5);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
          const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
          if (isCloseToBottom) {
            handleLoadMore();
          }
        }}
      >
        <View style={styles.clientsListingView}>
          {clients.slice(0, numClientsToLoad).map((client) => (
            <TouchableOpacity
              key={client.id}
              style={styles.clientItem}
              onPress={() => navigation.navigate('ClientDetails', { client })}
            >
              <Text style={styles.clientInfoLabel}>Nome do Comprador:</Text>
              <Text style={styles.clientInfoValue}>{client.nomeComprador}</Text>

              <Text style={styles.clientInfoLabel}>Data de Venda:</Text>
              <Text style={styles.clientInfoValue}>{client.dataVenda}</Text>

              <Text style={styles.clientInfoLabel}>Nome do Vendedor:</Text>
              <Text style={styles.clientInfoValue}>{client.nomeVendedor}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ClientsListingView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  clientsListingView: {
    flex: 1,
    padding: 20,
  },
  clientItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  clientInfoLabel: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  clientInfoValue: {
    flex: 2,
    fontSize: 16,
  },
});
