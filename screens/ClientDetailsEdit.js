/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { FIRESTORE_DB } from '../firebaseConfig';
import { updateDoc, collection, doc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import { useMain } from '../contexts/MainContext';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from '@react-native-community/datetimepicker';
import { TextInputMask } from 'react-native-masked-text';
import formatStringToDate from '../utils/formatStringToDate';
import formatDateToString from '../utils/formatDateToString';

function ClientDetailsEdit({ isVisible, client, closeModal }) {
  const [dataVooSelected, setDataVooSelected] = useState(dataVoo === '' ? false : true);
  const [dataVendaSelected, setDataVendaSelected] = useState(dataVenda === '' ? false : true);
  const [showDataVooPicker, setShowDataVooPicker] = useState(false);
  const [showDataVendaPicker, setShowDataVendaPicker] = useState(false);
  const [dataVoo, setDataVoo] = useState(dataVoo === '' ? new Date() : formatStringToDate(client.dataVoo));
  const [dataVenda, setDataVenda] = useState(dataVenda === '' ? new Date() : formatStringToDate(client.dataVenda));
  const [companhiaAerea, setCompanhiaAerea] = useState(client.companhiaAerea);
  const [localizador, setLocalizador] = useState(client.localizador);
  const [nomePassageiro, setNomePassageiro] = useState(client.nomePassageiro);
  const [nomeComprador, setNomeComprador] = useState(client.nomeComprador);
  const [nomeVendedor, setNomeVendedor] = useState(client.nomeVendedor);
  const [contatoVendedor, setContatoVendedor] = useState(client.contatoVendedor);
  const [valorCompra, setValorCompra] = useState(client.valorCompra);
  const [valorVenda, setValorVenda] = useState(client.valorVenda);
  const [lucro, setLucro] = useState(client.lucro);
  const [formaPagamento, setFormaPagamento] = useState(client.formaPagamento);
  const [checklistPagoChecked, setChecklistPagoChecked] = useState(client.checklistPagoChecked);
  const [emailCliente, setEmailCliente] = useState(client.emailCliente);
  const [cpf, setCpf] = useState(client.cpf);
  const [isFormCompleted, setIsFormCompleted] = useState(true);
  const { fetchClients } = useMain();
  const checklistOptions = ['Não Solicitado', 'Sim', 'Não'];

  // Helper function to convert a BRL currency string to a number
  const parseCurrencyValue = (currencyString) => {
    if (!currencyString) return 0;

    const parsedValue = currencyString
      .replace('R$', '')
      .replace(/\./g, '')
      .replace(/,/g, '.')
      .trim();

    return parseFloat(parsedValue) || 0;
  };

  // Helper function to convert a number to BRL currency format
  const formatCurrencyValue = (value) => {
    const formatoBrasileiro = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatoBrasileiro.format(value);
  };

  // Function to calculate the profit based on the given "Valor da Compra" and "Valor da Venda"
  const calculateProfit = (valorCompra, valorVenda) => {
    const valorCompraNumber = parseCurrencyValue(valorCompra);
    const valorVendaNumber = parseCurrencyValue(valorVenda);

    if (isNaN(valorCompraNumber) || isNaN(valorVendaNumber)) {
      return 0;
    }

    return (valorVendaNumber - valorCompraNumber).toFixed(2);
  };

  // useEffect(() => {
  //   // const requiredFields = [
  //   //   dataVoo,
  //   //   dataVenda,
  //   //   companhiaAerea,
  //   //   localizador,
  //   //   nomePassageiro,
  //   //   nomeComprador,
  //   //   nomeVendedor,
  //   //   contatoVendedor,
  //   //   valorCompra,
  //   //   valorVenda,
  //   //   lucro,
  //   //   formaPagamento,
  //   //   checklistPagoChecked,
  //   //   emailCliente,
  //   //   cpf,
  //   // ];
  //   // setIsFormCompleted(requiredFields.some((field) => field.trim() !== ''));
  // }, [
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
  //   checklistPagoChecked,
  //   emailCliente,
  //   cpf,
  // ]);

  useEffect(() => {
    if (valorCompra && valorVenda) {
      const valorLucro = calculateProfit(valorCompra, valorVenda);
      const formattedLucro = formatCurrencyValue(valorLucro); // Format the currency value
      setLucro(formattedLucro);
    } else {
      setLucro('');
    }
  }, [valorCompra, valorVenda]);

  const handleSubmit = async () => {
    try {
      const updatedClientData = {
        dataVoo: dataVooSelected ? typeof dataVoo === 'object' ? formatDateToString(dataVoo) : dataVoo : '',
        dataVenda: dataVendaSelected ? typeof dataVenda === 'object' ? formatDateToString(dataVenda) : dataVenda : '',
        companhiaAerea,
        localizador,
        nomePassageiro,
        nomeComprador,
        nomeVendedor,
        contatoVendedor,
        valorCompra,
        valorVenda,
        lucro,
        formaPagamento,
        checklistPagoChecked,
        emailCliente,
        cpf,
      };

      // Define the collection reference
      const clientesCollectionRef = collection(FIRESTORE_DB, 'clientes');
      const documentRef = doc(clientesCollectionRef, client.id);

      // Use the updateDoc() method to update the existing document with the updatedClientData
      await updateDoc(documentRef, updatedClientData);
      await fetchClients();
      alert('Data updated successfully!');
      closeModal(); // Close the modal after successful update
    } catch (error) {
      alert('Failed to update data. Please try again later.');
      console.error('Error updating client:', error);
    }
  };

  const handleDataVooChange = (event, selectedDate) => {
    setShowDataVooPicker(false);
    setDataVooSelected(true);
    if (selectedDate) {
      setDataVoo(selectedDate);
    }
  };

  const handleDataVendaChange = (event, selectedDate) => {
    setShowDataVendaPicker(false);
    setDataVendaSelected(true);
    if (selectedDate) {
      setDataVenda(selectedDate);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={closeModal}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <TouchableOpacity onPress={() => closeModal()}>
              <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.clientRegisterView}>
            {/* Date of Flight */}
            <View style={{marginBottom: 16}}>
              <Text style={{marginBottom: 8}}>Data do Voo:</Text>
              <Button title={dataVooSelected ? formatDateToString(dataVoo) : 'Selecionar Data'} onPress={() => setShowDataVooPicker(true)} />
              {showDataVooPicker && (
                <DateTimePickerModal
                  value={typeof dataVoo === 'object' ? dataVoo : formatStringToDate(dataVoo)}
                  mode="date"
                  display="calendar"
                  onChange={handleDataVooChange}
                />
              )}
            </View>

            {/* Date of Sale */}
            <View style={{marginBottom: 20, marginTop: 8}}>
              <Text style={{marginBottom: 8}}>Data da Venda:</Text>
              <Button title={dataVendaSelected ? formatDateToString(dataVenda) : 'Selecionar Data'} onPress={() => setShowDataVendaPicker(true)} />
              {showDataVendaPicker && (
                <DateTimePickerModal
                  value={typeof dataVenda === 'object' ? dataVenda : formatStringToDate(dataVenda)}
                  mode="date"
                  display="calendar"
                  onChange={handleDataVendaChange}
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

            <Text style={styles.label}>Nome do Passageiro:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNomePassageiro}
              value={nomePassageiro}
              placeholder="Digite o nome do passageiro"
            />

            <Text style={styles.label}>Nome do Comprador:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNomeComprador}
              value={nomeComprador}
              placeholder="Digite o nome do comprador"
            />

            <Text style={styles.label}>Nome do Vendedor:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNomeVendedor}
              value={nomeVendedor}
              placeholder="Digite o nome do vendedor"
            />

            <Text style={styles.label}>Contato do Vendedor:</Text>
            {/* Use the TextInputMask component for the contatoVendedor input */}
            <TextInputMask
              style={styles.input}
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              value={contatoVendedor}
              onChangeText={setContatoVendedor}
              placeholder="Digite o contato do vendedor"
            />

            <Text style={styles.label}>Valor da Compra:</Text>
            {/* Use the TextInputMask component for the valorCompra input */}
            <TextInputMask
              style={styles.input}
              type={'money'}
              value={valorCompra}
              onChangeText={setValorCompra}
              placeholder="Digite o valor da compra"
            />

            <Text style={styles.label}>Valor da Venda:</Text>
            {/* Use the TextInputMask component for the valorVenda input */}
            <TextInputMask
              style={styles.input}
              type={'money'}
              value={valorVenda}
              onChangeText={setValorVenda}
              placeholder="Digite o valor da venda"
            />

            <Text style={styles.label}>Lucro:</Text>
            {/* Use the TextInputMask component for the lucro input */}
            <TextInput
              style={StyleSheet.compose(styles.input, styles.disabled)}
              value={lucro}
              onChangeText={setLucro}
              placeholder="Preencha o valor da venda e da compra"
              editable={false}
            />

            <Text style={styles.label}>Forma de Pagamento:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formaPagamento}
                onValueChange={(itemValue) => setFormaPagamento(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Boleto" value="Boleto" />
                <Picker.Item label="Pix" value="Pix" />
                <Picker.Item label="Transferência Bancária" value="Transferência Bancária" />
                <Picker.Item label="Cartão de crédito" value="Cartão de crédito" />
              </Picker>
            </View>

            <Text style={styles.label}>Checklist Pago:</Text>
            {/* Use the CheckBox component */}
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={checklistPagoChecked}
                onValueChange={(itemValue) => setChecklistPagoChecked(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Sim" value="Sim" />
                <Picker.Item label="Não" value="Não" />
              </Picker>
            </View>

            <Text style={styles.label}>E-mail do Cliente:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmailCliente}
              value={emailCliente}
              placeholder="Digite o e-mail do cliente"
            />

            <Text style={styles.label}>CPF:</Text>
            <TextInputMask
              style={styles.input}
              type={'cpf'}
              value={cpf}
              onChangeText={setCpf}
              placeholder="Digite o CPF"
            />

            <Button title="Salvar" onPress={handleSubmit} disabled={!isFormCompleted} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export default ClientDetailsEdit;

const styles = {
  clientRegisterView: {
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
    backgroundColor: 'rgba(200,200,200,0.2)',
    color: 'rgba(0,0,0,0.6)',
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
