/* eslint-disable react/prop-types */
import { collection, deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { FIRESTORE_DB } from '../firebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


function ClientDetails({ route }) {
  const { client } = route.params;
  const { id, ...clientDetails } = client;
  const navigation = useNavigation();


  const parsedLabels = {
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

  const handleClientEdit = async (clientId) => {
    // operation edit here, calll component or use this same to edit and save.
  };

  const handleClientDelete = async (clientId) => {
    try {
      // Delete the client document from Firestore
      const clientesCollectionRef = collection(FIRESTORE_DB, 'clientes');
      const documentRef = doc(clientesCollectionRef, clientId);
      await deleteDoc(documentRef);

      navigation.goBack();

      // Update the state to reflect the changes (remove the deleted client from the list)
      // setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));

      // Show a success message to the user (you can use a Toast or an alert)
      // ...
    } catch (error) {
      console.error('Error deleting client:', error);
      // Show an error message to the user (you can use a Toast or an alert)
      // ...
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.clientDetailsView}>
          <View style={styles.clientDetailsOperations}>
            <TouchableOpacity onPress={() => handleClientEdit(id)}>
              <MaterialIcons name="edit" size={26} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleClientDelete(id)}>
              <MaterialIcons name="delete" size={26} color="black" />
            </TouchableOpacity>
          </View>
          {Object.entries(clientDetails).map(([key, value]) => (
            <View key={key} style={styles.clientInfo}>
              <Text style={styles.clientInfoLabel}>{parsedLabels[key]}: </Text>
              <Text style={styles.clientInfoValue}>{value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ClientDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  clientDetailsView: {
    flex: 1,
    padding: 20,
    paddingVertical: 12,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  clientDetailsOperations: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 25,
    borderBottomWidth: 1,
    paddingBottom: 12,
    borderColor: '#1b1b1b'
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  clientInfoLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
  },
  clientInfoValue: {
    fontSize: 16,
  },
});

