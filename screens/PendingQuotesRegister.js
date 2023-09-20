/* eslint-disable no-undef */
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button, Alert } from 'react-native';
import { FIRESTORE_DB } from '../firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useMain } from '../contexts/MainContext';
import { TextInputMask } from 'react-native-masked-text';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from '@react-native-community/datetimepicker';
import formatDateToString from '../utils/formatDateToString';

import CityInput from '../components/CityInput';
import QuantityInput from '../components/QuantityInput';

function PendingQuotesRegisterView() {
  const [dataVooIdaSelected, setDataVooIdaSelected] = useState(false);
  const [dataVooVoltaSelected, setDataVooVoltaSelected] = useState(false);
  const [showDataVooIdaPicker, setShowDataVooIdaPicker] = useState(false);
  const [showDataVooVoltaPicker, setShowDataVooVoltaPicker] = useState(false);
  const [dataVooIda, setDataVooIda] = useState(new Date());
  const [dataVooVolta, setDataVooVolta] = useState(new Date());
  const [solicitante, setSolicitante] = useState('');
  const [contato, setContato] = useState('');
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [adultos, setAdultos] = useState(0);
  const [criancas, setCriancas] = useState(0);
  const [bebes, setBebes] = useState(0);
  const [flexibilidade, setFlexibilidade] = useState('Sim');
  const [observation, setObservation] = useState('');
  const [isFormCompleted, setIsFormCompleted] = useState(true);
  const { fetchQuotes } = useMain();

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
  //   observation
  // ];
  // const isFormCompleted = requiredFields.some((field) => field.trim() !== '') || checklistPagoChecked;
  // }, []);

  const handleSubmit = async () => {
    try {
      const newQuoteData = {
        solicitante,
        contato,
        origem,
        destino,
        dataVooIda: dataVooIdaSelected ? formatDateToString(dataVooIda) : '',
        dataVooVolta: dataVooVoltaSelected ? formatDateToString(dataVooVolta) : '',
        adultos: adultos.toString(),
        criancas: criancas.toString(),
        bebes: bebes.toString(),
        flexibilidade,
        observation,
        createdAt: serverTimestamp(),
      };

      // Define the collection reference
      const queotesCollectionRef = collection(FIRESTORE_DB, 'quotes');

      await addDoc(queotesCollectionRef, newQuoteData);

      Alert.alert('Informações cadastradas com sucesso!');
      fetchQuotes();
      setDataVooIdaSelected(false);
      setDataVooVoltaSelected(false);
      setDataVooIda(new Date());
      setDataVooVolta(new Date());
      setSolicitante('');
      setContato('');
      setOrigem('');
      setDestino('');
      setAdultos(0);
      setCriancas(0);
      setBebes(0);
      setFlexibilidade('Sim');
      setObservation('');
    } catch (error) {
      Alert.alert('Falha ao cadastrar informações. Tente novamente em instantes.');
      throw new Error('Failed to submit data:' + error);
    }
  };

  const handleDataIdaChange = (event, selectedDate) => {
    setShowDataVooIdaPicker(false);
    setDataVooIdaSelected(true);
    if (selectedDate) {
      setDataVooIda(selectedDate);
    }
  };

  const handleDataVoltaChange = (event, selectedDate) => {
    setShowDataVooVoltaPicker(false);
    setDataVooVoltaSelected(true);
    if (selectedDate) {
      setDataVooVolta(selectedDate);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.clientRegisterViewStyle}>
          <Text style={styles.label}>Solicitante:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setSolicitante}
            value={solicitante}
            placeholder="Digite o solicitante"
          />

          <Text style={styles.label}>Contato:</Text>
          <TextInputMask
            style={styles.input}
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }}
            value={contato}
            onChangeText={setContato}
            placeholder="Digite o contato"
          />

          <CityInput
            onChange={setOrigem}
            value={origem}
            label="Origem"
          />

          <CityInput
            onChange={setDestino}
            value={destino}
            label="Destino"
          />

          <View style={{marginBottom: 16}}>
            <Text style={{marginBottom: 8}}>Data da Ida:</Text>
            <Button color="#ef7946" title={dataVooIdaSelected ? formatDateToString(dataVooIda) : 'Selecionar Data'} onPress={() => setShowDataVooIdaPicker(true)} />
            {showDataVooIdaPicker && (
              <DateTimePickerModal
                value={dataVooIda}
                mode="date"
                display="calendar"
                onChange={handleDataIdaChange}
              />
            )}
          </View>

          <View style={{marginBottom: 20, marginTop: 8}}>
            <Text style={{marginBottom: 8}}>Data da Volta:</Text>
            <Button color="#ef7946" title={dataVooVoltaSelected ? formatDateToString(dataVooVolta) : 'Selecionar Data'} onPress={() => setShowDataVooVoltaPicker(true)} />
            {showDataVooVoltaPicker && (
              <DateTimePickerModal
                value={dataVooVolta}
                mode="date"
                display="calendar"
                onChange={handleDataVoltaChange}
              />
            )}
          </View>

          <QuantityInput label="Quantidade de adultos (De 12 ou + anos)" initialValue={adultos} onChangeQuantity={setAdultos}/>

          <QuantityInput label="Quantidade de Crianças (De 2 a 11 anos)" initialValue={criancas} onChangeQuantity={setCriancas}/>

          <QuantityInput label="Quantidade de bebês" initialValue={bebes} onChangeQuantity={setBebes}/>

          <Text style={styles.label}>Flexibilidade:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={flexibilidade}
              onValueChange={(itemValue) => setFlexibilidade(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Sim" value="Sim" />
              <Picker.Item label="Não" value="Não" />
            </Picker>
          </View>

          <Text style={styles.label}>Observação:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setObservation}
            value={observation}
            placeholder="Digite uma informação detalhada"
          />

          <Button color="#ef7946" title="Cadastrar" onPress={handleSubmit} disabled={!isFormCompleted} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PendingQuotesRegisterView;

const styles = {
  clientRegisterViewStyle: {
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
