/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button, Alert, Modal, TouchableOpacity } from 'react-native';
import { FIRESTORE_DB } from '../firebaseConfig';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { useMain } from '../contexts/MainContext';
import { TextInputMask } from 'react-native-masked-text';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from '@react-native-community/datetimepicker';
import formatDateToString from '../utils/formatDateToString';
import { MaterialIcons } from '@expo/vector-icons';
import formatStringToDate from '../utils/formatStringToDate';
import QuantityInput from '../components/QuantityInput';
import CityInput from '../components/CityInput';

function EditQuoteView({ isVisible, quote, closeModal}) {
  const { fetchQuotes } = useMain();

  const [dataVooIdaSelected, setDataVooIdaSelected] = useState(quote.dataVooIda === '' ? false : true);
  const [dataVooVoltaSelected, setDataVooVoltaSelected] = useState(quote.dataVooVolta === '' ? false : true);
  const [showDataVooIdaPicker, setShowDataVooIdaPicker] = useState(false);
  const [showDataVooVoltaPicker, setShowDataVooVoltaPicker] = useState(false);
  const [dataVooIda, setDataVooIda] = useState(quote.dataVooIda === '' ? new Date() : formatStringToDate(quote.dataVooIda));
  const [dataVooVolta, setDataVooVolta] = useState(quote.dataVooVolta === '' ? new Date() : formatStringToDate(quote.dataVooVolta));
  const [solicitante, setSolicitante] = useState(quote.solicitante);
  const [contato, setContato] = useState(quote.contato);
  const [origem, setOrigem] = useState(quote.origem);
  const [destino, setDestino] = useState(quote.destino);
  const [adultos, setAdultos] = useState(Number(quote.adultos) || 0);
  const [criancas, setCriancas] = useState(Number(quote.criancas) || 0);
  const [bebes, setBebes] = useState(Number(quote.bebes) || 0);
  const [flexibilidade, setFlexibilidade] = useState(quote.flexibilidade);
  const [observation, setObservation] = useState(quote.observation);
  const [isFormCompleted, setIsFormCompleted] = useState(true);
  // useEffect(() => {
  //   // Check if the form is completed
  //   const requiredFields = [
  //     solicitante,
  //     contato,
  //     origem,
  //     destino,
  //     adultos,
  //     criancas,
  //     bebes,
  //   ];

  //   setIsFormCompleted(requiredFields.every((field) => field.trim() !== ''));
  // }, [solicitante, contato, origem, destino, adultos, criancas, bebes]);

  const handleSubmit = async () => {
    try {
      const updatedQuoteData = {
        solicitante,
        contato,
        origem,
        destino,
        dataVooIda: dataVooIdaSelected ? typeof dataVooIda === 'object' ? formatDateToString(dataVooIda) : dataVooIda : '',
        dataVooVolta: dataVooVoltaSelected ? typeof dataVooVolta === 'object' ? formatDateToString(dataVooVolta) : dataVooVolta : '',
        adultos: adultos.toString(),
        criancas: criancas.toString(),
        bebes: bebes.toString(),
        flexibilidade,
        observation,
      };

      // Define the document reference for the quote

      const clientesCollectionRef = collection(FIRESTORE_DB, 'quotes');
      const documentRef = doc(clientesCollectionRef, quote.id);

      await updateDoc(documentRef, updatedQuoteData);

      fetchQuotes();
      Alert.alert('Informações atualizadas com sucesso!');
      closeModal();
    } catch (error) {
      Alert.alert('Falha ao atualizar informações. Tente novamente em instantes.');
      throw new Error('Error updating quote:' + error);
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
    <Modal visible={isVisible} animationType="slide" onRequestClose={closeModal}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{
            padding: 16,
            paddingBottom: 0,
            display: 'flex',
            alignItems: 'flex-end'
          }}>
            <TouchableOpacity onPress={() => closeModal()}>
              <MaterialIcons name="close" size={28} color="white" style={{backgroundColor: '#ef7946', width: 36, borderRadius: 100, padding: 4}} />
            </TouchableOpacity>
          </View>
          <View style={styles.editQuoteViewStyle}>
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

            <View style={{ marginBottom: 16 }}>
              <Text style={{ marginBottom: 8 }}>Data da Ida:</Text>
              <Button
                color="#ef7946"
                title={dataVooIdaSelected ? formatDateToString(dataVooIda) : 'Selecionar Data'}
                onPress={() => setShowDataVooIdaPicker(true)}
              />
              {showDataVooIdaPicker && (
                <DateTimePickerModal
                  value={typeof dataVooIda === 'object' ? dataVooIda : formatStringToDate(dataVooIda)}
                  mode="date"
                  display="calendar"
                  onChange={handleDataIdaChange}
                />
              )}
            </View>

            <View style={{ marginBottom: 20, marginTop: 8 }}>
              <Text style={{ marginBottom: 8 }}>Data da Volta:</Text>
              <Button
                color="#ef7946"
                title={dataVooVoltaSelected ? formatDateToString(dataVooVolta) : 'Selecionar Data'}
                onPress={() => setShowDataVooVoltaPicker(true)}
              />
              {showDataVooVoltaPicker && (
                <DateTimePickerModal
                  value={typeof dataVooVolta === 'object' ? dataVooVolta : formatStringToDate(dataVooVolta)}
                  mode="date"
                  display="calendar"
                  onChange={handleDataVoltaChange}
                />
              )}
            </View>

            <QuantityInput label="Quantidade de adultos (De 12 ou + anos):" initialValue={adultos} onChangeQuantity={setAdultos} />

            <QuantityInput label="Quantidade de crianças (De 2 a 11 anos):" initialValue={criancas} onChangeQuantity={setCriancas}/>

            <QuantityInput label="Quantidade de bebês:" initialValue={bebes} onChangeQuantity={setBebes}/>

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

            <Button color="#ef7946" title="Atualizar" onPress={handleSubmit} disabled={!isFormCompleted} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export default EditQuoteView;

const styles = {
  editQuoteViewStyle: {
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
