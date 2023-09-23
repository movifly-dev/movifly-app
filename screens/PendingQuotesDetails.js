/* eslint-disable react/prop-types */
import { collection, deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FIRESTORE_DB } from '../firebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMain } from '../contexts/MainContext';
import PendingQuotesEdit from './PendingQuotesEdit'; // Import a new component for editing quotes
import DeleteConfirmationModal from '../components/Sells/DeleteConfirmationModal';
import formatDateToString from '../utils/formatDateToString';

function PendingQuotesDetails({ route }) {
  const { fetchQuotes, quotes } = useMain(); // Update to use quotes
  const { quote } = route.params;
  const { id, createdAt, ...quoteDetails } = quotes.find((quoteDetails) => quoteDetails.id === quote.id); // Update to use quotes
  const navigation = useNavigation();
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);

  const parsedLabels = {
    solicitante: 'Solicitante',
    contato: 'Contato',
    origem: 'Origem',
    destino: 'Destino',
    dataVooIda: 'Data da Ida',
    dataVooVolta: 'Data da Volta',
    adultos: 'Quantidade de Adultos',
    criancas: 'Quantidade de Crianças',
    bebes: 'Quantidade de Bebês',
    flexibilidade: 'Flexibilidade',
    observation: 'Observação',
  };

  const toggleModalEdit = () => {
    setIsModalEditVisible((prev) => !prev);
  };

  const toggleModalDelete = () => {
    setIsModalDeleteVisible((prev) => !prev);
  };

  const handleQuoteDelete = async (quoteId) => {
    try {
      // Delete the quote document from Firestore
      const quotesCollectionRef = collection(FIRESTORE_DB, 'quotes');
      const documentRef = doc(quotesCollectionRef, quoteId);
      await deleteDoc(documentRef);
      navigation.goBack();
      await fetchQuotes();

      // Show a success message to the user (you can use a Toast or an alert)
      // ...
    } catch (error) {
      throw new Error('Error deleting quote:', error);
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
          {Object.entries(quoteDetails).map(([key, value]) => (
            <View key={key} style={styles.clientInfo}>
              <Text style={styles.clientInfoLabel}>{parsedLabels[key]}: </Text>
              <Text style={styles.clientInfoValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Modal for editing */}
        <PendingQuotesEdit
          isVisible={isModalEditVisible}
          quote={quote}
          closeModal={toggleModalEdit}
        />

        {/* Modal for confirm delete */}
        <DeleteConfirmationModal
          isVisible={isModalDeleteVisible}
          onCancel={toggleModalDelete}
          onConfirm={() => handleQuoteDelete(id)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default PendingQuotesDetails;

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
    color: '#fff',
  },
  clientInfoValue: {
    color: '#fff',
    fontSize: 16,
  },
});
