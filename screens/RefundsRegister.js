/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { FIRESTORE_DB } from '../firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useMain } from '../contexts/MainContext';
import DateTimePickerModal from '@react-native-community/datetimepicker';
import formatDateToString from '../utils/formatDateToString';

function RefundsRegisterView() {
  const [dataSelected, setDataSelected] = useState(false);
  const [showDataPicker, setShowDataPicker] = useState(false);
  const [requestRefundData, setRequestRefundData] = useState(new Date());
  const [companhiaAerea, setCompanhiaAerea] = useState('');
  const [localizador, setLocalizador] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [isFormCompleted, setIsFormCompleted] = useState(true);
  const { fetchRefunds } = useMain();

  // useEffect(() => {
  // const requiredFields = [
  //   dataVoo,
  //   dataVenda,
  //   companhiaAerea,
  //   localizador,
  //   nomePassageiro,
  //   nomeComprador,
  //   nomeVendedor,
  //   contatoVendedor,
  //   valorCompra,
  //   valorVenda,
  //   lucro,
  //   formaPagamento,
  //   emailCliente,
  //   cpf,
  // ];
  // const isFormCompleted = requiredFields.some((field) => field.trim() !== '') || checklistPagoChecked;
  // }, []);

  const handleSubmit = async () => {
    try {
      const newClientData = {
        requestRefundData: dataSelected ? formatDateToString(requestRefundData) : '',
        companhiaAerea,
        localizador,
        nomeCliente,
        createdAt: serverTimestamp(),
      };
      // Define the collection reference
      const clientesCollectionRef = collection(FIRESTORE_DB, 'reembolsos');

      // Use the add() method to add a new document with the newClientData to the "clientes" collection
      await addDoc(clientesCollectionRef, newClientData);

      Alert.alert('Data submitted successfully!');
      fetchRefunds();
      setDataSelected(false);
      setRequestRefundData(new Date());
      setCompanhiaAerea('');
      setLocalizador('');
      setNomeCliente('');
    } catch (error) {
      Alert.alert(error.message);
      throw new Error('Failed to submit data. Please try again later.');
    }
  };

  const handleRequestDataChange = (event, selectedDate) => {
    setShowDataPicker(false);
    setDataSelected(true);
    if (selectedDate) {
      setRequestRefundData(selectedDate);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.refundsRegisterViewStyle}>
          <View style={{marginBottom: 16}}>
            <Text style={{marginBottom: 8}}>Data da Solicitação:</Text>
            <Button color="#ef7946" title={dataSelected ? formatDateToString(requestRefundData) : 'Selecionar Data'} onPress={() => setShowDataPicker(true)} />
            {showDataPicker && (
              <DateTimePickerModal
                value={requestRefundData}
                mode="date"
                display="calendar"
                onChange={handleRequestDataChange}
              />
            )}
          </View>

          <Text style={styles.label}>Companhia Aérea:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCompanhiaAerea}
            value={companhiaAerea}
            placeholder="Digite a companhia aérea"
          />

          <Text style={styles.label}>Localizador:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setLocalizador}
            value={localizador}
            placeholder="Digite o localizador"
          />

          <Text style={styles.label}>Nome do cliente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNomeCliente}
            value={nomeCliente}
            placeholder="Digite o nome do passageiro"
          />

          <Button color="#ef7946" title="Cadastrar" onPress={handleSubmit} disabled={!isFormCompleted} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RefundsRegisterView;

const styles = {
  refundsRegisterViewStyle: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  disabled: {
    backgroundColor: '#f2f2f2',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    paddingHorizontal: 10,
  },
};
