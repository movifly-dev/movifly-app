/* eslint-disable react/prop-types */
import { collection, deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FIRESTORE_DB } from '../firebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMain } from '../contexts/MainContext';
import ClientDetailsEdit from './ClientDetailsEdit';
import DeleteConfirmationModal from '../components/Sells/DeleteConfirmationModal';
import formatDateToString from '../utils/formatDateToString';


function ClientDetails({ route }) {
  const { fetchClients, clients } = useMain();
  const { client } = route.params;
  const { id, createdAt, ...clientDetails } = clients.find(clientDetails => clientDetails.id === client.id);
  const navigation = useNavigation();
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);

  const parsedLabels = {
    dataVoo: 'Data do Voo',
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
    checklistPagoChecked: 'Checklist Pago',
    emailCliente: 'E-mail do Cliente',
    cpf: 'CPF',
  };
  const toggleModalEdit = () => {
    setIsModalEditVisible((prev) => !prev);
  };

  const toggleModalDelete = () => {
    setIsModalDeleteVisible((prev) => !prev);
  };

  const handleClientDelete = async (clientId) => {
    try {
      // Delete the client document from Firestore
      const clientesCollectionRef = collection(FIRESTORE_DB, 'clientes');
      const documentRef = doc(clientesCollectionRef, clientId);
      await deleteDoc(documentRef);
      navigation.goBack();
      await fetchClients();

      // Show a success message to the user (you can use a Toast or an alert)
      // ...
    } catch (error) {
      throw new Error('Error deleting client:', error);
      // Show an error message to the user (you can use a Toast or an alert)
      // ...
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.clientDetailsView}>
          <View style={styles.clientDetailsOperations}>
            <TouchableOpacity onPress={toggleModalEdit} style={styles.touchableSpace}>
              <MaterialIcons name="edit" size={26} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModalDelete} style={styles.touchableSpace}>
              <MaterialIcons name="delete" size={26} color="white" />
            </TouchableOpacity>
          </View>
          {Object.entries(clientDetails).map(([key, value]) => (
            <View key={key} style={styles.clientInfo}>
              <Text style={styles.clientInfoLabel}>{parsedLabels[key]}: </Text>
              <Text style={styles.clientInfoValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Modal for editing */}
        <ClientDetailsEdit
          isVisible={isModalEditVisible}
          client={client}
          closeModal={toggleModalEdit}
        />

        {/* Modal for confirm delete */}
        <DeleteConfirmationModal
          isVisible={isModalDeleteVisible}
          onCancel={toggleModalDelete}
          onConfirm={() => handleClientDelete(id)}
        />
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
  touchableSpace: {
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
    padding: 8,
    borderRadius: 50,
  },
  clientDetailsView: {
    flex: 1,
    padding: 20,
    paddingVertical: 12,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(239, 121, 70, 1)',
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
    borderColor: '#fff',
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
    color: '#fff'
  },
  clientInfoValue: {
    color: '#fff',
    fontSize: 16,
  },
});


